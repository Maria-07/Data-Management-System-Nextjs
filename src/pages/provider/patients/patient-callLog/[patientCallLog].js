import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import AddCallLog from "@/component/UI/Patients/Patients/PatientCallLog/AddCallLog";
import CallLogEdit from "@/component/UI/Patients/Patients/PatientCallLog/CallLogEdit";
import { Table } from "antd";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useGetCalllogQuery } from "@/Redux/features/patient/calllog/calllogApi";
import { useRouter } from "next/router";
import { getAccessToken } from "@/Redux/api/apiSlice";

const PatientCallLog = () => {
  const router = useRouter();
  const { query } = router;
  const id = query.patientCallLog;
  // console.log(id);
  const token = getAccessToken();

  const { data: calllogData, isLoading: calllogloading } = useGetCalllogQuery({
    token,
    id,
  });

  //console.log('calllogData',calllogData);

  const allData = calllogData?.call_log?.data || [];

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [assign, setAssign] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  function formatDate(inputDate) {
    // expects Y-m-d
    var splitDate = inputDate.split("-");
    if (splitDate.count == 0) {
      return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    return month + "/" + day + "/" + year;
  }

  const column = [
    {
      title: "Date",
      dataIndex: "log_date",
      key: "log_date",
      width: 120,
      render: (_, record) => {
        return <div>{formatDate(record.log_date)}</div>;
      },
      /*filters: [{}],
      filteredValue: filteredInfo.Document || null,
      onFilter: (value, record) => record.Document.includes(value),
      sorter: (a, b) => {
        return a.Document > b.Document ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "Document" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Log By",
      dataIndex: "call_log_by",
      key: "call_log_by",
      width: 120,
      /*filters: [{}],
      filteredValue: filteredInfo.Document || null,
      onFilter: (value, record) => record.Document.includes(value),
      sorter: (a, b) => {
        return a.Document > b.Document ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "Document" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Log",
      dataIndex: "call_log",
      key: "call_log",
      width: 90,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 90,
      render: (_, record) => {
        return (
          // <div className="flex items-center justify-center">
          //   <AiOutlineEye />
          // </div>
          <CallLogEdit patientCalllog={record} patientId={id}></CallLogEdit>
        );
      },
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };
  return (
    <div>
      <div className="h-[100vh]">
        <div className="my-2">
          <div className="flex justify-between items-center mr-2">
            <h1 className="text-lg mt-2 text-orange-500">Call Log List</h1>
            <button
              onClick={handleClickOpen}
              className="dcm-button flex item-center gap-2"
            >
              <HiPlus className="text-lg mt-[-2px]" />{" "}
              <span className="">Add New Data</span>
            </button>
          </div>

          <div className=" overflow-scroll py-3">
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              bordered
              className=" text-xs font-normal "
              columns={column}
              dataSource={allData}
              rowKey={(record) => record.call_log_id}
              scroll={{
                y: 700,
              }}
              onChange={handleChange}
            />
          </div>
        </div>
        {openEditModal && (
          <AddCallLog
            handleClose={handleClose}
            open={openEditModal}
            patientId={id}
          ></AddCallLog>
        )}
      </div>
    </div>
  );
};

export default PatientCallLog;

PatientCallLog.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

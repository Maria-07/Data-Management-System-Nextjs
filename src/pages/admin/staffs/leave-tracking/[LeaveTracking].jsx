import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useDeleteLeaveTrackingMutation,
  useGetLeaveTrackingQuery,
} from "@/Redux/features/staff/leaveTracking/leaveTrackingApi";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import LeaveTrackingAdd from "@/component/UI/Staff/LeaveTracking/LeaveTrackingAdd";
import { Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const LeaveTracking = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.leaveTracking;
  const token = getAccessToken(); 

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // get Leaves-Tracking api
  const { data: leaveTrackData, isLoading: getleaveTrackLoading } =
    useGetLeaveTrackingQuery({
      token,
      payload: {
        employee_id: id,
      },
    });

  // delete leave tracking api
  const [
    DeleteLeaveTracking,
    {
      data: deleteleaveTrackdata,
      isSuccess: deleteleaveTrackSuccess,
      isError: deleteleaveTrackError,
    },
  ] = useDeleteLeaveTrackingMutation();

  //Success/Error message show
  useEffect(() => {
    if (deleteleaveTrackSuccess) {
      toast.success(deleteleaveTrackdata?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (deleteleaveTrackError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [
    deleteleaveTrackError,
    deleteleaveTrackSuccess,
    deleteleaveTrackdata?.message,
  ]);
  // useDeleteLeaveTrackingMutation

  const handleDelete = (dltid) => {
    const deleteTrackPayload = {
      employee_id: id,
      del_id: dltid,
    };
    DeleteLeaveTracking({
      token,
      payload: deleteTrackPayload,
    });
  };

  const column = [
    {
      title: "Date of Holiday",
      dataIndex: "leave_date",
      key: "leave_date",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.history_date || null,
      onFilter: (value, record) => record.history_date.includes(value),
      sorter: (a, b) => {
        return a.history_date > b.history_date ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "history_date" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.description || null,
      onFilter: (value, record) => record.description.includes(value),
      //   sorter is for sorting asc or dsc purdescription
      sorter: (a, b) => {
        return a.description > b.description ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 80,
      filters: [
        {
          text: "Hold",
          value: "Hold",
        },
        {
          text: "Pending",
          value: "Pending",
        },
      ],
      render: (_, { status, id }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center items-center">
            {status === "approved" && (
              <button className="bg-gray-500 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status !== "approved" && (
              <button className="bg-teal-700 text-white text-[10px] py-[2px]  rounded w-14">
                {/* {status} */}
                pending
              </button>
            )}
            {status === "Scheduled" && (
              <button className="bg-red-700 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
          </div>
        );
      },
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      //   sorter is for sorting asc or dsc purdescription
      sorter: (a, b) => {
        return a.status > b.status ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: 30,
      render: (_, { client_first_name, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center">
            <button onClick={() => handleDelete(id)} className="text-red-500">
              <AiOutlineDelete />
            </button>
          </div>
        );
      },
      sorter: (a, b) => {
        return a.id > b.id ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
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

  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  const handleClose = () => {
    setOpenEditModal(false);
    setEditModal(false);
  };
  return (
    <div>
      {" "}
      <div className="h-[100vh]">
        <div className="flex items-center justify-between gap-2 my-2">
          <h1 className="text-lg text-orange-500 text-left font-semibold ">
            Leaves
          </h1>
          <button onClick={clearFilters} className="dcm-clear-button">
            Clear filters
          </button>
        </div>
        <div className=" overflow-scroll">
          <Table
            pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
            size="small"
            className=" text-xs font-normal mt-5"
            columns={column}
            bordered
            rowKey={(record) => record.id} //record is kind of whole one data object and here we are
            dataSource={leaveTrackData?.leave_list}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClickOpen} className="dcm-button my-5">
          Add Time Off
        </button>
        {openEditModal && (
          <LeaveTrackingAdd
            id={id}
            token={token}
            handleClose={handleClose}
            open={openEditModal}
          ></LeaveTrackingAdd>
        )}
      </div>
    </div>
  );
};

export default LeaveTracking;

LeaveTracking.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

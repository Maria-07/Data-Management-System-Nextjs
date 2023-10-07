import { getAccessToken } from "@/Redux/api/apiSlice";
import { usePatientAuthorizationActivityDeleteMutation } from "@/Redux/features/patient/authorization/authorizationApi";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const AuthorizationActivityNestedTable = ({
  allAuthorizationActivity,
  treatment_name,
  defaultTreatment,
  allTreatment,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const [authorizationActivityId, setAuthorizationActivityId] = useState();

  const token = getAccessToken();

  //Delete Patient Authorization activity API
  const [
    patientAuthorizationActivityDelete,
    {
      data: AuthorizationActivityDeleted,
      isSuccess: deleteSuccess,
      isError: deleteError,
    },
  ] = usePatientAuthorizationActivityDeleteMutation();

  //String Date to [mm/dd/yy] converter function
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");
  }
  //Handle Authorization Activity Delete
  const deleteAuthorizationActivity = (activityId) => {
    patientAuthorizationActivityDelete({
      token,
      payload: {
        activity_id: activityId,
      },
    });
  };
  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "activity_name",
      key: "activity_name",
      width: 150,
      render: (_, record) => {
        return (
          <h1>
            {record?.activity_one} {record?.activity_two}
          </h1>
        );
      },
      sorter: (a, b) => {
        return a.service > b.service ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "service" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Max By",
      dataIndex: "billed_type",
      key: "billed_type",
      width: 100,
      sorter: (a, b) => {
        return a.billed_type > b.billed_type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "max_by" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Frequency",
      dataIndex: "hours_max_per_one",
      key: "hours_max_per_one",
      width: 100,
      sorter: (a, b) => {
        return a.hours_max_per_one > b.hours_max_per_one ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "hours_max_per_one" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Auth",
      dataIndex: "hours_max_is_one",
      key: "hours_max_is_one",
      width: 100,
      sorter: (a, b) => {
        return a.hours_max_is_one > b.hours_max_is_one ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "hours_max_is_one" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Scheduled",
      dataIndex: "scheduled",
      key: "scheduled",
      width: 100,
      sorter: (a, b) => {
        return a.scheduled > b.scheduled ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "scheduled" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Rendered",
      dataIndex: "Rendered",
      key: "Rendered",
      width: 100,
      sorter: (a, b) => {
        return a.Rendered > b.Rendered ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Rendered" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Remaining",
      dataIndex: "remaining",
      key: "remaining",
      width: 100,
      sorter: (a, b) => {
        return a.remaining > b.remaining ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "remaining" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Start Date",
      dataIndex: "onset_date",
      key: "onset_date",
      width: 100,
      sorter: (a, b) => {
        return a.onset_date > b.onset_date ? -1 : 1; //sorting problem solved using this logic
      },
      render: (_, { onset_date }) => {
        return <h1 className="font-bold">{onset_date}</h1>;
      },
      sortOrder:
        sortedInfo.columnKey === "onset_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: 100,
      sorter: (a, b) => {
        return a.end_date > b.end_date ? -1 : 1; //sorting problem solved using this logic
      },
      render: (_, { end_date }) => {
        return <h1 className="font-bold">{end_date}</h1>;
      },
      sortOrder: sortedInfo.columnKey === "end_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      render: (_, record) => (
        <div>
          {" "}
          <div>
            <div className="flex justify-center gap-1 text-primary">
              {/* <Link to={`/billing/deposit-apply/${row.original.id}`}>
                    <MdOutlineDashboard title="Deposit" />
                  </Link> */}

              <button
                onClick={() => {
                  setAuthorizationActivityId(record?.id);
                  setOpenEditModal(true);
                }}
              >
                <FiEdit className="text-xs mx-2 " />
              </button>

              <span>|</span>
              <button onClick={() => deleteAuthorizationActivity(record?.id)}>
                <AiOutlineDelete
                  className="text-xs text-red-500 mx-2"
                  title="Delete"
                />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (AuthorizationActivityDeleted?.status === "success") {
      toast.success(AuthorizationActivityDeleted?.status, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } else if (AuthorizationActivityDeleted?.status === "error") {
      toast.error(AuthorizationActivityDeleted?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }, [
    AuthorizationActivityDeleted?.status,
    AuthorizationActivityDeleted?.message,
  ]);

  return (
    <>
      <div className={allAuthorizationActivity ? "h-[40vh]" : ""}>
        <div className="overflow-scroll py-2">
          <Table
            bordered
            rowKey={(record) => record.id}
            pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
            size="small"
            className=" text-xs font-normal"
            columns={columns}
            dataSource={allAuthorizationActivity}
            onChange={handleChange}
            // scroll={{
            //   y: 650,
            // }}
          />
        </div>
      </div>
      {/* {openEditModal && (
        <AuthorizationActivityEditModal
          authorizationActivityId={authorizationActivityId}
          handleClose={handleClose}
          open={openEditModal}
          treatment_name={treatment_name}
          defaultTreatment={defaultTreatment}
          allTreatment={allTreatment}
        ></AuthorizationActivityEditModal>
      )} */}
    </>
  );
};

export default AuthorizationActivityNestedTable;

//each authorization data has nested data and we will get that from Patient Authorization Activity api
import React, { useState } from "react";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetPatientAuthorizationActivityQuery } from "@/Redux/features/patient/authorization/authorizationApi";

const AuthorizationActivityTable = ({ id }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const token = getAccessToken();

  //Patient Authorization Activity nested table data api
  const {
    data: allActivityData,
    isLoading: activityLoading,
    isError: activityError,
  } = useGetPatientAuthorizationActivityQuery({
    token,
    payload: {
      authorization_id: id,
    },
  });
  console.log(
    "authorization Activity data",
    allActivityData?.patientActivities
  );
  const allAuthorizationActivity = allActivityData?.patientActivities || [];

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
      width: 200,
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
      ellipsis: true,
    },
    {
      title: "Cpt. Code",
      dataIndex: "cptcode",
      key: "cptcode",
      width: 80,
      render: (_, { cptcode }) => {
        console.log("render data", cptcode);
        return <h1>{cptcode?.cpt_code}</h1>;
      },
      sorter: (a, b) => {
        return a.id > b.id ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
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
      width: 80,
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
      width: 50,
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
      width: 60,
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
      width: 50,
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
      width: 50,
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
      width: 50,
      render: () => (
        <div>
          {" "}
          <div>
            <div className="flex justify-center gap-1 text-primary">
              {/* <Link to={`/billing/deposit-apply/${row.original.id}`}>
                    <MdOutlineDashboard title="Deposit" />
                  </Link> */}

              <button
                onClick={() => {
                  setOpenEditModal(true);
                }}
              >
                <FiEdit className="text-xs mx-2 " />
              </button>

              <span>|</span>
              <Link href={"/"}>
                <AiOutlineDelete
                  className="text-xs text-red-500 mx-2"
                  title="Delete"
                />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <>
        <div className=" overflow-scroll py-2 px-2">
          <Table
            bordered
            rowKey={(record) => record.id}
            pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
            size="small"
            className=" text-xs font-normal "
            columns={columns}
            dataSource={allAuthorizationActivity}
            onChange={handleChange}
            scroll={{
              y: 650,
            }}
          />
        </div>
      </>
      {/* {openEditModal && (
        <AuthorizationEditModal
          handleClose={handleClose}
          open={openEditModal}
        ></AuthorizationEditModal>
      )} */}
    </div>
  );
};

export default AuthorizationActivityTable;

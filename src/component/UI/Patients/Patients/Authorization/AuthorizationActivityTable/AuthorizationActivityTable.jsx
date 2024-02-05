//each authorization data has nested data and we will get that from Patient Authorization Activity api
import React, { useState } from "react";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetPatientAuthorizationActivityQuery } from "@/Redux/features/patient/authorization/authorizationApi";

const AuthorizationActivityTable = ({ id, activity_details }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const token = getAccessToken();
  //Patient Authorization Activity nested table data api
  /*const {
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
  const allAuthorizationActivity = allActivityData?.patientActivities || [];*/

  const allAuthorizationActivity = activity_details;

  const handleClose = () => {
    setOpenEditModal(false);
  };

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service_name",
      key: "service_name",
      width: 100,
      /*render: (_, record) => {
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
      ellipsis: true,*/
    },
    {
      title: "Cpt. Code",
      dataIndex: "cpt_code",
      key: "cpt_code",
      width: 60,
      /*render: (_, { cptcode }) => {
        console.log("render data", cptcode);
        return <h1>{cptcode?.cpt_code}</h1>;
      },
      sorter: (a, b) => {
        return a.id > b.id ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Max By",
      dataIndex: "max_by",
      key: "max_by",
      width: 60,
      /*sorter: (a, b) => {
        return a.billed_type > b.billed_type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "max_by" ? sortedInfo.order : null,
      ellipsis: true,*/
    },

    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      width: 80,
      /*sorter: (a, b) => {
        return a.hours_max_per_one > b.hours_max_per_one ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "hours_max_per_one" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Auth",
      dataIndex: "auth",
      key: "auth",
      width: 50,
      /*sorter: (a, b) => {
        return a.hours_max_is_one > b.hours_max_is_one ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "hours_max_is_one" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Scheduled",
      dataIndex: "scheduled",
      key: "scheduled",
      width: 60,
      /*sorter: (a, b) => {
        return a.scheduled > b.scheduled ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "scheduled" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Rendered",
      dataIndex: "rendered",
      key: "rendered",
      width: 50,
      /*sorter: (a, b) => {
        return a.Rendered > b.Rendered ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Rendered" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Remaining",
      dataIndex: "remaining",
      key: "remaining",
      width: 50,
      /*sorter: (a, b) => {
        return a.remaining > b.remaining ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "remaining" ? sortedInfo.order : null,
      ellipsis: true,*/
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

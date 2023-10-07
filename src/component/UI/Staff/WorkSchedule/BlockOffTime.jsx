import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import AddBlockOffTime from "./AddBlockOffTime";
import {
  useDeleteBlockOffTimeMutation,
  useGetBlockOffTimeQuery,
} from "@/Redux/features/staff/workingSchedule/workingScheduleApi";

function convertTimeTo12HourFormat(time24) {
  const date = new Date(`1/1/2021 ${time24}`);
  const time12 = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }); // format the time in 12-hour format with AM/PM

  return time12;
}

const BlockOffTime = ({
  handleCredential,
  credentialOpen,
  credentials,
  id,
  token,
}) => {
  const [display, setDisplay] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [credentialRecord, setCredentialRecord] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);

  //list of block off time api
  const { data: allBlockOffTime, isLoading } = useGetBlockOffTimeQuery({
    id,
    token,
  });
  //delete block off time api
  const [deleteBlockOffTime, { isSuccess: deleteSuccess }] =
    useDeleteBlockOffTimeMutation();
  //Handle credentialEdit Modal
  const handleEditModal = (record) => {
    setCredentialRecord(record);
    setEditModal(true);
  };

  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setOpenEditModal(false);
    setEditModal(false);
  };

  const handleDelete = (id) => {
    deleteBlockOffTime({
      payload: { id },
      token,
    });
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("successfully deleted the block-off time", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [deleteSuccess]);

  const column = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 120,
      sorter: (a, b) => {
        return a.description > b.description ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      //   render: (_, {}) => {
      //     // console.log("tags : ", Name, id);
      //     return <h1>{credentials?.employee?.first_name}</h1>;
      //   },
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      sorter: (a, b) => {
        return a.type > b.type ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Details",
      key: "type",
      dataIndex: "type",
      width: 100,
      render: (_, record) => {
        return (
          <h1>
            {record?.type === "Week Day"
              ? JSON.parse(record?.days)?.join(", ")
              : record?.type === "Specific Date"
              ? DatabaseDateConverter(record?.date)
              : record?.type}
          </h1>
        );
      },
      sorter: (a, b) => {
        return a.type > b.type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Start Time",
      key: "start_time",
      dataIndex: "start_time",
      width: 100,
      render: (_, record) => {
        return <h1>{convertTimeTo12HourFormat(record?.start_time)}</h1>;
      },
      sorter: (a, b) => {
        return a.start_time > b.start_time ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "start_time" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "End Time",
      key: "end_time",
      dataIndex: "end_time",
      width: 100,
      render: (_, record) => {
        return <h1>{convertTimeTo12HourFormat(record?.end_time)}</h1>;
      },
      sorter: (a, b) => {
        return a.end_time > b.end_time ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "end_time" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary cursor-pointer">
          <AiOutlineDelete
            onClick={() => handleDelete(record?.id)}
            className="text-xs text-red-500 mx-2"
            title="Delete"
          />
        </div>
      ),
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  return (
    <div>
      <div className="my-4 sm:ml-2 flex justify-between mb-5">
        <h1 className="text-lg mt-2 text-left text-orange-400">
          Block Off Time
        </h1>
        <button className="dtm-button mr-2 mt-2" onClick={handleClickOpen}>
          Block Off
        </button>
      </div>
      <div className=" overflow-scroll">
        <Table
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={column}
          bordered
          rowKey={(record) => record.id} //record is kind of whole one data object and here we are
          dataSource={allBlockOffTime?.blockOffTime}
          onChange={handleChange}
        />
      </div>
      {openEditModal && (
        <AddBlockOffTime
          handleClose={handleClose}
          open={openEditModal}
          staff_id={id}
          token={token}
        ></AddBlockOffTime>
      )}
    </div>
  );
};

export default BlockOffTime;

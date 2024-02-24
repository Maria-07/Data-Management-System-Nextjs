import { Table } from "antd";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import AddAppointmentModal from "./Modals/AddAppointmentModal";
import EditSettingModal from "./Modals/EditSettingModal";

const ExpiringUnit = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editSetting, setEditSetting] = useState(false);
  const handleAddSetting = () => {
    setAddModal(!addModal);
  };
  const handleEditSetting = () => {
    setEditSetting(!editSetting);
  };

  const appointments = [
    { value: 12, type: "Hours", id: 1 },
    { value: 43, type: "Minute", id: 2 },
    {
      value: 3,
      type: "Day",
      id: 3,
    },
    { value: 10, type: "Hours", id: 4 },
  ];

  //Handle Appointment Modal
  const handleAppointmentEdit = (record) => {
    setAppointmentRecord(record);
    setEditModal(!editModal);
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  //! Optimized function to get dynamic filter value-text
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };
  const column = [
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: 120,
      filters: generateFilterValues(appointments, "value"),
      filteredValue: filteredInfo.value || null,
      onFilter: (value, record) => record.value.includes(value),
      sorter: (a, b) => a.value.localeCompare(b.value),
      sortOrder: sortedInfo.columnKey === "value" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      filters: generateFilterValues(appointments, "type"),
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value),
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary">
          <FiEdit
            onClick={() => handleEditSetting()}
            className="text-xs mx-2 text-lime-700"
            title="Edit"
          />
          <AiOutlineDelete
            // onClick={() => handleDelete(record)}
            className="text-xs text-red-500 mx-2"
            title="Delete"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div>
        <button className="dcm-button" onClick={handleAddSetting}>
          Add Setting
        </button>
      </div>
      <div className=" overflow-scroll mt-5">
        <Table
          pagination={false}
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={column}
          bordered
          rowKey={(record) => record.id}
          dataSource={appointments}
          onChange={handleChange}
        />
      </div>
      {editSetting && (
        <EditSettingModal
          handleClose={handleEditSetting}
          clicked={editSetting}
        ></EditSettingModal>
      )}
      {addModal && (
        <AddAppointmentModal
          handleClose={handleAddSetting}
          clicked={addModal}
        ></AddAppointmentModal>
      )}
    </div>
  );
};

export default ExpiringUnit;

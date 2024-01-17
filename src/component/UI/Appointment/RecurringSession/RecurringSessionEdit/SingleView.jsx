import { Table } from "antd";
import DeleteModal from "@/component/UI/Layouts/DeleteModal/DeleteModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetSessionListQuery } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";
const SingleView = ({token, id}) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [TimeSheetData, SetTimeSheetDate] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSessionId, setDeleteSessionId] = useState(0);

  const { data: singleViewData, isLoading: singleViewLoading } =
  useGetSessionListQuery({
      token,
      id
    });
    function formatDate(inputDate){  // expects Y-m-d
      var splitDate = inputDate.split('-');
      if(splitDate.count == 0){
          return null;
      }
  
      var year = splitDate[0];
      var month = splitDate[1];
      var day = splitDate[2]; 
  
      return month + '/' + day + '/' + year;
  }
  const handleClose = () => {
    setDeleteModal(false);
  };
  const handleClickOpen = (id) => {
    setDeleteSessionId(id)
    setDeleteModal(true);
  };
  const column = [
    {
      title: "Patient",
      dataIndex: "patient_name",
      key: "patient_name",
      width: 120,
    },
    {
      title: "Service & Hrs",
      dataIndex: "service_name",
      key: "service_name",
      width: 200,
    },
    {
      title: "Provider",
      dataIndex: "provider_name",
      key: "provider_name",
      width: 120,
    },
    {
      title: "Pos",
      dataIndex: "pos",
      key: "pos",
      width: 80,
    },
    {
      title: "Start Date",
      dataIndex: "scheduled_date",
      key: "scheduled_date",
      width: 120,
      render: (_, { scheduled_date }) => {
        return (
          <div>{formatDate(scheduled_date)}</div>
        )
      }
    },

    {
      title: "Hour",
      key: "hours",
      dataIndex: "hours",
      width: 150,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 80,
      render: (_, { status, id }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center items-center">
            {status === "Scheduled" && (
              <button className="bg-gray-500 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status !== "Scheduled" && (
              <button className="bg-teal-700 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 80,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary">
          <AiOutlineDelete
            onClick={() => { handleClickOpen(record.session_id) }}
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <div>
      {" "}
      <div className="overflow-scroll mt-5">
        <Table
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={column}
          bordered
          scroll={{
            y: 400,
          }}
          // rowKey={(record) => record.id} //record is kind of whole one data object and here we are
          dataSource={singleViewData?.sessions_unlocked}
          rowSelection={{
            ...rowSelection,
          }}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-4">
        <div>
          <select
            className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
          >
            <option value=""> Select Any Action </option>
            <option value="2"> Bulk Delete </option>
          </select>
        </div>
        <button className="dtm-button" type="submit">
          Ok
        </button>
      </div>      
      {deleteModal && (
        <DeleteModal 
        handleClose={handleClose} 
        open={deleteModal} 
        deleteSessionId={deleteSessionId}
        token={token}></DeleteModal>
      )}
    </div>
  );
};

export default SingleView;

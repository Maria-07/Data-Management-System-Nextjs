import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetSessionListQuery } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";

const SingleViewPopup = ({ token, id, setRecordSelected }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [TimeSheetData, SetTimeSheetDate] = useState([]);
  const [selectedSession, setSelectedRecord] = useState([]);

  const { data: singleViewData, isLoading: singleViewLoading } =
    useGetSessionListQuery({
      token,
      id,
    });
  function formatDate(inputDate) {
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
        return <div>{formatDate(scheduled_date)}</div>;
      },
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
  ];

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setSelectedRecord(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };
  useEffect(() => {
    const getSessionId = async () => {
      const getId = selectedSession.map((item) => item);
      setRecordSelected(getId);
    };
    getSessionId();
  }, [selectedSession, setRecordSelected]);
  return (
    <div>
      {" "}
      <div className="overflow-scroll mt-5">
        <Table
          rowKey={(record) => record.session_id}
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={column}
          bordered
          scroll={{
            y: 400,
          }}
          dataSource={singleViewData?.sessions_unlocked}
          rowSelection={{
            ...rowSelection,
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SingleViewPopup;

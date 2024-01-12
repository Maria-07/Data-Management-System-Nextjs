import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const SingleView = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [TimeSheetData, SetTimeSheetDate] = useState([]);

  // fake api call
  useEffect(() => {
    axios("../../../../../../All_Fake_Api/TimeSheet.json")
      .then((response) => {
        SetTimeSheetDate(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(TimeSheetData);

  //! Optimized function to get dynamic filter value-text
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const column = [
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      width: 120,
      sorter: (a, b) => {
        return a.patient > b.patient ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "patient" ? sortedInfo.order : null,
      ellipsis: true,
      filters: generateFilterValues(TimeSheetData, "patient"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.patient || null,
      onFilter: (value, record) => record.patient.includes(value),
      render: (_, { record, patient }) => {
        // console.log("tags : ", Name, id);
        return <h1>{patient}</h1>;
      },
      ellipsis: true,
    },
    {
      title: "Service & Hrs",
      dataIndex: "clearance_name",
      key: "clearance_name",
      width: 120,
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_name || null,
      // onFilter: (value, record) => record.clearance_name.includes(value),
      sorter: (a, b) => {
        return a.clearance_name > b.clearance_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      width: 120,
      filters: generateFilterValues(TimeSheetData, "provider"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.provider || null,
      sorter: (a, b) => {
        return a.provider > b.provider ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "provider" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Pos",
      dataIndex: "pos",
      key: "pos",
      width: 120,
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_name || null,
      // onFilter: (value, record) => record.clearance_name.includes(value),
      sorter: (a, b) => {
        return a.clearance_name > b.clearance_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      width: 120,
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_name || null,
      // onFilter: (value, record) => record.clearance_name.includes(value),
      sorter: (a, b) => {
        return a.clearance_name > b.clearance_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_name" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Hour",
      key: "clearance_date_issue",
      dataIndex: "clearance_date_issue",
      width: 100,
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_date_issue || null,
      // onFilter: (value, record) => record.clearance_date_issue.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      sorter: (a, b) => {
        return a.clearance_date_issue > b.clearance_date_issue ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_date_issue"
          ? sortedInfo.order
          : null,
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
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary">
          <AiOutlineDelete
            // onClick={() => handleDelete(record)}
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
          dataSource={TimeSheetData}
          rowSelection={{
            ...rowSelection,
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SingleView;

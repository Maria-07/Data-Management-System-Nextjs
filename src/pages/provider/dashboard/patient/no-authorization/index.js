import { demoData } from "@/component/Data/Data";
import RootLayout from "@/component/Layouts/RootLayout";
import { Table } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiDownload } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";

const NoAuthorization = () => {
  const [tableOpen, setTableOpen] = useState(true);

  //! Optimized function to get dynamic filter value-text
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  //!   table's state
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

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
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setRecordSelected(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };

  const columns = [
    {
      title: "Patient First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: 130,
      filters: generateFilterValues(demoData, "first_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.first_name || null,
      onFilter: (value, record) => record.first_name.includes(value),
      sorter: (a, b) => {
        return a.first_name > b.first_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "first_name" ? sortedInfo.order : null,
      render: (_, { first_name, id, key }) => {
        return (
          <button className="text-secondary font-medium">{first_name}</button>
        );
      },
      // ellipsis: true,
    },
    {
      title: "Patient Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: 130,
      filters: generateFilterValues(demoData, "last_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.last_name || null,
      onFilter: (value, record) => record.last_name.includes(value),
      sorter: (a, b) => {
        return a.last_name > b.last_name ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "last_name" ? sortedInfo.order : null,
      render: (_, { last_name, id, key }) => {
        return (
          <button className="text-secondary font-medium">{last_name}</button>
        );
      },
      // ellipsis: true,
    },
    {
      title: "Supervisor",
      dataIndex: "last_name",
      key: "last_name",
      width: 130,
      filters: generateFilterValues(demoData, "last_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.last_name || null,
      onFilter: (value, record) => record.last_name.includes(value),
      sorter: (a, b) => {
        return a.last_name > b.last_name ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "last_name" ? sortedInfo.order : null,
      render: (_, { last_name, id, key }) => {
        return (
          <button className="text-secondary font-medium">{last_name}</button>
        );
      },
      // ellipsis: true,
    },
  ];

  return (
    <div>
      {/* head part  */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-orange-500 font-medium text-base mb-3">
            Patient/Guarantor pay Clients
          </h1>
        </div>
        <div className="mr-2">
          <Link href={"/provider/dashboard"}>
            <button className="dtm-button flex items-center gap-1 ">
              <TbArrowBack className="text-lg font-bold" />
              Back
            </button>
          </Link>
        </div>
      </div>

      {tableOpen && (
        <>
          {/* data of table */}
          <div className="flex items-end justify-end text-primary mr-2">
            <FiDownload />
          </div>
          <div className=" overflow-scroll py-3 ">
            <Table
              //   rowKey={(record) => record.timesheet_id} //warning issue solve ar jnno unique id rowKey hisabey use hobey
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              className=" text-xs font-normal"
              columns={columns}
              bordered
              dataSource={demoData} //Which data chunk you want to show in table
              // For fixed header table at top
              //   rowSelection={{
              //     ...rowSelection,
              //   }}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NoAuthorization;

NoAuthorization.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

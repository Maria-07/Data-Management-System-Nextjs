import { demoData } from "@/component/Data/Data";
import RootLayout from "@/component/Layouts/RootLayout";
import { Table } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiDownload } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { IoMdDoneAll } from "react-icons/io";

const AuthPlaceHolders = () => {
  const [tableOpen, setTableOpen] = useState(false);

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
      title: "Patient Name",
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
      title: "Supervisor",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 170,
      filters: generateFilterValues(demoData, "phone_number"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { phone_number }) => {
        return (
          <div>
            <h1>02/09/2024</h1>
          </div>
        );
      },
      filteredValue: filteredInfo.phone_number || null,
      onFilter: (value, record) => {
        if (record?.phone_number !== null) {
          return record.phone_number.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.phone_number > b.phone_number ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Insurance",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 170,
      filters: generateFilterValues(demoData, "phone_number"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { phone_number }) => {
        return (
          <div>
            <h1>1199SEIU</h1>
          </div>
        );
      },
      filteredValue: filteredInfo.phone_number || null,
      onFilter: (value, record) => {
        if (record?.phone_number !== null) {
          return record.phone_number.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.phone_number > b.phone_number ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Authorization Number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 170,
      filters: generateFilterValues(demoData, "phone_number"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { phone_number }) => {
        return (
          <div>
            <h1>122344332</h1>
          </div>
        );
      },
      filteredValue: filteredInfo.phone_number || null,
      onFilter: (value, record) => {
        if (record?.phone_number !== null) {
          return record.phone_number.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.phone_number > b.phone_number ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Date Authorization Expired ",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 170,
      filters: generateFilterValues(demoData, "phone_number"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { phone_number }) => {
        return (
          <div>
            <h1>02/09/2024</h1>
          </div>
        );
      },
      filteredValue: filteredInfo.phone_number || null,
      onFilter: (value, record) => {
        if (record?.phone_number !== null) {
          return record.phone_number.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.phone_number > b.phone_number ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  //!   form submit
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setTableOpen(true);
  };

  return (
    <div>
      {/* head part  */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-orange-500 font-medium text-base mb-3">
            Auth Place Holders
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4">
              <div>
                <label className="label">
                  <span className="label-font">Date</span>
                </label>
                <input
                  type="date"
                  name="diagnosis1"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  {...register("diagnosis_one")}
                />
              </div>

              <button className=" border-secondary flex items-center border rounded-sm mt-5">
                <IoMdDoneAll className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  Go
                </span>
              </button>
            </div>
          </form>
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

export default AuthPlaceHolders;

AuthPlaceHolders.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

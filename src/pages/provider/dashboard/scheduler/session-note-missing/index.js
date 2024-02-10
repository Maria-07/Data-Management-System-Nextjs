import { demoData } from "@/component/Data/Data";
import RootLayout from "@/component/Layouts/RootLayout";
import Clients from "@/component/UI/Appointment/MultiSelectComponents/Clients";
import Providers from "@/component/UI/Appointment/MultiSelectComponents/Providers";
import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import { Table } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowsAltH } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";

const SessionNotMissing = () => {
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
      title: "Actual Therapist",
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
      title: "DOS",
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
      title: "Services",
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
      title: "Action",
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

  // Hide calendar on outside click
  const refClose = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refClose.current && !refClose.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  };
  //end outside click

  //Date converter function [yy-mm-dd]
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  //Date Range Picker
  var prev_date = new Date();
  prev_date.setDate(prev_date.getDate() - 1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: prev_date,
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleCancelDate = () => {
    setRange([
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ]);
    setOpenCalendar(false);
  };

  // date range picker calendar
  const startDate = range ? range[0]?.startDate : null;

  const endDate = range ? range[0]?.endDate : null;
  const startMonth = startDate
    ? startDate.toLocaleString("en-us", { month: "short" })
    : null;
  const endMonth = endDate
    ? endDate.toLocaleString("en-us", { month: "short" })
    : null;
  const startDay = startDate ? startDate.getDate() : null;
  const endDay = endDate ? endDate.getDate() : null;
  const startYear = startDate
    ? startDate.getFullYear().toString().slice(2, 4)
    : null;
  const endYear = endDate ? endDate.getFullYear().toString().slice(2, 4) : null;

  //End Date Range Picker

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
            Session Note Missing
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4">
              <div className=" ">
                <label className="label">
                  <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                    Selected date
                  </span>
                </label>
                <div className="ml-1">
                  <div className="flex flex-wrap justify-between items-center text-gray-600 input-border-bottom rounded-sm px-1  w-full">
                    <input
                      value={
                        startDate
                          ? `${startMonth} ${startDay}, ${startYear}`
                          : "Start Date"
                      }
                      readOnly
                      onClick={() => setOpenCalendar(true)}
                      className="focus:outline-none font-medium text-center pb-[1.8px] text-[14px] text-gray-600 bg-transparent w-1/3 cursor-pointer"
                    />
                    <FaArrowsAltH
                      onClick={() => setOpenCalendar(true)}
                      className="w-1/3 cursor-pointer text-gray-600 text-[14px] font-medium"
                    ></FaArrowsAltH>
                    <input
                      value={
                        endDate
                          ? `${endMonth} ${endDay}, ${endYear}`
                          : "End Date"
                      }
                      readOnly
                      onClick={() => setOpenCalendar(true)}
                      className="focus:outline-none font-medium text-center bg-transparent text-[14px] text-gray-600 w-1/3 cursor-pointer"
                    />
                  </div>

                  {/* Multi date picker component called */}
                  <div
                    ref={refClose}
                    className="absolute z-10 md:ml-[50%] lg:ml-0 xl:ml-[0%] 2xl:mr-[0%]"
                  >
                    {openCalendar && (
                      <CustomDateRange
                        range={range}
                        setRange={setRange}
                        handleCancelDate={handleCancelDate}
                        setOpen={setOpenCalendar}
                      ></CustomDateRange>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h1 className="pb-1 pt-4">
                  <span className="label-font">Provider</span>
                </h1>

                <Providers stuffs={[]} setStuffsId={1}></Providers>
              </div>
              <div className="mb-4">
                <h1 className="pb-1 pt-4">
                  <span className="label-font">Provider</span>
                </h1>

                <Clients stuffs={[]} setStuffsId={1}></Clients>
              </div>

              <button className="dtm-button mt-5" type="submit">
                Go
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

export default SessionNotMissing;

SessionNotMissing.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

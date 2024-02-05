import RootLayout from "@/component/Layouts/RootLayout";
import { Table } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoCaretBackCircleOutline } from "react-icons/io5";

const Timesheet = () => {
  const [tableOpen, setTableOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [TimeSheetData, SetTimeSheetDate] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    setTableOpen(true);
    reset();
  };

  // ----------------------------------------Multi-Select---------------------------------
  const [selected, setSelected] = useState([]);

  const customValueRenderer = (selected, _options) => {
    if (selected.length) {
      if (selected.length > 3) return `All Selected ${selected.length}`;
      return selected.map(({ label }) => label);
    }

    return "None selected";
  };

  // fake api call
  useEffect(() => {
    axios("../../All_Fake_Api/TimeSheet.json")
      .then((response) => {
        SetTimeSheetDate(response?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  // console.log(TimeSheetData);

  const inputHandle = (e) => {
    // console.log(e.target.value);
  };

  // ---------------------------------Table Data-------------------------
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 80,
      filters: [
        { text: "Celestine", value: "Celestine" },
        { text: "Annaliese", value: "Annaliese" },
        {
          text: `Maude`,
          value: "Maude",
        },
        {
          text: `Molly`,
          value: "Molly",
        },
        {
          text: "Karla",
          value: "Karla",
        },
        {
          text: "Marcellus",
          value: "Marcellus",
        },
        {
          text: "Hilton",
          value: "Hilton",
        },
      ],
      filteredValue: filteredInfo.date || null,
      onFilter: (value, record) => record.date.includes(value),
      sorter: (a, b) => {
        return a.date > b.date ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { date, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{date}</h1>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      width: 100,
      filters: [
        { text: "Celestine", value: "Celestine" },
        { text: "Annaliese", value: "Annaliese" },
        {
          text: `Maude`,
          value: "Maude",
        },
        {
          text: `Molly`,
          value: "Molly",
        },
        {
          text: "Karla",
          value: "Karla",
        },
        {
          text: "Marcellus",
          value: "Marcellus",
        },
        {
          text: "Hilton",
          value: "Hilton",
        },
      ],
      filteredValue: filteredInfo.provider || null,
      onFilter: (value, record) => record.provider.includes(value),
      sorter: (a, b) => {
        return a.provider > b.provider ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "provider" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { provider, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{provider}</h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      width: 100,
      filters: [
        { text: "Celestine", value: "Celestine" },
        { text: "Annaliese", value: "Annaliese" },
        {
          text: `Maude`,
          value: "Maude",
        },
        {
          text: `Molly`,
          value: "Molly",
        },
        {
          text: "Karla",
          value: "Karla",
        },
        {
          text: "Marcellus",
          value: "Marcellus",
        },
        {
          text: "Hilton",
          value: "Hilton",
        },
      ],
      filteredValue: filteredInfo.patient || null,
      onFilter: (value, record) => record.patient.includes(value),
      sorter: (a, b) => {
        return a.patient > b.patient ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "patient" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { patient, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{patient}</h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 120,
      filters: [
        { text: "Celestine", value: "Celestine" },
        { text: "Annaliese", value: "Annaliese" },
        {
          text: `Maude`,
          value: "Maude",
        },
        {
          text: `Molly`,
          value: "Molly",
        },
        {
          text: "Karla",
          value: "Karla",
        },
        {
          text: "Marcellus",
          value: "Marcellus",
        },
        {
          text: "Hilton",
          value: "Hilton",
        },
      ],
      filteredValue: filteredInfo.activity || null,
      onFilter: (value, record) => record.activity.includes(value),
      sorter: (a, b) => {
        return a.activity > b.activity ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "activity" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { activity, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{activity}</h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
      width: 150,
      filters: [
        { text: "Celestine", value: "Celestine" },
        { text: "Annaliese", value: "Annaliese" },
        {
          text: `Maude`,
          value: "Maude",
        },
        {
          text: `Molly`,
          value: "Molly",
        },
        {
          text: "Karla",
          value: "Karla",
        },
        {
          text: "Marcellus",
          value: "Marcellus",
        },
        {
          text: "Hilton",
          value: "Hilton",
        },
      ],
      filteredValue: filteredInfo.timeIn || null,
      onFilter: (value, record) => record.timeIn.includes(value),
      sorter: (a, b) => {
        return a.timeIn > b.timeIn ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "timeIn" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { timeIn, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center">
            {" "}
            <div className="flex items-center gap-1">
              <input
                type="text"
                name=""
                value="10"
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              />
              <input
                type="text"
                name=""
                value="20"
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              />
              <select
                name="post"
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "timeOut",
      width: 80,
      filters: [
        { text: "Celestine", value: "Celestine" },
        { text: "Annaliese", value: "Annaliese" },
        {
          text: `Maude`,
          value: "Maude",
        },
        {
          text: `Molly`,
          value: "Molly",
        },
        {
          text: "Karla",
          value: "Karla",
        },
        {
          text: "Marcellus",
          value: "Marcellus",
        },
        {
          text: "Hilton",
          value: "Hilton",
        },
      ],
      filteredValue: filteredInfo.timeOut || null,
      onFilter: (value, record) => record.timeOut.includes(value),
      sorter: (a, b) => {
        return a.timeOut > b.timeOut ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "timeOut" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { timeOut, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{timeOut}</h1>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
      width: 60,
      // filters: [
      //   { text: "Celestine", value: "Celestine" },
      //   { text: "Annaliese", value: "Annaliese" },
      //   {
      //     text: `Maude`,
      //     value: "Maude",
      //   },
      //   {
      //     text: `Molly`,
      //     value: "Molly",
      //   },
      //   {
      //     text: "Karla",
      //     value: "Karla",
      //   },
      //   {
      //     text: "Marcellus",
      //     value: "Marcellus",
      //   },
      //   {
      //     text: "Hilton",
      //     value: "Hilton",
      //   },
      // ],
      filteredValue: filteredInfo.hours || null,
      onFilter: (value, record) => record.hours.includes(value),
      sorter: (a, b) => {
        return a.hours > b.hours ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "hours" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { hours, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{hours}</h1>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Miles",
      dataIndex: "miles",
      key: "miles",
      width: 80,
      // filters: [
      //   { text: "Celestine", value: "Celestine" },
      //   { text: "Annaliese", value: "Annaliese" },
      //   {
      //     text: `Maude`,
      //     value: "Maude",
      //   },
      //   {
      //     text: `Molly`,
      //     value: "Molly",
      //   },
      //   {
      //     text: "Karla",
      //     value: "Karla",
      //   },
      //   {
      //     text: "Marcellus",
      //     value: "Marcellus",
      //   },
      //   {
      //     text: "Hilton",
      //     value: "Hilton",
      //   },
      // ],
      filteredValue: filteredInfo.miles || null,
      onFilter: (value, record) => record.miles.includes(value),
      sorter: (a, b) => {
        return a.miles > b.miles ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "miles" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { miles, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <input
              name="cms"
              defaultValue={miles}
              className="page py-[3px] text-center focus:outline-none"
              onChange={inputHandle}
              type="text"
            ></input>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Mileage Rate",
      dataIndex: "miles",
      key: "miles",
      width: 80,
      // filters: [
      //   { text: "Celestine", value: "Celestine" },
      //   { text: "Annaliese", value: "Annaliese" },
      //   {
      //     text: `Maude`,
      //     value: "Maude",
      //   },
      //   {
      //     text: `Molly`,
      //     value: "Molly",
      //   },
      //   {
      //     text: "Karla",
      //     value: "Karla",
      //   },
      //   {
      //     text: "Marcellus",
      //     value: "Marcellus",
      //   },
      //   {
      //     text: "Hilton",
      //     value: "Hilton",
      //   },
      // ],
      filteredValue: filteredInfo.miles || null,
      onFilter: (value, record) => record.miles.includes(value),
      sorter: (a, b) => {
        return a.miles > b.miles ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "miles" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { miles, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <input
              name="cms"
              defaultValue={miles}
              className="page py-[3px] text-center focus:outline-none"
              onChange={inputHandle}
              type="text"
            ></input>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Submitted",
      dataIndex: "submitted",
      key: "submitted",
      width: 60,
      // filters: [
      //   { text: "Celestine", value: "Celestine" },
      //   { text: "Annaliese", value: "Annaliese" },
      //   {
      //     text: `Maude`,
      //     value: "Maude",
      //   },
      //   {
      //     text: `Molly`,
      //     value: "Molly",
      //   },
      //   {
      //     text: "Karla",
      //     value: "Karla",
      //   },
      //   {
      //     text: "Marcellus",
      //     value: "Marcellus",
      //   },
      //   {
      //     text: "Hilton",
      //     value: "Hilton",
      //   },
      // ],
      filteredValue: filteredInfo.submitted || null,
      onFilter: (value, record) => record.submitted.includes(value),
      sorter: (a, b) => {
        return a.submitted > b.submitted ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "submitted" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient, id, key=>each row data(object) property value can be accessed.
      render: (_, { submitted, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="">
            <FaCheck className="text-[15px] text-green-500 mx-auto" />
          </div>
        );
      },
      ellipsis: true,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div className={tableOpen ? "" : "h-[100vh]"}>
      <div className="flex items-center flex-wrap gap-2 justify-between">
        <h1 className="text-lg my-2 text-orange-500">
          Timesheet(s) Submission
        </h1>
        <div className="flex items-center gap-3">
          <FiDownload className="text-secondary font-medium" />
          <Link
            href={"/admin"}
            className="py-[6px] flex items-center  px-4  text-xs font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-md"
          >
            <IoCaretBackCircleOutline className="mr-1 text-sm" /> Back
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center flex-wrap mb-5 mr-2 gap-x-2 gap-y-4 my-3">
          <div>
            <div className="label">
              <span className="label-font">Choose Payroll Period</span>
            </div>
            <select
              name="type"
              className="input-border-bottom input-font  focus:outline-none py-[1px]"
              {...register("payroll")}
              onChange={() => setActive(true)}
            >
              <option value="name"> Select Payroll Period(s) </option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
              <option value="01-12-2021">01/12/2021-07/12/2021</option>
            </select>
          </div>

          {active && (
            <>
              {/* <div>
                <label className="label">
                  <span className="label-text text-gray-500 text-[15px] font-medium text-left">
                    Staff
                  </span>
                </label>
                <>
                  <div className="text-gray-600 rounded-sm mt-[2px] text-[14px] font-medium w-full ml-1 ">
                    <GlobalMultiSelect />
                  </div>
                </>
              </div> */}
              <div>
                <label className="label">
                  <span className="label-font">Status</span>
                </label>
                <select
                  name="type"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("status")}
                >
                  <option value="name"></option>
                  <option value="name"> Submitted </option>
                  <option value="name"> Not Submitted </option>
                </select>
              </div>
            </>
          )}
          <button className="dtm-button  mt-5">Go</button>
        </div>
      </form>
      {tableOpen && (
        <div className="my-8">
          <div className="flex flex-wrap justify-between items-center gap-2 mr-2">
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Monday
              </button>
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Tuesday
              </button>
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Wednesday
              </button>
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Thursday
              </button>
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Friday
              </button>
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Saturday
              </button>
              <button className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm">
                Sunday
              </button>
            </div>
            <button
              onClick={clearFilters}
              className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
            >
              Clear filters
            </button>
          </div>
          <div className=" overflow-scroll py-3">
            <Table
              rowKey="id" //warning issue solve ar jnno unique id rowKey hisabey use hobey
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              className=" text-xs font-normal"
              columns={columns}
              bordered
              dataSource={TimeSheetData} //Which data chunk you want to show in table
              // For fixed header table at top
              rowSelection={{
                ...rowSelection,
              }}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <select
                name="type"
                className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
              >
                <option value="name"> Select Any Action </option>
                <option value="Save Changes"> Save Changes </option>
                <option value="02/01/2022"> Delete Timesheet Statement </option>
                <option value="Submit Timesheet"> Submit Timesheet </option>
              </select>
            </div>
            <button className="dtm-button" type="submit">
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timesheet;

Timesheet.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

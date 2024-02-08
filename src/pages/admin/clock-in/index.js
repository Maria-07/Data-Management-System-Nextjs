import RootLayout from "@/component/Layouts/RootLayout";
import EditCallLog from "@/component/UI/Patients/Patients/PatientCallLog/EditCallLog";
import AddLogTime from "@/component/UI/clockIn/Modal/AddLogTime";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Clock from "react-live-clock";

const ClockIn = () => {
  const [punch, setPunch] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [clockData, setClockData] = useState();
  const [addLogTime, setAddLogTime] = useState(false);
  const [editLogTime, setEditLogTime] = useState(false);

  const handleClose = () => {
    setAddLogTime(false);
  };
  const handleClickOpen = () => {
    setAddLogTime(true);
  };
  const handleEditClose = () => {
    setEditLogTime(false);
  };
  const handleEditClickOpen = () => {
    setEditLogTime(true);
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

  // fake api call
  useEffect(() => {
    axios("../../All_Fake_Api/TimeSheet.json")
      .then((response) => {
        setClockData(response?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  // console.log("data : ", clockData);

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
      // clockOut, id, key=>each row data(object) property value can be accessed.
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
      title: "CLock In",
      dataIndex: "timeIn",
      key: "timeIn",
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
      filteredValue: filteredInfo.timeIn || null,
      onFilter: (value, record) => record.timeIn.includes(value),
      sorter: (a, b) => {
        return a.timeIn > b.timeIn ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "timeIn" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // clockOut, id, key=>each row data(object) property value can be accessed.
      render: (_, { timeIn, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1 className="text-center">{timeIn}</h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Clock Out",
      dataIndex: "clockOut",
      key: "clockOut",
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
      filteredValue: filteredInfo.clockOut || null,
      onFilter: (value, record) => record.clockOut.includes(value),
      sorter: (a, b) => {
        return a.clockOut > b.clockOut ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "clockOut" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // clockOut, id, key=>each row data(object) property value can be accessed.
      render: (_, { clockOut, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1>{clockOut}</h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
      key: "totalHours",
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
      filteredValue: filteredInfo.totalHours || null,
      onFilter: (value, record) => record.totalHours.includes(value),
      sorter: (a, b) => {
        return a.totalHours > b.totalHours ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "totalHours" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // clockOut, id, key=>each row data(object) property value can be accessed.
      render: (_, { totalHours, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1 className="text-center">N/A</h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      sorter: (a, b) => {
        return a.status > b.status ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // clockOut, id, key=>each row data(object) property value can be accessed.
      render: (_, { status, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center">
            <button className="bg-rose-500 text-[10px] rounded-lg px-2 py-[2px] text-white">
              N/A
            </button>
          </div>
        );
      },
      ellipsis: true,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_, { action, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex items-center justify-center gap-2">
            <IoIosAddCircleOutline
              onClick={handleClickOpen}
              className="text-green-600 font-bold"
            />
            <MdEdit onClick={handleEditClickOpen} />
          </div>
        );
      },
      ellipsis: true,
    },
  ];

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-600">
            Hello Soni, Ashu
          </h1>
          <h2 className="text-lg font-normal text-gray-400 text-center">
            Current Status{" "}
            <span className="text-xs px-2 py-1 bg-orange-400 text-white rounded-xl">
              OUT
            </span>
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white border px-24 py-10 my-16 shadow-lg">
          <div className="mb-5 text-center text-sm text-gray-500">
            <Clock
              format={"MMMM Mo, YYYY"}
              ticking={true}
              timezone="Asia/Dhaka"
            />
          </div>
          <div className="text-5xl font-semibold text-gray-600">
            <Clock format={"h:mm:ss A"} ticking={true} />
          </div>
          <div className="flex items-center justify-center">
            {punch ? (
              <button
                onClick={() => setPunch(!punch)}
                className="border px-10 py-2 my-5 hover:text-black transition  bg-orange-400 text-white rounded-lg shadow-md text-lg font-semibold"
              >
                Punch In
              </button>
            ) : (
              <button
                onClick={() => setPunch(!punch)}
                className="border px-10 py-2 my-5 hover:text-black transition  bg-orange-400 text-white rounded-lg shadow-md text-lg font-semibold"
              >
                Punch Out
              </button>
            )}
          </div>

          <div className="flex justify-between">
            <div className="font-semibold">
              Punched at: <span className="text-orange-500">NA</span>
            </div>
            <div>
              <h1 className="font-semibold">IP Address</h1>
              <h1>00.00.000.000</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg my-2 text-orange-500">Clock In Requests</h1>
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
                // onChange={() => setActive(true)}
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

            <button
              onClick={() => setTableOpen(true)}
              className="dtm-button  mt-5"
            >
              Go
            </button>
          </div>
        </form>
      </div>

      {tableOpen && (
        <>
          {" "}
          <div className=" overflow-scroll py-3">
            <Table
              rowKey="id" // warning issue solve ar jnno unique id rowKey hisabey use hobey
              pagination={false} // pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              className=" text-xs font-normal"
              columns={columns}
              bordered
              dataSource={clockData} // Which data chunk you want to show in table
              // For fixed header table at top
              rowSelection={{
                ...rowSelection,
              }}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {addLogTime && (
        <AddLogTime handleClose={handleClose} open={addLogTime}></AddLogTime>
      )}
      {editLogTime && (
        <EditCallLog
          handleClose={handleEditClose}
          open={editLogTime}
        ></EditCallLog>
      )}
    </div>
  );
};

export default ClockIn;

ClockIn.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

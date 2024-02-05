import RootLayout from "@/component/Layouts/RootLayout";
import EditLogTime from "@/component/UI/clockIn/Modal/EditLogTime";
import AddLogTime from "@/component/UI/clockIn/Modal/AddLogTime";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Clock from "react-live-clock";
import { toast } from "react-toastify";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useUpdatePunchMutation } from "@/Redux/features/clockin/clockinApi";
import Cookies from "js-cookie";

const ClockIn = () => {
  const [punch, setPunch] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [clockData, setClockData] = useState();
  const [addLogTime, setAddLogTime] = useState(false);
  const [editLogTime, setEditLogTime] = useState(false);
  const [punchInTime, setPunchInTime] = useState("NA");
  const [TimeSheetData, SetTimeSheetDate] = useState([]);
  const [payPeriodId, setPayPeriodId] = useState("");
  const [selectedRecord, setSelectedRecord] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_ADMIN_URL}/pay-period`, {
      headers: {
        Authorization: token || null,
      },
    })
      .then((response) => {
        SetTimeSheetDate(response?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const handleClose = () => {
    setAddLogTime(false);
  };
  const handleClickOpen = (record) => {
    setSelectedRecord(record);
    setAddLogTime(true);
  };
  const handleEditClose = () => {
    setEditLogTime(false);
  };
  const handleEditClickOpen = (record) => {
    setSelectedRecord(record);
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

  const getPunchStatus = async () => {
    let res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/punch-status`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token || null,
      },
    });
    const data = res?.data;
    setPunch(data?.punch_status);
    setPunchInTime("NA");
    if (data?.punch_status) {
      setPunchInTime(data?.punch_time);
    }
  };

  useEffect(() => {
    getPunchStatus();
  }, []);

  const [
    updatePunchTime,
    { isSuccess: punchUpdateSuccess, isError: punchUpdateError },
  ] = useUpdatePunchMutation();
  const updatePunch = (punchType) => {
    var date = new Date();
    var iso = date
      .toISOString()
      .match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
    let punchTime = iso[1] + " " + iso[2];
    // console.log("punchTime", punchTime);
    updatePunchTime({
      token,
      payload: { punch_time: punchTime },
    });
  };
  const updatePunchIn = () => {
    updatePunch(1);
  };
  const updatePunchOut = () => {
    updatePunch(2);
  };
  useEffect(() => {
    if (punchUpdateSuccess) {
      toast.success("Punch updated successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      //getPunchStatus();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else if (punchUpdateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [punchUpdateSuccess, punchUpdateError]);
  //console.log("data : ", clockData);
  function formatDate(inputDate) {
    // expects Y-m-d
    var splitDate = inputDate.split("-");
    if (splitDate.count == 0) {
      return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    return month + "/" + day + "/" + year;
  }
  const getClockinData = async (payload) => {
    let res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/punch/list`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token || null,
      },
      data: payload,
    });
    const data = res?.data?.punch_list;
    setClockData(data);
    setTableOpen(true);
  };
  const getRecords = () => {
    if (payPeriodId == "") {
      toast.error("Please select payroll period", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else {
      const payload = { pay_period_id: payPeriodId };
      getClockinData(payload);
    }
  };

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
      dataIndex: "punch_date",
      key: "punch_date",
      width: 120,
      render: (_, { punch_date, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1 className="text-center">{formatDate(punch_date)}</h1>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "CLock In",
      dataIndex: "time_in",
      key: "time_in",
      width: 100,
      render: (_, { time_in, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1 className="text-center">{time_in != null ? time_in : "N/A"}</h1>
          </div>
        );
      },
    },
    {
      title: "Clock Out",
      dataIndex: "time_out",
      key: "time_out",
      width: 100,
      render: (_, { time_out, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1 className="text-center">
              {time_out != null ? time_out : "N/A"}
            </h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Total Hours",
      dataIndex: "total_time",
      key: "total_time",
      width: 120,
      render: (_, { total_time, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <h1 className="text-center">
              {total_time && total_time != null ? total_time : "N/A"}
            </h1>
          </div>
        );
      },
      ellipsis: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (_, { status, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center">
            <button className="bg-rose-500 text-[10px] rounded-lg px-2 py-[2px] text-white">
              {id && id > 0 ? "Acceptance Pending" : "N/A"}
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
      render: (_, record) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex items-center justify-center gap-2">
            {record.id && record.id > 0 ? (
              <MdEdit onClick={() => handleEditClickOpen(record)} />
            ) : (
              <IoIosAddCircleOutline
                onClick={() => handleClickOpen(record)}
                className="text-green-600 font-bold"
              />
            )}
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
            Hello {Cookies.get("loginuserFullname")}
          </h1>
          <h2 className="text-lg font-normal text-gray-400 text-center">
            Current Status{" "}
            {!punch ? (
              <span className="text-xs px-2 py-1 bg-orange-400 text-white rounded-xl">
                OUT
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-green-400 text-white rounded-xl">
                IN
              </span>
            )}
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
            {!punch ? (
              <button
                onClick={updatePunchIn}
                className="border px-10 py-2 my-5 hover:text-black transition  bg-orange-400 text-white rounded-lg shadow-md text-lg font-semibold"
              >
                Punch In
              </button>
            ) : (
              <button
                onClick={updatePunchOut}
                className="border px-10 py-2 my-5 hover:text-black transition  bg-orange-400 text-white rounded-lg shadow-md text-lg font-semibold"
              >
                Punch Out
              </button>
            )}
          </div>

          <div className="flex justify-between">
            <div className="font-semibold">
              Punched at: <span className="text-orange-500">{punchInTime}</span>
            </div>
            <div className="px-5">
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
                onChange={(e) => {
                  setPayPeriodId(e.target.value);
                }}
              >
                <option value=""> Select Payroll Period(s) </option>
                {TimeSheetData?.pay_period?.map((timeSheet) => {
                  return (
                    <option key={timeSheet?.id} value={timeSheet?.id}>
                      {formatDate(timeSheet?.start_date)} -{" "}
                      {formatDate(timeSheet?.end_date)}
                    </option>
                  );
                })}
              </select>
            </div>

            <button onClick={getRecords} className="dtm-button  mt-5">
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
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {addLogTime && (
        <AddLogTime
          handleClose={handleClose}
          open={addLogTime}
          selectedRecord={selectedRecord}
          getRecords={getRecords}
        ></AddLogTime>
      )}
      {editLogTime && (
        <EditLogTime
          handleClose={handleEditClose}
          open={editLogTime}
          selectedRecord={selectedRecord}
          getRecords={getRecords}
        ></EditLogTime>
      )}
    </div>
  );
};

export default ClockIn;

ClockIn.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

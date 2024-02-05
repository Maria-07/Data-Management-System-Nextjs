import RootLayout from "@/component/Layouts/RootLayout";
import { Table } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { toast } from "react-toastify";
import {
  useUpdateTimesheetMutation,
  useSubmitTimesheetMutation,
} from "@/Redux/features/timesheet/timesheetApi";
const Timesheet = () => {
  const [tableOpen, setTableOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [TimeSheetData, SetTimeSheetDate] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [timeSheetList, SetTimeSheetList] = useState([]);
  const token = getAccessToken();
  const [payPeriodId, setPayPeriodId] = useState("");
  const [payStatus, setPayStatus] = useState("");
  const [recordSelected, setRecordSelected] = useState([]);
  const [dayselected, setDaySelected] = useState("");

  const getTimesheetData = async (payload) => {
    let res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/timesheet`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token || null,
      },
      data: payload,
    });
    const data = res?.data?.timesheet;
    SetTimeSheetList(data);
  };

  const getRecords = () => {
    // console.log('payPeriodId -- ', payPeriodId)
    // console.log("payStatus -- ", payStatus);
    setDaySelected("");
    if (payPeriodId == "") {
      toast.error("Please select payroll period", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else {
      const payload = {
        pay_period_id: payPeriodId,
        status: payStatus != "" ? payStatus : "",
      };
      getTimesheetData(payload);
      setTableOpen(true);
      reset();
    }
  };

  const getDayReport = (day) => {
    setDaySelected(day);
    const payload = {
      pay_period_id: payPeriodId,
      status: payStatus != "" ? payStatus : "",
      day_name: day,
    };
    getTimesheetData(payload);
  };

  const [updateTimesheet, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateTimesheetMutation();

  const [submitTimesheet, { isSuccess: submitSuccess, isError: submitError }] =
    useSubmitTimesheetMutation();

  const onSubmit = (data) => {
    // console.log("data -- ", data);
    if (recordSelected.length == 0) {
      toast.error("Please select any one of the record", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (data?.action_type == "") {
      toast.error("Date is greater than last date to submit timesheet.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else {
      const timesheet_data = [];
      let milesCheckError = false;
      for (let x of recordSelected) {
        timesheet_data.push(data[x]);
        if (data[x]["miles"] == "") {
          milesCheckError = true;
        }
      }
      if (milesCheckError) {
        toast.error("Please enter the miles", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          style: { fontSize: "12px" },
        });
      } else {
        if (data?.action_type == 1) {
          const payload = {
            pay_period_id: payPeriodId,
            timesheet_data: timesheet_data,
          };
          updateTimesheet({ token, payload });
        } else {
          const payload = {
            timesheet_ids: recordSelected,
          };
          submitTimesheet({ token, payload });
        }
      }
    }
  };
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Timesheet updated successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (updateError) {
      toast.error("Date is greater than last date to submit timesheet.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [updateSuccess, updateError]);
  useEffect(() => {
    if (submitSuccess) {
      toast.success("Timesheet submitted successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (submitError) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [submitSuccess, submitError]);
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
  // console.log("TimeSheetData", TimeSheetData);

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
  const columns = [
    {
      title: "Date",
      dataIndex: "schedule_date",
      key: "schedule_date",
      width: 80,
    },
    {
      title: "Provider",
      dataIndex: "provider_name",
      key: "provider_name",
      width: 100,
    },
    {
      title: "Patient",
      dataIndex: "client_name",
      key: "client_name",
      width: 100,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 120,
    },
    {
      title: "Time In",
      dataIndex: "time_in",
      key: "time_in",
      width: 150,
      render: (
        _,
        { time_in_hour, time_in_minute, time_in_meridiem, timesheet_id, key }
      ) => {
        return (
          <div className="flex justify-center">
            {" "}
            <div className="flex items-center gap-1">
              <input
                type="hidden"
                {...register(`${timesheet_id}.id`)}
                defaultValue={timesheet_id}
              />
              <input
                type="text"
                {...register(`${timesheet_id}.time_in_hour`)}
                defaultValue={time_in_hour}
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              />
              <input
                type="text"
                {...register(`${timesheet_id}.time_in_minute`)}
                defaultValue={time_in_minute}
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              />
              <select
                {...register(`${timesheet_id}.time_in_meridiem`)}
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
                defaultValue={time_in_meridiem.toUpperCase()}
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
      dataIndex: "time_out",
      key: "time_out",
      width: 150,
      render: (
        _,
        { time_out_hour, time_out_minute, time_out_meridiem, timesheet_id, key }
      ) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="flex justify-center">
            {" "}
            <div className="flex items-center gap-1">
              <input
                type="text"
                {...register(`${timesheet_id}.time_out_hour`)}
                defaultValue={time_out_hour}
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              />
              <input
                type="text"
                {...register(`${timesheet_id}.time_out_minute`)}
                defaultValue={time_out_minute}
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
              />
              <select
                {...register(`${timesheet_id}.time_out_meridiem`)}
                className="timesheet-time-box py-[3px] text-center focus:outline-none"
                defaultValue={time_out_meridiem.toUpperCase()}
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
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
      width: 60,
    },
    {
      title: "Miles",
      dataIndex: "miles",
      key: "miles",
      width: 80,
      render: (_, { miles, timesheet_id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div>
            <input
              {...register(`${timesheet_id}.miles`)}
              defaultValue={miles}
              className="page py-[3px] text-center focus:outline-none"
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
      render: (_, { submitted, id, key }) => {
        //console.log("tags : ", client_first_name, id, key);
        return (
          <div className="">
            {submitted ? (
              <FaCheck className="text-[15px] text-green-500 mx-auto" />
            ) : (
              <FaTimes className="text-[15px] text-red-500 mx-auto" />
            )}
          </div>
        );
      },
      ellipsis: true,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setRecordSelected(selectedRowKeys);
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
        </div>
      </div>
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
              setActive(true);
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
                onChange={(e) => {
                  setPayStatus(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="1"> Submitted </option>
                <option value="2"> Not Submitted </option>
              </select>
            </div>
          </>
        )}
        <button className="dtm-button  mt-5" onClick={getRecords}>
          Go
        </button>
      </div>
      {tableOpen && (
        <div className="my-8">
          <div className="flex flex-wrap justify-between items-center gap-2 mr-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Monday");
                }}
              >
                Monday
              </button>
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Tuesday");
                }}
              >
                Tuesday
              </button>
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Wednesday");
                }}
              >
                Wednesday
              </button>
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Thursday");
                }}
              >
                Thursday
              </button>
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Friday");
                }}
              >
                Friday
              </button>
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Saturday");
                }}
              >
                Saturday
              </button>
              <button
                className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
                onClick={() => {
                  getDayReport("Sunday");
                }}
              >
                Sunday
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" overflow-scroll py-3">
              <Table
                rowKey={(record) => record.timesheet_id} //warning issue solve ar jnno unique id rowKey hisabey use hobey
                pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                size="small"
                className=" text-xs font-normal"
                columns={columns}
                bordered
                dataSource={timeSheetList} //Which data chunk you want to show in table
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
                  {...register("action_type")}
                  className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
                >
                  <option value=""> Select Any Action </option>
                  <option value="1"> Save Changes </option>
                  <option value="3"> Submit Timesheet </option>
                </select>
              </div>
              <button className="dtm-button" type="submit">
                Ok
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Timesheet;

Timesheet.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

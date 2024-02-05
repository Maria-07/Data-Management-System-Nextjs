import { Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useGetDayViewListQuery } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";
const DayViewPopup = ({ token, id, setRecordSelected }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [Monday, setMonday] = useState(false);
  const [Tuesday, setTuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thursday, setThursday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Sunday, setSunday] = useState(false);
  const [selectedSession, setSelectedRecord] = useState([]);

  const { data: dayViewData, isLoading: dayViewLoading } =
    useGetDayViewListQuery({
      token,
      id,
    });

  const dayWiseData = dayViewData?.sessions_unlocked;

  const handleClose = () => {
    setDeleteModal(false);
  };
  const handleClickOpen = () => {
    setDeleteModal(true);
  };

  const onChange = (e, day) => {
    if (e.target.checked) {
      setSelectedDay(day);
    } else {
      setSelectedDay(null);
    }
  };

  const weekDayHandle = (e, day) => {
    // console.log(day);
    if (day === "Monday") {
      setMonday(!Monday);
    } else if (day === "Tuesday") {
      setTuesday(!Tuesday);
    } else if (day === "Wednesday") {
      setWednesday(!Wednesday);
    } else if (day === "Thursday") {
      setThursday(!Thursday);
    } else if (day === "Friday") {
      setFriday(!Friday);
    } else if (day === "Saturday") {
      setSaturday(!Saturday);
    } else {
      setSunday(!Sunday);
    }
  };
  const isDisabled = (day) => selectedDay && selectedDay !== day;
  function dateDisplay(start_date) {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(start_date);
    return d.getDate() + " " + month[d.getMonth()];
  }
  const updateSeletedId = (id) => {};
  const updateSelected = (id, day) => {
    if (selectedSession.indexOf(id) > -1) {
      setSelectedRecord((prevState) =>
        prevState.filter((sessionId) => sessionId != id)
      );
    } else {
      setSelectedRecord((prevState) => [...prevState, id]);
    }
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
      <div>
        <div className="gap-0 grid grid-cols-7 my-5">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div key={day} className="border text-center py-1">
              {/*<Checkbox
                    disabled={isDisabled(day)}
                    onChange={(e) => onChange(e, day)}
                    onClick={(e) => weekDayHandle(e, day)}
                    key={day}
                  >
              </Checkbox>*/}
              {day}
            </div>
          ))}
          {/* {appointment?.map((data, i) => (
            <>
              <div key={i} className="border border-t-0 text-center py-1">
                <>
                  <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                    <Checkbo <MdDeleteOutline   onClick={handleClickOpen} className="text-rose-500" />x>
                      {data?.date} {data?.time}
                    </Checkbox>
                  </div>
                </>
              </div>
            </>
          ))} */}
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Monday &&
                dayWiseData?.Monday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 1)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Tuesday &&
                dayWiseData?.Tuesday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 2)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Wednesday &&
                dayWiseData?.Wednesday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 3)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Thursday &&
                dayWiseData?.Thursday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 4)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Friday &&
                dayWiseData?.Friday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 5)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Saturday &&
                dayWiseData?.Saturday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 6)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Sunday &&
                dayWiseData?.Sunday.map((p) => {
                  return (
                    <div
                      className="bg-cyan-200 m-2 px-1 py-1 rounded-md"
                      key={p.session_id}
                    >
                      <div className="flex items-center gap-1">
                        <Checkbox
                          value={p.session_id}
                          onClick={() => updateSelected(p.session_id, 7)}
                        ></Checkbox>
                        <p className="text-[13px]">
                          <span className=" font-normal ">
                            {dateDisplay(p.scheduled_date)}
                          </span>{" "}
                          {p.start_time.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayViewPopup;

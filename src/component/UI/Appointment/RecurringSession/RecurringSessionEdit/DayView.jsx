import { Checkbox } from "antd";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const DayView = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [Monday, setMonday] = useState(false);
  const [Tuesday, setTuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thursday, setThursday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Sunday, setSunday] = useState(false);

  const onChange = (e, day) => {
    if (e.target.checked) {
      setSelectedDay(day);
    } else {
      setSelectedDay(null);
    }
  };

  const weekDayHandle = (e, day) => {
    console.log(day);
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
              <Checkbox
                disabled={isDisabled(day)}
                onChange={(e) => onChange(e, day)}
                onClick={(e) => weekDayHandle(e, day)}
              >
                {day}
              </Checkbox>
            </div>
          ))}
          {/* {appointment?.map((data, i) => (
            <>
              <div key={i} className="border border-t-0 text-center py-1">
                <>
                  <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                    <Checkbo <MdDeleteOutline className="text-rose-500" />x>
                      {data?.date} {data?.time}
                    </Checkbox>
                  </div>
                </>
              </div>
            </>
          ))} */}

          <div className="border border-t-0 text-center py-1">
            <>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                  {/* <Checkbox checked={Monday} > */}
                </Checkbox>
              </div>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    {/* <Checkbox checked={Monday} > */}
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                </Checkbox>
              </div>
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <></>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    {/* <Checkbox checked={Monday} > */}
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                </Checkbox>
              </div>
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <></>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    {/* <Checkbox checked={Monday} > */}
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                </Checkbox>
              </div>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    {/* <Checkbox checked={Monday} > */}
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                </Checkbox>
              </div>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    {/* <Checkbox checked={Monday} > */}
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                </Checkbox>
              </div>
              <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <Checkbox>
                  <div className="flex items-center gap-1">
                    {/* <Checkbox checked={Monday} > */}
                    <p className="text-[13px]">
                      <span className=" font-normal ">9 October</span> 4:44 PM
                    </p>
                    <MdDeleteOutline className="text-rose-500" />
                  </div>
                </Checkbox>
              </div>
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <></>
          </div>
          <div className="border border-t-0 text-center py-1">
            <></>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;

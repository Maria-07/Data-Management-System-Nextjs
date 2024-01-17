import DeleteModal from "@/component/UI/Layouts/DeleteModal/DeleteModal";
import { Checkbox } from "antd";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useGetDayViewListQuery, useGetDayListQuery } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";

const DayView = ({token, id}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [Monday, setMonday] = useState(false);
  const [Tuesday, setTuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thursday, setThursday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Sunday, setSunday] = useState(false);
  const [dayListOpen, setDayListOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [deleteSessionId, setDeleteSessionId] = useState(0);


  const { data: dayViewData, isLoading: dayViewLoading } =
  useGetDayViewListQuery({
      token,
      id
    });

  const { data: dayData, isLoading: dayDataLoading } =
  useGetDayListQuery({
      token
  });


  const dayWiseData = dayViewData?.sessions_unlocked;
  console.log('dayViewData - ',dayViewData)
  const handleClose = () => {
    setDeleteModal(false);
  };
  const handleClickOpen = (id) => {
    setDeleteSessionId(id)
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
  function dateDisplay(start_date)
  {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date(start_date);
    return d.getDate() + ' ' + month[d.getMonth()];
  }
  const onSubmit = (data) => {
    console.log('data -- ',data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                key={day}
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
              {dayWiseData?.Monday.map((p)=>{
                
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                <div className="flex items-center gap-1" key={p.session_id}>
                  <Checkbox></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={() => { handleClickOpen(p.session_id) }}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Tuesday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                  <Checkbox key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                  </Checkbox>
                </div>
              )}) }
              </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Wednesday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                  <Checkbox key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                  </Checkbox>
                </div>
              )}) }
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Thursday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                  <Checkbox key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                  </Checkbox>
                </div>
              )}) }
              </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Friday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                  <Checkbox key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                  </Checkbox>
                </div>
              )}) }
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Saturday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                  <Checkbox key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                  </Checkbox>
                </div>
              )}) }
              </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Sunday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md">
                  <Checkbox key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                  </Checkbox>
                </div>
              )}) }
              </>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <select
            className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
          >
            <option value=""> Select Any Action </option>
            <option value="1"> Move to </option>
            <option value="2"> Bulk Delete </option>
          </select>
        </div>
        {dayListOpen && (
        <div>
          <select
            className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
          >
            <option value=""> Select Any Action </option>
            <option value="1"> Move to </option>
            <option value="2"> Bulk Delete </option>
          </select>
        </div>
        )}
        <button className="dtm-button" type="submit">
          Ok
        </button>
      </div>
      </form>
      {deleteModal && (
        <DeleteModal 
        handleClose={handleClose} 
        open={deleteModal} 
        deleteSessionId={deleteSessionId}
        token={token}></DeleteModal>
      )}
    </div>
  );
};

export default DayView;

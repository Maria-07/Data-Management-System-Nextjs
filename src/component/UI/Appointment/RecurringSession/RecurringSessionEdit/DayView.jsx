import DeleteModal from "@/component/UI/Layouts/DeleteModal/DeleteModal";
import { Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetDayViewListQuery, useGetDayListQuery, useDeleteBulkSessionMutation, useMoveSessionMutation } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";
import { setMonth } from "date-fns";

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
  const [recordSelected, setRecordSelected] = useState([]);
  const [moveDay, setMoveDay] = useState([]);

  const { data: dayViewData, isLoading: dayViewLoading } =
  useGetDayViewListQuery({
      token,
      id
    });

 /* const { data: dayData, isLoading: dayDataLoading } =
  useGetDayListQuery({
      token
  }); */


  const dayWiseData = dayViewData?.sessions_unlocked;
  
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

  const updateSelected = (id,day) => {
      if(recordSelected.indexOf(id) > -1)
      {
        setRecordSelected((prevState) => prevState.filter(sessionId => sessionId!=id))
        setMoveDay((prevState) => prevState.filter(sessionId => sessionId.id!=id))
      } else {
        setRecordSelected((prevState) => [...prevState,id])
        setMoveDay((prevState) => [...prevState,{id:id,day:day}])
      }
  }

  const [
    deleteSessionBulk,
     { isSuccess: deleteSuccess, isError: deleteError },
   ] = useDeleteBulkSessionMutation();

   const [
    moveSessionData,
     { isSuccess: moveSuccess, isError: moveError },
   ] = useMoveSessionMutation();
  
  const onSubmit = (data) => {
    if(data?.singleViewAction === '') {
      toast.error("Please select day view action", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      })
    } else if(recordSelected.length == 0) {
      toast.error("Please select atleast one option", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      })
    } else {
      if(data?.singleViewAction == 1)
      {    
        
        let dayArray = [];
        moveDay.map((dayChecked) => dayArray.indexOf(dayChecked.day) === -1 ? dayArray.push(dayChecked.day) : '' )
        if(dayArray.length > 1)
        {
          toast.error("Only day can be selected at the same time", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            style: { fontSize: "12px" },
          })
        } else  if(dayArray[0] == data?.dayselected) {
          toast.error("Selected date and move date are same", {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
            style: { fontSize: "12px" },
          })
        } else {   
          const payload = {
            session_ids:recordSelected,
            current_day:dayArray[0],
            expected_day:data?.dayselected
          }
          moveSessionData({token,payload})
        }
      }
      if(data?.singleViewAction == 2)
      {      
        const payload = {
          session_ids:recordSelected
        }
        deleteSessionBulk({token,payload})
      }
    }
  }
  useEffect(() => {
    if (moveSuccess) {
      toast.success("Moved successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      setTimeout(()=>{
        window.location.reload();
      },3000)
    } else if (moveError) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [moveSuccess, moveError]);
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      setTimeout(()=>{
        window.location.reload();
      },3000)
    } else if (deleteError) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [deleteSuccess, deleteError]);
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
              {dayWiseData?.Monday.map((p)=>{
                
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md"  key={p.session_id}>
                <div className="flex items-center gap-1">
                  <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,1)}></Checkbox>
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
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md" key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,2)}></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
              </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Wednesday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md"  key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,3)}></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Thursday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md"  key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,4)}></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
              </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Friday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md"  key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,5)}></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
            </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Saturday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md"  key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,6)}></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
              </>
          </div>
          <div className="border border-t-0 text-center py-1">
            <>
              {dayWiseData?.Sunday.map((p)=>{
                return (                
                <div className="bg-cyan-200 m-2 px-1 py-1 rounded-md"  key={p.session_id}>
                    <div className="flex items-center gap-1">
                      <Checkbox value={p.session_id} onClick={()=>updateSelected(p.session_id,7)}></Checkbox>
                      <p className="text-[13px]">
                        <span className=" font-normal ">{dateDisplay(p.scheduled_date)}</span> {p.start_time.toUpperCase()}
                      </p>
                      <MdDeleteOutline
                        onClick={handleClickOpen}
                        className="text-rose-500"
                      />
                    </div>
                </div>
              )}) }
              </>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <select
            {...register("singleViewAction")}
            className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
            onChange={(e)=>(e.target.value == 1 ? setDayListOpen(true) : setDayListOpen(false))}
          >
            <option value=""> Select Any Action </option>
            <option value="1"> Move to </option>
            <option value="2"> Bulk Delete </option>
          </select>
        </div>
        {dayListOpen && (
        <div>
          <select
            {...register("dayselected")}
            className="input-border text-gray-600 rounded-sm text-[14px] font-medium w-full ml-1 focus:outline-none"
          >
          <option value="1"> Monday </option>
          <option value="2"> Tuesday </option>
          <option value="3"> Wednesday </option>
          <option value="4"> Thursday </option>
          <option value="5"> Friday </option>
          <option value="6"> Saturday </option>
          <option value="7"> Sunday </option>
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

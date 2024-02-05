/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { getAccessToken } from "@/Redux/api/apiSlice";
import CustomModal from "@/component/UI/Appointment/calenderView/CustomModal";
import { useGetCalendarEventApiQuery } from "@/Redux/features/Appointment/Calendar/CalendarApi";
import moment from "moment";

const calenderView = () => {
  const tooltipRef = useRef(null);
  const token = getAccessToken();
  const calendarRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const [eventId, setEventId] = useState();
  const [startdate, setStartDate] = useState("");
  const [enddate, setendDate] = useState("");
  const [dynamicID, setdynamicId] = useState("");
  const [filter, setFilter] = useState(false);

  // hovering data show all funch

  const handleClose = () => {
    setOpen(false);
  };

  const handleDatesSet = (arg) => {
    // console.log("data of hovered event", arg.view);
    // const viewStartDate = new Date(arg.view.currentStart);
    // const viewEndDate = new Date(arg.view.currentEnd);

    // const start = Math.floor(viewStartDate?.getTime() / 1000);
    // const end = Math.floor(viewEndDate?.getTime() / 1000);

    // console.log("View Start Date:", viewStartDate);
    // console.log("View End Date:", viewEndDate);

    const calendarApi = arg?.view?.calendar;
    const view = calendarApi?.view;

    let start = new Date(view?.activeStart);
    // const startmin = Math.floor(start.getTime() / 1000);
    let end = new Date(view?.activeEnd);
    // const endmin = Math.floor(end.getTime() / 1000);

    // calculated in milli second format
    //     const date = moment(dateString);

    // const formattedDate = date.format('YYYY-MM-DD');
    setStartDate(moment(start).format("YYYY-MM-DD"));
    setendDate(moment(end).format("YYYY-MM-DD"));
    // console.log("View Start Date:", moment(start).format("YYYY-MM-DD"));
    // console.log("View End Date:", moment(end).format("YYYY-MM-DD"));

    // You can perform additional actions or render the view start and end dates as needed

    // let start = moment(view?.activeStart);
    // let end = moment(view?.activeEnd);

    // console.log("View Start Date:", start.format());
    // console.log("View End Date (GMT+3):", end.format());

    // const usTimeZone = "America/New_York";
    // const usStandardEnd = end.tz(usTimeZone).format();

    // console.log("View End Date (US Standard Time):", usStandardEnd);
    // console.log("mili secound", Math.floor(usStandardEnd / 1000));
  };

  // const calander event api call
  // console.log("startdate and enddate  ", startdate, enddate);

  const {
    isLoading,
    data: calenderEvents,
    isSuccess,
    refetch,
  } = useGetCalendarEventApiQuery({
    token,
    payload: {
      page: 1,
      // start_data: "2023-05-01",
      // end_date: "2023-05-31",
      start_data: startdate,
      end_date: enddate,
    },
  });

  // for showing clicked event details basedon id using same CustomModal.jsx
  const showEventDetails = (id) => {
    // console.log("Clicked event id", id);
    setEventId(id);
    setSelectedDate();
    setOpen(!open);
  };

  // FOr hovering
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const handleEventHover = (event) => {
    // console.log("data of hovered event", event.event.title);
    setHoveredEvent(event.event);
  };

  const handleEventLeave = () => {
    setHoveredEvent(null);
  };
  //-------------------------------Showing month date(auto) -------------------

  // console.log("api data rtk", calenderEvents);
  const modifyDatamap = calenderEvents?.data?.data.map((item) => {
    const title = `${item?.app_patient?.client_first_name} : ${item?.app_provider?.first_name}`;
    const start = item?.from_time;
    const end = item?.to_time;
    const id = item?.id;
    return {
      title,
      color: "#089BAB",
      display: "background-inverse",
      end,
      start,
      id,
      textColor: "white",
    };
  });

  // For creating new event
  const createEvent = (selectInfo) => {
    // console.log(selectInfo);
    setOpen(!open);
    setSelectedDate(selectInfo?.startStr);
    if (eventId) {
      setEventId(null);
    }
    // // const event = {
    // //   id: 1, // You must use a custom id generator
    // //   title: "new Event",
    // //   // start: startDate,
    // //   // allDay: endDate ? endDate : true, // If there's no end date, the event will be all day of start date
    // //   start: "2022-10-21T15:30:00", // a property!
    // //   end: "2022-10-21T18:00:00",
    // //   color: "black",
    // //   display: "background-inverse",
    // let title = prompt("Enter a title: ");
    // let time1 = prompt("Enter time1: ");
    // let time2 = prompt("Enter time2: ");
    // let startDate = selectInfo?.startStr;
    // let calendarApi = selectInfo.view.calendar;
    // console.log(calendarApi);
    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     title,
    //     color: "teal",
    //     display: "background-inverse",
    //     start: startDate + time1,
    //     end: startDate + time2,
    //     //allDay: selectInfo.allDay,
    //   });
    // }

    //Events.push(event);
  };
  return (
    <div>
      {" "}
      <div>
        <div className="flex items-center flex-wrap md:justify-between pb-4">
          <h1 className="text-lg my-2 text-orange-500">Manage Appointment</h1>
          <div className="flex items-center justify-end">
            <button className="py-[5px] px-3 text-[12px] font-normal bg-gradient-to-r from-red-700 to-red-400 hover:to-red-700 text-white rounded-sm">
              Filter
            </button>
            <Link href={"/admin"}>
              {/* <Image
                src={googleCalendar}
                alt="Google Calendar"
                style={{ width: "32px" }}
              /> */}
              rtrtr
            </Link>
            <button className=" py-[5px] font-normal px-3 mr-1 text-[12px]  bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-sm">
              Print
            </button>
          </div>
        </div>
        <div className="border border-[#089bab] rounded-2xl p-2">
          {/* {hoveredEvent && (
          <EventDetails className="event-wrapper" event={hoveredEvent} />
        )} */}

          {/* {hoveredEvent && <EventDetails event={hoveredEvent} />} */}
          {open ? (
            <CustomModal
              selectedDate={selectedDate}
              handleClose={handleClose}
              clicked={open}
              eventId={dynamicID ? dynamicID : null}
              refetch={refetch}
              event={hoveredEvent}
            ></CustomModal>
          ) : null}

          <FullCalendar
            ref={calendarRef}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prevYear,prev,next,nextYear today",
              center: "title",
              right: "timeGridDay,timeGridWeek,dayGridMonth",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // events={calenderEvents?.events}
            // events={Events}
            events={modifyDatamap}
            // initialEvents={allData}
            // initialEvents={modifyDatamap}
            editable={false}
            selectable={true}
            select={createEvent}
            eventClick={(arg) => {
              // console.log(arg.event.extendedProps._id);
              showEventDetails(arg.event.extendedProps._id); //jei event a click korbo tar id showEvent func a pass[callback method]
            }}
            // eventClick={()=>showEvent(arg)}
            displayEventTime={true}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            // For showing the calender month and date (autometically)(format 30 days(1-01-2023 to 31-01-2023))
            datesSet={handleDatesSet}
            // editable={false}
            // droppable={false}
            // for hovering
            // eventContent={(info) => {
            //   return (
            //     <div
            //       onMouseEnter={() => handleEventHover(info)}
            //       onMouseLeave={handleEventLeave}
            //     >
            //       {info.event.title}
            //     </div>
            //   );
            // }}
            // eventMouseEnter={handleEventHover}
            // eventMouseLeave={handleEventLeave}
            //
            // eventMouseEnter={handleEventMouseEnter}
            // eventMouseLeave={handleEventMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default calenderView;
calenderView.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

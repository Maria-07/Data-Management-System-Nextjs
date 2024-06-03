import { useRef, useState, useEffect } from "react";
import RootLayout from "@/component/Layouts/RootLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Calendar, Select, Switch } from "antd"; // Ensure you have `antd` installed
import dayjs from "dayjs"; // Ensure you have `dayjs` installed
import CustomModal from "@/component/UI/Appointment/calenderView/CustomModal";
import { useGetCalendarEventApiQuery } from "@/Redux/features/Appointment/Calendar/CalendarApi";
import { getAccessToken } from "@/Redux/api/apiSlice";
import Clients from "@/component/UI/Appointment/MultiSelectComponents/Clients";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

// A custom render function for event content
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const CalendarView = () => {
  const [resourceStatus, setResourceStatus] = useState(false);
  const [selectedValue, setSelectedValue] = useState(dayjs("2017-01-25"));
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [dynamicID, setDynamicId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [filter, setFilter] = useState(true);
  const [availability, setAvailability] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setValue(value);
  };

  const items2 = ["JavaScript", "Python", "Java", "C++", "Ruby"];

  const token = getAccessToken();

  const onSelect = (newValue) => {
    const calendarApi = calendarRef.current?.getApi();
    setSelectedValue(newValue);
    if (calendarApi) {
      calendarApi.gotoDate(newValue.format("YYYY-MM-DD")); // Use the selected date to navigate to the date
      console.log("Navigated to:", newValue.format("YYYY-MM-DD"));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  //  !add Resources
  const resources = [
    { id: "a", title: "Room A" },
    { id: "b", title: "Room B" },
    { id: "c", title: "Room C" },
  ];

  // ! Selectable Date
  const handleSelect = (info) => {
    console.log("Selected range:", info.startStr, info.endStr);
    console.log(info);

    setOpen(!open);
    setSelectedDate(info?.startStr);
    setStartDate(info.startStr);
    setEndDate(info?.endDate);
  };

  //* api
  const {
    isLoading,
    data: calenderEvents,
    isSuccess,
    refetch,
  } = useGetCalendarEventApiQuery({
    token,
    payload: {
      page: 1,
      start_data: startDate,
      end_date: endDate,
    },
  });

  console.log("====================================");
  console.log(startDate);
  console.log("====================================");
  return (
    <div>
      <div className="flex sm:flex-nowrap flex-wrap gap-1">
        {filter && (
          <div className=" border-[1px] p-2 rounded-md">
            {!resourceStatus && (
              <div
                style={{
                  width: 325,
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                }}
              >
                <Calendar fullscreen={false} onSelect={onSelect} />
              </div>
            )}
            <div className="my-2">
              <div>
                <Switch
                  size="small"
                  onClick={() => {
                    setAvailability(!availability);
                  }}
                />
                <label
                  className="form-check-label inline-block font-medium ml-2 text-[12px] text-gray-600"
                  htmlFor="flesmwitchCheckDefault"
                >
                  Availability
                </label>
              </div>
              {!availability && (
                <div>
                  <Switch size="small" onClick={() => {}} />
                  <label
                    className="form-check-label inline-block font-medium ml-2 text-[12px] text-gray-600"
                    htmlFor="flesmwitchCheckDefault"
                  >
                    Include Non-Billable
                  </label>
                </div>
              )}
              {!availability ? (
                <div className="mx-1 my-3">
                  <h1 className="label py-1">
                    <span className="label-text font-semibold text-[14px] text-secondary text-left">
                      Patients
                    </span>
                  </h1>

                  <Clients
                    patients={[]}
                    theme={false}
                    setPatientId={123}
                  ></Clients>
                  <h1 className="label py-1">
                    <span className="label-text font-semibold text-[14px] text-secondary text-left">
                      Provider
                    </span>
                  </h1>

                  <Clients
                    patients={[]}
                    theme={false}
                    setPatientId={123}
                  ></Clients>
                  <h1 className="label py-1">
                    <span className="label-text font-semibold text-[14px] text-secondary text-left">
                      Service
                    </span>
                  </h1>

                  <Clients
                    patients={[]}
                    theme={false}
                    setPatientId={123}
                  ></Clients>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="mx-1 my-3">
                    <h1 className="label py-1">
                      <span className="label-text font-semibold text-[14px] text-secondary text-left">
                        Providers
                      </span>
                    </h1>

                    <Clients
                      patients={[]}
                      theme={false}
                      setPatientId={123}
                    ></Clients>
                    <h1 className="label py-1">
                      <span className="label-text font-semibold text-[14px] text-secondary text-left">
                        Slot Time
                      </span>
                    </h1>

                    <Select
                      style={{
                        width: "100%",
                      }}
                      size="small"
                      bordered={true}
                      onChange={onChange}
                      options={items2.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 mt-4">
                <button className=" border-secondary flex items-center border rounded-sm">
                  <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                    Go
                  </span>
                </button>
                <button
                  className=" border-rose-600 flex items-center border rounded-sm"
                  onClick={handleClose}
                >
                  <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full border-[1px] p-2 rounded-md">
          <div className="flex items-center justify-between  gap-2 flex-wrap">
            <h1 className="text-primary font-semibold">
              {" "}
              {!resourceStatus ? "Resource Timeline" : "Calendar View"}
            </h1>
            <div className="flex items-center justify-end mb-2 gap-2">
              {" "}
              <FaFilter
                onClick={() => setFilter(!filter)}
                className="text-xl text-rose-500"
              />
              <button
                onClick={() => setResourceStatus(!resourceStatus)}
                className="dcm-button"
              >
                {!resourceStatus ? "Resource Timeline" : "Calendar"}
              </button>
            </div>
          </div>

          {!resourceStatus ? (
            <FullCalendar
              ref={calendarRef}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                googleCalendarPlugin,
              ]}
              initialView="timeGridDay"
              weekends={true}
              googleCalendarApiKey={
                process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
              }
              events={{
                googleCalendarId: "shanjidamaria07@gmail.com",
                className: "gcal-event",
              }}
              eventContent={renderEventContent}
              headerToolbar={{
                start: "prevYear,prev,next,nextYear today",
                center: "title",
                right: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              droppable={true}
              selectable={true}
              select={handleSelect}
            />
          ) : (
            <>
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  googleCalendarPlugin,
                  resourceTimelinePlugin,
                ]}
                initialView="resourceTimeline"
                weekends={true}
                googleCalendarApiKey={
                  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
                }
                events={{
                  googleCalendarId: "shanjidamaria07@gmail.com", // Your Google Calendar ID
                  className: "gcal-event", // Example of an additional option
                }}
                eventContent={renderEventContent}
                headerToolbar={{
                  start: "prevYear,prev,next,nextYear today",
                  center: "title",
                  right:
                    "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
                }}
                resources={resources}
                droppable={true}
                DraggableEvents={true}
                selectable={true}
                select={handleSelect}
              />
            </>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default CalendarView;

CalendarView.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, Modal, Radio, Space, Switch, TimePicker } from "antd";
import {
  IoCloseCircleOutline,
  IoTrashOutline,
  IoChatboxEllipsesOutline,
  IoFileTrayFullOutline,
  IoCopyOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { getAccessToken } from "@/Redux/api/apiSlice";
import AddSessionNotes from "./CustomModalHelper/AddSessionNotes";
import CopyNotes from "./CustomModalHelper/CopyNotes";
import ViewNotes from "./CustomModalHelper/ViewNotes";
import MessegeShow from "./CustomModalHelper/MessegeShow";
import { useSingleAppointmentApiQuery } from "@/Redux/features/Appointment/Calendar/CalendarApi";

const CustomModal = ({
  selectedDate,
  handleClose,
  clicked,
  refetch,
  eventId,
}) => {
  // console.log("modal ----dynamicID", eventId);
  const token = getAccessToken();
  const [eventDetails, setEventDetails] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [fromtime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  const from_Time = (time, timeString) => {
    // console.log("From-Time", timeString);
    setFromTime(timeString);
  };

  const to_Time = (time, timeString) => {
    // console.log("To-Time", timeString);
    setToTime(timeString);
  };
  // console.log("after selecting time", fromtime, toTime);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //useSingleAppointmentApiQuery

  const [Auth, setAuth] = useState(true);
  const [open, setOpen] = useState(false);
  const [sessionopen, setSessionOpen] = useState(false);
  const [copy, setCopy] = useState(false);
  const [view, setView] = useState(false);
  const [messege, setMessege] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [opencalender, setOpencalender] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const month = date ? date.toLocaleString("en-us", { month: "long" }) : null;
  const currentDate = date ? date.getDate() : null;
  const year = date ? date.getFullYear() : null;
  const [billable, setBillable] = useState(true);
  const [therapy, setTherapy] = useState(true);
  const [recurrence, setRecurrence] = useState(false);
  const [option, setOption] = useState(false);
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const {
    data: singleData,
    isLoading: singledataLoading,
    isError,
  } = useSingleAppointmentApiQuery({
    token,
    payload: {
      appointment_id: eventId,
    },
  });

  // console.log("come single data fromt api--", singleData);

  const handleClearDate = () => {
    setOpen(false);
    setOpencalender(false);
    setDate(null);
    setSessionOpen(false);
    setCopy(false);
    setView(false);
    setMessege(false);
  };
  const handleCancelDate = () => {
    setOpen(false);
    setOpencalender(false);
    setDate(new Date());
    setSessionOpen(false);
    setCopy(false);
    setView(false);
    setMessege(false);
  };

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        check_date: date ? date.toLocaleDateString() : null,
      });
    }, 0);
    // }, [date.toLocaleDateString()]);
  }, [date, reset]);
  //id based event data get
  // useEffect(() => {
  //   const getEventDetails = async () => {
  //     try {
  //       const response = await axios({
  //         method: "get",
  //         url: `http://localhost:8800/api/scheduler/${eventId}`,
  //       });
  //       // const result = await res.json();
  //       const result = response;
  //       console.log(result?.data);
  //       setEventDetails(result?.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // If clicked of specific event in the calender then getEventDetails function will be called
  //   if (eventId) {
  //     getEventDetails();
  //   }
  // }, []);

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        // patient: eventDetails ? eventDetails?.patient : null,
        patient: singleData?.data?.app_patient?.client_full_name,
        provider: eventDetails ? eventDetails?.provider : null,
        auth: eventDetails ? eventDetails?.auth : "Cigna Authorization", //this is for dummy data
        // check_date: date ? date.toLocaleDateString() : null,
        from_date: selectedDate
          ? selectedDate
          : eventDetails?.start?.split("T")[0],
        from_time: eventDetails ? eventDetails?.start?.split("T")[1] : null,
        to_time: eventDetails ? eventDetails?.end?.split("T")[1] : null,
      });
    }, 0);
  }, [reset, selectedDate, eventDetails, eventDetails?.patient]);

  const onSubmit = (data) => {
    //console.log(data);
    const title = "Jo Co: Fa Aa";
    const color = "#FEE9A6";
    const display = "background-inverse";
    const start = data?.from_date + "T" + data?.from_time;
    const end = data?.from_date + "T" + data?.to_time;
    //console.log(start, end);
    const final = { title, ...data, start, end, color, display };
    // console.log(JSON.stringify(final));
    // if (final && !eventId) {
    //   //sending product to DB through API

    //   // axios POST request
    //   const options = {
    //     url: "http://localhost:8800/api/scheduler/",
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //     },
    //     data: final,
    //   };

    //   axios(options).then((response) => {
    //     console.log(response);

    //     if (response?.status === 200) {
    //       console.log("SUCCESS");
    //       refetch();
    //       handleClose();
    //     }
    //   });
    // }
    // reset();
  };
  return (
    <div>
      <Modal
        open={clicked} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={600}
        closable={false}
        className="box rounded-xl"
        // onClose={handleClose}
        // aria-labelledby="responsive-dialog-title"
      >
        <div className="px-0 py-2 font-[poppins,sans-serif]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              Edit Appointment
            </h1>

            <div className="flex items-center gap-2">
              <div>
                <Switch
                  size="small"
                  onClick={() => {
                    setAuth(!Auth);
                  }}
                />
                <label
                  className="form-check-label inline-block font-medium ml-2 text-[12px] text-gray-600"
                  htmlFor="flesmwitchCheckDefault"
                >
                  No Auth
                </label>
              </div>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-[500px] overflow-y-scroll px-1 py-2"
          >
            <div className=" ">
              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-5 mr-2 gap-2 md:gap-2">
                <label className="label">
                  <span className="modal-label-name">Add Type</span>
                </label>
                <div className="col-span-2 ml-1 mb-1">
                  <Switch
                    disabled={Auth}
                    defaultChecked
                    size="small"
                    onClick={() => {
                      setBillable(!billable);
                      reset();
                    }}
                  />
                  <label
                    className="form-check-label inline-block font-medium ml-2 text-[12px] text-gray-600"
                    htmlFor="flesmwitchCheckDefault"
                  >
                    {billable ? "Billable" : "Non-Billable"}
                  </label>
                  <Switch
                    disabled={Auth}
                    className="ml-5"
                    defaultChecked
                    size="small"
                    onClick={() => {
                      setTherapy(!therapy);
                      reset();
                    }}
                  />
                  <div
                    className="form-check-label  inline-block font-medium ml-2 text-[12px] text-gray-600"
                    htmlFor="flesmwitchCheckDefault"
                  >
                    {therapy ? "Individual Therapy" : "Group Therapy"}
                  </div>
                </div>
                <label className="label">
                  <span className="modal-label-name">Patient Name</span>
                </label>
                <select
                  className="modal-input-field col-span-2"
                  {...register("patient")}
                >
                  <option value="">Select</option>
                  <option value="Mr.Anik chowdhary">Mr.Anik chowdhary</option>
                  <option value="Duck duck">Duck duck</option>
                  <option value="Ashni Soni">Ashni Soni</option>
                </select>
                {!Auth && (
                  <label className="label">
                    <span className="modal-label-name">Active Auth</span>
                  </label>
                )}
                {!Auth && (
                  <select
                    className="modal-input-field col-span-2"
                    {...register("auth")}
                  >
                    <option value="">Select</option>
                    <option value="Cigna Authorization">
                      Cigna Authorization
                    </option>
                    <option value="Baffa Authorization">
                      Baffa Authorization
                    </option>
                  </select>
                )}
                {Auth && (
                  <label className="label">
                    <span className="modal-label-name">Treatment</span>
                  </label>
                )}
                {Auth && (
                  <select
                    className="modal-input-field col-span-2"
                    {...register("treatment")}
                  >
                    <option value="">Select</option>
                    <option value="Cigna Authorization">
                      Cigna Authorization
                    </option>
                    <option value="Baffa Authorization">
                      Baffa Authorization
                    </option>
                  </select>
                )}
                <label className="label">
                  <span className="modal-label-name">Service</span>
                </label>
                <select
                  className="modal-input-field col-span-2"
                  {...register("auth")}
                >
                  <option value="">Select</option>
                  <option value="Cigna Authorization">
                    Cigna Authorization
                  </option>
                  <option value="Baffa Authorization">
                    Baffa Authorization
                  </option>
                </select>
                <label className="label">
                  <span className="modal-label-name">Provider Name</span>
                </label>
                <select
                  className="modal-input-field col-span-2"
                  {...register("provider")}
                >
                  <option value="">Select</option>
                  <option value="ashni soni">ashni soni</option>
                  <option value="Max Auto">Max Auto</option>
                  <option value="Gomex twin">Gomex twin</option>
                </select>
                <label className="label">
                  <span className="modal-label-name">From Date</span>
                </label>
                {/* <input
               className="modal-input-field col-span-2"
               type="date"
               disabled="disabled"
               {...register("from_date")}
             /> */}
                <input
                  name="from_time"
                  // readOnly
                  // onClick={() => setOpencalender(!opencalender)}
                  // value={date ? date.toLocaleDateString() : "Select a Date"}
                  className="col-span-2 modal-input-field ml-1 w-full px-2"
                  defaultValue={selectedDate}
                  {...register("from_time")}
                />

                {/* Custom Calender End */}

                <label className="label">
                  <span className="modal-label-name">From Time</span>
                </label>
                <div className="flex items-center gap-2 col-span-2">
                  <input
                    className="modal-input-field "
                    type="time"
                    {...register("from_time")}
                  />

                  <label className="label">
                    <span className="modal-label-name">To</span>
                  </label>
                  <input
                    className="modal-input-field "
                    type="time"
                    {...register("to_time")}
                  />
                </div>

                <label className="label">
                  <span className="modal-label-name">Status</span>
                </label>
                <select
                  className="modal-input-field col-span-2"
                  {...register("provider")}
                >
                  <option value="">Select</option>
                  <option value="ashni soni">ashni soni</option>
                  <option value="Max Auto">Max Auto</option>
                  <option value="Gomex twin">Gomex twin</option>
                </select>
              </div>

              <div className=" flex flex-wrap gap-1 items-center justify-between mt-2">
                <button
                  className="pms-button  mr-2"
                  onClick={() => setSessionOpen(!sessionopen)}
                >
                  <IoFileTrayFullOutline className="inline text-xl mr-1" /> Add
                  Session Notes
                </button>
                {sessionopen && (
                  <AddSessionNotes
                    sessionopen={sessionopen}
                    setSessionOpen={setSessionOpen}
                  ></AddSessionNotes>
                )}

                <button
                  className=" pms-button  mr-2"
                  onClick={() => setCopy(!copy)}
                >
                  <IoCopyOutline className="inline text-xl mr-1" />
                  Copy Notes
                </button>
                {copy && <CopyNotes copy={copy} setCopy={setCopy}></CopyNotes>}

                <button
                  className=" pms-button  mr-2"
                  onClick={() => setView(!view)}
                >
                  <IoEyeOutline className="inline text-xl mr-1" />
                  view notes
                </button>

                {view && <ViewNotes view={view} setView={setView}></ViewNotes>}

                <button>
                  {" "}
                  <IoChatboxEllipsesOutline
                    className="text-gray-600 text-2xl hover:text-primary"
                    onClick={() => setMessege(!messege)}
                  />
                </button>

                {messege && (
                  <MessegeShow
                    messege={messege}
                    setMessege={setMessege}
                  ></MessegeShow>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-5 mr-2 gap-1">
                <div className="">
                  <Switch
                    size="small"
                    onClick={() => {
                      setRecurrence(!recurrence);
                    }}
                  />
                  <label
                    className="modal-label-name ml-2"
                    htmlFor="flesmwitchCheckDefault"
                  >
                    Recurrence Pattern?
                  </label>
                </div>

                {recurrence && (
                  <div className="">
                    <div>
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio value={1}>
                            <div className="flex items-center gap-2">
                              <p>till</p>
                              <input
                                className="px-2 modal-input-field ml-1 w-full"
                                type="date"
                                {...register("check_Date")}
                              />
                            </div>
                          </Radio>
                          <Radio value={2}>
                            <div className="flex items-center gap-2">
                              <p>After</p>
                              <div className="flex items-center ">
                                {" "}
                                <input
                                  className="px-1 border py-1 ml-1 w-[50px]"
                                  type="number"
                                  {...register("check_Date")}
                                />
                                <button
                                  className="text-sm bg-primary text-white px-2 py-[5px]"
                                  type="button"
                                >
                                  Occurrences
                                </button>
                              </div>
                            </div>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                )}
              </div>
              <div className="">
                <Switch
                  size="small"
                  onClick={() => {
                    setOption(!option);
                  }}
                />
                <label
                  className="modal-label-name ml-2"
                  htmlFor="flesmwitchCheckDefault"
                >
                  Options
                </label>
              </div>
              {option && (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-5 mr-2 gap-3">
                  <div>
                    <p className=" font-semibold">Repeat Every</p>
                  </div>

                  <input
                    className="modal-input-field "
                    type="number"
                    {...register("to_time")}
                  />

                  <select
                    className=" modal-input-field ml-1 w-full"
                    {...register("provider_id")}
                  >
                    <option value="0">Day</option>
                    <option value="1">Week</option>
                    <option value="2">Month</option>
                  </select>
                  <div>
                    <p className=" font-semibold">Repeat On</p>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <button className="py-2 px-[15px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      S
                    </button>
                    <button className="py-2 px-[12px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      M
                    </button>
                    <button className="py-2 px-[15px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      T
                    </button>
                    <button className="py-2 px-[12px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      W
                    </button>
                    <button className="py-2 px-[15px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      T
                    </button>
                    <button className="py-2 px-[15px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      F
                    </button>
                    <button className="py-2 px-[15px] font-medium text-sm hover:text-white hover:bg-secondary border-primary transition-all rounded-full border">
                      S
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 
            <div>
              <div>
                <button
                  onClick={toggleForm}
                  className="flex items-center justify-center  text-gray-600  rounded-full w-10 h-10"
                >
                  {showForm ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </button>
            */}

            {/*  
                {showForm && (
                  <div className="mt-4 p-4 border-2 rounded-md ">
                    //   form content goes here 
                    <form>
                      <label className="label">
                        <span className="modal-label-name">
                          Replacement Provider
                        </span>
                      </label>
                      <select
                        className="border border-gray-300 col-span-2 rounded-sm px-2 py-1 mx-1 text-[12px] w-full"
                        {...register("provider")}
                      >
                        <option value="">Select</option>
                        <option value="ashni soni">as  hni soni</option>
                        <option value="Max Auto">Max Auto</option>
                        <option value="Gomex twin">Gomex twin</option>
                      </select>

                      <div className="grid col-span-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-2 pl-1 gap-1">
                        <div>
                          <label className="label">
                            <span className="modal-label-name">
                              Break Form Time
                            </span>
                          </label>
                          <TimePicker
                            className="modal-input-field"
                            use12Hours
                            format="h:mm A"
                            onChange={from_Time}
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="modal-label-name">
                              Break To Time
                            </span>
                          </label>

                          <TimePicker
                            className="modal-input-field"
                            use12Hours
                            format="h:mm A"
                            onChange={to_Time}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  )}
                </div>
              </div> 
            */}

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2">
              <button className="dcm-button mr-2" type="submit">
                Add Appointment
              </button>

              <button className="dcm-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;

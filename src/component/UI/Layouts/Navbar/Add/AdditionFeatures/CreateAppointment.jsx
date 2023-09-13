import { useState } from "react";
import CreateAppointmentAvailability from "./CreateAppointmentAvailability/CreateAppointmentAvailability";
import { Modal, Switch, TimePicker } from "antd";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const CreateAppointment = ({ handleClose, clicked }) => {
  // console.log(handleClose, clicked);
  const [billable, setBillable] = useState(true);
  const [recurrence, setRecurrence] = useState(false);
  const [daily, setDaily] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();
  const [clientId, setClientId] = useState(0);
  const [authId, setAuthId] = useState(0);
  const [fromtime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  // For Non-billable appointment create=>provider select
  const [seletedProvider, setSelectedProvider] = useState([]);
  console.log("Billable", billable);

  // Appointment Availability
  const [availability, setAvailability] = useState(false);
  const availabilityHandler = () => {
    setAvailability(true);
  };
  const availabilityHandleClose = () => {
    setAvailability(false);
  };

  const from_Time = (time, timeString) => {
    console.log("From-Time", timeString);
    setFromTime(timeString);
  };

  const to_Time = (time, timeString) => {
    console.log("To-Time", timeString);
    setToTime(timeString);
  };
  console.log("after selecting time", fromtime, toTime);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // // testing single calendar
  // const [date, setDate] = useState(new Date());
  // const [openCalendar, setOpenCalendar] = useState(false);
  // const changeDate = (date) => {
  //   setDate(date);
  // };
  // console.log(date);

  // const month = date ? date.getMonth() + 1 : null;
  // const day = date ? date.getDate() : null;
  // const year = date ? date.getFullYear() : null;

  // const handleCancelDate = () => {
  //   // setOpenCalendar(false);
  //   setDate(null);
  // };
  const month = date ? date.toLocaleString("en-us", { month: "long" }) : null;
  const currentDate = date ? date.getDate() : null;
  const year = date ? date.getFullYear() : null;

  const handleClearDate = () => {
    setOpen(false);
    setDate(null);
  };
  const handleCancelDate = () => {
    setOpen(false);
    setDate(new Date());
  };

  // useEffect(() => {
  //   // you can do async server request and fill up form
  //   setTimeout(() => {
  //     reset({
  //       check_date: date ? date.toLocaleDateString() : null,
  //     });
  //   }, 0);
  //   // }, [date.toLocaleDateString()]);
  // }, [date, reset]);

  const onSubmit = (data) => {
    // if (billable) {
    //   const payload = {
    //     billable: BoolConverter(billable),
    //     ...data,
    //     form_time_session: fromtime,
    //     to_time_session: toTime,
    //   };
    //   if (payload) {
    //     appointmentCreate({
    //       token,
    //       payload,
    //     });
    //   }
    //   console.log("for billable payload", payload);
    // } else {
    //   const payload = {
    //     billable: BoolConverter(billable),
    //     ...data,
    //     client_id: 1,
    //     authorization_id: 1,
    //     provider_mul_id: seletedProvider,
    //     form_time_session: fromtime,
    //     to_time_session: toTime,
    //   };
    //   if (seletedProvider?.length > 0) {
    //     appointmentCreate({
    //       token,
    //       payload,
    //     });
    //   }
    //   console.log("for Non-billable payload", payload);
    // }
    // // reset();
  };
  // To Show Success Or Error Message
  // useEffect(() => {
  //   if (creationData?.status === "success") {
  //     toast.success(<h1>Successfully Appoinment Created</h1>, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //     handleClose();
  //   } else if (creationData?.status === "error") {
  //     toast.error(<h1 className="text-center">{creationData?.message}</h1>, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //   }
  // }, [creationData?.status]);

  return (
    <div>
      <Modal
        open={clicked} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={525}
        closable={false}
        className="box rounded-xl"
        // onClose={handleClose}
        // aria-labelledby="responsive-dialog-title"
      >
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              Add Appointment
            </h1>

            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>
          <div className="h-4 py-1">
            {/* {authorizationActivityLoading || patientAuthLoading ? (
              <>
                <progress className="progress w-full bg-secondary h-[3px]"></progress>
              </>
            ) : (
              <div className="bg-gray-200 py-[1.5px] mt-3"></div>
            )} */}
            <div className="bg-gray-200 py-[1.5px] mt-3"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-5 mr-2 gap-1 md:gap-2">
              <span className="modal-label-name ml-1 mb-2">App Type</span>
              <div className="col-span-2 ml-1">
                <Switch
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
              </div>
              <label className="label">
                <span className="modal-label-name">Patient Name</span>
              </label>

              <select
                // disabled={patientsNameLoading || !billable ? true : false}
                className="col-span-2 input-border-modal ml-1 w-full"
                {...register("client_id")}
                onChange={(e) => setClientId(e.target.value)}
              >
                {!billable ? (
                  <option disabled value={1}>
                    Non-Billable Client
                  </option>
                ) : (
                  <>
                    <option value="0">Select Patient</option>
                    {/* {patientsName?.claims?.map((patient) => {
                      return (
                        <option key={patient?.id} value={patient?.id}>
                          {patient?.client_full_name}
                        </option>
                      );
                    })} */}
                  </>
                )}
              </select>
              <label className="label">
                <span className="modal-label-name">Auth</span>
              </label>
              <select
                // disabled={
                //   patientAuthLoading || patientAuthError || !billable
                //     ? true
                //     : false
                // }
                className="col-span-2 input-border-modal ml-1 w-full"
                {...register("authorization_id")}
                onChange={(e) => setAuthId(e.target.value)}
              >
                {!billable ? (
                  <option disabled value={1}>
                    NONCLI01323_AUTH249
                  </option>
                ) : (
                  <>
                    <option value="0">Select Auth</option>
                    {/* {patientAuthData?.claims?.map((auth) => {
                      return (
                        <option key={auth?.id} value={auth?.id}>
                          {auth?.description +
                            `(${
                              auth?.onset_date +
                              " " +
                              "to" +
                              " " +
                              auth?.end_date
                            })` +
                            " " +
                            "|" +
                            " " +
                            auth?.authorization_number}
                        </option>
                      );
                    })} */}
                  </>
                )}
              </select>
              <label className="label">
                <span className="modal-label-name">Service</span>
              </label>
              <select
                // disabled={
                //   authorizationActivityLoading || authorizationActivityError
                //     ? true
                //     : false
                // }
                className="col-span-2 input-border-modal ml-1 w-full"
                {...register("activity_id")}
              >
                {!billable ? (
                  <>
                    <option value={1}>Regular Time</option>
                    <option value={2}>Training & Admin</option>
                    <option value={3}>Fill-In</option>
                    <option value={4}>Other</option>
                    <option value={5}>Public Holiday</option>
                    <option value={6}>Paid Time Off</option>
                    <option value={7}>Unpaid</option>
                  </>
                ) : (
                  <>
                    <option value="0">Select Activity</option>
                    {/* {authorizationActivityData?.claims?.map((activity) => {
                      return (
                        <option key={activity?.id} value={activity?.id}>
                          {activity?.activity_name}
                        </option>
                      );
                    })} */}
                  </>
                )}
              </select>
              <label className="label">
                <span className="modal-label-name">Provider Name</span>
              </label>
              {billable ? (
                <div className="col-span-2 flex item-center">
                  <select
                    className=" input-border-modal ml-1 w-2/3"
                    {...register("provider_id")}
                  >
                    <option value="0">Select Provider</option>
                    {/* {providersName?.claims?.map((provider) => {
                      return (
                        <option key={provider?.id} value={provider?.id}>
                          {provider?.full_name}
                        </option>
                      );
                    })} */}
                  </select>
                  <button
                    type="button"
                    onClick={() => availabilityHandler()}
                    className="dcm-input-button ml-2"
                  >
                    Availability
                  </button>
                </div>
              ) : (
                // Non-billable Appointment creation part provider multi select
                <div className="col-span-2 ml-1">
                  {/* <ProviderMultiSelect
                    providers={providersName?.claims}
                    seletedProvider={seletedProvider}
                    setSelectedProvider={setSelectedProvider}
                  /> */}
                </div>
              )}
              <label className="label">
                <span className="modal-label-name">POS</span>
              </label>
              <select
                className="col-span-2 input-border-modal ml-1 w-full"
                {...register("location")}
              >
                <option value="0">Select Location</option>
                {/* {posData?.pos?.map((p) => {
                  return (
                    <option key={p?.id} value={p?.pos_code}>
                      {p?.pos_name}
                    </option>
                  );
                })} */}
              </select>
              {/* calender */}
              <label className="label">
                <span className="modal-label-name">From Date</span>
              </label>
              <input
                name="from_time"
                readOnly
                onClick={() => setOpen(!open)}
                value={date ? date.toLocaleDateString() : "Select a Date"}
                className="col-span-2 input-border-modal ml-1 w-full px-2"
                {...register("from_time")}
              />

              {open && (
                <Modal
                  open={open}
                  centered
                  footer={null}
                  closable={false}
                  bodyStyle={{
                    padding: "0px",
                  }}
                >
                  <div className="grid grid-cols-3">
                    {date ? (
                      <div className="bg-[#0AA7B8] bold text-white col-span-1 rounded-l-[5px]">
                        <div className="w-full h-16 flex justify-center items-center bg-[#0AA7B8] backdrop-blur-xl rounded drop-shadow-lg">
                          <span className="text-xl">{days[date.getDay()]}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <h1 className="text-8xl font-medium">
                            {currentDate}
                          </h1>
                          <h1 className="text-xl font-medium">{month}</h1>
                        </div>
                        <div className="flex justify-center items-end">
                          <h1 className="text-4xl font-medium mt-4">{year}</h1>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#0AA7B8] text-white font-bold rounded-l-[5px]">
                        <div className="w-full h-16 bg-[#0AA7B8] backdrop-blur-xl rounded drop-shadow-lg"></div>
                        <div className="text-center m-1 pt-8">
                          <h1 className="text-3xl">Please Select a Date</h1>
                        </div>
                      </div>
                    )}
                    {/* single calendar */}
                    {/* <div className="col-span-2 w-[95%] my-0 mx-auto">
                      <Calendar onChange={setDate} value={date} />
                      <div className="flex justify-between rounded-b-[5px] bg-white py-1 rounded-br-[5px]">
                        <button
                          onClick={() => handleClearDate()}
                          className="text-[12px] text-red-400 hover:bg-black hover:text-white p-2 rounded"
                        >
                          CLEAR
                        </button>
                        <div>
                          <button
                            onClick={() => handleCancelDate()}
                            className="text-[12px] text-[#0AA7B8] hover:bg-black hover:text-white p-2 rounded"
                          >
                            CANCEL
                          </button>
                          <button
                            onClick={() => setOpen(false)}
                            className="text-[12px] ml-2 text-[#0AA7B8] hover:bg-teal-500 hover:text-white p-2 rounded"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </Modal>
              )}
              {/* Custom Calender End */}
              {/* <label className="label">
                <span className="modal-label-name">
                  From Date
                </span>
              </label>
              <input
                className="border border-gray-300 col-span-2 rounded-sm px-2 py-[2px] mx-1 text-[12px] w-full"
                type="date"
                {...register("check_Date")}
              /> */}
              <label className="label">
                <span className="modal-label-name">From Time</span>
              </label>
              <div className="grid col-span-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 pl-1 gap-1">
                <TimePicker
                  className="input-border-modal"
                  use12Hours
                  format="h:mm A"
                  onChange={from_Time}
                />
                <div className="modal-label-name mt-2 mx-auto">To Time</div>
                <TimePicker
                  className="input-border-modal"
                  use12Hours
                  format="h:mm A"
                  onChange={to_Time}
                />
              </div>
              <label className="label">
                <span className="modal-label-name">Status</span>
              </label>
              <select
                className="col-span-2 input-border-modal ml-1 w-full"
                {...register("status")}
              >
                <option value="0">Select</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Hold">Hold</option>
                <option value="Cancelled by Client">Cancelled by Client</option>
                <option value="CC more than 24 hrs">CC more than 24 hrs</option>
                <option value="CC less than 24 hrs">CC less than 24 hrs</option>
                <option value="Cancelled by Provider">
                  Cancelled by Provider
                </option>
                <option value="Rendered">Rendered</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-5  mr-2 gap-1">
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
              <div>
                {recurrence && (
                  <input
                    className="px-2 input-border-modal ml-1 w-full"
                    type="date"
                    {...register("check_Date")}
                  />
                )}
              </div>
              {recurrence && (
                <>
                  <div>
                    <Switch
                      size="small"
                      onClick={() => {
                        setDaily(!daily);
                      }}
                    />
                    <label
                      className="modal-label-name ml-2 "
                      htmlFor="flesmwitchCheckDefault"
                    >
                      Daily
                    </label>
                  </div>
                  {daily && (
                    <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-1">
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          SU
                        </span>
                      </div>
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          MO
                        </span>
                      </div>
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          TU
                        </span>
                      </div>
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          WE
                        </span>
                      </div>
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          TH
                        </span>
                      </div>
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          FR
                        </span>
                      </div>
                      <div className="flex ml-1 mt-1 items-center">
                        <input
                          type="checkbox"
                          // checked={value ? true : false}
                          name="patient"
                          // onClick={() => {
                          //   setValue(!value);
                          // }}
                        />
                        <span className="text-[12px] ml-1 text-gray-600 font-normal">
                          SA
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

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
      {availability && (
        <CreateAppointmentAvailability
          handleClose={availabilityHandleClose}
          open={availability}
        ></CreateAppointmentAvailability>
      )}
    </div>
  );
};

export default CreateAppointment;

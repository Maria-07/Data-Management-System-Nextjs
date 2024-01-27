import { TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import Calendar from "react-calendar";
import { Modal } from "antd";
import moment from "moment";
import {
  useAppointmentInfoQuery,
  useGetAppointmentAuthorizationActivityMutation,
  useGetAppointmentPOSQuery,
  useGetAppointmentPatientAuthMutation,
  useGetAppointmentPatientNameQuery,
  useGetAppointmentProviderNameQuery,
} from "@/Redux/features/Appointment/appointmentApi";
import Loading from "@/component/UI/Layouts/Loading";

//To Convert Date YY/MM/DD(2022-10-21) to MM/DD/YY
const dateConverter = (date) => {
  const afterSplit = date?.split("-");
  console.log(afterSplit);
  if (afterSplit?.length > 0) {
    return `${afterSplit[1]}/${afterSplit[2]}/${afterSplit[0]}`;
  }
};

const timeConverter = (s) => {
  if (s) {
    const clone = s.slice(11, 22).split(":");
    console.log("clone", clone);
    return `${clone[0]}:${clone[1]}`;
  }
  return s;
};

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

//To Convert Date  (Pacific Standard Time) to MM-DD-YY
function stringDateConverter(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [mnth, day, date.getFullYear()].join("-");
}

const EditSession = ({ handleClose, openEdit, appointmentId }) => {
  console.log("managesession row id", appointmentId);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [fromtime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  console.log("selected date", stringDateConverter(date));
  const { register, handleSubmit, reset } = useForm();
  const [clientId, setClientId] = useState();
  const [authId, setAuthId] = useState(null);

  const { token } = useToken();

  //Appointment Get Info API
  const { data: appointmentInfo, isLoading: infoLoading } =
    useAppointmentInfoQuery({
      token,
      payload: {
        appointment_id: appointmentId,
      },
    });
  const {
    api_app_client,
    api_app_auth,
    authorization_id,
    authorization_activity_id,
    provider_id,
    location,
    status,
    schedule_date,
    from_time,
    to_time,
  } = appointmentInfo?.appointments || {};

  console.log("Patient Info", appointmentInfo?.appointments);
  let dateConverted = dateConverter(schedule_date);
  let TOtimeConverted = timeConverter(to_time);
  let timeConverted = timeConverter(from_time);

  console.log("timeConverted", timeConverted);
  console.log("TOtimeConverted", TOtimeConverted, "main time", to_time);
  console.log("timeConverted", timeConverted?.length);

  // useEffect(() => {
  //   if (from_time && from_Time.split("").length > 0) {
  //     let tp = timeConverter(from_Time);
  //     console.log("from_time", tp);
  //   }
  // }, []);

  useEffect(() => {
    if (dateConverted) {
      setDate(new Date(dateConverted));
    }
  }, [dateConverted]);

  //Setting default clientId
  useEffect(() => {
    setClientId(api_app_client?.id);
  }, [api_app_client?.id]);
  //Setting default authId
  useEffect(() => {
    setAuthId(authorization_id);
  }, [authorization_id]);

  //Appointment Get Patient Name Api
  const { data: patientsName, isLoading: patientsNameLoading } =
    useGetAppointmentPatientNameQuery(token);

  //Appointment Get Provider Name Api
  const { data: providersName, isLoading: providersNameLoading } =
    useGetAppointmentProviderNameQuery(token);

  //Appointment Get Patient Authorization/auth Api
  const [
    getAppointmentPatientAuth,
    {
      data: patientAuthData,
      isLaoding: patientAuthLoading,
      isError: patientAuthError,
    },
  ] = useGetAppointmentPatientAuthMutation();

  useEffect(() => {
    getAppointmentPatientAuth({
      token,
      payload: {
        client_id: clientId,
      },
    });
  }, [clientId, token, getAppointmentPatientAuth]);

  //Appointment Get Patient Authorization Activity/Service Api
  const [
    getAppointmentAuthorizationActivity,
    {
      data: authorizationActivityData,
      isLaoding: authorizationActivityLoading,
      isError: authorizationActivityError,
    },
  ] = useGetAppointmentAuthorizationActivityMutation();

  useEffect(() => {
    getAppointmentAuthorizationActivity({
      token,
      payload: {
        auth_id: authId,
      },
    });
  }, [authId, token, getAppointmentAuthorizationActivity]);

  //Appointment Pos get APi
  const { data: posData, isLoading: posDataLoading } =
    useGetAppointmentPOSQuery(token);

  //--------------interaction handler function-------------//
  const handleClientName = (e) => {
    setClientId(e.target.value);
    setAuthId(null);
  };

  const from_Time = (time, timeString) => {
    console.log("From-Time", timeString);
    setFromTime(timeString);
  };

  const to_Time = (time, timeString) => {
    console.log("To-Time", timeString);
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
  const month = date ? date.toLocaleString("en-us", { month: "long" }) : null;
  const currentDate = date ? date.getDate() : null;
  const year = date ? date.getFullYear() : null;

  const handleClearDate = () => {
    setOpen(false);
    setDate(null);
  };
  const handleCancelDate = () => {
    setOpen(false);
    // setDate(new Date());
  };

  //-------------React Form Hook----------------//
  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        // from_time: date?.toLocaleDateString(),
        client_id: api_app_client?.id,
        authorization_id: api_app_auth?.id,
        activity_id: authorization_activity_id,
        provider_id: provider_id,
        location: location,
        status: status,
      });
    }, 1000);
  }, [
    // date,
    reset,
    api_app_client?.id,
    api_app_auth?.id,
    authorization_activity_id,
    provider_id,
    location,
    status,
  ]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      from_date: stringDateConverter(date),
      // form_time_session: fromtime || timeConverted,
      form_time_session: fromtime ? fromtime : tConvert(timeConverted),
      // defaulttime: tConvert(timeConverted),

      // form_time_session: tConvert(timeConverted) || timeConverted,
      // timeSessionPost: toTime,
      // timeSessiondefault: TOtimeConverted,
      to_time_session: toTime ? toTime : tConvert(TOtimeConverted),
    };

    console.log(payload, tConvert(TOtimeConverted));
  };

  // const formtimeOne = (time: Dayjs, timeString: string) => {
  //   console.log(time, timeString);
  // };

  // if (timeConverted && timeConverted.length < 0) {
  //   return <Loading />;
  // }
  if (timeConverted && timeConverted.length < 0) {
    return <Loading />;
  }

  return (
    <div>
      <Modal
        open={openEdit} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box rounded-xl"
        // onClose={handleClose}
        // aria-labelledby="responsive-dialog-title"
      >
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              Edit Appointment
            </h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>

          <div className="h-4 py-1">
            {infoLoading ? (
              <>
                <progress className="progress w-full bg-secondary h-[3px]"></progress>
              </>
            ) : (
              <div className="bg-gray-200 py-[1.5px] mt-3"></div>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-5 mr-2 gap-1 md:gap-2">
              <label className="label">
                <span className="modal-label-name">Patient Name</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("client_id")}
                onChange={(e) => handleClientName(e)}
              >
                <option value="0">Select Patient</option>
                {patientsName?.claims?.map((patient) => {
                  return (
                    <option key={patient?.id} value={patient?.id}>
                      {patient?.client_full_name}
                    </option>
                  );
                })}
              </select>
              <label className="label">
                <span className="modal-label-name">Auth</span>
              </label>
              <select
                disabled={patientAuthLoading || patientAuthError ? true : false}
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("authorization_id")}
                onChange={(e) => setAuthId(e.target.value)}
              >
                <option value="0">Select Auth</option>
                {patientAuthData?.claims?.map((auth) => {
                  return (
                    <option key={auth?.id} value={auth?.id}>
                      {auth?.description +
                        `(${
                          auth?.onset_date + " " + "to" + " " + auth?.end_date
                        })` +
                        " " +
                        "|" +
                        " " +
                        auth?.authorization_number}
                    </option>
                  );
                })}
              </select>
              <label className="label">
                <span className="modal-label-name">Service</span>
              </label>
              <select
                disabled={
                  authorizationActivityLoading || authorizationActivityError
                    ? true
                    : false
                }
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("activity_id")}
              >
                <option value="0">Select Activity</option>
                {authorizationActivityData?.claims?.map((activity) => {
                  return (
                    <option key={activity?.id} value={activity?.id}>
                      {activity?.activity_name}
                    </option>
                  );
                })}
              </select>
              <label className="label">
                <span className="modal-label-name">Provider Name</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("provider_id")}
              >
                <option value="0">Select Provider</option>
                {providersName?.claims?.map((provider) => {
                  return (
                    <option key={provider?.id} value={provider?.id}>
                      {provider?.full_name}
                    </option>
                  );
                })}
              </select>
              <label className="label">
                <span className="modal-label-name">POS</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("location")}
                required
              >
                <option value="">Select Provider</option>
                {posData?.pos?.map((p) => {
                  return (
                    <option key={p?.id} value={p?.pos_code}>
                      {p?.pos_name}({p?.pos_code})
                    </option>
                  );
                })}
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
                className="col-span-2 modal-input-field ml-1 w-full px-2"
                // {...register("from_time")}
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
                    <div className="col-span-2 w-[95%] my-0 mx-auto">
                      <Calendar onChange={setDate} defaultValue={date} />
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
                    </div>
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
                {timeConverted && timeConverted.length > 0 ? (
                  <TimePicker
                    className="modal-input-field"
                    defaultValue={moment(
                      timeConverted &&
                        timeConverted.length > 0 &&
                        // timeConverted,
                        tConvert(timeConverted),
                      "HH:mm A"
                    )}
                    use12Hours
                    format="h:mm A"
                    onChange={from_Time}
                  />
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/ymrqtsej.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#107c91"
                  ></lord-icon>
                )}
                <div className="modal-label-name mt-2 mx-auto">To Time</div>
                {TOtimeConverted && TOtimeConverted.length > 0 ? (
                  <TimePicker
                    className="modal-input-field"
                    defaultValue={moment(
                      TOtimeConverted &&
                        TOtimeConverted.length > 0 &&
                        tConvert(TOtimeConverted),
                      "HH:mm A"
                    )}
                    use12Hours
                    format="h:mm A"
                    onChange={to_Time}
                  />
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/ymrqtsej.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#107c91"
                  ></lord-icon>
                )}
              </div>
              <label className="label">
                <span className="modal-label-name">Status</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
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

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2">
              <button className=" pms-button mr-2" type="submit">
                Edit Appointment
              </button>

              <button className="pms-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditSession;

import { useState, useEffect } from "react";
import CreateAppointmentAvailability from "./CreateAppointmentAvailability/CreateAppointmentAvailability";
import { Modal, Radio, Space, Switch, TimePicker } from "antd";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import Billable from "./Auth/BIllable/Billable";
import NonBillable from "./Auth/NonBillable/NonBillable";
import GroupTherapy from "./Auth/GroupTherapy/GroupTherapy";
import NoAuth from "./NoAuth/NoAuth";
import BlockOfTime from "./BlockOfTime/BlockOfTime";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const CreateAppointment = ({ handleClose, clicked }) => {
  // console.log(handleClose, clicked);
  const [billable, setBillable] = useState(true);
  const [recurrence, setRecurrence] = useState(false);
  const [daily, setDaily] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, reset, control } = useForm();
  const [clientId, setClientId] = useState(0);
  const [authId, setAuthId] = useState(0);
  const [fromtime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [therapy, setTherapy] = useState(true);
  const [option, setOption] = useState(false);
  const [value, setValue] = useState(1);
  const [noAuth, setNoAuth] = useState(false);
  const [blockOfTime, setBlockOfTime] = useState(false);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // For Non-billable appointment create=>provider select
  const [seletedProvider, setSelectedProvider] = useState([]);
  // console.log("Billable", billable);

  // Appointment Availability
  const [availability, setAvailability] = useState(false);
  const availabilityHandler = () => {
    setAvailability(true);
  };

  const availabilityHandleClose = () => {
    setAvailability(false);
  };

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

  const getActiveAuth = (id) => {};

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
    // console.log("for billable payload", payload);
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
    // console.log("for Non-billable payload", payload);
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
        <div className=" py-2">
          <div className="flex items-center justify-between">
            {blockOfTime ? (
              <h1 className="text-lg text-left text-orange-400 ">
                Add Block Off Time
              </h1>
            ) : (
              <>
                <h1 className="text-lg text-left text-orange-400 ">
                  Add Appointment
                </h1>
              </>
            )}

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Switch
                  size="small"
                  onClick={() => {
                    setBlockOfTime(!blockOfTime);
                  }}
                />
                <label
                  className="form-check-label inline-block font-medium  text-[12px] text-gray-600"
                  htmlFor="flesmwitchCheckDefault"
                >
                  Block Off Time
                </label>
              </div>
              <div className="flex items-center gap-1">
                <Switch
                  disabled={!billable}
                  size="small"
                  onClick={() => {
                    setNoAuth(!noAuth);
                    setBillable(true);
                    setTherapy(true);
                  }}
                />
                <label
                  className="form-check-label inline-block font-medium  text-[12px] text-gray-600"
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
          <div className="h-4 py-1">
            {/* 
            {authorizationActivityLoading || patientAuthLoading ? (
              <>
                <progress className="progress w-full bg-secondary h-[3px]"></progress>
              </>
            ) : (
              <div className="bg-gray-200 py-[1.5px] mt-3"></div>
            )} 
            */}
            <div className="bg-gray-200 py-[1.5px] mt-3"></div>
          </div>

          {!blockOfTime && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-5 mr-2 gap-1 md:gap-2">
                <span className="modal-label-name ml-1 mb-2">App Type</span>
                <div className="col-span-2 ml-1 mb-1">
                  <Switch
                    checked={billable}
                    size="small"
                    disabled={!therapy || noAuth}
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
                    className={`ml-5`}
                    checked={therapy}
                    size="small"
                    disabled={noAuth || !billable}
                    onClick={() => {
                      setTherapy(!therapy);
                      setBillable(true);
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
              </div>
              {billable && therapy && !noAuth && (
                <Billable
                  register={register}
                  setClientId={setClientId}
                  billable={billable}
                ></Billable>
              )}
              {!billable && (
                <NonBillable
                  register={register}
                  setClientId={setClientId}
                  billable={billable}
                ></NonBillable>
              )}
              {noAuth && <NoAuth register={register}></NoAuth>}
              {!therapy && (
                <GroupTherapy
                  control={control}
                  register={register}
                ></GroupTherapy>
              )}

              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-5 mt-2 mr-2 gap-1 md:gap-2">
                <label className="label">
                  <span className="modal-label-name">POS</span>
                </label>
                <select
                  className="col-span-2 modal-input-field ml-1 w-full"
                  {...register("location")}
                >
                  <option value="0">Select Location</option>
                  {/* 
                {posData?.pos?.map((p) => {
                  return (
                    <option key={p?.id} value={p?.pos_code}>
                      {p?.pos_name}
                    </option>
                  );
                })} 
                */}
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
                            <span className="text-xl">
                              {days[date.getDay()]}
                            </span>
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <h1 className="text-8xl font-medium">
                              {currentDate}
                            </h1>
                            <h1 className="text-xl font-medium">{month}</h1>
                          </div>
                          <div className="flex justify-center items-end">
                            <h1 className="text-4xl font-medium mt-4">
                              {year}
                            </h1>
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
                      {/* 
                    <div className="col-span-2 w-[95%] my-0 mx-auto">
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
                    </div> 
                    */}
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
                    className="modal-input-field"
                    use12Hours
                    format="h:mm A"
                    onChange={from_Time}
                  />
                  <h1 className="modal-label-name mt-2 text-center">To Time</h1>
                  <TimePicker
                    className="modal-input-field"
                    use12Hours
                    format="h:mm A"
                    onChange={to_Time}
                  />
                </div>
                {/* <label className="label">
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
              </select> */}
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

              {/* <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-5 mr-2 gap-1">
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
                    className="px-2 modal-input-field ml-1 w-full"
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
                    <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
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
            </div> */}

              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className="flex items-center justify-between">
                <select
                  className=" modal-input-field ml-1 mt-2"
                  {...register("status")}
                >
                  <option value="0">Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Hold">Hold</option>
                  <option value="Cancelled by Client">
                    Cancelled by Client
                  </option>
                  <option value="CC more than 24 hrs">
                    CC more than 24 hrs
                  </option>
                  <option value="CC less than 24 hrs">
                    CC less than 24 hrs
                  </option>
                  <option value="Cancelled by Provider">
                    Cancelled by Provider
                  </option>
                  <option value="Rendered">Rendered</option>
                </select>

                <div className="flex items-end justify-end gap-2 mt-3">
                  <button
                    className=" border-secondary flex items-center border rounded-sm"
                    type="submit"
                  >
                    <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                    <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                      Add Appointment
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
            </form>
          )}

          {blockOfTime && (
            <>
              <BlockOfTime></BlockOfTime>
            </>
          )}
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

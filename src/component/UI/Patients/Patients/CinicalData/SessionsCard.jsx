import { DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Switch, Tooltip } from "antd";
import Link from "next/link";
import { useState } from "react";
import { BiDotsHorizontal, BiEdit, BiSolidBullseye } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosNotificationsOff,
} from "react-icons/io";
import ManualSessionEntryModal from "./Modal/ManualSessionEntryModal";
import ScheduleModal from "./Modal/ScheduleModal";
import { GrSchedule } from "react-icons/gr";
import ProgramCards from "./Programs/ProgramCards";
import { IoEyeOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

const SessionCard = ({appointment}) => {
  const [cardExpend, setCardExpend] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessionVisibility, setSessionVisibility] = useState(false);
  const [sessionLimit, setSessionLimit] = useState(false);

  //const dateObject = new Date(currentDate);
  const dateObject = new Date(appointment.scheduled_date);
  const getAlphabeticMonth = (monthNumber) => {
    const monthNames = [
      "January",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1]; // Adjust for zero-indexed months
  };

  //* modals
  const [manualSessionEntry, setManualSessionEntry] = useState(false);
  const handleManualSessionEntry = () => {
    setManualSessionEntry(!manualSessionEntry);
  };

  const [schedule, setSchedule] = useState(false);
  const handleSchedule = () => {
    setSchedule(!schedule);
  };

  // Extract components (day, month, year)
  const day = dateObject.getDate();
  const month = getAlphabeticMonth(dateObject.getMonth() + 1);
  const year = dateObject.getFullYear();

  return (
    <div className="my-5">
      <div className="border shadow-md  z-0 card rounded-t-lg bg-white rounded-b-lg ">
        {/* patient details  */}

        <div>
          <h1 className="bg-secondary text-sm w-full py-1 px-5 rounded-t-lg text-white font-medium">
            {`${appointment.service_name}`}
          </h1>
          <div>
            <div>
              <div className=" px-5 py-4 my-auto">
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
                  <div>
                    <div className="font-semibold">{`${appointment.patient_name}`}</div>
                    <div className="text-primary text-sm">
                    {`${appointment.hours}`}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Dropdown
                      dropdownRender={() => (
                        <div className="bg-white  w-[160px] border shadow-md rounded-sm">
                          <div className="bg-secondary text-white flex items-center justify-center py-1">
                            Notification
                          </div>
                          <div>
                            <button
                              onClick={handleManualSessionEntry}
                              className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            >
                              <MdNotificationsActive className="text-xl" />
                              On
                            </button>
                            <Dropdown
                              dropdownRender={() => (
                                <div className="bg-white p-3 w-[220px] border shadow-md rounded-sm">
                                  <div className="">
                                    <div className="my-2">
                                      <Switch size="small" />
                                      <label
                                        className="modal-label-name ml-2"
                                        htmlFor="flesmwitchCheckDefault"
                                      >
                                        Session finished
                                      </label>
                                    </div>
                                    <div className="my-2">
                                      <Switch size="small" />
                                      <label
                                        className="modal-label-name ml-2"
                                        htmlFor="flesmwitchCheckDefault"
                                      >
                                        Files/video attached to session
                                      </label>
                                    </div>
                                    <div className="my-2">
                                      <Switch size="small" />
                                      <label
                                        className="modal-label-name ml-2"
                                        htmlFor="flesmwitchCheckDefault"
                                      >
                                        Target mastered
                                      </label>
                                    </div>
                                    <div className="my-2">
                                      <Switch size="small" />
                                      <label
                                        className="modal-label-name ml-2"
                                        htmlFor="flesmwitchCheckDefault"
                                      >
                                        Target reopened
                                      </label>
                                    </div>

                                    <hr className="my-2" />

                                    <div className="">
                                      <Switch size="small" />
                                      <label
                                        className="modal-label-name ml-2"
                                        htmlFor="flesmwitchCheckDefault"
                                      >
                                        Notify immediately
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}
                              placement="bottom"
                              arrow
                            >
                              <button
                                onClick={handleManualSessionEntry}
                                className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                              >
                                <MdNotificationsActive className="text-xl" />
                                Custom
                              </button>
                            </Dropdown>

                            <button
                              onClick={handleManualSessionEntry}
                              className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            >
                              <IoIosNotificationsOff className="text-xl" />
                              off
                            </button>
                          </div>
                        </div>
                      )}
                      placement="bottomRight"
                      arrow
                    >
                      <Tooltip
                        placement="top"
                        color={"#0C356A"}
                        title="notification"
                      >
                        <IoIosNotificationsOff className="text-lg" />
                      </Tooltip>
                    </Dropdown>

                    <Dropdown
                      dropdownRender={() => (
                        <div className="bg-white  w-[240px] border shadow-md rounded-sm">
                          <div>
                            <button
                              onClick={handleManualSessionEntry}
                              className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            >
                              <FaPlus className="text-xl" />
                              Manual session entry
                            </button>
                            <hr />
                            <button
                              onClick={handleSchedule}
                              className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                            >
                              <GrSchedule className="text-xl" /> Schedule
                            </button>

                            {/* //! visibility  */}
                            <Dropdown
                              placement="bottomLeft"
                              dropdownRender={() => (
                                <div className="bg-white p-3 w-[240px] border shadow-md rounded-sm">
                                  <div>
                                    <div className="pb-2">
                                      <Switch
                                        size="small"
                                        onClick={() => {
                                          setSessionVisibility(
                                            !sessionVisibility
                                          );
                                        }}
                                      />
                                      <label
                                        className="modal-label-name ml-2"
                                        htmlFor="flesmwitchCheckDefault"
                                      >
                                        imit session visibility
                                      </label>
                                    </div>
                                    <hr />
                                    {sessionVisibility && (
                                      <div className="pt-2">
                                        <div className="my-1">
                                          <Switch size="small" />
                                          <label
                                            className="modal-label-name ml-2"
                                            htmlFor="flesmwitchCheckDefault"
                                          >
                                            Behavior Analyst
                                          </label>
                                        </div>
                                        <div className="my-1">
                                          <Switch size="small" />
                                          <label
                                            className="modal-label-name ml-2"
                                            htmlFor="flesmwitchCheckDefault"
                                          >
                                            Behavior Technician
                                          </label>
                                        </div>
                                        <div className="my-1">
                                          <Switch size="small" />
                                          <label
                                            className="modal-label-name ml-2"
                                            htmlFor="flesmwitchCheckDefault"
                                          >
                                            Parent
                                          </label>
                                        </div>
                                        <hr className="my-2" />

                                        <div className="">
                                          <Switch size="small" />
                                          <label
                                            className="modal-label-name ml-2"
                                            htmlFor="flesmwitchCheckDefault"
                                          >
                                            Show in History to all
                                          </label>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            >
                              <button
                                // onClick={handleShareFolder}
                                className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                              >
                                <IoEyeOutline className="text-xl" /> Visibility
                              </button>
                            </Dropdown>

                            <button className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3">
                              <DeleteOutlined className="text-xl" /> Delete
                              Session
                            </button>
                            <hr className="mt-4" />
                          </div>
                        </div>
                      )}
                      placement="bottomRight"
                      arrow
                    >
                      <Tooltip placement="top" color={"#0C356A"} title="more">
                        <BiDotsHorizontal className="text-xl text-dark hover:text-primary" />
                      </Tooltip>
                    </Dropdown>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setCardExpend(!cardExpend);
                  }}
                  className="w-full"
                >
                  <button className="flex items-center  mt-2 text-secondary">
                    <span className="text-[13px] font-semibold mr-1">
                      Session Details
                    </span>{" "}
                    {!cardExpend ? (
                      <IoIosArrowDown className="text-sm mt-[2px] font-medium" />
                    ) : (
                      <IoIosArrowUp className="text-sm mt-[2px]  font-medium" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {cardExpend && (
            <>
              <h1 className="bg-primary text-sm w-full py-1 px-5 text-white font-medium">
                Programs
              </h1>
              <div>
                <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
                  <div className="col-span-3 px-2 py-5">
                    <ProgramCards></ProgramCards>
                  </div>
                  {/* right section  */}
                  <div className="bg-primary py-1 w-full ">
                    <div className="flex justify-center items-center">
                      <div className="text-white mb-5">
                        <div className="text-lg font-semibold text-center">
                          {day}
                        </div>
                        <div className="text-lg font-semibold text-center">
                          {month}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={
                        "/provider/patients/clinical-data/session-details/1212"
                      }
                    >
                      <div className="px-2 mb-2  text-white">
                        <button className="font-semibold text-sm rounded-md  border-white hover:border-secondary hover:bg-secondary w-full transition-all  uppercase border py-[6px]">
                          Start Session
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* //* open modals */}
      {manualSessionEntry && (
        <ManualSessionEntryModal
          title={"Manual session entry"}
          handleClose={handleManualSessionEntry}
          clicked={manualSessionEntry}
        ></ManualSessionEntryModal>
      )}
      {schedule && (
        <ScheduleModal
          handleClose={handleSchedule}
          clicked={schedule}
        ></ScheduleModal>
      )}
    </div>
  );
};

export default SessionCard;

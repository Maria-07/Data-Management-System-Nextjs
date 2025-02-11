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
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import ManageTableAction from "@/component/UI/Appointment/Schedule/DataRecording/Modals/ManageTableAction";
import { PiSignatureBold } from "react-icons/pi";
import SignatureModal from "@/shared/SignatureManage/SignatureModal";

const SessionCard = ({ appointment }) => {
  const [cardExpend, setCardExpend] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessionVisibility, setSessionVisibility] = useState(false);
  const [sessionLimit, setSessionLimit] = useState(false);
  const [locked, setLocked] = useState(false);

  const [patientSignature, setCaregiverSignature] = useState(false);
  const [providerSignature, setProviderSignature] = useState(false);
  const [ProviderImageURL, setProviderImageURL] = useState(null);
  const [patientImageURL, setPatientImageURL] = useState(null);
  // console.log("ProviderImageURL", ProviderImageURL);
  // console.log("imageURL", patientImageURL);
  const [file, setFile] = useState();

  // console.log("file", file);

  const handleSignatureProvider = () => {
    setProviderSignature(true);
  };
  const handleSignaturePatient = () => {
    setCaregiverSignature(true);
  };
  const handleSignatureClose = () => {
    setCaregiverSignature(false);
    setProviderSignature(false);
  };

  const dateObject = new Date(currentDate);
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
          <div>
            <div>
              <div className="  my-auto">
                {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 "> */}
                <div> </div>
                <div className=" grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 ">
                  <div className="col-span-7 ">
                    <div>
                      {" "}
                      <h1 className="bg-secondary flex gap-3 text-sm w-full py-1 px-5  rounded-tl-lg text-white font-medium">
                        {appointment.service_name}
                      </h1>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 px-5 pt-5">
                      <div className="flex gap-7">
                        <div className="flex items-center gap-2">
                          {/* Checkbox Select Code */}
                          <input
                            type="checkbox"
                            // id={`custom-checkbox-${index}`}
                            // name={name}
                            // value={name}
                            // onChange={() => setCheckBox(data)}
                          />
                          <label>
                            {locked === 1 ? (
                              <AiFillLock className="mx-auto text-lg font-medium text-red-600 z-10" />
                            ) : (
                              <AiFillUnlock className="text-lg font-medium text-green-500 z-10" />
                            )}
                          </label>
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {appointment.patient_name}
                            <PiSignatureBold
                              title="Patient Signature"
                              className=" text-primary hover:text-secondary"
                              onClick={handleSignaturePatient}
                            />
                          </div>
                          <div className="text-primary text-sm">
                            8:00 PM to 11:00 PM
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-span-2">
                      <div>
                        <h1 className="text-xs font-medium text-gray-500 mb-[3px]">
                          Patient Name
                        </h1>
                        <p className=" font-medium text-sm text-gray-900">
                          Avhayah Duvali
                        </p>
                      </div>
                    </div> */}
                      <div className=" flex  gap-3 flex-wrap justify-around">
                        <div>
                          <h1 className="text-xs font-medium text-gray-500 mb-[3px]">
                            Provider
                          </h1>
                          <p className="text-sm flex items-center gap-2 font-semibold text-gray-900">
                            M, soni
                            <PiSignatureBold
                              title="Provider Signature"
                              className="text-lg text-primary hover:text-secondary"
                              onClick={handleSignatureProvider}
                            />
                          </p>
                        </div>
                        <div className="">
                          <div>
                            <h1 className="text-xs font-medium text-gray-500 mb-[3px]">
                              Scheduled Date
                            </h1>
                            <p className="text-sm font-semibold text-gray-900">
                              01/19/2024
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className=" flex  gap-3 flex-wrap justify-around">
                        <div>
                          <h1 className="text-xs font-medium text-gray-500 mb-[3px]">
                            Status
                          </h1>
                          <div>
                            {/* {status === "Scheduled" && ( */}
                            <button className="bg-gray-500 text-white text-[10px] py-[2px]  rounded w-14">
                              Scheduled
                            </button>
                            {/* )} */}
                            {status === "Rendered" && (
                              <button className="bg-green-700 text-white text-[10px] py-[2px]  rounded w-14">
                                {status}
                              </button>
                            )}
                            {status === "Hold" && (
                              <button className="bg-gray-100 text-black text-[10px] py-[2px]  rounded w-14">
                                {status}
                              </button>
                            )}
                            {status === "No Show" && (
                              <button className="bg-rose-700 text-white text-[10px] py-[2px]  rounded w-14">
                                {status}
                              </button>
                            )}
                            {status === "Cancelled by Client" && (
                              <button className="bg-secondary text-white text-[10px] py-[2px]  rounded w-24">
                                {status}
                              </button>
                            )}
                            {status === "Cancelled by Provider" && (
                              <button className="bg-yellow-600 text-white text-[10px] py-[2px]  rounded w-28">
                                {status}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h1 className="text-xs font-medium text-gray-500 mb-[3px]">
                              POS
                            </h1>
                            <p className="text-sm font-semibold text-gray-900">
                              Office
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="md:col-span-2">
                          <div>
                            <h1 className="text-xs font-medium text-gray-500 mb-[3px]">
                              Service & Hrs.
                            </h1>
                            <p className="text-sm font-semibold text-gray-900">
                              Behavioral therapy 19001 (97153) (0.50Hr)
                            </p>
                          </div>
                        </div> */}
                    </div>
                    <div className="flex items-center justify-between px-5 py-2">
                      {" "}
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
                      <div className="flex  justify-end items-center gap-2">
                        {/* <Dropdown
                          dropdownRender={() => (
                            // <div className="bg-white  w-[160px] border shadow-md rounded-sm">
                            //   <div className="bg-secondary text-white flex items-center justify-center py-1">
                            //     Notification
                            //   </div>
                            //   <div>
                            //     <button
                            //       onClick={handleManualSessionEntry}
                            //       className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            //     >
                            //       <MdNotificationsActive className="text-xl" />
                            //       On
                            //     </button>
                            //     <Dropdown
                            //       dropdownRender={() => (
                            //         <div className="bg-white p-3 w-[220px] border shadow-md rounded-sm">
                            //           <div className="">
                            //             <div className="my-2">
                            //               <Switch size="small" />
                            //               <label
                            //                 className="modal-label-name ml-2"
                            //                 htmlFor="flesmwitchCheckDefault"
                            //               >
                            //                 Session finished
                            //               </label>
                            //             </div>
                            //             <div className="my-2">
                            //               <Switch size="small" />
                            //               <label
                            //                 className="modal-label-name ml-2"
                            //                 htmlFor="flesmwitchCheckDefault"
                            //               >
                            //                 Files/video attached to session
                            //               </label>
                            //             </div>
                            //             <div className="my-2">
                            //               <Switch size="small" />
                            //               <label
                            //                 className="modal-label-name ml-2"
                            //                 htmlFor="flesmwitchCheckDefault"
                            //               >
                            //                 Target mastered
                            //               </label>
                            //             </div>
                            //             <div className="my-2">
                            //               <Switch size="small" />
                            //               <label
                            //                 className="modal-label-name ml-2"
                            //                 htmlFor="flesmwitchCheckDefault"
                            //               >
                            //                 Target reopened
                            //               </label>
                            //             </div>

                            //             <hr className="my-2" />

                            //             <div className="">
                            //               <Switch size="small" />
                            //               <label
                            //                 className="modal-label-name ml-2"
                            //                 htmlFor="flesmwitchCheckDefault"
                            //               >
                            //                 Notify immediately
                            //               </label>
                            //             </div>
                            //           </div>
                            //           <ManageTableAction></ManageTableAction>
                            //         </div>
                            //       )}
                            //       placement="bottom"
                            //       arrow
                            //     >
                            //       <button
                            //         onClick={handleManualSessionEntry}
                            //         className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            //       >
                            //         <MdNotificationsActive className="text-xl" />
                            //         Custom
                            //       </button>
                            //     </Dropdown>

                            //     <button
                            //       onClick={handleManualSessionEntry}
                            //       className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            //     >
                            //       <IoIosNotificationsOff className="text-xl" />
                            //       off
                            //     </button>
                            //   </div>
                            // </div>
                            <></>
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
                        </Dropdown> */}

                        <Dropdown
                          dropdownRender={() => (
                            // <div className="bg-white  w-[240px] border shadow-md rounded-sm">
                            //   <div>
                            //     <button
                            //       onClick={handleManualSessionEntry}
                            //       className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold"
                            //     >
                            //       <FaPlus className="text-xl" />
                            //       Manual session entry
                            //     </button>
                            //     <hr />
                            //     <button
                            //       onClick={handleSchedule}
                            //       className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                            //     >
                            //       <GrSchedule className="text-xl" /> Schedule
                            //     </button>

                            //     {/* //! visibility  */}
                            //     <Dropdown
                            //       placement="bottomLeft"
                            //       dropdownRender={() => (
                            //         <div className="bg-white p-3 w-[240px] border shadow-md rounded-sm">
                            //           <div>
                            //             <div className="pb-2">
                            //               <Switch
                            //                 size="small"
                            //                 onClick={() => {
                            //                   setSessionVisibility(
                            //                     !sessionVisibility
                            //                   );
                            //                 }}
                            //               />
                            //               <label
                            //                 className="modal-label-name ml-2"
                            //                 htmlFor="flesmwitchCheckDefault"
                            //               >
                            //                 imit session visibility
                            //               </label>
                            //             </div>
                            //             <hr />
                            //             {sessionVisibility && (
                            //               <div className="pt-2">
                            //                 <div className="my-1">
                            //                   <Switch size="small" />
                            //                   <label
                            //                     className="modal-label-name ml-2"
                            //                     htmlFor="flesmwitchCheckDefault"
                            //                   >
                            //                     Behavior Analyst
                            //                   </label>
                            //                 </div>
                            //                 <div className="my-1">
                            //                   <Switch size="small" />
                            //                   <label
                            //                     className="modal-label-name ml-2"
                            //                     htmlFor="flesmwitchCheckDefault"
                            //                   >
                            //                     Behavior Technician
                            //                   </label>
                            //                 </div>
                            //                 <div className="my-1">
                            //                   <Switch size="small" />
                            //                   <label
                            //                     className="modal-label-name ml-2"
                            //                     htmlFor="flesmwitchCheckDefault"
                            //                   >
                            //                     Parent
                            //                   </label>
                            //                 </div>
                            //                 <hr className="my-2" />

                            //                 <div className="">
                            //                   <Switch size="small" />
                            //                   <label
                            //                     className="modal-label-name ml-2"
                            //                     htmlFor="flesmwitchCheckDefault"
                            //                   >
                            //                     Show in History to all
                            //                   </label>
                            //                 </div>
                            //               </div>
                            //             )}
                            //           </div>
                            //         </div>
                            //       )}
                            //     >
                            //       <button
                            //         // onClick={handleShareFolder}
                            //         className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                            //       >
                            //         <IoEyeOutline className="text-xl" />{" "}
                            //         Visibility
                            //       </button>
                            //     </Dropdown>

                            //     <button className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3">
                            //       <DeleteOutlined className="text-xl" /> Delete
                            //       Session
                            //     </button>
                            //     <hr className="mt-4" />
                            //   </div>
                            // </div>
                            <>
                              <ManageTableAction></ManageTableAction>
                            </>
                          )}
                          placement="bottomRight"
                          arrow
                        >
                          <Tooltip
                            placement="top"
                            color={"#0C356A"}
                            title="more"
                          >
                            <BiDotsHorizontal className="text-xl text-dark hover:text-primary" />
                          </Tooltip>
                        </Dropdown>
                      </div>
                    </div>
                  </div>

                  {/* right section  */}
                  <div
                    className={`bg-secondary  w-full rounded-tr-lg  ${
                      cardExpend ? "rounded-br-none" : "rounded-br-lg"
                    }`}
                  >
                    <div className="flex justify-center items-center mt-5">
                      <div className="text-white mb-4">
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
                        <button className="font-regular text-sm rounded-md  border-primary hover:border-primary hover:bg-primary w-full transition-all uppercase border py-[6px]">
                          Start Session
                        </button>
                      </div>
                    </Link>
                    {/* <Link
                      href={
                        "/provider/patients/clinical-data/session-details/1212"
                      }
                    >
                      <div className="px-2 mb-2  text-white">
                        <button className="font-regular text-sm rounded-md border-green-400 hover:border-green-500 bg-green-500  w-full transition-all uppercase border py-[6px]">
                          Resume Session
                        </button>
                      </div>
                    </Link> */}
                  </div>
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
                <div className=" ">
                  <div className="max-h-[520px] px-2 py-5 overflow-y-scroll ">
                    <ProgramCards></ProgramCards>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {patientSignature && (
        <SignatureModal
          handleSignatureClose={handleSignatureClose}
          open={patientSignature}
          setImageURL={setPatientImageURL}
          setFile={setFile}
        ></SignatureModal>
      )}

      {providerSignature && (
        <SignatureModal
          handleSignatureClose={handleSignatureClose}
          open={providerSignature}
          setImageURL={setProviderImageURL}
          setFile={setFile}
        ></SignatureModal>
      )}

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

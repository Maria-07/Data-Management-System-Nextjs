import React, { useState } from "react";
import CreateAppointment from "./AdditionFeatures/CreateAppointment";
import CreatePatient from "./AdditionFeatures/CreatePatient";
import NewEligibilityInquiry from "./AdditionFeatures/NewEligibilityInquiry";
import { BiCalendar, BiSolidUserDetail, BiUserPlus } from "react-icons/bi";

const Add = () => {
  const [clicked, setClicked] = useState(false);
  const [patientClicked, setPatientClicked] = useState(false);
  const [eligibility, setEligibility] = useState(false);

  const handleAppointment = () => {
    setClicked(!clicked);
  };
  const handlePatient = () => {
    setPatientClicked(!patientClicked);
  };
  const handleEligibility = () => {
    setEligibility(!eligibility);
  };
  return (
    <div>
      <div className=" p-1 border shadow-lg rounded-sm nav-box bg-white w-[210px]">
        <button
          onClick={handlePatient}
          className="text-[14px] text-secondary pl-[15px] w-full py-2 rounded-sm clink flex items-center justify-start font-medium gap-2 transition-all hover:bg-slate-100 hover:text-secondary"
        >
          <lord-icon
            src="https://cdn.lordicon.com/eszyyflr.json"
            trigger="loop"
            delay="1000"
            colors="primary:#121331,secondary:#107c91"
            // style={{ height: "25px", fontWidth: 700 }}
          ></lord-icon>
          <BiUserPlus className="text-lg" />
          <div>Create Patient</div>
        </button>

        <button className="text-[14px] text-secondary px-[15px] w-full py-2 rounded-sm clink flex items-center font-medium gap-2 transition-all hover:bg-slate-100 hover:text-secondary">
          <lord-icon
            src="https://cdn.lordicon.com/qjuahhae.json"
            trigger="loop"
            delay="1000"
            colors="primary:#107c91"
            state="intro"
            style={{ height: "25px", fontWidth: 700 }}
          ></lord-icon>
          <BiCalendar className="text-lg" />
          <div onClick={handleAppointment}>Create Appointment</div>
        </button>

        <button className="text-[14px] text-secondary px-[15px] w-full py-2 rounded-sm clink flex items-center font-medium gap-2 transition-all hover:bg-slate-100 hover:text-secondary">
          <lord-icon
            src="https://cdn.lordicon.com/uukerzzv.json"
            trigger="loop"
            delay="1000"
            colors="primary:#107c91,secondary:#0a2e5c"
          ></lord-icon>
          <BiSolidUserDetail className="text-lg" />
          <div onClick={handleEligibility}>Request Eligibility</div>
        </button>
      </div>
      {clicked && (
        <div>
          <CreateAppointment
            handleClose={handleAppointment}
            clicked={clicked}
          ></CreateAppointment>
        </div>
      )}
      {patientClicked && (
        <div>
          <CreatePatient
            handleClose={handlePatient}
            patientClicked={patientClicked}
          ></CreatePatient>
        </div>
      )}
      {eligibility && (
        <div>
          <NewEligibilityInquiry
            handleClose={handleEligibility}
            eligibility={eligibility}
          ></NewEligibilityInquiry>
        </div>
      )}
    </div>
  );
};

export default Add;

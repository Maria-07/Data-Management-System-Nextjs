import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import ProgramInfoModal from "../Appointment/Schedule/DataRecording/Modals/ProgramInfoModal";

const Records = ({ editSessionData, setEditSessionData }) => {
  const [sessionProgram, setSessionProgram] = useState(false);
  const handleSessionProgram = () => {
    setSessionProgram(!sessionProgram);
  };
  return (
    <div className="my-10">
      <div className="flex items-center gap-3 border-b-[1px] pb-3 my-2">
        <h1 className="text-xs font-semibold text-gray-600">Aggression Rate</h1>
        <AiFillInfoCircle
          title="Aggression Rate"
          className="text-gray-500"
          onClick={handleSessionProgram}
        />
        <div className="border border-green-400 text-green-500 text-xs px-2 py-[2px] rounded-sm">
          0:00:15
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-sm font-semibold text-gray-600">
            Aggression Rate
          </h1>
          <div className="border font-semibold border-green-500 text-white bg-green-500 text-xs px-2 py-[2px] rounded-md">
            0 / day
          </div>
        </div>
      </div>
      {editSessionData && (
        <div>
          <div>
            <label className="label">
              <h1 className="label-font mb-1 mt-3">Program Notes</h1>
            </label>
            <input
              type="text"
              name="diagnosis4"
              className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium  py-[1px] w-full focus:outline-none"
            />
          </div>
        </div>
      )}
      {sessionProgram && (
        <ProgramInfoModal
          title={"Aggression Rate"}
          handleClose={handleSessionProgram}
          clicked={sessionProgram}
        ></ProgramInfoModal>
      )}
    </div>
  );
};

export default Records;

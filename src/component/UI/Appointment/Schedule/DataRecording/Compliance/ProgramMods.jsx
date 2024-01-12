import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const ProgramMods = () => {
  return (
    <div className="px-2">
      <h1 className="text-lg font-semibold my-3">Wednesday, April 26, 2023</h1>
      <div className="flex items-center gap-3 my-5">
        <FiPlusCircle className="text-secondary font-extrabold text-lg" />{" "}
        <p className="text-sm font-medium">
          10:34 PM - NEW PROGRAM ADDED (COMPLIANCE)
        </p>
      </div>
    </div>
  );
};

export default ProgramMods;

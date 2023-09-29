import React from "react";
import img1 from "../../../../../assets/img/doctor.png";
import Image from "next/image";

const PatientActionModalAREdit = () => {
  return (
    <div className="flex items-center gap-2 my-2 ">
      <Image src={img1} className="w-14 h-14 mt-3" alt="" />
      <div className="border rounded-md p-2 bg-[#fef9f9]">
        <div className="flex items-center gap-2 flex-wrap ">
          <h1 className="text-orange-300 text-[16px] font-medium">
            Ashish test Soni
          </h1>
          <span className=" text-[9px] py-[2px] bg-gray-500 text-white px-1 rounded-sm">
            Add Info patient
          </span>
          <h5 className="text-xs text-gray-400 ">(09/09/2021 6:09 PM)</h5>
        </div>
        <div className="bg-gray-200 py-[1px] mt-1"></div>
        <p className="text-xs font-normal mt-1">
          id inventore? Dolorem quisquam qui reiciendis quod est mollitia!
        </p>
      </div>
    </div>
  );
};

export default PatientActionModalAREdit;

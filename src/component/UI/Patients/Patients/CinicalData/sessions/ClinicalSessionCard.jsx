import { Image } from "antd";
import React, { useState } from "react";
import { List } from "antd";
import SessionProgramModal from "../Modal/SessionProgramModal";
import { TbCards } from "react-icons/tb";
import { IoLayers } from "react-icons/io5";
import { CgMoreVerticalO } from "react-icons/cg";
import { FaCircleNotch } from "react-icons/fa";

function ClinicalSessionCard() {
  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  const [sessionProgram, setSessionProgram] = useState(false);
  const handleSessionProgram = () => {
    setSessionProgram(!sessionProgram);
  };

  return (
    <div className=" w-full card shadow-md ">
      <div onClick={handleSessionProgram} className="p-4 ">
        <div className="flex items-center gap-2">
          <div className="bg-secondary p-2 rounded-full">
            <TbCards className="text-white text-lg" />
          </div>
          <div>
            {" "}
            <h1 className="font-semibold text-sm">Washing Hands - baseline</h1>
            <h2 className="text-xs">skill | Trial by Trial</h2>
          </div>
        </div>
        {/* <div className="text-[14px] my-5 text-black font-semibold hover:text-primary">
          Abdullah will be able to initiate a socially appropriate physical
          interaction with a same aged peer in 80% of opportunties across 2
          peers.
        </div> */}
        {/* <div>
          <h1>
            <span className="font-semibold">Materials : </span>
          </h1>
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div> */}
        <div className="my-5">
          <h1 className="font-semibold text-sm mb-1">Created At : </h1>
          <h1 className="text-xs">System - 08/29/23</h1>
        </div>
        <div className="flex items-center justify-around pt-4 border-t-[2px]">
          <CgMoreVerticalO />
          <IoLayers />
          <FaCircleNotch />
        </div>
        <div></div>
      </div>
      {sessionProgram && (
        <SessionProgramModal
          title={"Social/Play: Initiates Peer Interaction"}
          handleClose={handleSessionProgram}
          clicked={sessionProgram}
        ></SessionProgramModal>
      )}
    </div>
  );
}

export default ClinicalSessionCard;

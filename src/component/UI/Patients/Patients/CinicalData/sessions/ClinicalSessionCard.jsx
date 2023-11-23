import { Image } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { Divider, List, Typography } from "antd";
import SessionProgramModal from "../Modal/SessionProgramModal";

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
    <div className="pb-10 card shadow-md relative ">
      <div>
        <div className="h-[270px]">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/hi-rasmus-341a9.appspot.com/o/programs%2FutdQJO8COXFxjSIz3ubE%2Fcoverphoto.jpg?alt=media&token=280f6513-6489-4510-adbd-d0ad1983065e"
            }
            width={"100%"}
            height={"100%"}
            alt="Picture of the author"
          ></Image>
        </div>
      </div>
      <div className="absolute top-[41%] bg-gray-700 bg-opacity-60 w-full py-3 px-4 text-white text-[16px]">
        <h1>Social/Play: Initiates Peer Interaction</h1>
      </div>
      <div
        onClick={handleSessionProgram}
        className="p-4 h-[230px] overflow-hidden"
      >
        <div className="text-[14px] my-5 text-black font-semibold hover:text-primary">
          Abdullah will be able to initiate a socially appropriate physical
          interaction with a same aged peer in 80% of opportunties across 2
          peers.
        </div>
        <div>
          <h1>
            <span className="font-semibold">Materials : </span>
          </h1>
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
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

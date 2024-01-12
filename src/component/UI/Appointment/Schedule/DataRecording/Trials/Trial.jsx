import { Badge, Dropdown } from "antd";
import React, { useState } from "react";
import {
  IoMdInformationCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { RiArrowGoBackLine } from "react-icons/ri";
import ProgramNotes from "../Modals/ProgramNotes";
import { MdOutlineNotes } from "react-icons/md";
import ProgramInfoModal from "../Modals/ProgramInfoModal";

const Trial = ({ s }) => {
  // console.log(s);
  const [undo, setUndo] = useState(0);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [sessionProgram, setSessionProgram] = useState(false);

  const handleSessionProgram = () => {
    setSessionProgram(!sessionProgram);
  };
  const handleClickOpen = () => {
    setOpenProgramModal(true);
  };
  const handleClose = () => {
    setOpenProgramModal(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-2 ml-1">
        <div>
          <IoMdInformationCircleOutline onClick={handleSessionProgram} />
          {count > 0 && (
            <RiArrowGoBackLine onClick={handleDecrement} className="mt-1" />
          )}
        </div>
        <div>
          {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
          <div className="my-3 flex items-center gap-2  justify-center">
            <Badge count={count >= 0 ? count : 0} size="small" color="lime">
              <button
                onClick={handleIncrement}
                className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center"
              >
                {s}
              </button>
            </Badge>
          </div>
        </div>
        <div>
          <MdOutlineNotes onClick={handleClickOpen} title="Program Notes" />
        </div>
      </div>
      {openProgramModal && (
        <ProgramNotes
          title={"Cracker"}
          handleClose={handleClose}
          open={openProgramModal}
        ></ProgramNotes>
      )}
      {sessionProgram && (
        <ProgramInfoModal
          title={"Social/Play: Initiates Peer Interaction"}
          handleClose={handleSessionProgram}
          clicked={sessionProgram}
        ></ProgramInfoModal>
      )}
    </div>
  );
};

export default Trial;

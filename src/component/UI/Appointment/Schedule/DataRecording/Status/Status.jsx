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

const Status = ({ s }) => {
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
          <Dropdown
            dropdownRender={() => (
              <>
                <div className="w-[180px] mt-2">
                  <div className="bg-white border shadow-md rounded-md p-1">
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-green-200 text-center  border rounded-md font-semibold"
                    >
                      Independent
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-sky-200 text-center my-[2px] border rounded-md font-semibold"
                    >
                      Positional / Visual
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-purple-200 text-center my-[2px] border rounded-md font-semibold"
                    >
                      Verbal
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-violet-200 text-center my-[2px] border rounded-md font-semibold"
                    >
                      Gestural
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-yellow-200 text-center my-[2px] border rounded-md font-semibold"
                    >
                      Demonstrate
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-lime-200 text-center my-[2px] border rounded-md font-semibold"
                    >
                      Partial physical
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-rose-200 text-center my-[2px] border rounded-md font-semibold"
                    >
                      Full physical
                    </button>
                    <br />
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-gray-600 text-white text-center mt-[2px] border rounded-md font-semibold"
                    >
                      No Response
                    </button>
                    <br />
                  </div>
                </div>
              </>
            )}
            placement="bottom"
            arrow
            trigger={["click"]}
          >
            {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
            <div className="my-3 flex items-center gap-2  justify-center">
              <Badge count={count >= 0 ? count : 0} size="small" color="blue">
                <button
                  // onClick={handleIncrement}
                  className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center"
                >
                  {s}
                </button>
              </Badge>
            </div>
          </Dropdown>
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

export default Status;

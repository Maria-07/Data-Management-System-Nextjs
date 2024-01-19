import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import { BsSkipStartFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineNotes } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { RxResume } from "react-icons/rx";
import ProgramNotes from "../Modals/ProgramNotes";
import ProgramInfoModal from "../Modals/ProgramInfoModal";

const START_MINUTES = "00";
const START_SECOND = "00";
const START_DURATION = 100;

const TimeData = () => {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  const [undo, setUndo] = useState(0);
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

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };

  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);
    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      const interval = setInterval(function () {
        timer++;
        const minutes = parseInt(timer / 60, 10);
        const seconds = parseInt(timer % 60, 10);

        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        setMinutes(formattedMinutes);
        setSeconds(formattedSeconds);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, duration]);
  return (
    <div className=" text-sm mt-1 p-2">
      <div>
        <div className="flex items-center gap-2 ml-1">
          <div>
            <IoMdInformationCircleOutline onClick={handleSessionProgram} />

            <RiArrowGoBackLine onClick={() => {}} className="mt-1" />
          </div>
          {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
          <div className="my-3 flex items-center gap-2  justify-center">
            <Badge
              count={`${currentMinutes} : ${currentSeconds}`}
              size="large"
              color="#8294bb"
            >
              <button
                // onClick={handleIncrement}
                className="px-2 py-3 uppercase bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center"
              >
                Stimming
                <div className="time my-1">
                  {currentMinutes}
                  <span className="mx-3">:</span>
                  {currentSeconds}
                </div>
                <div className="flex items-center justify-center gap-1">
                  {!isRunning && !isStop && (
                    <button onClick={startHandler} className="">
                      <BsSkipStartFill title="Start" className="text-lg" />
                    </button>
                  )}
                  {isRunning && (
                    <button onClick={stopHandler} className="">
                      <FaStop title="Stop" />
                    </button>
                  )}

                  {isStop && (
                    <button onClick={resumeHandler} className="">
                      <RxResume
                        title="Resume"
                        className="text-white font-semibold text-lg"
                      />
                    </button>
                  )}

                  <button
                    onClick={resetHandler}
                    className=""
                    disabled={!isRunning && !isStop}
                  >
                    <BiReset
                      title="Reset"
                      className="text-white font-semibold text-lg"
                    />
                  </button>
                </div>
              </button>
            </Badge>
          </div>
          <div>
            <MdOutlineNotes onClick={handleClickOpen} title="Program Notes" />
          </div>
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

export default TimeData;

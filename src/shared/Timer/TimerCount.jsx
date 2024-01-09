import React, { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import { BsSkipStartFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import { GrPowerReset, GrResume } from "react-icons/gr";
import { RxResume } from "react-icons/rx";

const START_MINUTES = "00";
const START_SECOND = "00";
const START_DURATION = 100;

const TimerCount = () => {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

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
    <div className="bg-gray-600 text-white text-sm mt-1 p-2">
      <>
        <div className="flex items-center gap-3">
          <div className="time">
            {currentMinutes}
            <span className="mx-3">:</span>
            {currentSeconds}
          </div>
          <div className="flex items-center gap-1">
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
        </div>
      </>
    </div>
  );
};

export default TimerCount;

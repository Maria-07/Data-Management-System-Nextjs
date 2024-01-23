import { Dropdown, Tag, Tooltip } from "antd";
import { useState } from "react";
import { BsFillPinFill, BsPin, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck, FaGraduationCap, FaTrophy } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { PiNotepadBold } from "react-icons/pi";
import { TbPinnedFilled } from "react-icons/tb";

const ProgramCard = ({ handleSelectProgram }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [pin, setPin] = useState(false);

  const selectProgram = (programName) => {
    handleSelectProgram(programName);
    setIsSelected(!isSelected);
  };
  return (
    <div className={`border p-2 rounded-md ${isSelected && "bg-sky-200"}`}>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="mt-[2px]"
            onClick={() => {
              selectProgram("maria");
            }}
          />
          <h2 className="text-xs text-primary">Skill | Trial by Trial</h2>
        </div>
        <div className="flex items-center">
          <Dropdown
            dropdownRender={() => (
              <div className="bg-white w-[240px] border shadow-md rounded-sm">
                <div>
                  <button className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold">
                    <IoIosRemoveCircleOutline className="text-xl text-rose-600 " />
                    Remove from session
                  </button>
                </div>
              </div>
            )}
            placement="bottomRight"
            arrow
          >
            <BsThreeDotsVertical />
          </Dropdown>
          {pin ? (
            <BsFillPinFill
              onClick={() => {
                setPin(!pin);
              }}
              className="text-red-600 text-lg"
            />
          ) : (
            <BsPin
              onClick={() => {
                setPin(!pin);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <h1 className="text-sm font-semibold my-4">Behavior Reduction </h1>
      </div>
      <div className="flex">
        <div className="flex items-center gap-2 mr-3">
          <div
            title="0 targets being probed"
            className="border-orange-500 text-orange-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
          >
            <PiNotepadBold className="" /> 0
          </div>
          <div
            title="1 targets being acquisition"
            className="border-blue-500 text-blue-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
          >
            <FaGraduationCap /> 1
          </div>
          <div
            title="0 targets already mastered of these 0 are closed and not taught anymore"
            className="border-green-500 text-green-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
          >
            <FaTrophy /> 0
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;

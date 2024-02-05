import React, { useState } from "react";
import { FaPlus, FaPlusSquare } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

const PrimaryPhone = ({ adData }) => {
  const { phoneAppend, register, primaryPhone } = adData;
  const [value, setValue] = useState(primaryPhone);

  const setCountry = () => {};
  // console.log("primaryPhone", value);
  return (
    <>
      <label className="label">
        <span className=" label-font">Phone</span>
      </label>
      <div className="flex gap-1 items-center gap-x-2 gap-y-2">
        <div className=" ml-1">
          {/* package input field */}
          {/*<PhoneInput
            flags={flags}
            international
            initialValueFormat="national"
            className="input-border-bottom input-font py-[1px] w-[160px] focus:outline-none "
            defaultCountry="US"
            value={primaryPhone}
            {...register("phone_number")}
            onChange = {setCountry}
          />*/}

          <input
            type="text"
            placeholder="Phone"
            defaultValue={primaryPhone}
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("phone_number")}
          />
        </div>
        <div>
          <select
            className="input-border-bottom input-font pb-[1px] w-16 focus:outline-none"
            {...register("group")}
          >
            <option value="Work">Work</option>
            <option value="Mobile">Cell</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <FaPlusSquare onClick={() => phoneAppend()} size={30} />
        {/*<button
          onClick={() => phoneAppend()}
          className="bg-secondary text-white p-[4px]"
        >
          <FaPlus />
        </button>*/}
      </div>

      <div className="flex ml-1 mt-2 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            {...register("phonecheck")}
            defaultChecked={true}
            className="sr-only peer"
          />
          <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        </label>
        {/* <Switch
          size="small"
          checked={appointment ? true : false}
          onClick={() => setAppointment(!appointment)}
        /> */}
        <span className="text-xs ml-1 text-gray-700 font-medium">
          SMS Appointment Reminders
        </span>
      </div>
    </>
  );
};

export default PrimaryPhone;

import { Switch } from "antd";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const BasicInfo = ({ adData }) => {
  const { dob, setDob, setActive, active, settingRelation, register } = adData;

  return (
    <div>
      {/*
       <div className="flex ml-1 mt-1 mr-2 items-center justify-end">
        <Switch
          size="small"
          checked={active ? true : false}
          onClick={() => setActive(!active)}
        />
        <span className="text-[15px] ml-1 text-gray-700 gap-1 font-semibold">
          Active Patient
        </span>
      </div>
       */}
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 my-3 mr-2 gap-x-6 gap-y-1 ">
        {/* name  */}
        <div>
          <label className="label">
            <span className=" label-font">
              First Name<span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            name="first_name"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("first_name")}
          />
        </div>
        <div>
          <label className="label">
            <span className=" label-font">Middle Name</span>
          </label>
          <input
            type="text"
            name="middle_name"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("middle_name")}
          />
        </div>
        <div>
          <label className="label">
            <span className=" label-font">
              Last Name<span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            name="last_name"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("last_name")}
          />
        </div>
        {/* DOB */}
        <div>
          <label className="label">
            <span className=" label-font">
              Date of Birth<span className="text-red-500">*</span>
            </span>
          </label>
          <input
            className="input-border-bottom input-font  w-full focus:outline-none"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {/* <div ref={ref}>
                <input
                           className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium w-full ml-1 focus:outline-none pb-[0.8px]"
                  // value={`${month}/${day}/${year}`}
                  name="dob"
                  readOnly
                  onClick={() =>
                    setOpenCalendar((openCalendar) => !openCalendar)
                  }
                  {...register("dob")}
                />                                                 
                {openCalendar && (
                  <div className="absolute z-10 rounded">
                    <Calendar onChange={changeDate}></Calendar>
                    <div className="bg-white py-2 text-right rounded-b-[5px]">
                      <button
                        onClick={handleCancelDate}
                        className=" text-white py-1 mr-1 rounded px-2 bg-[#0AA7B8] hover:bg-red-700 hover:border-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div> */}
        </div>
        {/* gender */}
        <div className=" ">
          <label className="label">
            <span className=" label-font">
              Gender<span className="text-red-500">*</span>
            </span>
          </label>
          <select
            className="input-border-bottom input-font  w-full focus:outline-none"
            name="gender"
            {...register("gender")}
          >
            {/*api thekey gathered data jemon thakbey value thik same bhabey assign kortey hobey */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {/* RelationShip */}
        <div>
          <label className="label">
            <span className=" flex items-center label-font  ">
              RelationShip
              <AiOutlineQuestionCircle className="text-sm" />
              <span className="text-red-500">*</span>
            </span>
          </label>
          <select
            // defaultValue={relationship}
            {...register("relationship")}
            onChange={settingRelation}
            className="input-border-bottom mt-[7px] input-font  w-full focus:outline-none"
          >
            <option value="Self">Self</option>
            <option value="Spouse">Spouse</option>
            <option value="Other">Other</option>
            <option value="Child">Child</option>
            <option value="Grandfather or Grandmother">
              Grandfather or Grandmother
            </option>
            <option value="Grandson or Granddaughter">
              Grandson or Granddaughter
            </option>
            <option value="Nephew or Niece">Nephew or Niece</option>
            <option value="Adopter Child">Adopter Child</option>
            <option value="Foster Child">Foster Child</option>
            <option value="Stepson">Stepson</option>
            <option value="Ward">Ward</option>
            <option value="Stepdaughter">Stepdaughter</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className=" label-font">
              Login Email<span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            name="login_email"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("login_email")}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;

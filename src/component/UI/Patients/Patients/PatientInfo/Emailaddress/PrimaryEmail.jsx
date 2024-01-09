import React from "react";
import { FaPlus, FaPlusSquare } from "react-icons/fa";

const PrimaryEmail = ({ adData }) => {
  const { emailAppend, register, primaryEmail } = adData;
  return (
    <>
      <div className=" lg:mx-auto md:mx-0">
        <>
          <label className="label">
            <span className=" label-font">Email New</span>
          </label>
          <div className="flex items-center gap-x-3 gap-y-2">
            <div>
              <input
                type="text"
                name="email"
                className="input-border-bottom input-font w-full focus:outline-none"
                {...register("email")}
                defaultValue={primaryEmail}
              />
            </div>
            <div>
              <select
                className="input-border-bottom input-font mt-[2px] pb-[3px] w-16 focus:outline-none"
                {...register("group2")}
              >
                <option value="Work">Work</option>
                <option value="Home">Home</option>
                <option value="Family">family</option>
              </select>
            </div>
            <FaPlusSquare onClick={() => {
                emailAppend();
              }} size={30}/>
            {/*<button
              onClick={() => {
                emailAppend();
              }}
              className="bg-secondary text-white p-[4px] "
            >
              <FaPlus />
            </button>*/}
          </div>
          <div className="flex ml-1 mt-2 items-center">
            {/* <Switch
              size="small"
              checked={active ? true : false}
              onClick={() => setActive(!active)}
            /> */}

           {/* <label className="inline-flex relative items-center  cursor-pointer">
              <input
                type="checkbox"
                {...register("email_ok")}
                defaultChecked={false}
                className="sr-only peer"
              />
              <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>

            <span className="text-xs ml-1 text-gray-700 font-medium">
              Email OK
          </span> */}
          </div>

          <div className="flex ml-1 mt-1 items-center">
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("send_mail")}
                defaultChecked={true}
                className="sr-only peer"
              />
              <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
            <span className="text-xs ml-1 text-gray-700 font-medium">
              Send email appointment reminders
            </span>
          </div>
        </>
      </div>
    </>
  );
};

export default PrimaryEmail;

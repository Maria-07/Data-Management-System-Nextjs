import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DynamicEmail = ({ adData }) => {
  const { register, emailFields, emailRemove } = adData;
  return (
    <div>
      {emailFields.map((field, index) => {
        return (
          <div key={field.id}>
            <label className="label">
              <span className=" label-font">Email</span>
            </label>
            <div className="flex items-center gap-x-3 gap-y-2">
              <div>
                <input
                  type="text"
                  name="email"
                  className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                  {...register(`Email.${index}.email`)}
                  defaultValue={field.email}
                />
              </div>
              <div>
                <select
                  className="input-border-bottom input-font mt-[2px] w-16 focus:outline-none"
                  {...register(`group2${index}`)}
                >
                  <option value="work">work</option>
                  <option value="home">home</option>
                  <option value="family">family</option>
                </select>
              </div>
              <button
                onClick={() => emailRemove(index)}
                className="bg-red-500 text-white p-[4px] "
              >
                <RiDeleteBin6Line />
              </button>
            </div>
            <div className="flex ml-1 mt-2 items-center gap-1 flex-wrap ">
              <div className="">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`Email.${index}.checked`, {
                      // valueAsNumber: true,
                    })}
                    defaultChecked={field.checked}
                    className="sr-only peer"
                  />
                  <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
                {/* <Switch
           size="small"
           checked={active ? true : false}
           onClick={() => setActive(!active)}
         /> */}
                <span className="text-xs ml-1 text-gray-700 font-normal">
                  Email OK
                </span>
              </div>
            </div>

            <div className="flex ml-1 mt-1 items-center">
              {/* <Switch
         size="small"
         checked={active ? true : false}
         onClick={() => setActive(!active)}
       /> */}
              {/* custom tooggel */}
              <label className="inline-flex relative items-center  cursor-pointer">
                <input
                  type="checkbox"
                  {...register(`Email.${index}.sendMail`)}
                  defaultChecked={field.sendMail}
                  className="sr-only peer"
                />
                <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <span className="text-xs ml-1 text-gray-700 font-normal">
                Send email appointment reminders
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicEmail;

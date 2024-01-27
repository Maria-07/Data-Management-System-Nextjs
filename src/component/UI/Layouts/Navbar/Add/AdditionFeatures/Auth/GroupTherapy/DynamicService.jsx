import { Switch } from "antd";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";

const DynamicService = ({ register, fields, remove, setClientId }) => {
  return (
    <div>
      {fields?.map((field, i) => (
        <div key={i}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-3 mr-2 gap-1 md:gap-2">
            <label className="label">
              <span className="modal-label-name">Patient Name</span>
            </label>
            <select
              className="col-span-2 modal-input-field ml-1 w-full"
              {...register(`client_id[${i}]`)}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option disabled value={1}>
                Non-Billable Client
              </option>
            </select>
            <label className="label">
              ~<span className="modal-label-name">Service</span>
            </label>
            <div className="col-span-2">
              <div className="flex items-center ml-1 gap-2">
                <Switch
                  defaultChecked
                  className="mt-1"
                  size="small"
                  onClick={() => {}}
                />
                <label
                  className="form-check-label inline-block font-medium mt-1 text-[12px] text-gray-600"
                  htmlFor="flesmwitchCheckDefault"
                >
                  1232
                </label>
                <div className="text-primary font-medium flex items-center gap-1 ">
                  <TbArrowBack className="text-lg font-bold" />
                  Auth
                </div>
                <div className="text-primary font-bold ">
                  <MdDeleteForever
                    onClick={() => remove(i)}
                    className="ml-3 text-xl text-rose-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicService;

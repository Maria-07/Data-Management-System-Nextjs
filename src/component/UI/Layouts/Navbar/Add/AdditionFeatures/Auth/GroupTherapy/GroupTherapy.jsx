import { Switch } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";

const GroupTherapy = ({ register }) => {
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-3 mr-2 gap-1 md:gap-2">
        <label className="label">
          <span className="modal-label-name">Patient Name</span>
        </label>
        <select
          // disabled={patientsNameLoading || !billable ? true : false}
          className="col-span-2 modal-input-field ml-1 w-full"
          {...register("client_id")}
          onChange={(e) => setClientId(e.target.value)}
        >
          <option disabled value={1}>
            Non-Billable Client
          </option>
        </select>
        <>
          <label className="label">
            <span className="modal-label-name">Service</span>
          </label>
        </>
        <>
          <div className="col-span-2">
            <div className=" flex item-center ml-1 gap-2">
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
              <div className="text-primary font-bold mt-1 ">
                <FaPlus className="ml-4" />
              </div>
            </div>
          </div>
        </>
        <label className="label">
          <span className="modal-label-name">Provider Name</span>
        </label>
        <select
          // disabled={patientsNameLoading || !billable ? true : false}
          className="col-span-2 modal-input-field ml-1 w-full"
          {...register("provider")}
        >
          <option value="0"></option>
        </select>
      </div>
    </div>
  );
};

export default GroupTherapy;

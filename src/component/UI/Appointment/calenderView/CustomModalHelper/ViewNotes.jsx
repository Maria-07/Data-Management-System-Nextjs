import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";

const ViewNotes = ({ view, setView }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Modal
      open={view}
      centered
      footer={null}
      closable={false}
      width={425}
      className="box rounded-xl"
      bodyStyle={{
        padding: "5px",
      }}
    >
      <div className="px-5 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-left text-orange-400 ">ViewNotes</h1>

          <div className="flex justify-between">
            <IoCloseCircleOutline
              onClick={() => setView(!view)}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>
        </div>
        <div className="bg-gray-200 py-[1px] mt-3"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center text-[12px] text-gray-600 text-left">
              Select form
              </span>
            </label>
            <select
              className="border border-gray-300  col-span-2 rounded-sm px-2 py-1 mx-1 text-[12px] text-start w-full  mb-5"
              {...register("patient")}
            >
              <option value="">Select</option>
              <option value="Mr.Anik chowdhary">Mr.Anik chowdhary</option>
              <option value="Duck duck">Duck duck</option>
              <option value="Ashni Soni">Ashni Soni</option>
            </select>
          </div>

          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className=" flex items-end justify-end mt-2">
            <button className=" pms-button mr-2" type="submit">
              Add Appointment
            </button>

            <button className="pms-close-button" onClick={() => setView(!view)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ViewNotes;

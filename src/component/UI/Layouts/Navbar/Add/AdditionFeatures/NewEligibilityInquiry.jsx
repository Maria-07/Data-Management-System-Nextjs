import { Modal, Switch } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const NewEligibilityInquiry = ({ handleClose, eligibility }) => {
  const [billable, setBillable] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    reset();
  };
  return (
    <div>
      {" "}
      <Modal
        open={eligibility} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box rounded-xl "
      >
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400">
              New Eligibility Inquiry
            </h1>

            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-5 mr-2 gap-1 md:gap-2">
              <span className="modal-label-name ml-1"></span>
              <div className="col-span-2 ml-1">
                <Switch
                  defaultChecked
                  size="small"
                  onClick={() => {
                    setBillable(!billable);
                  }}
                />
                <label
                  className="form-check-label inline-block font-medium ml-2 text-[12px] text-gray-600"
                  htmlFor="flesmwitchCheckDefault"
                >
                  {billable ? "Billable" : "Non-Billable"}
                </label>
              </div>

              <label className="label">
                <span className="modal-label-name">Patient Name</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("patients")}
              >
                <option value=""></option>
                <option value="single">single</option>
                <option value="married">married</option>
              </select>
              <label className="label">
                <span className="modal-label-name">Auth</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("Auth")}
              >
                <option value=""></option>
                <option value="single">single</option>
                <option value="married">married</option>
              </select>
              <label className="label">
                <span className="modal-label-name">Benefit Type</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("benefit_type")}
              >
                <option value=""></option>
                <option value="single">single</option>
                <option value="married">married</option>
              </select>
              <label className="label">
                <span className="modal-label-name">Date</span>
              </label>
              <input
                name="check_date"
                type="date"
                className="col-span-2 modal-input-field ml-1 w-full px-2"
                {...register("check_date")}
              />
              <label className="label">
                <span className="modal-label-name">NPI</span>
              </label>
              <select
                className="col-span-2 modal-input-field ml-1 w-full"
                {...register("npi")}
              >
                <option value=""></option>
                <option value="single">single</option>
                <option value="married">married</option>
              </select>
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2">
              <button className=" dcm-button mr-2" type="submit">
                Request Eligibility
              </button>

              <button className="dcm-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewEligibilityInquiry;

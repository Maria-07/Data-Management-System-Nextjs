import { Modal, Switch } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const AddNewPhaseModal = ({ handleClose, clicked }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
  };
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <label className="text-lg text-left text-orange-400 ">
              Add New Phase
            </label>

            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <h1 className="label my-2">
              <span className="modal-label-name ">Add new phase</span>
            </h1>
            <input
              className="modal-input-field w-full"
              type="text"
              {...register("new_phase")}
            />

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2">
              <button className="dcm-button mr-2" type="submit">
                Ok
              </button>

              <button className="dcm-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
      add new phase
    </div>
  );
};

export default AddNewPhaseModal;

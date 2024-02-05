import { Modal } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const UploadNotes = ({ handleClose, open }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    reset();
  };
  //   console.log(editableRow);
  useEffect(() => {
    setTimeout(() => {
      reset({});
    }, 500);
  }, [reset]);
  return (
    <div>
      <div>
        <Modal
          width={450}
          open={open}
          centered
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
          className="box rounded-lg"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400">
                Upload Notes
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>
            <div className="bg-gray-200 py-[1px] my-3"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label">
                  <span className="modal-label-name">Select Form</span>
                </label>
                <select
                  className="modal-input-field ml-1 mt-2 w-full"
                  {...register("service")}
                >
                  <option value=""></option>
                  <option value="single">single</option>
                  <option value="married">married</option>
                </select>
              </div>
              <div className="mt-2">
                <h1 className="label">
                  <span className="modal-label-name">Upload</span>
                </h1>
                <input
                  type="file"
                  className="border-[1px] mt-1 mx-1 w-full rounded-md"
                  {...register("file")}
                />
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className=" flex items-end justify-end mt-2">
                <button className=" dcm-button mr-2" type="submit">
                  Upload Note
                </button>

                <button className="dcm-close-button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UploadNotes;

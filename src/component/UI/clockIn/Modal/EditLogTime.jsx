import { Input, Modal } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";

const { TextArea } = Input;

const EditLogTime = ({ handleClose, open }) => {
  const { register, handleSubmit, reset } = useForm();
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const onSubmit = (data) => {};
  return (
    <div>
      <Modal
        open={open}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              Add Log Time
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
              <div className="sm:col-span-2">
                <label className="label">
                  <div className="modal-label-name">Date</div>
                </label>
                <input
                  type="text"
                  name="clear_type"
                  className="modal-input-field ml-1 w-full"
                  {...register("clear_type")}
                />
              </div>

              <div>
                <label className="label">
                  <div className="modal-label-name">Clock in</div>
                </label>
                <input
                  type="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("date_issue")}
                />
              </div>
              <div>
                {" "}
                <label className="label">
                  <div className="modal-label-name">Clock out</div>
                </label>
                <input
                  type="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("date_expire")}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">
                  <div className="modal-label-name">Write Note Here:</div>
                </label>
                <TextArea
                  showCount
                  // style={{ height: 120, marginBottom: 24 }}
                  rows={3}
                  onChange={onChange}
                  className=""
                  placeholder="can resize"
                />
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-10"></div>
            <div className=" flex items-end justify-end mt-2 gap-2">
              <button className="dcm-modal-submit-button" type="submit">
                Update Log Time
              </button>

              <button className="dcm-modal-close-button" onClick={handleClose}>
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditLogTime;

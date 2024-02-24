import { Input } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
const { TextArea } = Input;

const BlockOfTime = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-5 mr-2 gap-2">
          <div>
            <input
              type="date"
              name="date"
              className="modal-input-field ml-1 w-3/4"
              {...register("date", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <div className="w-full">
              <label className="label">
                <h1 className="modal-label-name">Start Time</h1>
              </label>{" "}
              <input
                type="time"
                name="date"
                className="modal-input-field ml-1 w-3/4"
                {...register("date")}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <h1 className="modal-label-name">End Time</h1>
              </label>
              <input
                type="time"
                name="date"
                className="modal-input-field ml-1 w-3/4"
                {...register("date")}
              />
            </div>
          </div>
          <div className="col-span-2 ml-2">
            {" "}
            <div>
              <label className="label">
                <h1 className="modal-label-name">Description</h1>
              </label>
              <TextArea
                className="input-border input-font py-[1px] w-full focus:outline-none"
                {...register("additionalInfo")}
                rows={4}
                cols={40}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlockOfTime;

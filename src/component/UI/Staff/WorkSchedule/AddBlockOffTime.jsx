import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import WeekDaySelect from "./WeekDayMultiSelect/WeekDaySelect";
import { useCreateBlockOfftimeMutation } from "@/Redux/features/staff/workingSchedule/workingScheduleApi";

const AddBlockOffTime = ({ handleClose, open, staff_id, token }) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectType, setSelectType] = useState("1");

  //For Selecting Week Days
  const [selectedId, setServiceId] = useState();
  // console.log("seleted data", selectedId);
  // console.log(selectType);

  const [createBlockOfftime, { isSuccess: createdSuccess }] =
    useCreateBlockOfftimeMutation();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      staff_id: staff_id,
      type:
        selectType === "1"
          ? "Daily"
          : selectType === "2"
          ? "Week Day"
          : "Specific Date",
      week_days:
        selectedId?.length > 0 && selectType === "2" ? selectedId : null,
      date: selectType === "3" ? data?.specific_date : null,
    };
    // console.log(payload);
    if (payload) {
      const res = createBlockOfftime({
        token,
        payload,
      });
      // console.log("res", res);
    }
  };

  useEffect(() => {
    if (createdSuccess) {
      handleClose();
      toast.success("successfully added the block-off time", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [createdSuccess, handleClose]);

  return (
    <div>
      <Modal
        // fullScreen={fullScreen}
        open={open}
        centered
        width={600}
        footer={false}
        closable={false}
        bodyStyle={{ padding: "0" }}
        className="box rounded-md"
      >
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              Add Block Time Off
            </h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-1">
              <div>
                <label className="label">
                  <span className="modal-label-name">
                    Select Type <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  className="modal-input-field ml-1 w-full"
                  onChange={(e) => setSelectType(e.target.value)}
                  defaultValue={selectType}
                >
                  <option value={1}>Daily</option>
                  <option value={2}>Specific Days</option>
                  <option value={3}>Specific Date</option>
                </select>
              </div>
              {selectType === "2" && (
                <div>
                  <label className="label">
                    <span className="modal-label-name">Week Day</span>
                  </label>
                  {/* <input type="date" className="modal-input-field ml-1 w-full" {...register("week_day")} /> */}
                  <WeekDaySelect setServiceId={setServiceId} />
                </div>
              )}
              {selectType === "3" && (
                <div>
                  <label className="label">
                    <span className="modal-label-name">Specific Date</span>
                  </label>
                  <input
                    type="date"
                    className="modal-input-field ml-1 w-full"
                    {...register("specific_date")}
                  />
                </div>
              )}

              <div>
                <label className="label">
                  <span className="modal-label-name">Start Time</span>
                </label>
                <input
                  type="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("start_time")}
                />
              </div>
              <div>
                {" "}
                <label className="label">
                  <span className="modal-label-name">End Time</span>
                </label>
                <input
                  type="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("end_time")}
                />
              </div>
            </div>
            <div className="">
              <label className="label">
                <span>Description</span>
              </label>
              <textarea
                type="text"
                name="description"
                rows={4}
                placeholder="Description"
                size="middle"
                className="border border-gray-400 rounded-md w-full focus:outline-none p-2 text-sm text-gray-6"
                {...register("description")}
              />
            </div>
            <div className=" flex items-end justify-end mt-2">
              <button className=" pms-button mr-2" type="submit">
                Save
              </button>

              <button className="pms-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddBlockOffTime;

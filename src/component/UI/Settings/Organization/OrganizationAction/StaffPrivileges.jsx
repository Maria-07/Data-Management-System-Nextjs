import { Modal } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
const StaffPrivileges = ({ handleClose, clicked, role }) => {
  const items = [
    "",
    "",
    "Start session with pending activities",
    "Leave sessions open when finishing data collection",
    "Comment on sessions",
    "Sign any signature request",
    "Change to any session note template",
    "Reopen and edit activities",
    "Unrender activities",
    "Preserve signatures when reopening/editing activities",
    "Change time frame of own activities",
    "Change time frame of others' activities",
  ];
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
        width={700}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              <span className="text-primary">{role}</span> Privileges
            </h1>
            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5">
              <div className=" bg-primary text-white  rounded-t-lg">
                <button
                  type="button"
                  className=" px-5 flex items-center gap-2 width-[100%] py-1 text-[16px] font-semibold"
                >
                  Programs
                </button>
              </div>
              <div className="flex items-center gap-5 border-[1px] py-5 px-5 flex-wrap">
                {" "}
                <div className="flex items-center gap-2  ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("new_target")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">Add new targets</h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Manually change target status
                  </h1>
                </div>
              </div>
            </div>
            <div className="my-5">
              <div className=" bg-primary text-white  rounded-t-lg">
                <button
                  type="button"
                  className=" px-5 flex items-center gap-2 width-[100%] py-1 text-[16px] font-semibold"
                >
                  Sessions
                </button>
              </div>
              <div className="flex items-center gap-5 border-[1px] py-5 px-5 flex-wrap">
                {" "}
                <div className="flex items-center gap-2  ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("new_target")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Start session with pending activities
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Comment on sessions
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Sign any signature request
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Change to any session note template
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Leave sessions open when finishing data collection
                  </h1>
                </div>
              </div>
            </div>
            <div className="my-5">
              <div className=" bg-primary text-white  rounded-t-lg">
                <button
                  type="button"
                  className=" px-5 flex items-center gap-2 width-[100%] py-1 text-[16px] font-semibold"
                >
                  Activities
                </button>
              </div>
              <div className="flex items-center gap-5 border-[1px] py-5 px-5 flex-wrap">
                {" "}
                <div className="flex items-center gap-2  ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("new_target")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Reopen and edit activities
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Unrender activities
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Preserve signatures when reopening/editing activities
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Change time frame of own activities
                  </h1>
                </div>
                <div className="flex items-center gap-2 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Change time frame of other&apos;s activities
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 pt-[1px] mt-3"></div>
            <div className="flex items-end justify-end gap-2 mt-2">
              <button className=" border-secondary flex items-center border rounded-sm">
                <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  Save
                </span>
              </button>
              <button
                className=" border-rose-600 flex items-center border rounded-sm"
                onClick={handleClose}
              >
                <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StaffPrivileges;

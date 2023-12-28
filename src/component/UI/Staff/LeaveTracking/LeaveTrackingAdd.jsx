import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAddLeaveTrackingMutation } from "@/Redux/features/staff/leaveTracking/leaveTrackingApi";

const LeaveTrackingAdd = ({ handleClose, open, id, token }) => {
  const { register, handleSubmit, reset } = useForm();

  // Add new leave api
  const [
    addLeaveTracking,
    {
      data: addleaveTrackdata,
      isSuccess: addleaveTrackSuccess,
      isError: addleaveTrackError,
    },
  ] = useAddLeaveTrackingMutation();

  const onSubmit = (data) => {
    const addTrackPaylod = {
      //employee_id: id,
      leave_date: data.date,
      description: data.desc,
    };
    console.log(addTrackPaylod);
    addLeaveTracking({
      token,
      payload: addTrackPaylod,
    });
  };
  //Success/Error message show
  useEffect(() => {
    if (addleaveTrackSuccess) {
      toast.success(addleaveTrackdata?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      reset();
      handleClose();
    } else if (addleaveTrackError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [
    addleaveTrackError,
    addleaveTrackSuccess,
    addleaveTrackdata?.message,
    handleClose,
    reset,
  ]);

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
        <div className="px-2 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">Apply Leave</h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div>
                <label className="label">
                  <span className="modal-label-name">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-full"
                  {...register("date")}
                />
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">Description</span>
                </label>

                <textarea
                  rows={4}
                  placeholder="maxLength is 6"
                  size="middle"
                  className="w-full border bottom-2 ml-1 p-1"
                  {...register("desc")}
                />
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className=" flex item-center justify-end gap-4 flex-wrap">
                <div className="mt-4">
                  <button className="mr-2 dcm-button" type="submit">
                    Apply Leave
                  </button>
                  {/* onClick={() => setTimeOpen(false)} */}
                  <button
                    className="dcm-close-button"
                    onClick={handleClose}
                    autoFocus
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveTrackingAdd;

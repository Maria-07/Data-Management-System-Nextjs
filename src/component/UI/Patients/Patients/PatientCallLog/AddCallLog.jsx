import { Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useCreateCalllogMutation } from "@/Redux/features/patient/calllog/calllogApi";
import { useEffect } from "react";

const AddCallLog = ({ handleClose, open, patientId }) => {
  const token = getAccessToken();
  const { register, handleSubmit } = useForm();
  const [textNotes, setTextNotes] = useState();
  const [createCalllog, { isSuccess: updateSuccess, isError: updateError }] =
  useCreateCalllogMutation();
      //To show Toast
      useEffect(() => {
        if (updateSuccess) {
          handleClose();
          toast.success("Successfully Added", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
          setTimeout(()=>{
            window.location.reload();
          },3000)         
        } else if (updateError) {
          toast.error("Some Error Occured", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
        }
      }, [updateSuccess, updateError, handleClose]);
  const onSubmit = (data) => {
    const payload = {
      patient_id: patientId,
      log_date: data?.expiry_Date,
      call_log: textNotes
    };
    console.log(payload);
    if (payload) {
      createCalllog({
        token,
        payload,
      });
    }
  };
  return (
    <div>
      <div>
        <Modal
          // fullScreen={fullScreen}
          open={open}
          centered
          width={450}
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
          className="box rounded-md"
        >
          <div className=" ">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400 ">
                Add Call Log
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 font-semibold  text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid grid-cols-1 my-3 mr-2 gap-x-2 gap-y-1">
                <div>
                  <label className="label">
                    <span className="modal-label-name">Write Log Here:</span>
                  </label>
                  <textarea
                    {...register("notes")}
                    onChange={(e) => setTextNotes(e.target.value)}
                    name="comment"
                    className="border border-gray-300 text-sm p-2  ml-1 h-24 w-full"
                  ></textarea>
                </div>

                <div>
                  <label className="label">
                    <span className="modal-label-name">Date</span>
                  </label>
                  <input
                    type="date"
                    // className="border border-gray-300 rounded-sm py-[4px] mx-1 text-xs w-full"
                    className="modal-input-field ml-1 w-full"
                    {...register("expiry_Date")}
                  />
                </div>
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className="flex gap-3 items-end justify-end mb-2 mt-4">
                <button type="submit" className="dcm-modal-submit-button">
                  Ok
                </button>
                <button
                  onClick={handleClose}
                  className="dcm-modal-close-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AddCallLog;

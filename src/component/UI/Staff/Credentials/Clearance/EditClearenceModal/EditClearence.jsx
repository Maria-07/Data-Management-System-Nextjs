import {
  useClearenceInfoQuery,
  useUpdateClearenceMutation,
} from "@/Redux/features/staff/credentials/clearenceApi";
import { Modal } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const EditClearence = ({ handleClose, open, clearenceInfo, token, id }) => {
  console.log(clearenceInfo);

  //Getting clearence info data api
  const {
    data: clearenceData,
    isLoading,
    isSuccess,
  } = useClearenceInfoQuery({ token, id: clearenceInfo?.id });

  //Update clearence info data api
  const [updateClearence, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateClearenceMutation();

  const {
    clearance_name,
    clearance_date_issue,
    clearance_date_exp,
    clearance_applicable,
  } = clearenceData?.employeeClearance || {}; //api tey bhul

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const payload = {
      clear_id: clearenceInfo.id,
      clear_type: data?.clear_type,
      date_issue: data?.date_issue,
      date_expire: data?.date_expire,
      //0/1 hobey cred_apply
      clear_apply: data?.clear_apply ? 1 : 0,
      // cred_file: null,
    };
    console.log("clearance", payload);
    if (payload) {
      updateClearence({
        token,
        payload,
      });
    }
  };

  //To show default data in the form
  useEffect(() => {
    setTimeout(() => {
      reset({
        clear_type: clearance_name,
        clear_apply: clearance_applicable ? true : false,
        date_expire: clearance_date_exp,
        date_issue: clearance_date_issue,
      });
    }, 500);
  }, [
    reset,
    clearance_name,
    clearance_applicable,
    clearance_date_exp,
    clearance_date_issue,
  ]);

  //To show Toast
  useEffect(() => {
    if (updateSuccess) {
      handleClose();
      toast.success("Successfully Added", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else if (updateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  }, [updateSuccess, updateError, handleClose]);
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
            <h1 className="text-lg text-left text-orange-400 ">Credential</h1>
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
                    Clearance<span className="text-red-500">*</span>
                  </span>
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
                  <span className="modal-label-name">Date Issued</span>
                </label>
                <input
                  type="date"
                  className="modal-input-field ml-1 w-full"
                  {...register("date_issue")}
                />
              </div>
              <div>
                {" "}
                <label className="label">
                  <span className="modal-label-name">Expiry Date</span>
                </label>
                <input
                  type="date"
                  className="modal-input-field ml-1 w-full"
                  {...register("date_expire")}
                />
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">Upload File</span>
                </label>
                <input
                  type="file"
                  className=" px-2 py-[5px] mx-1 text-xs w-full"
                  {...register("fileName")}
                />
              </div>
              <div className="flex ml-1 mt-4 gap-2 items-center">
                <input
                  type="checkbox"
                  name="clear_apply"
                  {...register("clear_apply")}
                />
                <span className="modal-label-name">
                  Credential Not Applicable
                </span>
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2 gap-2">
              <button className="dcm-modal-submit-button" type="submit">
                Save
              </button>

              <button className="dcm-modal-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditClearence;

import {
  useGetQualificationInfoQuery,
  useUpdateQualificationMutation,
} from "@/Redux/features/staff/credentials/qualificationApi";
import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const EditQualification = ({
  handleClose,
  open,
  qualificationInfo,
  token,
  id,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageData, setImageData] = useState(null);
  const [filenameData, setFilenameData] = useState(null);

  //Getting qualification info data api

  /*const { data: qualificationData } = useGetQualificationInfoQuery({
    token,
    id: qualificationInfo,
  });
  // console.log(qualificationData);*/
  // console.log("qualificationInfo", qualificationInfo);
  const qdata = {
    qualification_name: qualificationInfo.qualification_name,
    qualification_date_issue: qualificationInfo.qualification_date_issue,
    qualification_date_exp: qualificationInfo.qualification_date_expired,
    qualification_applicable:
      qualificationInfo.qualification_applicable != "No"
        ? qualificationInfo.qualification_applicable
        : "",
  };

  const {
    qualification_name,
    qualification_date_issue,
    qualification_date_exp,
    qualification_applicable,
  } = qdata || {};

  // To show default data in the form
  useEffect(() => {
    setTimeout(() => {
      reset({
        clear_type: qualification_name,
        clear_apply: qualification_applicable ? true : false,
        date_expire: qualification_date_exp,
        date_issue: qualification_date_issue,
      });
    }, 500);
  }, [
    qualification_applicable,
    qualification_date_exp,
    qualification_date_issue,
    qualification_name,
    reset,
  ]);

  //Update qualification info data api
  const [
    updateQualification,
    { isSuccess: updateSuccess, isError: updateError },
  ] = useUpdateQualificationMutation();
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    setFilenameData(file.name);
    const base64 = await convertBase64(file);
    setImageData(base64);
  };
  const onSubmit = (data) => {
    // console.log(data);
    const payload = {
      qualification_id: qualificationInfo.qualification_id,
      qualification_name: data?.clear_type,
      qualification_date_issue: data?.date_issue,
      qualification_date_expired: data?.date_expire,
      file_name: filenameData,
      qualification_applicable: data?.clear_apply,
      file: imageData,
    };
    // console.log("qualification paylod", payload);
    if (payload) {
      updateQualification({
        token,
        payload,
      });
    }
  };

  //To show Toast
  useEffect(() => {
    if (updateSuccess) {
      handleClose();
      toast.success("Successfully Updated", {
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
            <h1 className="text-lg text-left text-orange-400 ">
              Edit Qualification
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
                    Qualification<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="clear_type"
                  className="modal-input-field ml-1 w-full"
                  {...register("clear_type", {
                    required: {
                      value: true,
                      message: "Please enter the qualification",
                    },
                  })}
                />
                {errors.clear_type?.type === "required" && (
                  <p className=" pl-1 text-red-500">
                    {errors.clear_type.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="modal-label-name">
                    Date Issued<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  className="modal-input-field ml-1 w-full"
                  {...register("date_issue", {
                    required: {
                      value: true,
                      message: "Please enter the date of issued",
                    },
                  })}
                />
                {errors.date_issue?.type === "required" && (
                  <p className=" pl-1 text-red-500">
                    {errors.date_issue.message}
                  </p>
                )}
              </div>
              <div>
                {" "}
                <label className="label">
                  <span className="modal-label-name">
                    Expiry Date<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  className="modal-input-field ml-1 w-full"
                  {...register("date_expire", {
                    required: {
                      value: true,
                      message: "Please enter the expiry date",
                    },
                  })}
                />
                {errors.date_expire?.type === "required" && (
                  <p className=" pl-1 text-red-500">
                    {errors.date_expire.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">Upload File</span>
                </label>
                <input
                  type="file"
                  className=" px-2 py-[5px] mx-1 text-xs w-full"
                  {...register("fileName")}
                  onChange={handleFileRead}
                />
              </div>
              <div className="flex ml-1 mt-1 gap-2 items-center">
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

export default EditQualification;

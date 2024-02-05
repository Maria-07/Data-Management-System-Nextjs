import { useAddQualificationMutation } from "@/Redux/features/staff/credentials/qualificationApi";
import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const AddQualification = ({ handleClose, open, token, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageData, setImageData] = useState(null);
  const [filenameData, setFilenameData] = useState(null);

  // Add credential Api
  const [
    addQualification,
    { isSuccess: addQualificationSuccess, isError: addQualificationError },
  ] = useAddQualificationMutation();
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
    const payload = {
      qualification_name: data?.cred_type,
      qualification_date_issue: data?.date_issue,
      qualification_date_expired: data?.expiry_Date,
      file_name: filenameData,
      qualification_applicable: data?.cred_apply,
      file: imageData,
    };
    // console.log("post data", payload);
    if (payload) {
      addQualification({
        token,
        payload,
      });
    }
    // console.log(payload);
    // console.log("normal data", data);
  };

  useEffect(() => {
    if (addQualificationSuccess) {
      handleClose();
      toast.success("Successfully Added", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } else if (addQualificationError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
    //handleClose dependency tey na dileo choley cuz aita change hoy na
  }, [addQualificationSuccess, addQualificationError, handleClose]);
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
              Add Qualification
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
                  <span className="model-label-name">
                    Qualification<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="cred_type"
                  className="modal-input-field ml-1 w-full"
                  {...register("cred_type", {
                    required: {
                      value: true,
                      message: "Please enter the qualification",
                    },
                  })}
                />
                {errors.cred_type?.type === "required" && (
                  <p className=" pl-1 text-red-500">
                    {errors.cred_type.message}
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
                  {...register("expiry_Date", {
                    required: {
                      value: true,
                      message: "Please enter the expiry date",
                    },
                  })}
                />
                {errors.expiry_Date?.type === "required" && (
                  <p className=" pl-1 text-red-500">
                    {errors.expiry_Date.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">
                    Upload File<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="file"
                  className=" px-2 py-[5px] mx-1 text-xs w-full"
                  {...register("fileName", {
                    required: {
                      value: true,
                      message: "Please upload the file",
                    },
                  })}
                  onChange={handleFileRead}
                />
                {errors.fileName?.type === "required" && (
                  <p className=" pl-1 text-red-500">
                    {errors.fileName.message}
                  </p>
                )}
              </div>
              <div className="flex ml-1 mt-1 gap-2 items-center">
                <input
                  type="checkbox"
                  name="cred_apply"
                  {...register("cred_apply")}
                />
                <span className="modal-label-name">
                  Credential Not Applicable
                </span>
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2 gap-2">
              <button className="dcm-modal-submit-button " type="submit">
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
export default AddQualification;

import { useAddQualificationMutation } from "@/Redux/features/staff/credentials/qualificationApi";
import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const AddQualification = ({ handleClose, open, token, id }) => {
  const { register, handleSubmit, reset } = useForm();
  const [imageData,setImageData] = useState(null);
  const [filenameData,setFilenameData] = useState(null);

  // Add credential Api
  const [
    addQualification,
    { isSuccess: addQualificationSuccess, isError: addQualificationError },
  ] = useAddQualificationMutation();
  const convertBase64 =  (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

const handleFileRead = async (event) => {
  const file = event.target.files[0];
  setFilenameData(file.name);
  const base64 =  await convertBase64(file);
  setImageData(base64);
}
  const onSubmit = (data) => {
    const payload = {
      qualification_name: data?.cred_type,
      qualification_date_issue: data?.date_issue,
      qualification_date_expired: data?.expiry_Date,
      file_name:filenameData,
      qualification_applicable: data?.cred_apply,
      file: imageData,
    };
    console.log("post data", payload);
    if (payload) {
      addQualification({
        token,
        payload,
      });
    }
    console.log(payload);
    console.log("normal data", data);
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
              Qualification
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
                  <span className=" label-font">
                    Qualification<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="cred_type"
                  className="modal-input-field ml-1 w-full"
                  {...register("cred_type")}
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
                  {...register("expiry_Date")}
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
                  onChange={handleFileRead}
                />
              </div>
              <div className="flex ml-1 mt-1 gap-2 items-center">
                <input
                  type="checkbox"
                  name="cred_apply"
                  {...register("cred_apply")}
                />
                <span className="modal-label-name">
                  Qualification Not Applicable
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

import { Modal } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Switch } from "antd/lib";
import { useState } from "react";
import { useCreatePatientDocMutation } from "@/Redux/features/patient/patient-documents/patientDocumentApi";

const AddDocuments = ({ handleClose, open, token, patientId, documentId, documentName }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageData,setImageData] = useState(null);
  const [filenameData,setFilenameData] = useState(null);
  const [isStatus, setStatus] = useState(false);
 
  const switchHandler = () => {
    setStatus((status) => !status);
  };

    // Add credential Api
  const [
    addDocuemnts,
    { isSuccess: addDocumentSuccess, isError: addDocumentError },
  ] = useCreatePatientDocMutation();
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

  // console.log("data updated", data);
  const onSubmit = (data) => {
    //console.log(data);

    // const payload = {
    //   client_id: id,
    //   description: data.description,
    //   exp_date: data.expiry_Date,
    //   file_name: data.fileName,
    // };
    // addDocuemnts({ token, payload });
    const payload = {
      patient_id:patientId,
      document_type:documentId,
      description: data.description,
      document_expiration_date:data.expiry_Date,
      notify: isStatus,
      file_name:filenameData,
      file: imageData,
    }
    console.log(payload);
    if (payload) {
      addDocuemnts({
        token,
        payload,
      });
    }
    reset();
  };

  useEffect(() => {
    if (addDocumentSuccess) {
      handleClose();
      toast.success("Successfully Added", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } else if (addDocumentError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
    //handleClose dependency tey na dileo choley cuz aita change hoy na
  }, [addDocumentSuccess, addDocumentError, handleClose]);

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
        <div className="px-5 py-2 ">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              Add Document - {documentName}
            </h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 font-semibold  text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-1">
              <div>
                <label className="label">
                  <span className="modal-label-name">Description</span><span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  className="modal-input-field ml-1 w-full"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Please enter the description",
                    }
                  })}
                />
                <span className="label-text-alt">
                  {errors.description?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.description.message}
                    </p>
                  )}
                </span>
              </div>

              <div>
                {" "}
                <label className="label">
                  <span className="modal-label-name">Expiry Date</span><span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  // className="border border-gray-300 rounded-sm py-[4px] mx-1 text-xs w-full"
                  className="modal-input-field ml-1 w-full"
                  {...register("expiry_Date", {
                    required: {
                      value: true,
                      message: "Please select the expiry date",
                    }
                  })}
                />
                <span className="label-text-alt">
                  {errors.expiry_Date?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.expiry_Date.message}
                    </p>
                  )}
                </span>
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">Upload File</span><span class="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className=" py-[5px] mx-1 text-xs w-full"
                  {...register("fileName", {
                    required: {
                      value: true,
                      message: "Please upload the document",
                    }
                  })}                  
                  onChange={handleFileRead}
                />
                <span className="label-text-alt">
                  {errors.fileName?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.fileName.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <Switch
                  size="small"
                  name="notify"
                  onChange={switchHandler} checked={isStatus}
                />
                <span className="text-[14px] ml-2 font-medium text-gray-500">
                  Placeholder
                </span>
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className="flex gap-3 items-end justify-end mb-2 mt-4">
                <button type="submit" className="dcm-modal-submit-button">
                  Save
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
  );
};

export default AddDocuments;

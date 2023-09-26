import { Modal } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const AddDocuments = ({ handleClose, open }) => {
  const { register, handleSubmit, reset } = useForm();

  // console.log("data updated", data);
  const onSubmit = (data) => {
    console.log(data);

    // const payload = {
    //   client_id: id,
    //   description: data.description,
    //   exp_date: data.expiry_Date,
    //   file_name: data.fileName,
    // };
    // addDocuemnts({ token, payload });
    reset();
  };

  //Success/Error message show added api
  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data?.message, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //     handleClose();
  //   } else if (isError) {
  //     toast.error("Some Error Occured", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //   }
  // }, [data?.message, handleClose, isError, isSuccess]);

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
              Edit Document
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
                  <span className="modal-label-name">Description</span>
                </label>
                <input
                  type="text"
                  name="description"
                  className="modal-input-field ml-1 w-full"
                  {...register("description")}
                />
              </div>

              <div>
                {" "}
                <label className="label">
                  <span className="modal-label-name">Expiry Date</span>
                </label>
                <input
                  type="date"
                  // className="border border-gray-300 rounded-sm py-[4px] mx-1 text-xs w-full"
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
                  className=" py-[5px] mx-1 text-xs w-full"
                  {...register("fileName")}
                />
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
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

export default AddDocuments;

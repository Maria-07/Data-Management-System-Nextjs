import { Modal } from "antd";
import React from "react";
import { useForm, useEffect } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const DocumentView = ({ handleClose, open, imageData }) => {
  console.log("imageData", imageData);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div>
        <Modal
          // fullScreen={fullScreen}
          open={open}
          centered
          width={500}
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
          className="box rounded-md"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400 ">
                View Document
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 font-semibold  text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div>
              <p className="my-5">
                <img
                  src={
                    "data:image/jpeg;base64," +
                    imageData.file.replace("dataimage/jpegbase64", "")
                  }
                />
              </p>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className="flex gap-3 items-end justify-end mb-2 mt-4">
                <button
                  onClick={handleClose}
                  className="dcm-modal-close-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DocumentView;

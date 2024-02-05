import { Modal } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteSession = ({ handleClose, open }) => {
  return (
    <div>
      <Modal
        open={open}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="px-0 py-2 font-[poppins,sans-serif]">
          <div className="flex items-center justify-between">
            <h1 className="text-base text-left text-orange-400 ">
              DELETE CONFIRM
            </h1>

            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className="text-center my-4">
            Do you really want to delete this session and all associated data
            permanently?
          </div>
          <div className=" flex items-end justify-end mt-2">
            <button className="dcm-button mr-2">DELETE</button>

            <button className="dcm-close-button" onClick={handleClose}>
              CLOSE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteSession;

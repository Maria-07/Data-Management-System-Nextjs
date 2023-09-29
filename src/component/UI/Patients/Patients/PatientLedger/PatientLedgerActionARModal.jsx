import React from "react";
import PatientActionModalAREdit from "./PatientActionModalAREdit";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Modal } from "antd";

const PatientLedgerActionARModal = ({ handleClose, open, row }) => {
  return (
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
        <div className=" py-2">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-lg text-left text-orange-400 ">
              Edit Document
            </h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 font-medium text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className="h-[350px] mt-2 overflow-scroll pl-3">
            <PatientActionModalAREdit></PatientActionModalAREdit>
            <PatientActionModalAREdit></PatientActionModalAREdit>
            <PatientActionModalAREdit></PatientActionModalAREdit>
            <PatientActionModalAREdit></PatientActionModalAREdit>
            <PatientActionModalAREdit></PatientActionModalAREdit>
            <PatientActionModalAREdit></PatientActionModalAREdit>
            <PatientActionModalAREdit></PatientActionModalAREdit>
          </div>
          <div className=" flex items-end justify-end mt-2 px-3">
            <button
              className=" py-[5px] font-normal px-3 mr-1 text-xs  bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-sm"
              type="submit"
            >
              Save
            </button>

            <button
              className=" py-[5px]  px-3  text-xs font-normal bg-gradient-to-r  from-red-700 to-red-400  hover:to-red-700 text-white rounded-sm"
              autoFocus
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientLedgerActionARModal;

import React, { useState } from "react";
import { BiPlusCircle, BiCommentDetail } from "react-icons/bi";
import PatientLedgerActionARModal from "./PatientLedgerActionARModal";
import PatientLedgerActionModal from "./PatientLedgerActionModal";

const PatientLedgerAction = ({ row }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openARFollowup, setOpenARFollowup] = useState(false);
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleArClickOpen = () => {
    setOpenARFollowup(true);
  };

  const handleArClose = () => {
    setOpenARFollowup(false);
  };

  console.log("row=", row);
  return (
    <div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleClickOpen}
          className="text-secondary text-[16px]"
        >
          <BiPlusCircle />
        </button>
        <button
          onClick={handleArClickOpen}
          className="text-sm mx-1 text-secondary"
        >
          <BiCommentDetail />
        </button>
      </div>
      {openEditModal && (
        <PatientLedgerActionModal
          handleClose={handleClose}
          open={openEditModal}
          row={row}
        ></PatientLedgerActionModal>
      )}
      {openARFollowup && (
        <PatientLedgerActionARModal
          handleClose={handleArClose}
          open={openARFollowup}
          row={row}
        ></PatientLedgerActionARModal>
      )}
    </div>
  );
};

export default PatientLedgerAction;

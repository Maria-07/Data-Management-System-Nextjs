import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import EditCallLog from "./EditCallLog";
import CallLogView from "./CallLogView";

const CallLogEdit = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [viewCallLog, setViewCallLog] = useState(false);
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const handleCallLogView = () => {
    setViewCallLog(true);
  };
  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleViewClose = () => {
    setViewCallLog(false);
  };
  return (
    <div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleCallLogView}
          title="View Call Log"
          className="text-sm mx-1 text-green-600"
        >
          <AiOutlineEye />
        </button>
        <button
          title="Edit Call Log"
          onClick={handleClickOpen}
          className="text-secondary"
        >
          <AiOutlineEdit />
        </button>
        <button
          //   onClick={() => handleDelete(id)}
          className="text-sm mx-1 text-rose-600"
        >
          <AiOutlineDelete />
        </button>
      </div>
      {openEditModal && (
        <EditCallLog
          handleClose={handleClose}
          open={openEditModal}
        ></EditCallLog>
      )}
      {viewCallLog && (
        <CallLogView
          handleClose={handleViewClose}
          open={viewCallLog}
        ></CallLogView>
      )}
    </div>
  );
};

export default CallLogEdit;

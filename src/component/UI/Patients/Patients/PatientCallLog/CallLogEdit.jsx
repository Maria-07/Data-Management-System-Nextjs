import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import EditCallLog from "./EditCallLog";
import CallLogView from "./CallLogView";
import { useDeleteCalllogMutation } from "@/Redux/features/patient/calllog/calllogApi";
import { toast } from "react-toastify";
import { getAccessToken } from "@/Redux/api/apiSlice";

const CallLogEdit = ({ patientCalllog, patientId }) => {
  const token = getAccessToken();
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

  // delete leave tracking api
  const [
    DeleteCalllogTracking,
    {
      data: deletecalllogdata,
      isSuccess: deletecallogSuccess,
      isError: deletecalllogError,
    },
  ] = useDeleteCalllogMutation();

  //Success/Error message show
  useEffect(() => {
    if (deletecallogSuccess) {
      toast.success(deletecalllogdata?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (deletecalllogError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [
    deletecalllogError,
    deletecallogSuccess,
    deletecalllogdata?.message,
  ]);
  
  const handleDelete = (dltid) => {    
    const deleteCalllogPayload = {
      patient_id: patientId,
      call_log_id: dltid,
    };
    //console.log(deleteCalllogPayload);
    DeleteCalllogTracking({
      token,
      payload: deleteCalllogPayload,
    });
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
           onClick={() => handleDelete(patientCalllog.call_log_id)}
          className="text-sm mx-1 text-rose-600"
        >
          <AiOutlineDelete />
        </button>
      </div>
      {openEditModal && (
        <EditCallLog
          handleClose={handleClose}
          open={openEditModal}
          logdata={patientCalllog}
          patientId={patientId}
        ></EditCallLog>
      )}
      {viewCallLog && (
        <CallLogView
          handleClose={handleViewClose}
          open={viewCallLog}
          logdata={patientCalllog.call_log}
        ></CallLogView>
      )}
    </div>
  );
};

export default CallLogEdit;

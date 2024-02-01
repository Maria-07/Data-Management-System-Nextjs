import { Modal } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteSessionIdMutation } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";
const DeleteModal = ({ handleClose, open, deleteSessionId, token }) => {
  const [
    deleteSessionById,
    { isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteSessionIdMutation();

  const deleteSessionData = () => {
    const payload = {
      session_id: deleteSessionId,
    };
    deleteSessionById({ token, payload });
  };
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else if (deleteError) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [deleteSuccess, deleteError]);
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
            <h1 className="text-base text-left text-orange-400 ">DELETE</h1>

            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className="text-center my-4">Do you want to delete this ?</div>
          <div className=" flex items-end justify-end mt-2">
            <button className="dcm-button mr-2" onClick={deleteSessionData}>
              DELETE
            </button>

            <button className="dcm-close-button" onClick={handleClose}>
              CLOSE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;

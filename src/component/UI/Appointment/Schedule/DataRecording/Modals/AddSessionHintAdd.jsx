import { Modal } from "antd";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const AddSessionHintAdd = ({ handleClose, open }) => {
  const [note, setNote] = useState(false);

  const handleSubmit = () => {
    console.log(note);
  };

  return (
    <div>
      <Modal
        width={450}
        open={open}
        centered
        footer={false}
        closable={false}
        bodyStyle={{ padding: "0" }}
        className="box rounded-lg"
      >
        <div className="px-5 py-2  ">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400">
              Add Session Hint Notes
            </h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="my-5">
              <h1 className=" my-2">Write Session Hint Note Here:</h1>
              <textarea
                onChange={(e) => setNote(e.target.value)}
                name="comment"
                className="border border-gray-300 text-sm p-2   h-24 w-full"
              ></textarea>
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2">
              <button
                onClick={handleSubmit}
                className=" pms-button mr-2"
                type="button"
              >
                Add Session Note
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

export default AddSessionHintAdd;

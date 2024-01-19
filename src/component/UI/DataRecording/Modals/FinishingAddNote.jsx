import { Editor } from "@tinymce/tinymce-react";
import { Input, Modal, Select } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import React from "react";
import { useTheme } from "next-themes";
const { TextArea } = Input;
const FinishingAddNote = ({ handleClose, clicked }) => {
  //! Theme system
  const { theme } = useTheme();
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Add Note
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="min-w-[20%] my-5">
              <h1 className="text-base text-secondary mb-2 font-medium">
                Add Note to finish
              </h1>
              <TextArea
                style={
                  theme === "dark" && {
                    backgroundColor: "#454b55",
                    color: "#fff",
                    border: "1px solid #2c333e",
                  }
                }
                className="input-border"
                placeholder=""
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
              />
            </div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Add
              </button>
              <button onClick={handleClose} className="dcm-modal-close-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default FinishingAddNote;

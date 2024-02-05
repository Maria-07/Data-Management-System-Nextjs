import { Editor } from "@tinymce/tinymce-react";
import { Modal, Select } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const VideoSession = ({ handleClose, clicked }) => {
  //! selection tags
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    // console.log(`Selected: ${value}`);
  };
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
              Invite to video session
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
                Select a participant. You can only invite people who has access
                to this client.
              </h1>
              <Select
                // mode="multiple"
                // size={medium}
                placeholder="SSelect User"
                // defaultValue={["a10", "c12"]}
                onChange={handleChange}
                style={{ width: "100%" }}
                options={options}
              />
            </div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Invite Now
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

export default VideoSession;

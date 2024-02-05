import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Checkbox, Modal, Radio, Space } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";

const SettingModal = ({ handleClose, clicked }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
  };

  const [value, setValue] = useState(1);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal
      open={clicked}
      centered
      footer={null}
      closable={false}
      width={425}
      className="box rounded-xl"
      bodyStyle={{
        padding: "5px",
      }}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-left text-orange-400 ">Settings</h1>

          <div className="flex justify-between">
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>
        </div>
        <div className="bg-gray-200 py-[1px] mt-3"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center text-[15px] my-2 text-gray-600 text-left">
                Color By:
              </span>
            </label>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <div>
                    <p>Client </p>
                  </div>
                </Radio>
                <Radio value={2}>
                  <div>
                    <p>Service</p>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center text-[15px] my-2 text-gray-600 text-left">
                Title By:
              </span>
            </label>
            <>
              <div className="">
                <Checkbox>
                  <div className="flex items-center gap-1">Provider Name</div>
                  {/* <Checkbox checked={Monday} > */}
                </Checkbox>
              </div>
              <div className="">
                <Checkbox>
                  <div className="flex items-center gap-1">Client Name</div>
                </Checkbox>
              </div>
            </>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center text-[15px] my-2 text-gray-600 text-left">
                Layout:
              </span>
            </label>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <div>
                    <p>Normal Grid View</p>
                  </div>
                </Radio>
                <Radio value={2}>
                  <div>
                    <p>Time Grid View </p>
                  </div>
                </Radio>
                <Radio value={3}>
                  <div>
                    <p>Time Grid Rendered View </p>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </div>

          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className=" flex items-end justify-end mt-2">
            <button className=" dcm-button mr-2" type="submit">
              Go
            </button>

            <button className="dcm-close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SettingModal;

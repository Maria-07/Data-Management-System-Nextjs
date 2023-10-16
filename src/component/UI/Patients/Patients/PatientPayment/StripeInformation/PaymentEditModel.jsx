import { IdcardOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Tabs } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const PaymentEditModel = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");

  const tabItems = [
    {
      label: <h1 className={``}>Visa Card</h1>,
      key: 1,
      children: (
        <div>
          <>
            <div className="my-3">
              <h1 className="text-sm mb-2 font-medium text-dark">
                Visa Card Number:
              </h1>
              <div className="flex items-center ">
                <IdcardOutlined className="bg-gray-100 p-2 px-3 border border-gray-300 mr-[-3px] z-30 rounded-l-md" />
                <input
                  placeholder="Card Number"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
            </div>
          </>
        </div>
      ),
    },
    {
      label: <h1 className={``}>Master Card</h1>,
      key: 2,
      children: (
        <>
          <div className="my-3">
            <h1 className="text-sm mb-2 font-medium text-dark">
              Master Card Number:
            </h1>
            <div className="flex items-center ">
              <IdcardOutlined className="bg-gray-100 p-2 px-3 border border-gray-300 mr-[-3px] z-30 rounded-l-md" />
              <input
                placeholder="Card Number"
                type="text"
                className="input-border w-[100%]"
              />
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={600}
        closable={false}
        className="box"
      >
        <div className="px-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Edit Card
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="flex items-center gap-5">
              <div className="my-3">
                <h1 className="text-sm mb-2 font-medium text-dark">
                  Name on Card:
                </h1>
                <div className="flex items-center ">
                  <UserOutlined className="bg-gray-100 p-2 px-3 border border-gray-300 mr-[-3px] z-30 rounded-l-md" />
                  <input
                    placeholder="File Name"
                    type="text"
                    className="input-border w-[100%]"
                  />
                </div>
              </div>
              <div className="my-3">
                <h1 className="text-sm mb-2 font-medium text-dark">Status</h1>
                <div className="">
                  <select
                    placeholder="File Name"
                    type="text"
                    className="input-border w-[100%]"
                  >
                    <option value="0">Select</option>
                    <option value="active">Active</option>
                    <option value="in-active">InActive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Tabs type="card" items={tabItems} />
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="my-3">
                <h1 className="text-sm mb-2 font-medium text-dark">CVV:</h1>
                <div className="flex items-center ">
                  <input
                    placeholder="File Name"
                    type="text"
                    className="input-border w-[100%]"
                  />
                </div>
              </div>
              <div className="my-3">
                <h1 className="text-sm mb-2 font-medium text-dark">Month:</h1>
                <div className="flex items-center ">
                  <input
                    placeholder="File Name"
                    type="text"
                    className="input-border w-[100%]"
                  />
                </div>
              </div>
              <div className="my-3">
                <h1 className="text-sm mb-2 font-medium text-dark">Year:</h1>
                <div className="flex items-center ">
                  <input
                    type="text"
                    placeholder="File Name"
                    className="input-border w-[100%]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Update Card
              </button>
              <button onClick={handleClose} className="dcm-modal-close-button">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentEditModel;

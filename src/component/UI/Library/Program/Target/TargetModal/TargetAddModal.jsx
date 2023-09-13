import { Modal, Select } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const TargetAddModal = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  const items = [
    "waiting",
    "working-on",
    "mastered",
    "closed",
    "hold",
    "disconnected",
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
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Add New Target
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="my-10">
              <div>
                <h1 className="text-base text-dark mb-2 font-medium">
                  Target Title
                </h1>
                <input
                  placeholder="Rename Folder Name"
                  type="text"
                  className="input-border-modal w-[100%] "
                />
              </div>
              <div className="my-5">
                <h1 className="text-base text-dark mb-2 font-medium">
                  Target Status
                </h1>
                <Select
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  bordered={true}
                  onChange={onChange}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
            </div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button
                type="submit"
                className="text-base font-semibold text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
              >
                Ok
              </button>
              <button
                onClick={handleClose}
                className="text-base font-semibold text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TargetAddModal;

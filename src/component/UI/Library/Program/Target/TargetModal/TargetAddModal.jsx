import { Modal, Select } from "antd";
import { useState } from "react";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const TargetAddModal = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");

  const onChange = (value) => {
    // console.log(`selected ${value}`);
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
                  className="modal-input-field w-[100%] "
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

            <div className="flex items-end justify-end gap-2 mt-2">
              <button className=" border-secondary flex items-center border rounded-sm">
                <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  Save
                </span>
              </button>
              <button
                className=" border-rose-600 flex items-center border rounded-sm"
                onClick={handleClose}
              >
                <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TargetAddModal;

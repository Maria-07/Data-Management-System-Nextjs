import { Modal, Select } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const UseProgramModal = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  const items2 = ["JavaScript", "Python", "Java", "C++", "Ruby"];

  const items = ["lion", "elephant", "tiger", "giraffe", "zebra"];

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
              Use Program from Library
              <span className="text-primary">
                {/* {myShopData?.data?.shop_name} */}
              </span>
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="">
              <div className="text-base my-5 mx-2 font-regular">
                Select the client you wish to start using this program for. The
                program will be copied to the client&apos;s Programs folder.
              </div>

              <div className="px-2 my-5">
                <h1 className="text-sm mb-2 font-medium mt-5">
                  Add program to
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
                {value == "Restricted to specific people" && (
                  <div>
                    <input
                      placeholder="Recipient Mail"
                      type="text"
                      className="input-border-modal w-[100%] my-5 py-2"
                    />
                  </div>
                )}
              </div>
              <div className="px-2 mb-10 ">
                <h1 className="text-sm mb-2 font-medium">Treatment Area</h1>
                <Select
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  bordered={true}
                  onChange={onChange}
                  options={items2.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
                {value == "Restricted to specific people" && (
                  <div>
                    <input
                      placeholder="Recipient Mail"
                      type="text"
                      className="input-border-modal w-[100%] my-5 py-2"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] my-3"></div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button
                type="submit"
                className=" font-medium text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
              >
                SAVE
              </button>
              <button
                onClick={handleClose}
                className=" font-medium text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UseProgramModal;

import { Modal, Select } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ShareFolderModal = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  const items = ["Restricted to specific people", "Anyone with a link"];

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
              Share Folder
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
              <div className="text-sm my-5 mx-2 font-regular">
                Share programs inside this folder with other organizations.
                Enter the e-mail of the person you wish to share the folder
                with. The recipient must have Manager credentials to be able to
                access the folder. When the user accepts the invitation all
                programs inside the folder and sub-folders will be copied to the
                recipient&apos;s library.
              </div>

              <div className="px-2 my-10 ">
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
            </div>
            <div className="bg-gray-200 py-[1px] my-3"></div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button
                type="submit"
                className=" font-medium text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
              >
                SHARE FOLDER
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

export default ShareFolderModal;

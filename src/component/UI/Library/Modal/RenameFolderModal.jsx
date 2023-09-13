import { Modal } from "antd";
import { IoMdCloseCircleOutline } from "react-icons/io";

const RenameFolderModal = ({ handleClose, clicked }) => {
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={400}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Rename Folder
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div>
              <input
                placeholder="Rename Folder Name"
                type="text"
                className="input-border w-[100%] my-10"
              />
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

export default RenameFolderModal;

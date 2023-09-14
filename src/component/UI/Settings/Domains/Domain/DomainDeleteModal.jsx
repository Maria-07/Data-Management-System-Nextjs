import { Modal } from "antd";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DomainDeleteModal = ({ handleClose, clicked }) => {
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
              Delete Confirm
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div>
              <div className="text-base my-10 text-center mx-2 font-regular">
                Are you sure you want to delete this Domain?
              </div>
            </div>
            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button className="font-medium text-sm text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md">
                Ok
              </button>
              <button
                onClick={handleClose}
                className="font-medium text-sm text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md"
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

export default DomainDeleteModal;

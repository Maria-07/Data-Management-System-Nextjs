import { Modal } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

import DeleteSubDomainModal from "./DeleteSubDomainModal";

const EditSubDomainModal = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");

  const [deleteData, setDeleteData] = useState(false);
  const handleDeleteData = () => {
    setDeleteData(!deleteData);
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
        <div className="px-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Edit Sub Domain Name
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="my-3">
              <h1 className="text-sm mb-2 font-medium text-dark">
                Sub Domain Label
              </h1>

              <input
                placeholder="File Name"
                type="text"
                className="input-border w-[100%]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <button
                  type="button"
                  onClick={handleDeleteData}
                  className="text-base font-semibold text-white  transition-all px-2 py-1 border bg-red-700 border-red-700 rounded-md"
                >
                  Delete
                </button>
              </div>
              <div className="flex gap-3 items-end justify-end mb-2 mt-4">
                <button type="submit" className="dcm-modal-submit-button">
                  Ok
                </button>
                <button
                  onClick={handleClose}
                  className="dcm-modal-close-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {deleteData && (
        <DeleteSubDomainModal
          handleClose={handleDeleteData}
          clicked={deleteData}
        ></DeleteSubDomainModal>
      )}
    </div>
  );
};

export default EditSubDomainModal;

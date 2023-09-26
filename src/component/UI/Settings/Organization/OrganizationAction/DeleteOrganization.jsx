import { Modal } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DeleteOrganization = ({ handleClose, clicked, name }) => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    console.log(data.name, name);
    if (data.name !== name) {
      setError("Entered name doesn't match user name");
    } else {
      setError("");
    }
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
              Delete Confirm
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="text-base my-3 mx-2 font-semibold">
                If you want to delete the user, you need to complete the field
                with the user name{" "}
                <span className="text-sm text-rose-600">({name})</span>
              </div>
              <div className="px-2 my-5">
                <div>
                  <input
                    type="text"
                    className="modal-input-field w-[100%]  py-2"
                    {...register("name")}
                  />
                </div>
                <span className="text-xs text-rose-600">{error}</span>
              </div>
            </div>
            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Ok
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

export default DeleteOrganization;

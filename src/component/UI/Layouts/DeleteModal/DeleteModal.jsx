import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const DeleteModal = ({ handleClose, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {};
  return (
    <div>
      <Modal
        open={open}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="px-0 py-2 font-[poppins,sans-serif]">
          <div className="flex items-center justify-between">
            <h1 className="text-base text-left text-orange-400 ">DELETE</h1>

            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>

          <form onSubmit={handleSubmit(onSubmit)} className=" px-3 py-2">
            <div className="text-center my-4">Do you want to delete this ?</div>
            <div className=" flex items-end justify-end mt-2">
              <button className="dcm-button mr-2" type="submit">
                DELETE
              </button>

              <button className="dcm-close-button" onClick={handleClose}>
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;

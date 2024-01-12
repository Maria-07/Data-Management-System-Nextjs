import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const ProgramNotes = ({ handleClose, open, title }) => {
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
        width={600}
        closable={false}
        className="box"
      >
        <div className="px-0 py-2 font-[poppins,sans-serif]">
          <div className="flex items-center justify-between">
            <h1 className="text-base text-left text-orange-400 ">{title}</h1>

            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] my-3"></div>

          <form onSubmit={handleSubmit(onSubmit)} className=" ">
            <div className="mb-6 mt-2">
              <label className="label">
                <div className="modal-label-name">Program Notes</div>
              </label>
              <input
                type="text"
                className="modal-input-field ml-1 w-full"
                {...register("date_issue")}
              />
            </div>

            <div className=" flex items-end justify-end mt-5">
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

export default ProgramNotes;

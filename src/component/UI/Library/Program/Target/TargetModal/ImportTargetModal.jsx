import { Modal } from "antd";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Input } from "antd";

const { TextArea } = Input;

const ImportTargetModal = ({ handleClose, clicked }) => {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
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
              Import targets
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="px-3 mb-10">
              <div className="text-base my-5 font-regular">
                Paste the targets to import. The list should contain one target
                per line.
              </div>
              <TextArea
                showCount
                // style={{ height: 120, marginBottom: 24 }}
                rows={8}
                onChange={onChange}
                className=""
                placeholder="can resize"
              />
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button
                type="submit"
                className="font-medium text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
              >
                Import
              </button>
              <button
                onClick={handleClose}
                className="font-medium text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md"
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

export default ImportTargetModal;

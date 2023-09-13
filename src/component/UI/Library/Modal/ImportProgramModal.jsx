import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ImportProgramModal = ({ handleClose, clicked }) => {
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={700}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary  tracking-tight">
              Import programs
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
            <div>
              <div className="text-base my-10 mx-2 font-medium">
                Select the file you wish to import programs and targets from. We
                currently support files exported from{" "}
                <span className="text-primary">
                  CentralReach, Thread, Catalyst, ReThink
                </span>{" "}
                and <span className="text-primary">ABADesk</span> . Please
                contact us if you need to import from another format.
              </div>
              <div className="my-10 mx-2">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] my-3"></div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button
                type="submit"
                className="font-medium  text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
              >
                Imported All Programs
              </button>
              <button
                onClick={handleClose}
                className="font-medium  text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md"
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

export default ImportProgramModal;

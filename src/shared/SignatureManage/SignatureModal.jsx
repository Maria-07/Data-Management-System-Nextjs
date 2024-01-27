import { Modal, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import SignatureCanvas from "react-signature-canvas";

const SignatureModal = ({
  setImageURL,
  handleSignatureClose,
  open,
  setFile,
}) => {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const signatureCanvasRef = useRef();

  const handleClear = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  const save = () => {
    const trimmedCanvas = signatureCanvasRef.current.getTrimmedCanvas();
    setTrimmedDataURL(trimmedCanvas.toDataURL("image/png"));
    setImageURL(trimmedCanvas);
    handleSignatureClose();
  };

  return (
    <div>
      <Modal
        visible={open}
        centered
        footer={null}
        closable={false}
        bodyStyle={{ padding: 0 }}
        className="box rounded-lg"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400">Add Signature</h1>
            <IoCloseCircleOutline
              onClick={handleSignatureClose}
              className="text-gray-500 text-2xl hover:text-primary cursor-pointer"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="DRAW" key="1">
              <div>
                <SignatureCanvas
                  ref={signatureCanvasRef}
                  penColor="black"
                  canvasProps={{
                    width: "450",
                    height: "200",
                    className: "sigCanvas border ",
                  }}
                />
                <div className="bg-gray-200 py-[1px] mt-3"></div>
                <div className="flex items-center justify-between mt-2 gap-2">
                  <button className="dcm-clear-button" onClick={handleClear}>
                    Clear
                  </button>
                  <div>
                    <button className="dcm-button mr-2" onClick={save}>
                      Add Signature
                    </button>
                    <button
                      className="dcm-close-button"
                      onClick={handleSignatureClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="UPLOAD" key="2">
              <div className="">
                <h1 className="my-2 text-base font-medium">
                  Upload Signature File
                </h1>
                <input
                  className="my-5"
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setFile(e.target.value)}
                />
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className="flex items-center justify-end mt-2 gap-2">
                <button className="dcm-button mr-2" onClick={save}>
                  Add Signature
                </button>
                <button
                  className="dcm-close-button"
                  onClick={handleSignatureClose}
                >
                  Close
                </button>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default SignatureModal;

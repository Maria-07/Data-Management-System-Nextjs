import { Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";

const ViewQualification = ({ handleClose, open, token, qualificationlId }) => {
  // console.log("qualificationlId", qualificationlId);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const getImageData = async () => {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/qualification/file`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token || null,
        },
        data: { qualification_id: qualificationlId },
      });
      const data = res?.data?.qualification;
      setImageData(data);
    };
    getImageData();
  }, [qualificationlId]);

  let imgData = "";
  if (imageData?.file !== undefined) {
    imgData = imageData?.file;
  }
  const onSubmit = (data) => {
    // console.log(data);
  };
  return (
    <div>
      <div>
        <Modal
          // fullScreen={fullScreen}
          open={open}
          centered
          width={500}
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
          className="box rounded-md"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400 ">
                View Clearence
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 font-semibold  text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div>
              <p className="my-5">
                {imgData ? (
                  <img
                    src={
                      "data:image/jpeg;base64," +
                      imgData.replace("dataimage/jpegbase64", "")
                    }
                    alt="Preview"
                    className="w-[95%]"
                  />
                ) : (
                  "Loading"
                )}
              </p>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className="flex gap-3 items-end justify-end mb-2 mt-4">
                <button
                  onClick={handleClose}
                  className="dcm-modal-close-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ViewQualification;

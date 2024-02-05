import { Image, Modal, Tabs } from "antd";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const ViewSignature = ({ handleClose, open }) => {
  //! Theme system
  const { theme } = useTheme();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    reset();
  };

  //   console.log(editableRow);
  useEffect(() => {
    setTimeout(() => {
      reset({});
    }, 500);
  }, [reset]);

  const tabItems = [
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Patients Signature
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <div className="mx-auto">
            <Image
              // width={400}
              src="data:image/png;base64,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"
            />
          </div>
        </div>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Provider Signature
        </h1>
      ),
      key: 2,
      children: (
        <div className="mx-auto">
          <Image
            // width={400}
            src="https://www.shutterstock.com/image-vector/fake-hand-drawn-autographs-set-260nw-2295145277.jpg"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Modal
          width={550}
          open={open}
          centered
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
          className="box rounded-lg"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400">
                View Signature
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>
            <div className="bg-gray-200 py-[1px] my-3"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="my-5">
                  <Tabs type="card" items={tabItems} />
                </div>
              </div>

              <div className="bg-gray-200 py-[1px] mt-3"></div>

              <div className=" flex items-end justify-end mt-2">
                <button className="dcm-close-button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ViewSignature;

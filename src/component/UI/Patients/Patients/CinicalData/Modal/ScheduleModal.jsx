import React from "react";
import Schedule from "../Tabs/Schedule";
import SessionSetting from "../Tabs/SessionSetting";
import { Modal, Tabs } from "antd";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useTheme } from "next-themes";

const ScheduleModal = ({ handleClose, clicked, title }) => {
  //! Theme system
  const { theme } = useTheme();

  const tabItems = [
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-primary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base transition-all w-[50%]`}
        >
          Schedule
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${theme === "dark" ? "text-dark-primary" : "text-fontC"}`}
        >
          <Schedule></Schedule>
        </div>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-primary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Session Setting
        </h1>
      ),
      key: 2,
      children: (
        <>
          <SessionSetting></SessionSetting>
        </>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Modal
          open={clicked}
          centered
          footer={null}
          bodyStyle={{ padding: "0" }}
          width={800}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">
                Schedule
              </h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <div className="mt-5">
              <Tabs tabBarGutter={2} type="card" items={tabItems} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ScheduleModal;

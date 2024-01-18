import { Modal, Tabs } from "antd";
import React from "react";

import { IoCloseCircleOutline } from "react-icons/io5";
import SingleView from "./RecurringSessionEdit/SingleView";
import DayView from "./RecurringSessionEdit/DayView";
import { useTheme } from "next-themes";

const RecurringSessionModal = ({ handleClose, open }) => {
  //! Theme system
  const { theme } = useTheme();

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
          Day View{" "}
          <span className="bg-orange-400 text-white text-[10px] px-2 py-1 rounded-lg">
            View - 1
          </span>
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <DayView></DayView>
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
          Single View{" "}
          <span className="bg-orange-400 text-white text-[10px] px-2 py-1 rounded-lg">
            View - 2
          </span>
        </h1>
      ),
      key: 2,
      children: <SingleView></SingleView>,
    },
  ];

  return (
    <div>
      <div>
        <Modal
          open={true} //aikhaney true na likey ekta state ana lagbey tar value 'true'
          centered
          width={1200}
          footer={null}
          bodyStyle={{ padding: "0" }}
          closable={false}
          className="box rounded-xl"
          // onClose={handleClose}
          // aria-labelledby="responsive-dialog-title"
        >
          <div className="px-5 py-2">
            <div className="flex items-center justify-end">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>

            <div className=" flex items-end justify-start gap-2 mt-2">
              <button className=" text-secondary font-semibold mr-2">
                Updation will affect selected ones out of 14 Sessions given
                below:
              </button>
            </div>

            <div className="my-5">
              <Tabs type="card" items={tabItems} />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] "></div>
          <div className=" flex items-end justify-end mt-2">
            <button className=" dcm-button mr-2" type="submit">
              Add Appointment
            </button>

            <button
              className="dcm-close-button"
              onClick={() => setSessionOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RecurringSessionModal;

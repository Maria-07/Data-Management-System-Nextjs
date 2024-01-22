import { Modal, Tabs } from "antd";
import React, { useState } from "react";

import { IoCloseCircleOutline } from "react-icons/io5";
import SingleViewPopup from "./RecurringSessionEdit/SingleViewPopup";
import DayViewPopup from "./RecurringSessionEdit/DayViewPopup";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";

const RecurringSessionModal = ({ handleClose, open, token, id, setAppointmentIds }) => {
  //! Theme system
  const { theme } = useTheme();
  const [recordSelected, setRecordSelected] = useState([]);
  const [dayViewRecord, setDayViewRecord] = useState([]);
  const [singleViewRecord, setSingleViewRecord] = useState([]);
  const addAppointment = () => {
    if(dayViewRecord.length == 0 && singleViewRecord.length == 0) {
      toast.error("Please select atleast one option", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      })
    } else {
      let selectedRecords = [];
      dayViewRecord.map((id) => selectedRecords.indexOf(id) === -1 ? selectedRecords.push(id) : '')
      singleViewRecord.map((id) => selectedRecords.indexOf(id) === -1 ? selectedRecords.push(id) : '')
      setAppointmentIds(selectedRecords);
      handleClose();
    }
  }
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
          <DayViewPopup token={token} id={id} setRecordSelected={setDayViewRecord}></DayViewPopup>
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
      children: <SingleViewPopup token={token} id={id} setRecordSelected={setSingleViewRecord}></SingleViewPopup>,
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

           
            <div className="my-5">
              <Tabs type="card" items={tabItems} />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] "></div>
          <div className=" flex items-end justify-end mt-2">
            <button className=" dcm-button mr-2" onClick={addAppointment}>
              Add Appointment
            </button>

            <button
              className="dcm-close-button"
              onClick={handleClose}
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

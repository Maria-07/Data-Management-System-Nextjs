import { Modal } from "antd";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const CreateAppointmentAvailability = ({ handleClose, open }) => {
  const [time, setTime] = useState("");
  // console.log(time);
  const morning = [
    {
      time: "10:15 AM",
    },
    {
      time: "10:00 PM",
    },
    {
      time: "4:15AM",
    },
    {
      time: "11:15 AM",
    },
    {
      time: "9:15 AM",
    },
  ];

  // console.log(morning);
  return (
    <div>
      <div>
        <Modal
          confirmLoading
          width={700}
          open={open}
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
        >
          <div className="px-5 py-2 box ">
            <div>fghdfgdhgjdfhugjh</div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className=" flex items-end justify-end mt-2">
              <button className="pms-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateAppointmentAvailability;

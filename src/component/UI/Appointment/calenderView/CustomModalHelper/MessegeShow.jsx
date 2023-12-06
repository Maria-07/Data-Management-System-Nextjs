import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";

const MessegeShow = ({ messege, setMessege }) => {
  const [notes, setNotes] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(notes);
  };
  return (
    <Modal
      open={messege}
      centered
      footer={null}
      closable={false}
      width={425}
      className="box rounded-xl"
      bodyStyle={{
        padding: "5px",
      }}
    >
      <div className="px-5 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-left text-orange-400 ">Sticky Notes</h1>

          <div className="flex justify-between">
            <IoCloseCircleOutline
              onClick={() => setMessege(false)}
              className="text-gray-600 text-2xl hover:text-primary"
            />
          </div>
        </div>
        <div className="bg-gray-200 py-[1px] mt-3"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 ">
            <div>
              <h1 className="label-text font-medium flex items-center text-[12px] text-gray-600 text-left">
              Session Sticky Notes:
              </h1>
              <div className="mt-3 mb-3">
                <TextArea
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  rows={5}
                  placeholder=" Notes"
                  size="large"
                  className="border-2 border-blue-600"
                />
              </div>
            </div>

            <div>
              <h1 className="label-text font-medium flex items-center text-[12px] text-gray-600 text-left">
              Patient Sticky Notes:
              </h1>
              <div className="mt-3">
                <TextArea
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  rows={5}
                  placeholder=" Notes"
                  size="large"
                  className="border-2 border-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className=" flex items-end justify-end mt-2">
            <button className=" pms-button mr-2" type="submit">
              Add Appointment
            </button>

            <button
              className="pms-close-button"
              onClick={() => setMessege(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MessegeShow;

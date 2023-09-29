import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const PatientLedgerActionModal = ({ handleClose, open, row }) => {
  const { register, handleSubmit, reset } = useForm();
  const [notes, setNotes] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  console.log(row);
  useEffect(() => {
    setTimeout(() => {
      reset({
        // description: `${row.original.description}`,
        // expiry_Date: `${row.original.upload_date}`,
      });
    }, 500);
  }, [reset, row]);
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
          <div className="px-5 py-2 ">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400 ">
                Edit Document
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 font-semibold  text-2xl hover:text-primary"
              />
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-5 mr-2 gap-1">
                <label className="label">
                  <span className="modal-label-name">Description</span>
                </label>
                <select
                  className="col-span-2 modal-input-field ml-1 w-full"
                  {...register("patients")}
                >
                  <option value=""></option>
                  <option value="single">single</option>
                  <option value="married">married</option>
                </select>
                <label className="label">
                  <span className="modal-label-name">Follow Up Date</span>
                </label>
                <div className=" col-span-2">
                  <input
                    type="date"
                    className="col-span-2 modal-input-field ml-1 w-full"
                    {...register("follow_Date")}
                  />
                </div>
                <label className="label">
                  <span className="modal-label-name">Worked Date</span>
                </label>
                <div className=" col-span-2">
                  <input
                    type="date"
                    className="col-span-2 modal-input-field ml-1 w-full"
                    {...register("worked_Date")}
                  />
                </div>
                <label className="label">
                  <span className="modal-label-name">Notes</span>
                </label>
                <div className="ml-1 col-span-2">
                  <TextArea
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={300}
                    rows={5}
                    placeholder=" Notes"
                    size="large"
                  />
                </div>
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className=" flex items-end justify-end mt-2">
                <button className=" pms-button mr-2" type="submit">
                  Save
                </button>

                <button className="pms-close-button" onClick={handleClose}>
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

export default PatientLedgerActionModal;

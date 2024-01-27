import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const AddProgram = ({ handleClose, open, editableRow }) => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  //   console.log(editableRow);
  useEffect(() => {
    setTimeout(() => {
      reset({});
    }, 500);
  }, [reset, editableRow]);
  return (
    <div>
      <div>
        <Modal
          open={open}
          width={450}
          centered
          footer={false}
          closable={false}
          bodyStyle={{ padding: "0" }}
          className="box rounded-lg"
        >
          <div className="px-5 py-2 ">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400">
                Add Program Counts
              </h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label">
                  <span className="modal-label-name">Select Program</span>
                </label>
                <select
                  className="modal-input-field ml-1 w-full"
                  {...register("program")}
                >
                  <option value=""></option>
                  <option value="single">single</option>
                  <option value="married">married</option>
                </select>
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div>
                <label className="label">
                  <span className="modal-label-name">What is the age?</span>
                </label>
                <textarea
                  {...register("notes")}
                  name="comment"
                  className="border border-gray-300 text-sm p-2  ml-1 h-24 w-full"
                ></textarea>
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">What is color?</span>
                </label>
                <input
                  type="text"
                  name="color"
                  className="modal-input-field ml-1 w-full"
                  {...register("color")}
                />
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">What is Score?</span>
                </label>
                <div className="flex item-center gap-3 ">
                  <button
                    className="pms-button "
                    onClick={() => {
                      setScore(score + 1);
                    }}
                  >
                    <span className="px-5 text-2xl font-semibold items-center">
                      +
                    </span>
                  </button>
                  <input
                    type="number"
                    name="score"
                    value={score}
                    className="border border-gray-400  w-full sp"
                    {...register("score_number")}
                  />
                  <button
                    className="pms-close-button "
                    onClick={() => {
                      setScore(score - 1);
                    }}
                  >
                    <span className="px-5 text-2xl font-semibold items-center">
                      -
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">
                    How much time it took?
                  </span>
                </label>
                <input
                  type="time"
                  name="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("time")}
                />
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">Question</span>
                </label>
                <div className="flex item-center gap-3 ">
                  <button
                    className="pms-button "
                    onClick={() => {
                      setQuestion(question + 1);
                    }}
                  >
                    <span className="px-5 text-2xl font-semibold items-center">
                      +
                    </span>
                  </button>
                  <input
                    type="number"
                    name="question"
                    value={question}
                    className="border border-gray-400  w-full sp"
                    {...register("question_number")}
                  />
                  <button
                    className="pms-close-button "
                    onClick={() => {
                      setQuestion(question - 1);
                    }}
                  >
                    <span className="px-5 text-2xl font-semibold items-center">
                      -
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <label className="label">
                  <span className="modal-label-name">Here is question?</span>
                </label>
                <textarea
                  {...register("Question")}
                  name="comment"
                  className="border border-gray-300 text-sm p-2  ml-1 h-24 w-full"
                ></textarea>
              </div>
              <div className=" flex items-end justify-end mt-2">
                <button className=" pms-button mr-2" type="submit">
                  Go
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

export default AddProgram;

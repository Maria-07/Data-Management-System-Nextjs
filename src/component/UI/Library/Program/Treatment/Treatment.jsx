import { AlignCenterOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BiCut,
  BiRun,
  BiSolidHand,
  BiSolidWatch,
  BiWindowClose,
} from "react-icons/bi";

const Treatment = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("active");

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  const items2 = ["JavaScript", "Python", "Java", "C++", "Ruby"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};

  return (
    <div className=" min-h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 border-r-2 py-3 pr-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h1 className="text-base text-secondary mb-2 font-medium">
                  Treatment Area
                </h1>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  size="medium"
                  bordered={true}
                  onChange={onChange}
                  options={items2.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
              <div>
                <h1 className="text-base text-secondary mb-2 font-medium">
                  Baseline
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
              <div>
                <h1 className="text-base text-secondary mb-2 font-medium">
                  Current Performance
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
              <div>
                <h1 className="text-base text-secondary mb-2 font-medium">
                  Previous Performance
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
              <div className="">
                <h1 className="text-base text-secondary mb-2 font-medium">
                  Objective
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
            </div>
            <div className="my-10">
              <div className="flex gap-3 items-end justify-start mb-2 mt-4">
                <button
                  type="submit"
                  className="font-medium  bg-primary text-white hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
                >
                  Save
                </button>
                <button className="font-medium text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto p-3">
            <h1 className="text-base text-gray mb-5">Program Status</h1>

            <div className="">
              <button
                className={
                  status === "waiting"
                    ? "mx-auto border-2 border-primary rounded-full p-5  bg-primary text-white transition-all w-[120px] h-[120px]"
                    : "mx-auto border-2 border-primary rounded-full p-5  hover:bg-primary hover:text-white transition-all w-[120px] h-[120px] my-3"
                }
              >
                <BiSolidWatch className="text-2xl mx-auto" />
                <h1 className="text-base font-medium my-2">Waiting</h1>
              </button>
              <br />
              <button
                className={
                  status === "BaseLine"
                    ? "mx-auto border-2 border-primary rounded-full p-5  bg-primary text-white transition-all w-[120px] h-[120px]"
                    : "mx-auto border-2 border-primary rounded-full p-5  hover:bg-primary hover:text-white transition-all w-[120px] h-[120px] my-3"
                }
              >
                <AlignCenterOutlined className="text-2xl mx-auto" />
                <h1 className="text-base font-medium my-2">BaseLine</h1>
              </button>
              <br />
              <button
                className={
                  status === "active"
                    ? "mx-auto border-2 border-primary rounded-full p-5  bg-primary text-white transition-all w-[120px] h-[120px]"
                    : "mx-auto border-2 border-primary rounded-full p-5  hover:bg-primary hover:text-white transition-all w-[120px] h-[120px] my-3"
                }
              >
                <BiRun className="text-2xl mx-auto" />
                <h1 className="text-base font-medium my-2">Active</h1>
              </button>
              <br />
              <button
                className={
                  status === "hold"
                    ? "mx-auto border-2 border-primary rounded-full p-5  bg-primary text-white transition-all w-[120px] h-[120px]"
                    : "mx-auto border-2 border-primary rounded-full p-5  hover:bg-primary hover:text-white transition-all w-[120px] h-[120px] my-3"
                }
              >
                <BiSolidHand className="text-2xl mx-auto" />
                <h1 className="text-base font-medium my-2">Hold</h1>
              </button>
              <br />
              <button
                className={
                  status === "close"
                    ? "mx-auto border-2 border-primary rounded-full p-5  bg-primary text-white transition-all w-[120px] h-[120px]"
                    : "mx-auto border-2 border-primary rounded-full p-5  hover:bg-primary hover:text-white transition-all w-[120px] h-[120px] my-3"
                }
              >
                <BiWindowClose className="text-2xl mx-auto" />
                <h1 className="text-base font-medium my-2">Closed</h1>
              </button>
              <br />
              <button
                className={
                  status === "disconnect"
                    ? "mx-auto border-2 border-primary rounded-full p-5  bg-primary text-white transition-all w-[120px] h-[120px]"
                    : "mx-auto border-2 border-primary rounded-full p-5  hover:bg-primary hover:text-white transition-all w-[120px] h-[120px] my-3"
                }
              >
                <BiCut className="text-2xl mx-auto" />
                <h1 className="text-base font-medium my-2">Disconnect</h1>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Treatment;

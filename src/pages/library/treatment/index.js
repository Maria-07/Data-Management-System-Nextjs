/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
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

const treatmentPage = () => {
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
    <div className="m-5 min-h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="bg-white p-10 w-[80%] border rounded-lg shadow-md min-h-[100vh]">
            <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              <div>
                <h1 className="text-sm text-secondary mb-2 font-medium">
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
                <h1 className="text-sm text-secondary mb-2 font-medium">
                  Baseline
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
              <div>
                <h1 className="text-sm text-secondary mb-2 font-medium">
                  Current Performance
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
              <div>
                <h1 className="text-sm text-secondary mb-2 font-medium">
                  Previous Performance
                </h1>
                <input
                  // placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[100%]"
                />
              </div>
              <div className="sm:col-span-2">
                <h1 className="text-sm text-secondary mb-2 font-medium">
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
                  className="font-medium text-sm  bg-primary text-white hover:bg-secondary transition-all px-2 py-1 border border-primary rounded-md"
                >
                  Save
                </button>
                <button className="font-medium text-sm text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="w-[20%] bg-white px-5 py-5 border rounded-lg shadow-md">
            <h1 className="text-base font-semibold text-primary text-center text-gray mb-5">
              Program Status
            </h1>
            <div className="">
              <div className="flex items-center justify-center my-2">
                <button
                  onClick={() => setStatus("waiting")}
                  className={
                    status === "waiting"
                      ? "mx-auto border-2 shadow-sm rounded-md p-3 border-secondary  text-secondary transition-all h-[90px] w-[120px]"
                      : "mx-auto border-2 shadow-sm rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
                  }
                >
                  <BiSolidWatch className="text-2xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Waiting</h1>
                </button>
              </div>
              <div className="flex items-center justify-center my-2">
                {" "}
                <button
                  onClick={() => setStatus("BaseLine")}
                  className={
                    status === "BaseLine"
                      ? "mx-auto border-2 shadow-sm rounded-md p-3 border-secondary  text-secondary transition-all h-[90px] w-[120px]"
                      : "mx-auto border-2 shadow-sm rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
                  }
                >
                  <AlignCenterOutlined className="text-2xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">BaseLine</h1>
                </button>
              </div>
              <div className="flex items-center justify-center my-2">
                {" "}
                <button
                  onClick={() => setStatus("active")}
                  className={
                    status === "active"
                      ? "mx-auto border-2 shadow-sm rounded-md p-3 border-secondary  text-secondary transition-all h-[90px] w-[120px]"
                      : "mx-auto border-2 shadow-sm rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
                  }
                >
                  <BiRun className="text-2xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Active</h1>
                </button>
              </div>
              <div className="flex items-center justify-center my-2">
                {" "}
                <button
                  onClick={() => setStatus("hold")}
                  className={
                    status === "hold"
                      ? "mx-auto border-2 shadow-sm rounded-md p-3 border-secondary  text-secondary transition-all h-[90px] w-[120px]"
                      : "mx-auto border-2 shadow-sm rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
                  }
                >
                  <BiSolidHand className="text-2xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Hold</h1>
                </button>
              </div>
              <div className="flex items-center justify-center my-2">
                {" "}
                <button
                  onClick={() => setStatus("close")}
                  className={
                    status === "close"
                      ? "mx-auto border-2 shadow-sm rounded-md p-3 border-secondary  text-secondary transition-all h-[90px] w-[120px]"
                      : "mx-auto border-2 shadow-sm rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
                  }
                >
                  <BiWindowClose className="text-2xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Closed</h1>
                </button>
              </div>
              <div className="flex items-center justify-center my-2">
                {" "}
                <button
                  onClick={() => setStatus("disconnect")}
                  className={
                    status === "disconnect"
                      ? "mx-auto border-2 shadow-sm rounded-md p-3 border-secondary  text-secondary transition-all h-[90px] w-[120px]"
                      : "mx-auto border-2 shadow-sm rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
                  }
                >
                  <BiCut className="text-2xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Disconnect</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default treatmentPage;

treatmentPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <LibraryLayout>{page}</LibraryLayout>
    </RootLayout>
  );
};

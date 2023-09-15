/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import CustomSelectAntd from "@/shared/CustomSelectAntd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BiCut,
  BiRun,
  BiSolidHand,
  BiSolidWatch,
  BiWindowClose,
} from "react-icons/bi";

const { TextArea } = Input;

const treatmentPage = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("active");
  const [treatment, setTreatment] = useState("");
  const [treatmentArray, setTreatmentArray] = useState([
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "JavaScript",
    "Python",
  ]);

  console.log("New treatment", treatment);

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  const items2 = ["JavaScript", "Python", "Java", "C++"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="m-5 min-h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="bg-white p-10 w-[80%] border rounded-lg shadow-md min-h-[100vh]">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h1 className="text-sm text-secondary mb-2 font-semibold">
                  Treatment Area
                </h1>

                <CustomSelectAntd
                  item={treatmentArray}
                  setOption={setTreatment}
                ></CustomSelectAntd>
              </div>

              <div>
                <h1 className="text-sm text-secondary mb-2 font-semibold">
                  Baseline
                </h1>
                <TextArea
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
              <div>
                <h1 className="text-sm text-secondary mb-2 font-semibold">
                  Current Performance
                </h1>
                <TextArea
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
              <div>
                <h1 className="text-sm text-secondary mb-2 font-semibold">
                  Previous Performance
                </h1>
                <TextArea
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
              <div className="">
                <h1 className="text-sm text-secondary mb-2 font-semibold">
                  Objective
                </h1>
                <TextArea
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
            </div>
            <div className="my-10">
              <div className="flex gap-3 items-end justify-start mb-2 mt-4">
                <button
                  type="submit"
                  className="font-semibold text-sm  bg-primary text-white hover:bg-secondary transition-all px-2 py-1 border border-primary rounded-md"
                >
                  Save
                </button>
                <button className="font-semibold text-sm text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md">
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
                      ? "mx-auto  rounded-md p-3 border-secondary  text-primary transition-all h-[90px] w-[120px]"
                      : "mx-auto  rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
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
                      ? "mx-auto  rounded-md p-3 border-secondary  text-primary transition-all h-[90px] w-[120px]"
                      : "mx-auto  rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
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
                      ? "mx-auto  rounded-md p-3 border-secondary  text-primary transition-all h-[90px] w-[120px]"
                      : "mx-auto  rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
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
                      ? "mx-auto  rounded-md p-3 border-secondary  text-primary transition-all h-[90px] w-[120px]"
                      : "mx-auto  rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
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
                      ? "mx-auto  rounded-md p-3 border-secondary  text-primary transition-all h-[90px] w-[120px]"
                      : "mx-auto  rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
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
                      ? "mx-auto  rounded-md p-3 border-secondary  text-primary transition-all h-[90px] w-[120px]"
                      : "mx-auto  rounded-md p-3 hover:border-secondary hover:text-secondary transition-all h-[90px] w-[120px]"
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

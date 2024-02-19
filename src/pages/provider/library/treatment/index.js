/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import CustomSelectAntd from "@/shared/CustomSelectAntd";
import { Input } from "antd";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const { TextArea } = Input;

const treatmentPage = () => {
  const [value, setValue] = useState("");
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

  // console.log("New treatment", treatment);

  const items2 = ["JavaScript", "Python", "Java", "C++"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
  };

  //! Theme system
  const { theme } = useTheme();
  return (
    <div className=" min-h-[80vh] w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div
            className={`${
              theme === "dark" ? "bg-dark-primary border-none" : "bg-white"
            } lg:p-5 p-2 w-[100%]  min-h-[100vh]`}
          >
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h1
                  className={`${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }text-sm mb-2 font-semibold`}
                >
                  Treatment Area
                </h1>

                <CustomSelectAntd
                  item={treatmentArray}
                  setOption={setTreatment}
                  sName={"TREATMENT"}
                ></CustomSelectAntd>
              </div>

              <div>
                <h1
                  className={`${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }text-sm  mb-2 font-semibold`}
                >
                  Baseline
                </h1>

                <TextArea
                  style={
                    theme === "dark" && {
                      backgroundColor: "#454b55",
                      color: "#fff",
                      border: "1px solid #2c333e",
                    }
                  }
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
              <div>
                <h1
                  className={`${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }text-sm  mb-2 font-semibold`}
                >
                  Current Performance
                </h1>
                <TextArea
                  style={
                    theme === "dark" && {
                      backgroundColor: "#454b55",
                      color: "#fff",
                      border: "1px solid #2c333e",
                    }
                  }
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
              <div>
                <h1
                  className={`${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }text-sm  mb-2 font-semibold`}
                >
                  Previous Performance
                </h1>
                <TextArea
                  style={
                    theme === "dark" && {
                      backgroundColor: "#454b55",
                      color: "#fff",
                      border: "1px solid #2c333e",
                    }
                  }
                  className="input-border"
                  placeholder=""
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
              <div className="">
                <h1
                  className={`${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }text-sm  mb-2 font-semibold`}
                >
                  Objective
                </h1>
                <TextArea
                  style={
                    theme === "dark" && {
                      backgroundColor: "#454b55",
                      color: "#fff",
                      border: "1px solid #2c333e",
                    }
                  }
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
              <div className="flex items-end justify-end gap-2 mt-2">
                <button className=" border-secondary flex items-center border rounded-sm">
                  <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                    Save
                  </span>
                </button>
                <button className=" border-rose-600 flex items-center border rounded-sm">
                  <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                    Cancel
                  </span>
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

import {
  BiCut,
  BiEditAlt,
  BiRun,
  BiSolidHand,
  BiSolidWatch,
  BiWindowClose,
} from "react-icons/bi";
import LibrarySidebar from "../UI/Layouts/Library/LibrarySidebar";
import { Select } from "antd";
import { useState } from "react";
import { useTheme } from "next-themes";
import { AlignCenterOutlined } from "@ant-design/icons";

const LibraryLayout = ({ children }) => {
  const items = ["lion", "elephant", "tiger", "giraffe", "zebra"];
  const [status, setStatus] = useState("active");
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setValue(value);
  };

  //! Theme system
  const { theme } = useTheme();
  return (
    <div>
      <div className=" flex items-center justify-between flex-wrap">
        <div>
          {!isEdit ? (
            <div className="flex items-center gap-3 text-[20px]">
              Behavior Reduction{" "}
              <BiEditAlt
                onClick={() => setIsEdit(!isEdit)}
                className="text-gray-400"
              />
            </div>
          ) : (
            <>
              <div className="flex">
                <input
                  placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[150%]"
                />
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className={`text-sm ml-[-10px] bg-white font-semibold text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-r-md`}
                >
                  done
                </button>
              </div>
            </>
          )}
        </div>
        <Select
          // style={{
          //   width: "10%",
          // }}
          className="min-w-[250px]"
          size="medium"
          bordered={true}
          onChange={onChange}
          options={items.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
      <hr
        className={`mt-5 ${theme === "dark" ? "border-dark-secondary" : ""} `}
      />
      <div className="grid md:grid-cols-6 lg:grid-cols-8 gap-3">
        <div className="col-span-1">
          <LibrarySidebar></LibrarySidebar>
        </div>

        <div
          className={`lg:col-span-6 md:col-span-4 mt-[1px] w-[100%]   py-3 ${
            theme === "dark" ? "bg-dark-background" : ""
          }`}
        >
          {children}
        </div>

        <div className="col-span-1 w-full">
          {" "}
          <div
            className={`${
              theme === "dark" ? "bg-dark-primary border-none" : ""
            } px-5 py-5 border border-t-0  shadow-md min-h-full`}
          >
            <h1 className="text-sm font-semibold text-primary text-center text-gray mb-1">
              Program Status
            </h1>
            <div className="">
              {/* <ProgramStatus theme={theme}></ProgramStatus> */}

              <div className="flex items-center justify-center">
                <button
                  onClick={() => setStatus("waiting")}
                  className={
                    status === "waiting"
                      ? `mx-auto  rounded-md p-2 border-primary border  text-primary transition-all h-[85px] w-[120px]`
                      : `mx-auto  rounded-md p-2 ${
                          theme === "dark"
                            ? " hover:text-dark-secondary"
                            : "hover:border-secondary hover:text-secondary"
                        }  transition-all h-[85px] w-[120px]`
                  }
                >
                  <BiSolidWatch className="text-xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Waiting</h1>
                </button>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setStatus("BaseLine")}
                  className={
                    status === "BaseLine"
                      ? `mx-auto  rounded-md p-2 border-primary border  text-primary transition-all h-[85px] w-[120px]`
                      : `mx-auto  rounded-md p-2 ${
                          theme === "dark"
                            ? " hover:text-dark-secondary"
                            : "hover:border-secondary hover:text-secondary"
                        }  transition-all h-[85px] w-[120px]`
                  }
                >
                  <AlignCenterOutlined className="text-xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">BaseLine</h1>
                </button>
              </div>
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setStatus("active")}
                  className={
                    status === "active"
                      ? `mx-auto  rounded-md p-2 border-primary border  text-primary transition-all h-[85px] w-[120px]`
                      : `mx-auto  rounded-md p-2 ${
                          theme === "dark"
                            ? " hover:text-dark-secondary"
                            : "hover:border-secondary hover:text-secondary"
                        }  transition-all h-[85px] w-[120px]`
                  }
                >
                  <BiRun className="text-xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Active</h1>
                </button>
              </div>
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setStatus("hold")}
                  className={
                    status === "hold"
                      ? `mx-auto  rounded-md p-2 border-primary border  text-primary transition-all h-[85px] w-[120px]`
                      : `mx-auto  rounded-md p-2 ${
                          theme === "dark"
                            ? " hover:text-dark-secondary"
                            : "hover:border-secondary hover:text-secondary"
                        }  transition-all h-[85px] w-[120px]`
                  }
                >
                  <BiSolidHand className="text-xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Hold</h1>
                </button>
              </div>
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setStatus("close")}
                  className={
                    status === "close"
                      ? `mx-auto  rounded-md p-2 border-primary border  text-primary transition-all h-[85px] w-[120px]`
                      : `mx-auto  rounded-md p-2 ${
                          theme === "dark"
                            ? " hover:text-dark-secondary"
                            : "hover:border-secondary hover:text-secondary"
                        }  transition-all h-[85px] w-[120px]`
                  }
                >
                  <BiWindowClose className="text-xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Closed</h1>
                </button>
              </div>
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setStatus("disconnect")}
                  className={
                    status === "disconnect"
                      ? `mx-auto  rounded-md p-2 border-primary border  text-primary transition-all h-[85px] w-[120px]`
                      : `mx-auto  rounded-md p-2 ${
                          theme === "dark"
                            ? " hover:text-dark-secondary"
                            : "hover:border-secondary hover:text-secondary"
                        }  transition-all h-[85px] w-[120px]`
                  }
                >
                  <BiCut className="text-xl mx-auto" />
                  <h1 className="text-sm font-semibold mt-2">Disconnect</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryLayout;

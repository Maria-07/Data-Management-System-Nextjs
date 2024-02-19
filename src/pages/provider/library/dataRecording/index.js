/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import PromptLevelModal from "@/component/UI/Library/Program/DataRecording/Modal/PromptLevelModal";
import WorkFlowModal from "@/component/UI/Library/Program/DataRecording/Modal/WorkFlowModal";

import { Dropdown, Select, Space } from "antd";
import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDeleteOutline, MdDone, MdOutlinePreview } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

const dataRecordingPage = () => {
  const dropdownContainerRef = useRef(null);

  const [masteredWorkflow, setMasteredWorkflow] = useState(
    "Skill-Based Treatment (Manual)"
  );
  const [promptLevel, setpromptLevel] = useState("Prompt Hierarchy");
  const [workFlow, setWorkFlow] = useState(false);
  const handleWorkFlow = () => {
    setWorkFlow(!workFlow);
  };
  const [prompt, setPrompt] = useState(false);
  const handlePrompt = () => {
    setPrompt(!prompt);
  };

  const items = [
    "waiting",
    "working-on",
    "mastered",
    "closed",
    "hold",
    "disconnected",
  ];

  const options = [
    {
      label: "China",
      value: "china",
      emoji: "🇨🇳",
      desc: "China (中国)",
    },
    {
      label: "USA",
      value: "usa",
      emoji: "🇺🇸",
      desc: "USA (美国)",
    },
    {
      label: "Japan",
      value: "japan",
      emoji: "🇯🇵",
      desc: "Japan (日本)",
    },
    {
      label: "Korea",
      value: "korea",
      emoji: (
        <>
          <GiHamburgerMenu />
        </>
      ),
      desc: "Korea (韩国)",
    },
  ];
  const [value, setValue] = useState("waiting");
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setValue(value);
  };
  //! Theme change
  const { theme } = useTheme();

  return (
    <div className=" ">
      <div
        className={`${
          theme === "dark"
            ? "bg-dark-primary border-dark-background"
            : "secondary"
        } min-h-[80vh] lg:p-5 p-2 w-full`}
      >
        <div className="grid grid-cols-1 gap-5">
          <div>
            <div>
              <Dropdown
                className="z-10"
                dropdownRender={() => (
                  <>
                    <div className="bg-white border z-10">
                      <h1 className="bg-blue-500 text-fuchsia-50 text-xs font-semibold px-2 py-1">
                        Improve accuracy
                      </h1>
                      <div
                        onClick={() => {
                          setMasteredWorkflow(
                            "80% across 10 sessions (min. 3 trials)"
                          );
                        }}
                        className="hover:bg-sky-100 transition-all"
                      >
                        <div className="p-2">
                          <div className="flex items-center justify-between ">
                            <div>
                              <h2 className="text-base">
                                80% across 10 sessions (min. 3 trials)
                              </h2>
                            </div>
                            <div title="Adjust workflow settings">
                              <VscSettings
                                onClick={handleWorkFlow}
                                className="text-lg font-semibold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <h1 className="bg-blue-500 text-fuchsia-50 text-xs font-semibold px-2 py-1">
                        Manual mastery
                      </h1>

                      <div
                        onClick={() => {
                          setMasteredWorkflow(
                            " Skill-Based Treatment (Manual)"
                          );
                        }}
                        className="hover:bg-sky-100 transition-all"
                      >
                        <div className="p-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h2 className="text-base">
                                Skill-Based Treatment (Manual)
                              </h2>
                            </div>
                            <div title="Adjust workflow settings">
                              <VscSettings
                                onClick={handleWorkFlow}
                                className="text-lg font-semibold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button onClick={handleWorkFlow} className="p-2 my-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-base">
                              Add new mastering workflow...
                            </h2>
                          </div>
                        </div>
                      </button>
                    </div>
                  </>
                )}
                placement="bottom"
                // trigger={["click"]}
              >
                {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
                <div className="my-3 px-2 py-1 rounded-md w-full border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xs font-semibold text-primary">
                        Mastering Workflow
                      </h1>
                      <h2 className="text-base">{masteredWorkflow}</h2>
                    </div>
                    <div>
                      <VscSettings
                        onClick={handleWorkFlow}
                        className="text-lg font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div>
            <div>
              <Dropdown
                className="z-10"
                dropdownRender={() => (
                  <>
                    <div className="bg-white border z-10">
                      <h1 className="bg-blue-500 text-fuchsia-50 text-xs font-semibold px-2 py-1">
                        Prompt Hierarchy
                      </h1>
                      <div
                        onClick={() => {
                          setpromptLevel(
                            "80% across 10 sessions (min. 3 trials)"
                          );
                        }}
                        className="hover:bg-sky-100 transition-all"
                      >
                        <div className="p-2">
                          <div className="flex items-center justify-between ">
                            <div>
                              <h2 className="text-base">
                                80% across 10 sessions (min. 3 trials)
                              </h2>
                            </div>
                            <div title="Adjust workflow settings">
                              <MdOutlinePreview
                                onClick={handlePrompt}
                                className="text-lg font-semibold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <h1 className="bg-blue-500 text-fuchsia-50 text-xs font-semibold px-2 py-1">
                        Manual mastery
                      </h1>

                      <div
                        onClick={() => {
                          setpromptLevel(" Skill-Based Treatment (Manual)");
                        }}
                        className="hover:bg-sky-100 transition-all"
                      >
                        <div className="p-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h2 className="text-base">
                                Skill-Based Treatment (Manual)
                              </h2>
                            </div>
                            <div title="Adjust workflow settings">
                              <MdOutlinePreview
                                onClick={handlePrompt}
                                className="text-lg font-semibold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                placement="bottom"
                // trigger={["click"]}
              >
                {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
                <div className="my-3 px-2 py-1 rounded-md w-full border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xs font-semibold text-primary">
                        Prompt Level Template
                      </h1>
                      <h2 className="text-base">{promptLevel}</h2>
                    </div>
                    <div>
                      <MdOutlinePreview
                        onClick={handlePrompt}
                        className="text-lg font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="first_name"
              onClick={() => {
                // setAddPhase(!addPhase);
              }}
            />
            <label className="label">
              <span className="  text-base font-semibold ">
                Sync timer with session duration
              </span>
            </label>
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
      {workFlow && (
        <WorkFlowModal
          handleClose={handleWorkFlow}
          clicked={workFlow}
        ></WorkFlowModal>
      )}
      {prompt && (
        <PromptLevelModal
          handleClose={handlePrompt}
          clicked={prompt}
        ></PromptLevelModal>
      )}
    </div>
  );
};

export default dataRecordingPage;

dataRecordingPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <LibraryLayout>{page}</LibraryLayout>
    </RootLayout>
  );
};

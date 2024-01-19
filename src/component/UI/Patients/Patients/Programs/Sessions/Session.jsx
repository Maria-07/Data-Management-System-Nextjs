import { Collapse, Timeline } from "antd";
import { useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { IoLayers } from "react-icons/io5";
import { FaCircleNotch, FaGraduationCap, FaTrophy } from "react-icons/fa";
import { PiNotepadBold } from "react-icons/pi";
import CustomSelectAntd from "@/shared/CustomSelectAntd";
import { useTheme } from "next-themes";

function Session() {
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onChange = (key) => {
    console.log(key);
  };

  //! Theme system
  const { theme } = useTheme();

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
  const genExtra = () => (
    <div className="flex items-center gap-2 text-lg mt-3">
      {/* <BiFullscreen /> */}
      <div
        className=" flex items-center gap-2 text-lg"
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      >
        <CgMoreVerticalO />
        <IoLayers />
        <FaCircleNotch />
      </div>
    </div>
  );

  return (
    <div>
      {/* <ClinicalSessionCard></ClinicalSessionCard> */}
      <div>
        <div className="my-5">
          <div>
            <h1
              className={`${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }text-sm mb-2 font-semibold`}
            >
              Programs
            </h1>

            <CustomSelectAntd
              item={treatmentArray}
              setOption={setTreatment}
              sName={"Programs"}
            ></CustomSelectAntd>
          </div>
        </div>
      </div>
      <div className="">
        <div className="">
          <Collapse
            // defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
            className="my-5"
            items={[
              {
                key: "1",
                label: (
                  <>
                    <div className="flex  justify-between">
                      <div className="font-medium uppercase">
                        Washing Hand&apos;s baseLine{" "}
                        <h2 className="text-xs text-primary">
                          skill | Trial by Trial
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 mr-3">
                        <div
                          title="0 targets being probed"
                          className="border-orange-500 text-orange-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <PiNotepadBold className="" /> 0
                        </div>
                        <div
                          title="1 targets being acquisition"
                          className="border-blue-500 text-blue-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <FaGraduationCap /> 1
                        </div>
                        <div
                          title="0 targets already mastered of these 0 are closed and not taught anymore"
                          className="border-green-500 text-green-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <FaTrophy /> 0
                        </div>
                      </div>
                    </div>
                  </>
                ),
                children: (
                  <div>
                    {" "}
                    <div className="my-5">
                      <h1 className="font-semibold text-sm mb-1">
                        Created At :{" "}
                      </h1>
                      <h1 className="text-xs">System - 08/29/23</h1>
                    </div>
                  </div>
                ),
                extra: genExtra(),
              },
            ]}
          />
          <Collapse
            // defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
            className="my-5"
            items={[
              {
                key: "1",
                label: (
                  <>
                    <div className="flex  justify-between">
                      <div className="font-medium uppercase">
                        Washing Hand&apos;s baseLine{" "}
                        <h2 className="text-xs text-primary">
                          skill | Trial by Trial
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 mr-3">
                        <div
                          title="0 targets being probed"
                          className="border-orange-500 text-orange-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <PiNotepadBold className="" /> 0
                        </div>
                        <div
                          title="1 targets being acquisition"
                          className="border-blue-500 text-blue-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <FaGraduationCap /> 1
                        </div>
                        <div
                          title="0 targets already mastered of these 0 are closed and not taught anymore"
                          className="border-green-500 text-green-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <FaTrophy /> 0
                        </div>
                      </div>
                    </div>
                  </>
                ),
                children: (
                  <div>
                    {" "}
                    <div className="my-5">
                      <h1 className="font-semibold text-sm mb-1">
                        Created At :{" "}
                      </h1>
                      <h1 className="text-xs">System - 08/29/23</h1>
                    </div>
                  </div>
                ),
                extra: genExtra(),
              },
            ]}
          />
          <Collapse
            // defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
            className="my-5"
            items={[
              {
                key: "1",
                label: (
                  <>
                    <div className="flex  justify-between">
                      <div className="font-medium uppercase">
                        Washing Hand&apos;s baseLine{" "}
                        <h2 className="text-xs text-primary">
                          skill | Trial by Trial
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 mr-3">
                        <div
                          title="0 targets being probed"
                          className="border-orange-500 text-orange-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <PiNotepadBold className="" /> 0
                        </div>
                        <div
                          title="1 targets being acquisition"
                          className="border-blue-500 text-blue-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <FaGraduationCap /> 1
                        </div>
                        <div
                          title="0 targets already mastered of these 0 are closed and not taught anymore"
                          className="border-green-500 text-green-600 px-2 border-[1px] rounded-xl flex items-center gap-2"
                        >
                          <FaTrophy /> 0
                        </div>
                      </div>
                    </div>
                  </>
                ),
                children: (
                  <div>
                    {" "}
                    <div className="my-5">
                      <h1 className="font-semibold text-sm mb-1">
                        Created At :{" "}
                      </h1>
                      <h1 className="text-xs">System - 08/29/23</h1>
                    </div>
                  </div>
                ),
                extra: genExtra(),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Session;

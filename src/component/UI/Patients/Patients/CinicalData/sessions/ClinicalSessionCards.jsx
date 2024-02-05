import { Collapse, Timeline } from "antd";
import { useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { IoLayers } from "react-icons/io5";
import { FaCircleNotch, FaGraduationCap, FaTrophy } from "react-icons/fa";
import { PiNotepadBold } from "react-icons/pi";

function ClinicalSessionCards() {
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onChange = (key) => {
    // console.log(key);
  };
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

      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="md:col-span-4 py-3 px-5 my-5 shadow-lg border rounded-lg">
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
                    <div className="flex  justify-between flex-wrap gap-2">
                      <div className="font-medium uppercase">
                        Washing Hand&apos;s baseLine
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
                    <div className="my-5">
                      <h1 className="font-semibold text-sm mb-1">
                        Created At :
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
                    <div className="flex  justify-between flex-wrap gap-2">
                      <div className="font-medium uppercase">
                        Washing Hand&apos;s baseLine
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
                    <div className="my-5">
                      <h1 className="font-semibold text-sm mb-1">
                        Created At :
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
                    <div className="flex  justify-between flex-wrap gap-2">
                      <div className="font-medium uppercase">
                        Washing Hand&apos;s baseLine
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
                    <div className="my-5">
                      <h1 className="font-semibold text-sm mb-1">
                        Created At :
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
        <div className="sm:col-span-2  py-3 px-5 my-5 shadow-lg border rounded-lg">
          <h1 className="my-5 text-sm font-semibold">
            LATEST PROGRAM MODIFICATIONS
          </h1>

          <div>
            <div className="my-5">
              <h1 className="text-xl text-primary font-semibold mb-7">
                Thursday, November 23, 2023
              </h1>
              <div>
                <Timeline
                  items={[
                    {
                      children: "Create a services site 2015-09-01",
                    },
                    {
                      children: "Solve initial network problems 2015-09-01",
                    },
                    {
                      children: "Technical testing 2015-09-01",
                    },
                    {
                      children: "Network problems being solved 2015-09-01",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-xl text-primary font-semibold mb-7">
                Thursday, November 23, 2023
              </h1>
              <div>
                <Timeline
                  items={[
                    {
                      children: "Create a services site 2015-09-01",
                    },
                    {
                      children: "Solve initial network problems 2015-09-01",
                    },
                    {
                      children: "Technical testing 2015-09-01",
                    },
                    {
                      children: "Network problems being solved 2015-09-01",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="my-5">
              <h1 className="text-xl text-primary font-semibold mb-7">
                Thursday, November 23, 2023
              </h1>
              <div>
                <Timeline
                  items={[
                    {
                      children: "Create a services site 2015-09-01",
                    },
                    {
                      children: "Solve initial network problems 2015-09-01",
                    },
                    {
                      children: "Technical testing 2015-09-01",
                    },
                    {
                      children: "Network problems being solved 2015-09-01",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicalSessionCards;

import { Collapse, Timeline } from "antd";
import ClinicalSessionCard from "./ClinicalSessionCard";
import { useState } from "react";
import { BiFullscreen } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgMoreVerticalO } from "react-icons/cg";
import { IoLayers } from "react-icons/io5";
import { FaCircleNotch } from "react-icons/fa";

function ClinicalSessionCards() {
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onChange = (key) => {
    console.log(key);
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

      <div className="grid md:grid-cols-6 sm:grid-cols-3 gap-3">
        <div className="col-span-4">
          <Collapse
            // defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
            className="my-5"
            items={[
              {
                key: "1",
                label: (
                  <div className="font-medium uppercase">
                    Washing Hand&apos;s baseLine{" "}
                    <h2 className="text-xs text-primary">
                      skill | Trial by Trial
                    </h2>
                  </div>
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
                  <div className="font-medium uppercase">
                    Washing Hand&apos;s baseLine{" "}
                    <h2 className="text-xs text-primary">
                      skill | Trial by Trial
                    </h2>
                  </div>
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
                  <div className="font-medium uppercase">
                    Washing Hand&apos;s baseLine{" "}
                    <h2 className="text-xs text-primary">
                      skill | Trial by Trial
                    </h2>
                  </div>
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
        <div className="col-span-2 mx-auto">
          <h1 className="my-5 text-sm font-semibold">
            LATEST PROGRAM MODIFICATIONS
          </h1>

          <div>
            {" "}
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

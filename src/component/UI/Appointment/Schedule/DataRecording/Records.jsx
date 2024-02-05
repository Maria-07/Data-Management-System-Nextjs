import { Badge, Collapse } from "antd";
import React, { useState } from "react";
import { BiFullscreen } from "react-icons/bi";
import { FaRegClipboard, FaShare } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoMdAlert, IoMdTrophy } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiGraduationCapBold } from "react-icons/pi";

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const Records = () => {
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const genExtra = () => (
    <div className="flex items-center gap-2 text-lg">
      <BiFullscreen />
      <div
        className=" flex items-center gap-2 text-lg"
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      >
        <FaShare />
        <IoMdAlert />
        <FaClockRotateLeft />
        <RxHamburgerMenu />
      </div>
    </div>
  );

  return (
    <div>
      <Collapse
        // defaultActiveKey={["1"]}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
        className="my-5"
        items={[
          {
            key: "1",
            label: <div className="font-medium uppercase">Ecoics Simple</div>,
            children: (
              <div className="flex gap-3  overflow-scroll">
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /S/
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /W/
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /d/
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /p/
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /t/
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <IoMdTrophy className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /b/
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      /m/
                    </p>
                  </Badge>
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
                Motor-imitation - simple
              </div>
            ),
            children: (
              <div className="flex gap-3 overflow-scroll ">
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />
                      <span className="bg-lime-500 ml-[-9px] py-[3px] px-2 rounded-full text-xs text-white">
                        G
                      </span>
                      Clap Hands
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Rub Hands
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Stomp Feet
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Knock
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Wave
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <IoMdTrophy className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Kick foot (R)
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Kick Foot (L)
                    </p>
                  </Badge>
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
                Morning classroom routine
              </div>
            ),
            children: (
              <div className="flex gap-3  overflow-scroll">
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />
                      <span className="bg-lime-500 ml-[-9px] py-[3px] px-2 rounded-full text-xs text-white">
                        G
                      </span>
                      Clap Hands
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Rub Hands
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Stomp Feet
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Knock
                    </p>
                  </Badge>
                </div>

                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Kick Foot (L)
                    </p>
                  </Badge>
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
            label: <div className="font-medium uppercase">Brushing tooth</div>,
            children: (
              <div className="flex gap-3  overflow-scroll">
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />
                      <span className="bg-lime-500 ml-[-9px] py-[3px] px-2 rounded-full text-xs text-white">
                        G
                      </span>
                      Clap Hands
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-yellow-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Rub Hands
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Stomp Feet
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Knock
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <PiGraduationCapBold className="bg-green-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Wave
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <IoMdTrophy className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Kick foot (R)
                    </p>
                  </Badge>
                </div>
                <div className="">
                  <Badge count={" "} size="small" color="#B1C381">
                    <p
                      className="p-4 bg-white text-secondary border rounded-md flex shadow-md items-center gap-2
"
                    >
                      <FaRegClipboard className="bg-sky-600 p-1 rounded-lg text-xl text-white" />{" "}
                      Kick Foot (L)
                    </p>
                  </Badge>
                </div>
              </div>
            ),
            extra: genExtra(),
          },
        ]}
      />
      {/* <Collapse accordion expandIconPosition={expandIconPosition}>
        {items.map((domain) => (
          <Panel
            header={
              <div className="flex items-center justify-between">
                <div className="text-base">{domain.domain_title}</div>
                <div className="my-auto flex items-end justify-end mr-3">
                  <AiFillEdit className="text-xl" />
                </div>
              </div>
            }
            key={domain.id}
          >
            <SubDomain domain={domain}></SubDomain>
          </Panel>
        ))}
      </Collapse> */}
    </div>
  );
};

export default Records;

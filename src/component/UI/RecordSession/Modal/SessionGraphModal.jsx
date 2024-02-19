import { Collapse, DatePicker, Dropdown, Modal } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import { FaGraduationCap, FaHandPaper, FaRegClock } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { IoMdCloseCircle } from "react-icons/io";
import {
  MdCancelPresentation,
  MdDeleteOutline,
  MdDone,
  MdOutlineBarChart,
  MdOutlineEventNote,
} from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import HoursTable from "../Tables/HoursTable";

Chart.register(...registerables);

const SessionGraphModal = ({ handleClose, open }) => {
  const [graphData, setgraphData] = useState([]);
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const [status, setStatus] = useState("Acquisition");
  const [statusIcon, setStatusIcon] = useState("FaGraduationCap");
  const [graph, setGraph] = useState(false);

  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const dateFormat = "YYYY/MM/DD";

  const genExtra = () => (
    <div className="">
      <div
        className=" flex items-center justify-between gap-2 text-lg"
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      >
        <DatePicker
          defaultValue={dayjs("2015/01/01", dateFormat)}
          variant="borderless"
        />

        <Dropdown
          dropdownRender={() => (
            <>
              <div className="w-[180px] mt-2">
                <div className="bg-white border shadow-md rounded-md p-1">
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Waiting");
                    }}
                  >
                    <FaRegClock className="text-lg" /> Waiting
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Probe");
                    }}
                  >
                    <MdOutlineEventNote className="text-lg" /> Probe
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Acquisition");
                    }}
                  >
                    <FaGraduationCap className="text-lg" /> Acquisition
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Mastered");
                    }}
                  >
                    <TfiCup className="text-lg" /> Mastered
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Closed");
                    }}
                  >
                    <IoMdCloseCircle className="text-lg" /> Closed
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Hold");
                    }}
                  >
                    <FaHandPaper className="text-lg" /> Hold
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 border py-2 transition-all hover:bg-primary hover:text-white"
                    onClick={() => {
                      setStatus("Discontinued");
                    }}
                  >
                    <MdCancelPresentation className="text-lg" /> Discontinued
                  </button>
                </div>
              </div>
            </>
          )}
          placement="bottom"
          arrow
          trigger={["click"]}
        >
          {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
          <div className=" flex items-center gap-2  justify-center ml-10">
            <button
              //
              className="px-2 pt-1 pb-2 bg-secondary text-sm text-white rounded-md min-w-[100px] max-w-[105px] text-center"
            >
              {status}
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );

  useEffect(() => {
    // Simulated asynchronous data fetching
    setTimeout(() => {
      const data = [
        { months: "Jan", sum: 0.1 },
        { months: "Feb", sum: 0.5 },
        { months: "Mar", sum: 0.8 },
        { months: "Apr", sum: 0.3 },
        { months: "May", sum: 1 },
      ];
      setgraphData(data);
    }, 1000);
  }, []);

  return (
    <Modal
      open={open}
      centered
      footer={null}
      bodyStyle={{ padding: "0" }}
      width={900}
      closable={false}
      className="box"
    >
      <div className="px-0 py-2 font-[poppins,sans-serif]">
        <div className="flex items-center justify-between">
          <h1 className="text-base text-left text-orange-400">Session Graph</h1>
          <div className="flex items-center gap-2">
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 text-2xl hover:text-primary cursor-pointer"
            />
          </div>
        </div>
        <div className="bg-gray-200 py-[1px] mt-3"></div>

        <div>
          <Collapse
            // defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={expandIconPosition}
            className="my-5"
            items={[
              {
                key: "1",
                label: (
                  <div className="font-medium uppercase">Ecoics Simple</div>
                ),
                children: (
                  <div>
                    <div className="flex items-center justify-end">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            setGraph(true);
                          }}
                          className={`flex items-center border text-sm px-2 py-1 gap-2 ${
                            graph && `bg-primary text-white`
                          }`}
                        >
                          <SlGraph /> RATE
                        </button>
                        <button
                          onClick={() => {
                            setGraph(false);
                          }}
                          className={`flex items-center border text-sm px-2 py-1 gap-2 ${
                            !graph && `bg-primary text-white`
                          }`}
                        >
                          <MdOutlineBarChart /> OBSERVATION PER DAY
                        </button>
                      </div>
                    </div>
                    {graph ? (
                      <>
                        {" "}
                        <div className="p-2">
                          <Line
                            data={{
                              labels: graphData.map((data) => data.months),
                              datasets: [
                                {
                                  label: graphData.months,
                                  data: graphData.map((data) => data.sum),
                                  backgroundColor: "#56BBF1",
                                  barThickness: 35,
                                },
                              ],
                            }}
                            options={{
                              tooltips: {
                                mode: "index",
                                callbacks: {
                                  label: function (toolTipItem) {
                                    return "Revenue: $" + toolTipItem.value;
                                  },
                                },
                              },
                              scales: {
                                xAxes: [
                                  {
                                    gridLines: {
                                      color: "#56BBF1",
                                    },
                                    scaleLabel: {
                                      labelString: "Months",
                                      display: true,
                                      fontColor: "blue",
                                      fontSize: 20,
                                    },
                                    ticks: {
                                      fontColor: "green",
                                    },
                                  },
                                ],
                                yAxes: [
                                  {
                                    suggestedMax: 10000,
                                    gridLines: {
                                      color: "cyan",
                                    },
                                    scaleLabel: {
                                      labelString: "Revenue",
                                      display: true,
                                      fontColor: "blue",
                                      fontSize: 20,
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: "green",
                                    },
                                  },
                                ],
                              },
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="p-2">
                          <Bar
                            className=" chart p-2"
                            data={{
                              labels: graphData.map((data) => data.months),
                              datasets: [
                                {
                                  label: graphData.months,
                                  data: graphData.map((data) => data.sum),
                                  backgroundColor: "#96E9C6",
                                  barThickness: 35,
                                },
                              ],
                            }}
                            options={{
                              tooltips: {
                                mode: "index",
                                callbacks: {
                                  label: function (toolTipItem) {
                                    return "Revenue: $" + toolTipItem.value;
                                  },
                                },
                              },
                              scales: {
                                xAxes: [
                                  {
                                    gridLines: {
                                      color: "cyan",
                                    },
                                    scaleLabel: {
                                      labelString: "Months",
                                      display: true,
                                      fontColor: "blue",
                                      fontSize: 20,
                                    },
                                    ticks: {
                                      fontColor: "green",
                                    },
                                  },
                                ],
                                yAxes: [
                                  {
                                    suggestedMax: 10000,
                                    gridLines: {
                                      color: "cyan",
                                    },
                                    scaleLabel: {
                                      labelString: "Revenue",
                                      display: true,
                                      fontColor: "blue",
                                      fontSize: 20,
                                    },
                                    ticks: {
                                      beginAtZero: true,
                                      fontColor: "green",
                                    },
                                  },
                                ],
                              },
                            }}
                          ></Bar>
                        </div>
                      </>
                    )}

                    <div className="mt-5">
                      <HoursTable></HoursTable>
                    </div>
                  </div>
                ),
                extra: genExtra(),
              },
            ]}
          />
        </div>

        {/* <div className="flex items-end justify-end mt-2">
          <button className="dcm-button mr-2">Save</button>
          <button className="dcm-close-button" onClick={handleClose}>
            <MdDeleteOutline /> Cancel
          </button>
        </div> */}
        <div className="flex items-end justify-end gap-2 mt-2">
          <button className=" border-secondary flex items-center border rounded-sm">
            <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
            <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
              Save
            </span>
          </button>
          <button
            className=" border-rose-600 flex items-center border rounded-sm"
            onClick={handleClose}
          >
            <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
            <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
              Cancel
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SessionGraphModal;

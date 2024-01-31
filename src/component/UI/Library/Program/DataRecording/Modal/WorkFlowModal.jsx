import { Collapse, Modal, Select } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGraduationCap, FaPlus } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCloseCircleOutline, IoMdTrophy } from "react-icons/io";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import AddNewPhaseModal from "./AddNewPhaseModal";
import EditPhaseModal from "./EditPhaseModal";
import { LuFileClock } from "react-icons/lu";

const WorkFlowModal = ({ handleClose, clicked }) => {
  const { register, handleSubmit, reset } = useForm();
  const [addPhase, setAddPhase] = useState(false);

  const [addNewPhase, setAddNewPhase] = useState(false);
  const handleAddNewPhase = () => {
    setAddNewPhase(!addNewPhase);
  };
  const [editPhase, setEditPhase] = useState(false);
  const handleEditPhase = () => {
    setEditPhase(!editPhase);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
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
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const OPTIONS = [
    "Daily",
    "Bi-weekly",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Semi-annually",
    "Annually",
  ];

  const [selectedItems, setSelectedItems] = useState(["Daily"]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  console.log(selectedItems);

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={900}
        closable={false}
        className="box z-20"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Add workflow
              <h2 className="text-sm font-normal text-gray-400">
                OBJECTIVE: IMPROVE ACCURACY
              </h2>
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] my-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <div className="bg-gray-100 rounded-t-md  border-[2px] border-gray-200  p-2 flex items-center gap-3">
                  <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-orange-500 text-white">
                    <TbReportAnalytics /> Prob{" "}
                    <MdEdit onClick={handleEditPhase} />
                  </button>
                  <FaArrowRightLong className="text-lg text-gray-400" />
                  <button className="flex items-center text-xs py-1 gap-2 font-semibold rounded-lg px-2 bg-lime-500 text-white">
                    <MdOutlineDone className="text-base" /> Closed
                  </button>
                </div>
                <div className="border-[2px] p-3 border-t-0">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="label">
                        <span className=" label-font">Mastering Accuracy</span>
                      </label>
                      <div className="flex ">
                        <input
                          type="number"
                          name="first_name"
                          className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                          {...register("first_name")}
                        />
                        <span className="px-2 py-1 flex">across</span>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <input
                        type="number"
                        name="first_name"
                        className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                        {...register("first_name")}
                      />
                      <span>session(s)</span>
                    </div>
                    <div className="col-span-2">
                      <label className="label">
                        <span className=" label-font">
                          Minimum number of trials required ( per person )
                        </span>
                      </label>
                      <div className="flex ">
                        <input
                          type="number"
                          name="first_name"
                          className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                          {...register("first_name")}
                        />
                        <span className="px-2 py-1 flex">trial(s)</span>
                      </div>
                    </div>
                  </div>
                  <Collapse
                    // defaultActiveKey={["1"]}
                    onChange={onChange}
                    className="my-5"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="font-medium text-sm uppercase">
                            Advanced Settings . . . .
                          </div>
                        ),
                        children: (
                          <div>
                            <div className=" ">
                              <label className="label">
                                <span className=" label-font">
                                  Status after probe (If not mastered)
                                </span>
                              </label>
                              <select
                                className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                                name="status"
                                {...register("status")}
                              >
                                <option value="waiting" className="">
                                  Waiting
                                </option>
                                <option value="acquisition">Acquisition</option>
                              </select>
                            </div>
                            <div className="mt-3">
                              <label className="label">
                                <span className=" label-font">
                                  Target status if mastered
                                </span>
                              </label>
                              <select
                                className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                                name="status"
                                {...register("status")}
                              >
                                <option value="waiting" className="">
                                  Closed
                                </option>
                                <option value="mastered">Mastered</option>
                                <option value="acquisition">Acquisition</option>
                              </select>
                            </div>
                            <div className="mt-3">
                              <label className="label">
                                <span className=" label-font">
                                  Minimum number of trials required ( per person
                                  )
                                </span>
                              </label>
                              <div className="flex ">
                                <input
                                  type="number"
                                  name="first_name"
                                  className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                  {...register("first_name")}
                                />
                                <span className="px-2 py-1 flex">trial(s)</span>
                              </div>
                              <div className="text-sm text-gray-400">
                                (optional)
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name="first_name"
                                  onClick={() => {
                                    setAddPhase(!addPhase);
                                  }}
                                />
                                <label className="label">
                                  <span className="  text-base font-semibold ">
                                    Automatically add phase line when entering
                                    &apos;Acquisition&apos; status
                                  </span>
                                </label>
                              </div>
                              {addPhase && (
                                <div>
                                  <label className="label mt-3">
                                    <span className=" label-font">
                                      Acquisition
                                    </span>
                                  </label>
                                  <div className="flex ">
                                    <input
                                      type="number"
                                      name="first_name"
                                      className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                      {...register("first_name")}
                                    />
                                    <span className="px-2 py-1 flex">
                                      trial(s)
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    (Acquisition Phase line label)
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="bg-gray-100 rounded-t-md  border-[2px] border-gray-200  p-2 flex items-center gap-3">
                  <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-blue-500 text-white">
                    <FaGraduationCap /> Acquisition{" "}
                    <MdEdit onClick={handleEditPhase} />
                  </button>
                  <FaArrowRightLong className="text-lg text-gray-400" />
                  <button className="flex items-center text-xs py-1 gap-2 font-semibold rounded-lg px-2 bg-lime-500 text-white">
                    <MdOutlineDone className="text-base" /> Closed
                  </button>
                </div>
                <div className="border-[2px] p-3 border-t-0">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="label">
                        <span className=" label-font">Mastering Accuracy</span>
                      </label>
                      <div className="flex ">
                        <input
                          type="number"
                          name="first_name"
                          className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                          {...register("first_name")}
                        />
                        <span className="px-2 py-1 flex">across</span>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <input
                        type="number"
                        name="first_name"
                        className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                        {...register("first_name")}
                      />
                      <span>session(s)</span>
                    </div>
                    <div className="col-span-2">
                      <label className="label">
                        <span className=" label-font">
                          Minimum number of trials required ( per person )
                        </span>
                      </label>
                      <div className="flex ">
                        <input
                          type="number"
                          name="first_name"
                          className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                          {...register("first_name")}
                        />
                        <span className="px-2 py-1 flex">trial(s)</span>
                      </div>
                    </div>
                  </div>
                  <Collapse
                    // defaultActiveKey={["1"]}
                    onChange={onChange}
                    className="my-5"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="font-medium text-sm uppercase">
                            Advanced Settings . . . .
                          </div>
                        ),
                        children: (
                          <div>
                            <div className=" ">
                              <label className="label">
                                <span className=" label-font">
                                  Status after probe (If not mastered)
                                </span>
                              </label>
                              <select
                                className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                                name="status"
                                {...register("status")}
                              >
                                <option value="waiting" className="">
                                  Waiting
                                </option>
                                <option value="acquisition">Acquisition</option>
                              </select>
                            </div>
                            <div className="mt-3">
                              <label className="label">
                                <span className=" label-font">
                                  Target status if mastered
                                </span>
                              </label>
                              <select
                                className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                                name="status"
                                {...register("status")}
                              >
                                <option value="waiting" className="">
                                  Closed
                                </option>
                                <option value="mastered">Mastered</option>
                                <option value="acquisition">Acquisition</option>
                              </select>
                            </div>
                            <div className="mt-3">
                              <label className="label">
                                <span className=" label-font">
                                  Minimum number of trials required ( per person
                                  )
                                </span>
                              </label>
                              <div className="flex ">
                                <input
                                  type="number"
                                  name="first_name"
                                  className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                  {...register("first_name")}
                                />
                                <span className="px-2 py-1 flex">trial(s)</span>
                              </div>
                              <div className="text-sm text-gray-400">
                                (optional)
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name="first_name"
                                  onClick={() => {
                                    setAddPhase(!addPhase);
                                  }}
                                />
                                <label className="label">
                                  <span className="  text-base font-semibold ">
                                    Automatically add phase line when entering
                                    &apos;Acquisition&apos; status
                                  </span>
                                </label>
                              </div>
                              {addPhase && (
                                <div>
                                  <label className="label mt-3">
                                    <span className=" label-font">
                                      Acquisition
                                    </span>
                                  </label>
                                  <div className="flex ">
                                    <input
                                      type="number"
                                      name="first_name"
                                      className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                      {...register("first_name")}
                                    />
                                    <span className="px-2 py-1 flex">
                                      trial(s)
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    (Acquisition Phase line label)
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleAddNewPhase}
                  className="text-center flex items-center justify-center gap-2 text-base w-full border p-1 bg-gray-200 rounded-md my-4"
                >
                  <FaPlus /> ADD NEW PHASE
                </button>
              </div>
              <div className="mt-5">
                <div className="bg-gray-100 rounded-t-md  border-[2px] border-gray-200  p-2 flex items-center gap-3">
                  <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-green-500 text-white">
                    <IoMdTrophy /> Mastered <MdEdit onClick={handleEditPhase} />
                  </button>
                  <FaArrowRightLong className="text-lg text-gray-400" />
                  <button className="flex items-center text-xs py-1 gap-2 font-semibold rounded-lg px-2 bg-lime-500 text-white">
                    <MdOutlineDone className="text-base" /> Closed
                  </button>
                </div>
                <div className="border-[2px] p-3 border-t-0">
                  <div className="col-span-2">
                    <h1 className="my-1 font-semibold">INTERVAL</h1>
                  </div>
                  {selectedItems?.map((d, i) => (
                    <>
                      {d === "Daily" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">Daily for</span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">Days</span>
                            </div>
                          </div>
                        </>
                      )}
                      {d === "Weekly" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">Weekly for</span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">Week</span>
                            </div>
                          </div>
                        </>
                      )}
                      {d === "Bi-weekly" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">Bi-weekly for</span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">BiWeek</span>
                            </div>
                          </div>
                        </>
                      )}
                      {d === "Monthly" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">Monthly for</span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">Month</span>
                            </div>
                          </div>
                        </>
                      )}
                      {d === "Quarterly" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">Quarterly for</span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">Quarter</span>
                            </div>
                          </div>
                        </>
                      )}
                      {d === "Semi-annually" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">
                                Semi-annually for
                              </span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">semiannual</span>
                            </div>
                          </div>
                        </>
                      )}
                      {d === "Annually" && (
                        <>
                          <div className="flex w-full">
                            <label className="label">
                              <span className=" label-font">Annually for</span>
                            </label>
                            <div className="flex">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">Year</span>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ))}

                  <div className="my-6">
                    <Select
                      mode="multiple"
                      placeholder="Add Maintenance Interval"
                      value={selectedItems}
                      onChange={setSelectedItems}
                      style={{
                        width: "100%",
                      }}
                      options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  </div>

                  <div className="py-2 px-4 rounded-md bg-emerald-300">
                    <p>
                      If a target does not meet the criteria set below it will
                      appear daily until criteria are met, regardless of
                      it&apos;s current maintenance interval. You can read more
                      about maintenance schedules in the Knowledge Base.
                    </p>
                  </div>

                  <div>
                    <label className="label">
                      <span className=" label-font">Mastering Accuracy</span>
                    </label>
                    <div className="flex mb-3">
                      <input
                        type="number"
                        name="first_name"
                        className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                        {...register("first_name")}
                      />
                      <span className="px-2 py-1 flex">%</span>
                    </div>
                    <label className="label">
                      <span className=" label-font">
                        Min. number of trails required (per session){" "}
                      </span>
                    </label>
                    <div className="flex ">
                      <input
                        type="number"
                        name="first_name"
                        className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                        {...register("first_name")}
                      />
                    </div>

                    <div className="text-sm text-gray-400">
                      (Phase line label)
                    </div>
                  </div>

                  <Collapse
                    // defaultActiveKey={["1"]}
                    onChange={onChange}
                    className="my-5"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="font-medium text-sm uppercase">
                            Advanced Settings . . . .
                          </div>
                        ),
                        children: (
                          <div>
                            <div className="mt-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name="first_name"
                                  onClick={() => {
                                    setAddPhase(!addPhase);
                                  }}
                                />
                                <label className="label">
                                  <span className="  text-base font-semibold ">
                                    Automatically add phase line when entering
                                    &apos;Mastered&apos; status
                                  </span>
                                </label>
                              </div>
                              {addPhase && (
                                <div>
                                  <div className="flex ">
                                    <input
                                      placeholder="Mastered"
                                      type="number"
                                      name="first_name"
                                      className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                      {...register("first_name")}
                                    />
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    (Phase line label)
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />

                  <div className="">
                    <div className="bg-gray-100 rounded-t-md  border-[2px] border-gray-200  p-2 flex items-center gap-3">
                      {" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        <input
                          type="checkbox"
                          name="first_name"
                          onClick={() => {
                            setAddPhase(!addPhase);
                          }}
                        />
                      </div>
                      <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-green-500 text-white">
                        <IoMdTrophy /> Mastered{" "}
                        <MdEdit onClick={handleEditPhase} />
                      </button>
                      <FaArrowRightLong className="text-lg text-gray-400" />
                      <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-blue-500 text-white">
                        <FaGraduationCap /> Acquisition{" "}
                      </button>
                    </div>

                    {addPhase && (
                      <div className="border">
                        {" "}
                        <div className="my-3 px-3">
                          <label className="label">
                            <span className=" label-font">
                              Revert when target does not meet criteria across
                            </span>
                          </label>
                          <div className="flex ">
                            <input
                              type="number"
                              name="first_name"
                              className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                              {...register("first_name")}
                            />
                            <span className="px-2 py-1 flex">Sessions(s)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="bg-gray-100 rounded-t-md  border-[2px] border-gray-200  p-2 flex items-center gap-3">
                  <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-gray-500 text-white">
                    <LuFileClock /> Waiting <MdEdit onClick={handleEditPhase} />
                  </button>
                  <FaArrowRightLong className="text-lg text-gray-400" />
                </div>
                <div className="border-[2px] p-3 border-t-0">
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="first_name"
                        onClick={() => {
                          setAddPhase(!addPhase);
                        }}
                      />
                      <label className="label">
                        <span className="  text-base font-semibold ">
                          Automatically open new targets when targets are
                          mastered
                        </span>
                      </label>
                    </div>
                    {addPhase && (
                      <div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2">
                            <label className="label">
                              <span className=" label-font">
                                Max. number of simultaneous targets in probe and
                                acquisition phases
                              </span>
                            </label>
                            <div className="flex ">
                              <input
                                type="number"
                                name="first_name"
                                className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                                {...register("first_name")}
                              />
                              <span className="px-2 py-1 flex">Targets</span>
                            </div>
                          </div>
                        </div>

                        <div className=" ">
                          <label className="label">
                            <span className=" label-font">
                              Initial status when opening new targets
                            </span>
                          </label>
                          <select
                            className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                            name="status"
                            {...register("status")}
                          >
                            <option value="waiting" className="">
                              Prob
                            </option>
                            <option value="acquisition">Acquisition</option>
                          </select>
                        </div>
                        <div className="mt-3">
                          <label className="label">
                            <span className=" label-font">Direction</span>
                          </label>
                          <select
                            className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                            name="status"
                            {...register("status")}
                          >
                            <option value="waiting" className="">
                              Open last waiting target (backward chaining)
                            </option>
                            <option value="mastered">
                              {" "}
                              Open first waiting target
                            </option>
                            <option value="acquisition">
                              {" "}
                              Open all waiting targets (total task)
                            </option>
                          </select>
                          <span className="px-1 text-sm font-medium text-gray-400 py-1 flex">
                            For Set of Targets and Task Analysis targets this
                            setting applies to steps/sub-targets only.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="label">
                  <span className=" label-font">WorkFlow name</span>
                </label>
                <div className="flex ">
                  <input
                    type="text"
                    name="first_name"
                    className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                    {...register("first_name")}
                  />
                </div>
                <div className="text-sm text-gray-400">(optional)</div>
              </div>
            </div>
            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Ok
              </button>
              <button onClick={handleClose} className="dcm-modal-close-button">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {addNewPhase && (
          <AddNewPhaseModal
            handleClose={handleAddNewPhase}
            clicked={addNewPhase}
          ></AddNewPhaseModal>
        )}
        {editPhase && (
          <EditPhaseModal
            handleClose={handleEditPhase}
            clicked={editPhase}
          ></EditPhaseModal>
        )}
      </Modal>
    </div>
  );
};

export default WorkFlowModal;

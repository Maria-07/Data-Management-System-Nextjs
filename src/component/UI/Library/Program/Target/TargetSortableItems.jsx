import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Collapse, Dropdown, Select, Tooltip } from "antd";
import { useState } from "react";
import {
  AiFillEdit,
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiDotsHorizontal, BiDoughnutChart, BiDuplicate } from "react-icons/bi";
import { IoIosOptions } from "react-icons/io";
import TargetDeleteModal from "./TargetModal/TargetDeleteModal";
import CustomSelectAntd from "@/shared/CustomSelectAntd";

const { Panel } = Collapse;

const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

const TargetSortableItems = ({ id, item, setSD }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      animateLayoutChanges,
      id: id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // borderBottom: "1px solid #e3e3e3",
    // padding: "22px 10px",
    // height: `3px`,
    // cursor: "grab",
    // userSelect: "none",
    // margin: "0px",
  };

  const selectItems = [
    "Waiting",
    "Working-on",
    "Mastered",
    "Closed",
    "Hold",
    "Disconnected",
  ];

  const [value, setValue] = useState("waiting");
  const [addSD, setAddSD] = useState("");
  const [addSDArray, setAddSDArray] = useState([
    "Waiting",
    "Working-on",
    "Mastered",
    "Closed",
    "Hold",
    "Disconnected",
  ]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(false);
  const handleDeleteTarget = () => {
    setDeleteTarget(!deleteTarget);
  };

  return (
    <div>
      <div className="hover:bg-gray-100">
        <div className=" ">
          <div
            ref={setNodeRef}
            className="grid grid-cols-6 cursor-grab border-t-[1px] "
            style={style}
            {...attributes}
          >
            <div className="flex gap-5 hover:text-dark   px-3 sm:col-span-4">
              <div
                className="my-auto p-2 text-gray-400 hover:text-dark  "
                {...listeners}
              >
                <AiOutlineMenu className=" text-xl" />
              </div>
              <div className="w-full">
                <Collapse ghost accordion>
                  <Panel
                    header={
                      <div>
                        {setSD && (
                          <div className="flex items-center gap-3 mb-3 w-full">
                            <button className="text-[10px] px-1 bg-primary  text-white rounded-lg">
                              SD
                            </button>{" "}
                            <div className="w-full">
                              <CustomSelectAntd
                                item={addSDArray}
                                setOption={setAddSD}
                                sName={"sd"}
                              ></CustomSelectAntd>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-base">{item.target_title}</div>
                        </div>
                      </div>
                    }
                    key={item.id}
                  >
                    <div>
                      {/* {setSD && (
                        <div className="flex items-center gap-3 mb-3 w-full">
                          <button className="text-[10px] px-1 bg-primary  text-white rounded-lg">
                            SD
                          </button>{" "}
                          <div className="w-full">
                            <CustomSelectAntd
                              item={addSDArray}
                              setOption={setAddSD}
                              sName={"sd"}
                            ></CustomSelectAntd>
                          </div>
                        </div>
                      )} */}
                      <p>
                        <h1 className="text-sm font-medium mb-5">
                          TARGET-SPECIFIC SETTINGS
                        </h1>
                        <>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            placeholder="Mastering Workflow"
                            size="large"
                            // defaultValue={value}
                            bordered={true}
                            onChange={onChange}
                            options={selectItems.map((item) => ({
                              label: item,
                              value: item,
                            }))}
                          />
                        </>
                        <br />
                        <>
                          <Select
                            style={{
                              width: "100%",
                              marginTop: "15px",
                            }}
                            placeholder="Prompt level template"
                            size="large"
                            // defaultValue={value}
                            bordered={true}
                            onChange={onChange}
                            options={selectItems.map((item) => ({
                              label: item,
                              value: item,
                            }))}
                          />
                        </>
                      </p>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>

            <div className="w-full my-auto px-1 py-2 mx-auto  border-x-[1px] ">
              <select className="border w-full  text-center py-2 text-base font-semibold rounded-md bg-slate-100">
                <option className="bg-slate-500" value="1">
                  WAITING
                </option>
                <option value="2">WORKING-ON</option>
                <option value="3">MASTERED</option>
                <option value="4">CLOSE</option>
                <option value="5">HOLD</option>
                <option value="6">DISCONNECTED</option>
              </select>
            </div>

            <div className=" flex items-center justify-center  ">
              <Dropdown
                dropdownRender={() => (
                  <div className="bg-white w-[240px] border shadow-md rounded-sm p-2">
                    <button
                      onClick={() => setOpen(!open)}
                      className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                    >
                      <BiDoughnutChart className="text-2xl" />
                      Change Target Type
                      {open && (
                        <div className="absolute bg-white border top-[30%] w-full left-0 ">
                          <button className="capitalize text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                            Waiting
                          </button>
                          <button className="capitalize text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                            Working-on
                          </button>
                          <button className="capitalize text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                            Mastered
                          </button>
                          <button className="capitalize text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                            Closed
                          </button>
                          <button className="capitalize text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                            Hold
                          </button>
                          <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full font-semibold ">
                            Disconnected
                          </button>
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => setTargetSetting(!targetSetting)}
                      className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                    >
                      <SettingOutlined className="text-xl" /> Target Setting
                    </button>
                    <hr />
                    <button
                      // onClick={handleDuplicateTarget}
                      className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                    >
                      <BiDuplicate className="text-xl" /> Duplicate
                    </button>
                    <button
                      onClick={handleDeleteTarget}
                      className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                    >
                      <DeleteOutlined className="text-xl" /> Delete
                    </button>
                  </div>
                )}
                placement="bottomRight"
                arrow
              >
                <Tooltip placement="top" color={"#0C356A"} title="more">
                  <BiDotsHorizontal className="text-xl text-dark hover:text-primary" />
                </Tooltip>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {deleteTarget && (
        <TargetDeleteModal
          handleClose={handleDeleteTarget}
          clicked={deleteTarget}
        ></TargetDeleteModal>
      )}
    </div>
  );
};

export default TargetSortableItems;

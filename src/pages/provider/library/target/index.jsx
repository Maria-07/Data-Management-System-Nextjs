/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import { Dropdown, Tooltip } from "antd";
import { useState } from "react";
import {
  BiDotsVertical,
  BiImport,
  BiPlus,
  BiSortAZ,
  BiSortZA,
} from "react-icons/bi";
import { MessageOutlined } from "@ant-design/icons";
import TargetAddModal from "@/component/UI/Library/Program/Target/TargetModal/TargetAddModal";
import ImportTargetModal from "@/component/UI/Library/Program/Target/TargetModal/ImportTargetModal";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import TargetSortableItems from "@/component/UI/Library/Program/Target/TargetSortableItems";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { useTheme } from "next-themes";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const targetPage = () => {
  const [type, setType] = useState(false);
  const [setSD, setSetSD] = useState(false);

  const [addTarget, setAddTarget] = useState(false);
  const handleAddTarget = () => {
    setAddTarget(!addTarget);
  };

  const [importTarget, setImportTarget] = useState(false);
  const handleImportTarget = () => {
    setImportTarget(!importTarget);
  };

  const item = [
    "Waiting",
    "Working-on",
    "Mastered",
    "Closed",
    "Hold",
    "Disconnected",
  ];

  const [value, setValue] = useState("waiting");

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setValue(value);
  };

  const [items, setItems] = useState([
    {
      id: 1,
      target_title: "Aggression",
      tags: [],
      author: "kristina",
      type: "folder",
    },
    {
      id: 2,
      target_title: "Property Destruction",
      tags: [],
      author: "kristina",
      type: "folder",
    },
    {
      id: 3,
      target_title: "Climbing",
      tags: ["snapsot", "behavior reduction"],
      author: "kristina",
      type: "folder",
    },
    {
      id: 4,
      target_title: "Spittting",
      tags: ["snapsot"],
      author: "kristina",
      type: "Target",
    },
    {
      id: 5,
      target_title: "Elopement",
      tags: ["behavior reduction"],
      author: "kristina",
      type: "Target",
    },
  ]);

  //! items sort system
  const [sortOrder, setSortOrder] = useState(""); // 'asc' for ascending, 'desc' for descending

  // Function to sort the items array
  const sortItems = () => {
    const sortedItems = [...items];
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    if (sortOrder === "asc") {
      sortedItems.sort((a, b) => a.target_title.localeCompare(b.target_title));
    } else {
      sortedItems.sort((a, b) => b.target_title.localeCompare(a.target_title));
    }
    setItems(sortedItems);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((previousItems) => {
        const oldIndex = previousItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = previousItems.findIndex((item) => item.id === over.id);
        return arrayMove(previousItems, oldIndex, newIndex);
      });
    }
  };

  //! Theme system
  const { theme } = useTheme();

  return (
    <div className="">
      <div
        className={`${
          theme === "dark" ? "bg-dark-primary border-none" : "bg-white"
        } min-h-[80vh] lg:p-5 p-2 w-full  `}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={handleAddTarget}
            className="dtm-button flex items-center gap-2"
          >
            <BiPlus className="text-xl" /> ADD TARGET{" "}
          </button>

          <div className="flex items-center gap-3">
            <button
              className="text-xs uppercase flex items-center gap-2 shadow-md bg-secondary text-white px-3 py-1 rounded-md"
              onClick={sortItems}
            >
              {sortOrder === "desc" ? (
                <BiSortAZ className="text-lg" />
              ) : (
                <BiSortZA className="text-lg" />
              )}
              Sort by
            </button>
            <Tooltip
              placement="bottom"
              color={"#0C356A"}
              title="See Discriminative stimulus (SD) on targets"
            >
              <button
                onClick={() => setSetSD(!setSD)}
                className="text-xs flex items-center gap-2 shadow-md bg-secondary text-white px-3 py-1 rounded-md"
              >
                <MessageOutlined className="text-base p-[1px]" /> ADD SD
              </button>
            </Tooltip>

            {/* <button
              onClick={handleImportTarget}
              className="text-xs flex items-center gap-2 shadow-md bg-secondary text-white px-3 py-1 rounded-md"
            >
              <BiImport className="text-lg" /> IMPORTS
            </button> */}

            <div className="">
              <Dropdown
                dropdownRender={() => (
                  <div className="bg-white  w-[250px] border shadow-md rounded-sm">
                    <div>
                      <button
                        // onClick={handleImportProgram}
                        className="p-3 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-semibold "
                      >
                        Export Targets to clipboard
                      </button>
                      <button
                        onClick={() => setType(!type)}
                        className="p-3 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-semibold "
                      >
                        Default Target Type
                      </button>
                    </div>
                    {type && (
                      <div className="transition-all">
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                        <button
                          onClick={() => setType(!type)}
                          className="py-3 px-8 text-dark hover:text-primary w-full hover:bg-gray-100 flex items-center gap-2 text-base font-medium "
                        >
                          Discrete Trails
                        </button>
                      </div>
                    )}
                  </div>
                )}
                placement="bottomRight"
                arrow
              >
                <BiDotsVertical className="text-xl" />
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="overflow-scroll">
          {" "}
          <div className="my-5">
            <div className="grid grid-cols-6 bg-primary text-white border-primary">
              <div className="border-l-[1px] border-t-[1px] text-center width-[100%]  py-2 text-[15px] font-bold sm:col-span-4">
                Targets
              </div>
              <div className=" border-t-[1px] w-full border-x-[1px] text-center width-[100%]  py-2 text-[15px] font-bold ">
                Targets
              </div>
              <div className="border-r-[1px] border-t-[1px] text-center width-[100%]  py-2 text-[15px] font-bold ">
                Action
              </div>
            </div>

            <div className="border-x-[1px] border-b-[1px] bg-gray-50">
              <DndContext
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={items.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div>
                    {items.map((item) => (
                      <TargetSortableItems
                        key={item.id}
                        id={item.id}
                        item={item}
                        setSD={setSD}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>

        <div className="">
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

      {addTarget && (
        <TargetAddModal
          handleClose={handleAddTarget}
          clicked={addTarget}
        ></TargetAddModal>
      )}

      {importTarget && (
        <ImportTargetModal
          handleClose={handleImportTarget}
          clicked={importTarget}
        ></ImportTargetModal>
      )}
    </div>
  );
};

export default targetPage;

targetPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <LibraryLayout>{page}</LibraryLayout>
    </RootLayout>
  );
};

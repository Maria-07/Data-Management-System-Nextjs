/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import {
  DeleteOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { DndContext, DndProvider } from "@dnd-kit/core"; // Import DndProvider
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  BiDotsHorizontal,
  BiDotsVertical,
  BiDoughnutChart,
  BiDuplicate,
  BiFile,
  BiImport,
} from "react-icons/bi";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Collapse, Dropdown, Select, Table, Tooltip } from "antd";
import React, { useState } from "react";

const version2 = () => {
  const [type, setType] = useState(false);
  const [targetSetting, setTargetSetting] = useState(false);
  const [open, setOpen] = useState(false);
  const [setSD, setSetSD] = useState(false);

  const [addTarget, setAddTarget] = useState(false);
  const handleAddTarget = () => {
    setAddTarget(!addTarget);
  };

  const [deleteTarget, setDeleteTarget] = useState(false);
  const handleDeleteTarget = () => {
    setDeleteTarget(!deleteTarget);
  };

  const [importTarget, setImportTarget] = useState(false);
  const handleImportTarget = () => {
    setImportTarget(!importTarget);
  };

  const items = [
    "waiting",
    "working-on",
    "mastered",
    "closed",
    "hold",
    "disconnected",
  ];

  const [value, setValue] = useState("waiting");

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  //! Table data ----------------------------------------------------------
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //get rows to be deleted
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //   console.log(selectedRows);
    },
  };

  const handleChange = (pagination, filters, sorter) => {
    //console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const [dataSource, setDataSource] = useState([
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

  const columns = [
    {
      key: "sort",
    },
    {
      title: "Targets",
      dataIndex: "target_title",
      key: "target_title",
      width: 250,
      render: (_, record) => {
        return (
          <>
            {targetSetting ? (
              <Collapse
                ghost
                items={[
                  {
                    key: 1,
                    label: (
                      <h1 className="font-medium">{record.target_title}</h1>
                    ),
                    children: (
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
                            options={items.map((item) => ({
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
                            options={items.map((item) => ({
                              label: item,
                              value: item,
                            }))}
                          />
                        </>
                      </p>
                    ),
                  },
                ]}
              />
            ) : (
              <>
                {setSD && (
                  <div className="flex items-center gap-3 mb-3">
                    <button className="text-[8px] px-1 bg-primary  text-white rounded-lg">
                      SD
                    </button>{" "}
                    <Select
                      style={{
                        width: "50%",
                      }}
                      size="large"
                      bordered={true}
                      onChange={onChange}
                      options={items.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  {" "}
                  <h1 className="font-medium text-base">
                    {record.target_title}
                  </h1>
                  <Tooltip
                    placement="bottom"
                    color={"#0C356A"}
                    title="Target Setting"
                  >
                    {" "}
                    <button
                      onClick={() => setTargetSetting(!targetSetting)}
                      className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                    >
                      <SettingOutlined className="text-xl" />
                    </button>
                  </Tooltip>
                </div>
              </>
            )}
          </>
        );
      },
      onFilter: (value, record) => record.target_title.includes(value),
      sorter: (a, b) => {
        return a.target_title.localeCompare(b.target_title);
      },
      sortOrder:
        sortedInfo.columnKey === "target_title" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "tags",
      key: "tags",
      width: 100,
      filters: [
        {
          text: `snapsot`,
          value: "snapsot",
        },
      ],
      render: (_, record) => {
        return (
          <>
            <Select
              style={{
                width: "100%",
                textAlign: "center",
              }}
              size="large"
              defaultValue={value}
              bordered={true}
              onChange={onChange}
              options={items.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </>
        );
      },
      filteredValue: filteredInfo.tags || null,
      onFilter: (value, record) => record.tags.includes(value),
      sorter: (a, b) => {
        return a.tags.localeCompare(b.tags);
      },
      sortOrder: sortedInfo.columnKey === "tags" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 50,
      render: (_, record) => {
        return (
          <div className=" flex items-center justify-center gap-2 ">
            <Dropdown
              dropdownRender={() => (
                <div className="bg-white  w-[240px] border shadow-md rounded-sm p-2">
                  <button
                    onClick={() => setOpen(!open)}
                    className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                  >
                    <BiDoughnutChart className="text-2xl" />
                    Change Target Type
                    {open && (
                      <div className="absolute bg-white border top-[30%] w-full left-0 ">
                        <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                          Waiting
                        </button>
                        <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                          working-on
                        </button>
                        <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                          mastered
                        </button>
                        <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                          closed
                        </button>
                        <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full  font-semibold ">
                          hold
                        </button>
                        <button className=" text-dark hover:text-primary flex items-center gap-3 text-base p-3 hover:bg-gray-100 w-full font-semibold ">
                          disconnected
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
        );
      },
      ellipsis: true,
    },
  ];

  const Row = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });
    const style = {
      ...props.style,
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : "none",
      transition,
      ...(isDragging
        ? {
            position: "relative",
            zIndex: 9999,
          }
        : {}),
    };
    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if (child.key === "sort") {
            return React.cloneElement(child, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{
                    touchAction: "none",
                    cursor: "move",
                  }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <>
      <div>
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: Row,
                },
              }}
              pagination={false}
              rowKey={(record) => record.id.toString()} // Ensure rowKey is a string
              size="small"
              bordered
              className="table-striped-rows text-xs font-normal"
              columns={columns}
              dataSource={dataSource}
              rowSelection={{
                ...rowSelection,
              }}
              onChange={handleChange}
            />
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

export default version2;

version2.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

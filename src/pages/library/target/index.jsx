/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import { Collapse, Dropdown, Select, Table, Tooltip } from "antd";
import { useState } from "react";
import {
  BiDotsHorizontal,
  BiDotsVertical,
  BiDoughnutChart,
  BiDuplicate,
  BiFile,
  BiImport,
} from "react-icons/bi";
import {
  DeleteOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import TargetAddModal from "@/component/UI/Library/Program/Target/TargetModal/TargetAddModal";
import TargetDeleteModal from "@/component/UI/Library/Program/Target/TargetModal/TargetDeleteModal";
import ImportTargetModal from "@/component/UI/Library/Program/Target/TargetModal/ImportTargetModal";

const targetPage = () => {
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
  //   console.log(filteredInfo);

  const demoData = [
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
  ];

  const columns = [
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
        return a.target_title > b.target_title ? -1 : 1;
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
        return a.tags > b.tags ? -1 : 1;
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
  return (
    <div className="m-5 ">
      <div className="bg-white min-h-[80vh] p-10 w-full border rounded-lg shadow-md ">
        {" "}
        <div className="flex items-center justify-between flex-wrap">
          <button
            onClick={handleAddTarget}
            className="dtm-button flex items-center gap-2"
          >
            <BiFile className="text-xl" /> ADD TARGET{" "}
          </button>
          <div className="flex items-center gap-2 mr-2">
            <Tooltip
              placement="bottom"
              color={"#0C356A"}
              title="See Discriminative stimulus (SD) on targets"
            >
              <button
                onClick={() => setSetSD(!setSD)}
                className="text-xs flex items-center gap-2 shadow-md bg-secondary text-white px-3 py-1 rounded-md"
              >
                <MessageOutlined /> ADD SD
              </button>
            </Tooltip>

            <button
              onClick={handleImportTarget}
              className="text-xs flex items-center gap-2 shadow-md bg-secondary text-white px-3 py-1 rounded-md"
            >
              <BiImport /> IMPORTS
            </button>

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
        <div className="my-5">
          <div className=" overflow-scroll">
            <Table
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
              bordered
              className="table-striped-rows text-xs font-normal"
              columns={columns}
              dataSource={demoData}
              rowSelection={{
                ...rowSelection,
              }}
              // scroll={{
              //   y: 650,
              // }}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="my-10">
          <div className="flex gap-3 items-end justify-start mb-2 mt-4">
            <button
              type="submit"
              className="font-medium text-sm  bg-primary text-white hover:bg-secondary transition-all px-2 py-1 border border-primary rounded-md"
            >
              Save
            </button>
            <button className="font-medium text-sm text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md">
              Cancel
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
      {deleteTarget && (
        <TargetDeleteModal
          handleClose={handleDeleteTarget}
          clicked={deleteTarget}
        ></TargetDeleteModal>
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

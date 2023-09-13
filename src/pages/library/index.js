/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import DeleteFolderModal from "@/component/UI/Library/Modal/DeleteFolderModal";
import ImportProgramModal from "@/component/UI/Library/Modal/ImportProgramModal";
import RenameFolderModal from "@/component/UI/Library/Modal/RenameFolderModal";
import ShareFolderModal from "@/component/UI/Library/Modal/ShareFolderModal";
import UseProgramModal from "@/component/UI/Library/Modal/UseProgramModal";
import DeleteProgramModal from "@/component/UI/Library/Modal/DeleteProgramModal";
import DuplicateProgramModal from "@/component/UI/Library/Modal/DuplicateProgramModal";
import { DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Table, Tooltip } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  BiCopy,
  BiDotsHorizontal,
  BiDotsVertical,
  BiDuplicate,
  BiEdit,
  BiFile,
  BiFileBlank,
  BiFolder,
  BiFolderPlus,
  BiRename,
  BiSearchAlt,
  BiShareAlt,
  BiSolidBullseye,
  BiSolidEdit,
  BiSolidFileImport,
  BiSolidFolderOpen,
  BiSolidFolderPlus,
} from "react-icons/bi";
import { IoIosUnlock } from "react-icons/io";
import AddProgramModal from "@/component/UI/Library/Modal/AddProgramModal";
import AddFolderModal from "@/component/UI/Library/Modal/AddFolderModal";
import { useRouter } from "next/router";

const libraryPage = () => {
  const router = useRouter();

  const [addProgram, setAddProgram] = useState(false);
  const handleAddProgram = () => {
    setAddProgram(!addProgram);
  };

  const [addFolder, setAddFolder] = useState(false);
  const handleAddFolder = () => {
    setAddFolder(!addFolder);
  };

  const [importProgram, setImportProgram] = useState(false);
  const handleImportProgram = () => {
    setImportProgram(!importProgram);
  };
  const [useProgram, setUseProgram] = useState(false);
  const handleUseProgram = () => {
    setUseProgram(!useProgram);
  };

  const [duplicateProgram, setDuplicateProgram] = useState(false);
  const handleDuplicateProgram = () => {
    setDuplicateProgram(!duplicateProgram);
  };

  const [deleteProgram, setDeleteProgram] = useState(false);
  const handleDeleteProgram = () => {
    setDeleteProgram(!deleteProgram);
  };

  const [renameFolder, setRenameFolder] = useState(false);
  const handleRenameFolder = () => {
    setRenameFolder(!renameFolder);
  };

  const [shareFolder, setShareFolder] = useState(false);
  const handleShareFolder = () => {
    setShareFolder(!shareFolder);
  };

  const [deleteFolder, setDeleteFolder] = useState(false);
  const handleDeleteFolder = () => {
    setDeleteFolder(!deleteFolder);
  };

  //! Table data ----------------------------------------------------------
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //get rows to be deleted
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
    },
    getCheckboxProps: (record) => {
      //console.log("record", record);
      if (record?.type == "folder") {
        const rowIndex = 1;
        return {
          disabled: rowIndex === 1,
        };
      }
    },
  };

  const handleChange = (pagination, filters, sorter) => {
    //console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  console.log(filteredInfo);

  const demoData = [
    {
      id: 1,
      program_title: "testing 1",
      tags: [],
      author: "kristina",
      type: "folder",
    },
    {
      id: 2,
      program_title: "testing 2",
      tags: [],
      author: "kristina",
      type: "folder",
    },
    {
      id: 3,
      program_title: "testing 3",
      tags: ["snapsot", "behavior reduction"],
      author: "kristina",
      type: "folder",
    },
    {
      id: 4,
      program_title: "testing 5",
      tags: ["snapsot"],
      author: "kristina",
      type: "program",
    },
    {
      id: 5,
      program_title: "testing 6",
      tags: ["behavior reduction"],
      author: "kristina",
      type: "program",
    },
  ];

  const columns = [
    {
      title: "Program",
      dataIndex: "program_title",
      key: "program_title",
      width: 130,
      render: (_, record) => {
        if (record?.type == "folder") {
          return (
            <Link href={"/library/treatment"}>
              <div className=" flex items-center gap-2 ">
                <BiSolidFolderOpen className="text-xl text-dark hover:text-primary" />

                {record?.program_title}
              </div>
            </Link>
          );
        } else {
          return (
            <Link href={"/library/treatment"}>
              <div className=" flex items-center gap-2 ">
                <BiFileBlank className="text-xl text-dark hover:text-primary" />

                {record?.program_title}
              </div>
            </Link>
          );
        }
      },
      onFilter: (value, record) => record.program_title.includes(value),
      sorter: (a, b) => {
        return a.program_title > b.program_title ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "program_title" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 100,
      filters: [
        {
          text: `snapsot`,
          value: "snapsot",
        },
      ],
      render: (_, { tags }) => (
        <>
          {tags.map((tag, i) => {
            // let color = tag.length > 5 ? "geekblue" : "green";
            // if (tag === "loser") {
            //   color = "volcano";
            // }
            return (
              <button
                className="bg-gray-100 border mr-2 px-2 rounded-md text-sm"
                key={i}
              >
                {tag}
              </button>
            );
          })}
        </>
      ),
      filteredValue: filteredInfo.tags || null,
      onFilter: (value, record) => record.tags.includes(value),
      sorter: (a, b) => {
        return a.tags > b.tags ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "tags" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 70,

      render: (_, { author }) => {
        return <div className=" text-black">{author}</div>;
      },
      filteredValue: filteredInfo.author || null,
      onFilter: (value, record) => record.author.includes(value),
      sorter: (a, b) => {
        return a.author > b.author ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "author" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 50,
      render: (_, record) => {
        if (record?.type == "folder") {
          return (
            <Dropdown
              dropdownRender={() => (
                <div className="bg-white p-2 w-[180px] border shadow-md rounded-sm">
                  <div>
                    <button
                      onClick={handleRenameFolder}
                      className="mx-1 text-dark hover:text-primary flex items-center gap-3 text-base font-semibold my-3"
                    >
                      <BiRename className="text-xl" /> Rename
                    </button>
                    <button className="mx-1 text-dark hover:text-primary flex items-center gap-3 text-base font-semibold my-3">
                      <BiFolder className="text-xl" /> Move to folder
                    </button>
                    <button
                      onClick={handleShareFolder}
                      className="mx-1 text-dark hover:text-primary flex items-center gap-3 text-base font-semibold my-3"
                    >
                      <BiShareAlt className="text-xl" /> Share
                    </button>
                    <button
                      onClick={handleDeleteFolder}
                      className="mx-1 text-dark hover:text-primary flex items-center gap-3 text-base font-semibold my-3"
                    >
                      <DeleteOutlined className="text-xl" /> Delete
                    </button>
                  </div>
                </div>
              )}
              placement="bottomRight"
              arrow
            >
              <div className=" flex items-center justify-center gap-2 ">
                <Tooltip placement="top" color={"#0C356A"} title="Edit">
                  <BiDotsHorizontal className="text-xl text-dark hover:text-primary" />
                </Tooltip>
              </div>
            </Dropdown>
          );
        } else {
          return (
            <div className=" flex items-center justify-center gap-2 ">
              <Tooltip
                placement="top"
                color={"#0C356A"}
                title="Use this program for one of our client"
              >
                <BiSolidFolderPlus
                  onClick={handleUseProgram}
                  className="text-xl text-dark hover:text-primary"
                />
              </Tooltip>
              <Link href={"/library/treatment"}>
                <Tooltip placement="top" color={"#0C356A"} title="Edit">
                  <BiSolidEdit className="text-xl text-dark hover:text-primary" />
                </Tooltip>
              </Link>

              <Dropdown
                dropdownRender={() => (
                  <div className="bg-white  w-[200px] border shadow-md rounded-sm">
                    <div>
                      <button
                        onClick={handleUseProgram}
                        className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold "
                      >
                        <BiCopy className="text-xl" /> Copy to client
                      </button>
                      <hr />
                      <button className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3">
                        <BiSolidBullseye className="text-xl" /> Preview
                      </button>
                      <button
                        // onClick={handleShareFolder}
                        className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                      >
                        <BiEdit className="text-xl" /> Edit
                      </button>
                      <button className="mx-4 text-dark hover:text-primary flex items-center gap-3 text-base font-semibold my-3">
                        <BiFolder className="text-xl" /> Move to folder
                      </button>
                      <button
                        onClick={handleDuplicateProgram}
                        className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                      >
                        <BiDuplicate className="text-xl" /> Duplicate
                      </button>
                      <button
                        onClick={handleDeleteProgram}
                        className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                      >
                        <DeleteOutlined className="text-xl" /> Delete
                      </button>
                      <hr className="mt-4" />
                      <button
                        // onClick={handleDeleteFolder}
                        className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                      >
                        <IoIosUnlock className="text-xl" /> Unlock Program
                      </button>
                    </div>
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
        }
      },

      ellipsis: true,
    },
  ];

  //! Table data END ----------------------------------------------------------

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-10">
        <h1 className="text-base">Library</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <input
              placeholder="Search Program"
              type="text"
              className="input-border"
            />

            <div className="p-[5.5px] ml-[-5px] bg-primary hover:bg-secondary transition-all rounded-r-md">
              <BiSearchAlt className=" text-xl text-white" />
            </div>
          </div>
          <Dropdown
            dropdownRender={() => (
              <div className="bg-white p-2 w-[200px] border shadow-md rounded-sm">
                <div>
                  <button
                    onClick={handleImportProgram}
                    className="mx-1 text-dark hover:text-primary flex items-center gap-2 text-base font-semibold my-2"
                  >
                    <BiSolidFileImport className="text-xl" /> Import Programs
                  </button>
                </div>
              </div>
            )}
            placement="bottomRight"
            arrow
          >
            <BiDotsVertical className="text-xl" />
          </Dropdown>
        </div>
      </div>
      <div className="flex items-center justify-start gap-3 my-10">
        <button
          onClick={handleAddProgram}
          className="dtm-button flex items-center gap-2"
        >
          <BiFile className="text-xl" /> ADD PROGRAMS{" "}
        </button>
        <button
          onClick={handleAddFolder}
          className="dtm-button flex items-center gap-2"
        >
          <BiFolderPlus className="text-xl" />
          NEW FOLDER
        </button>
      </div>

      <div>
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
      {addFolder && (
        <AddFolderModal
          handleClose={handleAddFolder}
          clicked={addFolder}
        ></AddFolderModal>
      )}
      {addProgram && (
        <AddProgramModal
          handleClose={handleAddProgram}
          clicked={addProgram}
        ></AddProgramModal>
      )}
      {importProgram && (
        <ImportProgramModal
          handleClose={handleImportProgram}
          clicked={importProgram}
        ></ImportProgramModal>
      )}
      {useProgram && (
        <UseProgramModal
          handleClose={handleUseProgram}
          clicked={useProgram}
        ></UseProgramModal>
      )}
      {duplicateProgram && (
        <DuplicateProgramModal
          handleClose={handleDuplicateProgram}
          clicked={duplicateProgram}
        ></DuplicateProgramModal>
      )}
      {deleteProgram && (
        <DeleteProgramModal
          handleClose={handleDeleteProgram}
          clicked={deleteProgram}
        ></DeleteProgramModal>
      )}
      {renameFolder && (
        <RenameFolderModal
          handleClose={handleRenameFolder}
          clicked={renameFolder}
        ></RenameFolderModal>
      )}
      {shareFolder && (
        <ShareFolderModal
          handleClose={handleShareFolder}
          clicked={shareFolder}
        ></ShareFolderModal>
      )}
      {deleteFolder && (
        <DeleteFolderModal
          handleClose={handleDeleteFolder}
          clicked={deleteFolder}
        ></DeleteFolderModal>
      )}
    </div>
  );
};

export default libraryPage;

libraryPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

import { HiPlus } from "react-icons/hi";
import AddDocuments from "../AddDocuments";
import RootLayout from "@/component/Layouts/RootLayout";
import PatientLayout from "@/component/Layouts/PatientLayout";
import DocumentsAction from "../DocumentsAction";
import { Table } from "antd";
import { useState } from "react";
import Image from "next/image";
//import checkImage from "@/assets/i";

const Therapy = () => {
  // const { id } = useParams();
  // const { token } = useToken();
  // console.log("patient Documents", id);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const data = [
    {
      id: 1,
      Document: "Perren",
      File_name: "Quis.mp3",
      uploaded_on: "4/24/2022",
      created_by: "Construction Expeditor",
      expired_date: "3/24/2022",
    },
    {
      id: 2,
      Document: "Bethanne",
      File_name: "Morbi.ppt",
      uploaded_on: "3/29/2022",
      created_by: "Construction Worker",
      expired_date: "7/4/2022",
    },
    {
      id: 3,
      Document: "Romonda",
      File_name: "NonVelitNec.mov",
      uploaded_on: "5/31/2022",
      created_by: "Electrician",
      expired_date: "2/16/2022",
    },
    {
      id: 4,
      Document: "Reynard",
      File_name: "AcNibh.avi",
      uploaded_on: "2/15/2022",
      created_by: "Supervisor",
      expired_date: "1/6/2022",
    },
    {
      id: 5,
      Document: "Gwenora",
      File_name: "Sapien.ppt",
      uploaded_on: "2/11/2022",
      created_by: "Construction Manager",
      expired_date: "1/16/2022",
    },
    {
      id: 6,
      Document: "Stanleigh",
      File_name: "Rutrum.pdf",
      uploaded_on: "8/15/2022",
      created_by: "Architect",
      expired_date: "1/11/2022",
    },
    {
      id: 7,
      Document: "Marti",
      File_name: "AmetNunc.ppt",
      uploaded_on: "2/5/2022",
      created_by: "Architect",
      expired_date: "5/3/2022",
    },
    {
      id: 8,
      Document: "Milena",
      File_name: "AtNullaSuspendisse.xls",
      uploaded_on: "7/26/2022",
      created_by: "Surveyor",
      expired_date: "2/17/2022",
    },
    {
      id: 9,
      Document: "Lenka",
      File_name: "Facilisi.tiff",
      uploaded_on: "7/18/2022",
      created_by: "Construction Manager",
      expired_date: "8/1/2022",
    },
    {
      id: 10,
      Document: "Ealasaid",
      File_name: "Ac.gif",
      uploaded_on: "6/4/2022",
      created_by: "Construction Foreman",
      expired_date: "9/23/2021",
    },
  ];
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  // const {
  //   data,
  //   isSuccess,
  //   isLoading: documentLoading,
  //   isError,
  // } = useGetdocumentsQuery({ token, id });
  // console.log("api data come", data?.documents?.data);

  // if (documentLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return (
  //     <div className="px-4 py-3 mt-2 mb-1 mx-2 flex items-center justify-between rounded-md text-red-600 font-normal text-xs red-box">
  //       <p>Backend Error</p>
  //       <button className="text-black">X</button>
  //     </div>
  //   );
  // }

  // const uplodedOn = DatTherapyseDateConverter(data.documents.data?.created_at);
  // console.log("uploader on  ", data.documents.data?.created_at);

  const column = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.Document || null,
      onFilter: (value, record) => record.Document.includes(value),
      sorter: (a, b) => {
        return a.Document > b.Document ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "Document" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "File Name",
      key: "file_name",
      dataIndex: "file_name",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.File_name || null,
      onFilter: (value, record) => record.File_name.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.File_name > b.File_name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "File_name" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Uploaded On",
      key: "created_at",
      dataIndex: "created_at",
      render: (_, { created_at }) => {
        console.log("render data", created_at);
        return (
          <div>{/* <p>{DatTherapyseDateConverter(created_at)}</p> */}</div>
        );
      },
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.created_at || null,
      onFilter: (value, record) => record.uploaded_on.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.created_at > b.created_at ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "created_by" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Created By",
      key: "created_by",
      dataIndex: "created_by",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.created_at || null,
      onFilter: (value, record) => record.created_by.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.created_at > b.created_at ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Expired Date",
      key: "exp_date",
      dataIndex: "exp_date",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.expired_date || null,
      onFilter: (value, record) => record.expired_date.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.expired_date > b.expired_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "expired_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "id",
      dataIndex: "id",
      width: 100,
      render: (_, { id, File_name }) => {
        return <DocumentsAction id={id} fileName={File_name}></DocumentsAction>;
      },
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  return (
    <div className="h-[100vh]">
      <div className="mt-10">
        <p className="text-xs font-light text-gray-600 flex items-center justify-center my-2">
          admin admin has no document
        </p>
      </div>
      {/* {!isSuccess && (
        <div className="mt-10">
          <img className="mx-auto" src={check} alt="" />
          <p className="text-xs font-light text-gray-600 flex items-center justify-center my-2">
            admin admin has no document
          </p>       
        </div>
      )} */}
      {/* 
      <div className="flex items-center justify-between gap-2 my-2">
        <h1 className="text-lg text-orange-500 text-left font-semibold ">
          Documents
        </h1>
        <button
          onClick={clearFilters}
          className="px-2  py-2 bg-white from-primary text-xs  hover:to-secondary text-secondary border border-secondary rounded-sm"
        >
          Clear filters
        </button>
      </div> */}
      {/* 
      <div className=" overflow-scroll">
        <Table
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className=" text-xs font-normal mt-5"
          columns={column}
          bordered
          rowKey={(record) => record.id} //record is kind of whole one data object and here we are
          dataSource={data}
          onChange={handleChange}
        />
      </div> */}

      {/* <div className="my-10">
        <button
          onClick={handleClickOpen}
          className="dcm-button flex item-center gap-2"
        >
          <HiPlus className="text-base" /> Add New Data
        </button>
        {openEditModal && (
          <AddDocuments
            handleClose={handleClose}
            open={openEditModal}
          ></AddDocuments>
        )}
      </div> */}
    </div>
  );
};
export default Therapy;

import { HiPlus } from "react-icons/hi";
import AddDocuments from "../AddDocuments";
import DocumentsAction from "../DocumentsAction";
import { Table } from "antd";
import { useState } from "react";
import { useGetDocumentQuery } from "@/Redux/features/patient/patient-documents/patientDocumentApi";

const Aba = ({token, patientId, documentId, documentName}) => {

  const [openEditModal, setOpenEditModal] = useState(false);
  const { data: documentData, isLoading: documentDataloading } =
  useGetDocumentQuery({
    token,
    payload:{
      patient_id:patientId,
      document_type:documentId
    }
  });

//console.log(documentName,documentData)
  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});


  const column = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 120,
      /*filters: [{}],
      filteredValue: filteredInfo.Document || null,
      onFilter: (value, record) => record.Document.includes(value),
      sorter: (a, b) => {
        return a.Document > b.Document ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "Document" ? sortedInfo.order : null,
      ellipsis: true,*/
    },

    {
      title: "File Name",
      key: "file_name",
      dataIndex: "file_name",
      width: 100,
      /*filters: [{}],
      filteredValue: filteredInfo.File_name || null,
      onFilter: (value, record) => record.File_name.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.File_name > b.File_name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "File_name" ? sortedInfo.order : null,
      ellipsis: true,*/
    },

    {
      title: "Uploaded On",
      key: "updated_on",
      dataIndex: "updated_on",
      width: 100,
     /*render: (_, { created_at }) => {
        console.log("render data", created_at);
        return <div>{/* <p>{DatabaseDateConverter(created_at)}</p> *//*}</div>;
      },
      filters: [{}],
      filteredValue: filteredInfo.created_at || null,
      onFilter: (value, record) => record.uploaded_on.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.created_at > b.created_at ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "created_by" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Created By",
      key: "created_by",
      dataIndex: "created_by",
      width: 100,
      /*filters: [{}],
      filteredValue: filteredInfo.created_at || null,
      onFilter: (value, record) => record.created_by.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.created_at > b.created_at ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Expired Date",
      key: "document_expiration_date",
      dataIndex: "document_expiration_date",
      width: 100,
      /*filters: [{}],
      filteredValue: filteredInfo.expired_date || null,
      onFilter: (value, record) => record.expired_date.includes(value),
      //   sorter is for sorting asc or dsc purFile_name
      sorter: (a, b) => {
        return a.expired_date > b.expired_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "expired_date" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Actions",
      key: "id",
      dataIndex: "id",
      width: 100,
      render: (_, record) => {
        return <DocumentsAction documentData={record} token={token} patientId={patientId} documentTypeId={documentId}></DocumentsAction>;
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
      {/* {!isSuccess && (
        <div className="mt-10">
          <img className="mx-auto" src={check} alt="" />
          <p className="text-xs font-light text-gray-600 flex items-center justify-center my-2">
            admin admin has no document
          </p>
        </div>
      )} */}

      <div className="flex items-center justify-between gap-2 my-2">
        <h1 className="text-lg text-orange-500 text-left font-semibold ">
          Documents - {documentName}
        </h1>
      </div>

      <div className=" overflow-scroll">
        <Table
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className=" text-xs font-normal mt-5"
          columns={column}
          bordered
          rowKey={(record) => record.id} //record is kind of whole one data object and here we are
          dataSource={documentData?.documents}
          onChange={handleChange}
        />
      </div>

      <div className="my-10">
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
            token={token}
            patientId={patientId}
            documentId={documentId}
            documentName={documentName}
          ></AddDocuments>
        )}
      </div>
    </div>
  );
};
export default Aba;

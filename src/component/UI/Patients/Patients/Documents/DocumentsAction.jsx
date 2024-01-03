import React, { memo, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import DocumentsActionModal from "./DocumentsActionModal";
import Link from "next/link";
import DocumentView from "./DocumentView";
import axios from "axios";
import { useDeleteDocumentMutation } from "@/Redux/features/patient/patient-documents/patientDocumentApi";

const DocumentsAction = ({ documentData, token, patientId, documentTypeId }) => {
  console.log('documentData',documentData.id)
  const [openEditModal, setOpenEditModal] = useState(false);
  const [viewDocument, setViewDocument] = useState(false);
  const [imageData, setImageData] = useState([]);
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  useEffect(() => {
    const getPatientData = async () => {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/patient/document/file`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": token || null,
        },
        data : { patient_id: patientId, document_id:documentData.id}
      });
      const data = res?.data?.document;
      setImageData(data);
    };
    getPatientData();
  }, [token]);
  // const { token } = useToken();
  const handleClose = () => {
    setOpenEditModal(false);
  };  
  const handleDocumentView = () => {
    setViewDocument(true);
  };

  const handleViewClose = () => {
    setViewDocument(false);
  };
  const [deleteDocument, { isSuccess: deleteSuccess }] =
  useDeleteDocumentMutation();
  const handleDelete = (record) => {
    const payload = {
      patient_id: patientId,
      document_id: documentData.id
    };
    deleteDocument({
      token,
      payload,
    });
  };
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Successfully Deleted Document", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      window.location.reload(); 
    }
  }, [deleteSuccess]);


  return (
    <div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleDocumentView}
          title="View Call Log"
          className="text-sm mx-1 text-green-600"
        >
          <AiOutlineEye />
        </button>
        <button onClick={handleClickOpen} className="text-secondary">
          <AiOutlineEdit />
        </button>
        <button
          // onClick={() => handleDelete(id)}
          className="text-sm mx-1 text-rose-600"
        >
          <AiOutlineDelete  onClick={handleDelete}/>
        </button>
      </div>
      {openEditModal && (
        <DocumentsActionModal
          handleClose={handleClose}
          open={openEditModal}
          documentData={documentData}
          token={token}
          patientId={token} 
          documentTypeId={token}
        ></DocumentsActionModal>
      )}
      
      {viewDocument && (
        <DocumentView
          handleClose={handleViewClose}
          open={viewDocument}
          imageData={imageData}
        ></DocumentView>
      )}
    </div>
  );
};

export default memo(DocumentsAction);

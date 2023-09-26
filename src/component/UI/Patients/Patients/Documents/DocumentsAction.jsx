import React, { memo, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import DocumentsActionModal from "./DocumentsActionModal";
import Link from "next/link";

const DocumentsAction = ({ id, fileName }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  // const { token } = useToken();
  const handleClose = () => {
    setOpenEditModal(false);
  };

  // const [documentDelete, { data, isSuccess, isError }] =
  //   useDocumentDeleteMutation();
  // console.log("----", data);
  // const handleDelete = (id) => {
  //   const payload = {
  //     document_id: id,
  //   };
  //   documentDelete({ token, payload });
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data?.message, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //   } else if (isError) {
  //     toast.error("Some Error Occured", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //   }
  // }, [data?.message, isError, isSuccess]);

  return (
    <div>
      <div className="flex justify-center gap-2">
        <button className="text-sm mx-1 text-green-600">
          <Link href={`/${fileName}`}>
            <AiOutlineEye />
          </Link>
        </button>
        <button onClick={handleClickOpen} className="text-secondary">
          <AiOutlineEdit />
        </button>
        <button
          // onClick={() => handleDelete(id)}
          className="text-sm mx-1 text-rose-600"
        >
          <AiOutlineDelete />
        </button>
      </div>
      {openEditModal && (
        <DocumentsActionModal
          handleClose={handleClose}
          open={openEditModal}
          id={id}
        ></DocumentsActionModal>
      )}
    </div>
  );
};

export default memo(DocumentsAction);

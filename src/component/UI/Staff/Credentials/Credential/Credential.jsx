import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import AddCredential from "./AddCredentialModal/AddCredential";
import EditCredential from "./EditCredentialModal/EditCredential";
import ViewCredential from "./ViewCredential";
import { toast } from "react-toastify";
import { useDeleteCredentialMutation } from "@/Redux/features/staff/credentials/credentialsApi";

const Credential = ({ credentials, token, id }) => {
  console.log('credentials',credentials);
  const [display, setDisplay] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [credentialRecord, setCredentialRecord] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [fileView, setFileView] = useState(false);
  const [credentialId, setCredentialId] = useState(false);

  const [deleteCredential, { isSuccess: deleteSuccess }] =
    useDeleteCredentialMutation();

  //Handle credentialEdit Modal
  const handleEditModal = (record) => {
    setCredentialRecord(record);
    setEditModal(true);
  };

  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setOpenEditModal(false);
    setEditModal(false);
  };

  // console.log(credentials?.credentials_list);

  const handleDelete = (record) => {
    const payload = {
      credential_id: record?.credential_id,
    };
    deleteCredential({
      token,
      payload,
    });
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Successfully Deleted Credential", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [deleteSuccess]);

  const handleViewClose = () => {
    setFileView(false);
  };
  const handleViewOpen = (record) => {
    setCredentialId(record?.credential_id)
    setFileView(true);
  };
  function formatDate(inputDate){  
      var splitDate = inputDate.split('-');
      if(splitDate.count == 0){
          return null;
      }

      var year = splitDate[0];
      var month = splitDate[1];
      var day = splitDate[2]; 

      return month + '/' + day + '/' + year;
  }

  const column = [
    {
      title: "Name",
      dataIndex: "employee_name",
      key: "employee_name",
      width: 120,
    },
    {
      title: "Credential Type",
      dataIndex: "credential_name",
      key: "credential_name",
      width: 120,
      /*sorter: (a, b) => {
        return a.credential_name > b.credential_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "credential_name" ? sortedInfo.order : null,
      ellipsis: true,*/
    },

    {
      title: "Date issue",
      key: "credential_date_expired",
      dataIndex: "credential_date_expired",
      width: 100,     
      render: (_, record) => {
        return (
          <div className="flex justify-center">
            {formatDate(record.credential_date_expired)}
          </div>
        );
      },
      // filters: [{}],
      // filteredValue: filteredInfo.credential_date_expired || null,
      // onFilter: (value, record) =>
      //   record.credential_date_expired.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      /*sorter: (a, b) => {
        return a.credential_date_expired > b.credential_date_expired ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "credential_date_expired"
          ? sortedInfo.order
          : null,
      ellipsis: true,*/
    },
    {
      title: "Expired Date",
      key: "credential_date_issue",
      dataIndex: "credential_date_issue",
      width: 100,     
      render: (_, record) => {
        return (
          <div className="flex justify-center">
            {formatDate(record.credential_date_issue)}
          </div>
        );
      },
      // filters: [{}],
      // filteredValue: filteredInfo.credential_date_issue || null,
      // onFilter: (value, record) => record.credential_date_issue.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      /*sorter: (a, b) => {
        return a.credential_date_issue > b.credential_date_issue ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "credential_date_issue"
          ? sortedInfo.order
          : null,
      ellipsis: true,*/
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary cursor-pointer">
        { record.credential_file ?
        (<AiOutlineEye
          onClick={() => handleViewOpen(record)}
          className="text-xs mx-2  text-lime-700"
          title="Edit"
        />
        ) : null }
        { record.credential_file ? (<span>|</span>) : null}
          <FiEdit
            onClick={() => handleEditModal(record)}
            className="text-xs mx-2  text-lime-700"
            title="Edit"
          />

          <span>|</span>

          <AiOutlineDelete
            onClick={() => handleDelete(record)}
            className="text-xs text-red-500 mx-2"
            title="Delete"
          />
        </div>
      ),
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
    <div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-2"
          style={{
            transition: "all .3s ease-out",
          }}
        >
          {credentials?.credentialsList?.data.length === 0 ? (
            <>
              {display && (
                <div className="px-4 py-3 mt-2 mb-1 mx-2 flex items-center justify-between rounded-md text-red-600 border border-red-500 font-normal text-xs red-box">
                  <p>No Credential Records</p>
                  <button
                    onClick={() => setDisplay(false)}
                    className="text-black"
                  >
                    X
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className=" overflow-scroll">
              <Table
                pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                size="small"
                className="table-striped-rows text-xs font-normal"
                columns={column}
                bordered
                rowKey={(record) => record.id} //record is kind of whole one data object and here we are
                dataSource={credentials?.credentials?.data}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="my-4 ">
            <button className="dcm-button mr-2 mt-2" onClick={handleClickOpen}>
              Add Credential
            </button>

          </div>
        </motion.div>
      </div>

      {openEditModal && (
        <AddCredential
          handleClose={handleClose}
          open={openEditModal}
          token={token}
          id={id}
        ></AddCredential>
      )}
      {editModal && (
        <EditCredential
          credentialInfo={credentialRecord}
          handleClose={handleClose}
          open={editModal}
          token={token}
          id={id}
        ></EditCredential>
      )}
      {fileView && (
        <ViewCredential
          handleClose={handleViewClose}
          open={fileView}
          token={token}
          credentialId={credentialId}
        ></ViewCredential>
      )}
    </div>
  );
};

export default Credential;

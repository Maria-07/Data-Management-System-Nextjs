import { useDeleteClearanceMutation } from "@/Redux/features/staff/credentials/clearenceApi";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { Table } from "antd";
import AddClearence from "./AddClearenceModal/AddClearence";
import EditClearence from "./EditClearenceModal/EditClearence";
import ViewClearence from "./ViewClearence";
import { toast } from "react-toastify";

const Clearance = ({ clearences, token, id }) => {
  // console.log("clearences data", clearences);
  const [display, setDisplay] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [clearenceRecord, setClearenceRecord] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [fileView, setFileView] = useState(false);
  const [clearanceId, setClearanceId] = useState(false);

  const [deleteClearance, { isSuccess: deleteSuccess }] =
    useDeleteClearanceMutation();

  //Handle clearence Modal
  const handleClearenceEdit = (record) => {
    setClearenceRecord(record);
    setEditModal(!editModal);
  };
  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  const handleDelete = (record) => {
    const payload = {
      clearance_id: record?.clearance_id,
    };
    if (record?.clearance_id) {
      deleteClearance({ token, payload });
    }
  };

  const handleViewClose = () => {
    setFileView(false);
  };
  const handleViewOpen = (record) => {
    setClearanceId(record?.clearance_id);
    setFileView(true);
  };

  useEffect(() => {
    if (deleteSuccess) {
      if (deleteSuccess) {
        toast.success("Successfully Deleted Credential", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          style: { fontSize: "12px" },
        });
      }
    }
  }, [deleteSuccess]);
  function formatDate(inputDate) {
    var splitDate = inputDate.split("-");
    if (splitDate.count == 0) {
      return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    return month + "/" + day + "/" + year;
  }
  const column = [
    {
      title: "Name",
      dataIndex: "employee_name",
      key: "employee_name",
      width: 120,
    },
    {
      title: "Clearence Type",
      dataIndex: "clearance_name",
      key: "clearance_name",
      width: 120,
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_name || null,
      // onFilter: (value, record) => record.clearance_name.includes(value),
      /*sorter: (a, b) => {
        return a.clearance_name > b.clearance_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_name" ? sortedInfo.order : null,
      ellipsis: true,*/
    },

    {
      title: "Date issue",
      key: "clearance_date_issue",
      dataIndex: "clearance_date_issue",
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex justify-center">
            {formatDate(record.clearance_date_issue)}
          </div>
        );
      },
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_date_issue || null,
      // onFilter: (value, record) => record.clearance_date_issue.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      /*sorter: (a, b) => {
        return a.clearance_date_issue > b.clearance_date_issue ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_date_issue"
          ? sortedInfo.order
          : null,
      ellipsis: true,*/
    },
    {
      title: "Expired Date",
      key: "clearance_date_expired",
      dataIndex: "clearance_date_expired",
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex justify-center">
            {formatDate(record.clearance_date_expired)}
          </div>
        );
      },
      // filters: [{}],
      // filteredValue: filteredInfo.clearance_date_exp || null,
      // onFilter: (value, record) => record.clearance_date_exp.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      /*sorter: (a, b) => {
        return a.clearance_date_expired > b.clearance_date_expired ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "clearance_date_expired" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary">
          {record.clearance_file ? (
            <AiOutlineEye
              onClick={() => handleViewOpen(record)}
              className="text-xs mx-2  text-lime-700"
              title="Edit"
            />
          ) : null}
          {record.clearance_file ? <span>|</span> : null}
          <FiEdit
            onClick={() => handleClearenceEdit(record)}
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
    // console.log("Various parameters", pagination, filters, sorter);
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
          {clearences?.clearance?.data === 0 ? (
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
            <div className=" overflow-scroll mt-5">
              <Table
                pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                size="small"
                className="table-striped-rows text-xs font-normal"
                columns={column}
                bordered
                rowKey={(record) => record.clearance_id} //record is kind of whole one data object and here we are
                dataSource={clearences?.clearance?.data}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="my-4 ">
            <button className="dcm-button mr-2 mt-2" onClick={handleClickOpen}>
              Add Clearance
            </button>
          </div>
        </motion.div>
      </div>

      {openEditModal && (
        <AddClearence
          handleClose={handleClose}
          open={openEditModal}
          token={token}
          id={id}
        ></AddClearence>
      )}
      {editModal && (
        <EditClearence
          open={editModal}
          clearenceInfo={clearenceRecord}
          handleClose={handleClearenceEdit}
          token={token}
          id={id}
        ></EditClearence>
      )}
      {fileView && (
        <ViewClearence
          handleClose={handleViewClose}
          open={fileView}
          token={token}
          clearanceId={clearanceId}
        ></ViewClearence>
      )}
    </div>
  );
};

export default Clearance;

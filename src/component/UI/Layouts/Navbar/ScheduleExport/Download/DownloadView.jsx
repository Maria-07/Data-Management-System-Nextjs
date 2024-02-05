import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import UseTable from "../../../../../Utilities/UseTable";
import ERAActionModal from "../../../../Admin/Settings/Settings/QAFiles/QAFile/ERAActionModal";
import DownloadTableData, {
  DownloadTableDataColumn,
} from "./DownloadTableData";

const DownloadView = () => {
  const [DownloadData, setDownloadData] = useState([]);

  // fakedb api call
  useEffect(() => {
    axios("../../All_Fake_Api/DownlodView.json")
      .then((response) => {
        setDownloadData(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const data = useMemo(() => DownloadData, [DownloadData]);
  const columns = useMemo(() => [...DownloadTableDataColumn], []);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);
  // console.log(editableRowIndex);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy, (hooks) => {
      hooks.allColumns.push((columns) => [
        // other hooks such as selection hook
        ...columns,
        // edit hook
        {
          accessor: "action",
          id: "action",
          Header: "Action",
          Cell: ({ row, setEditableRow, editableRow }) => (
            <>
              <div>
                <div className="flex justify-center gap-1 text-primary">
                  <button
                    onClick={() => {
                      setEditableRowIndex(row);
                      setOpenEditModal(true);
                    }}
                  >
                    Export
                  </button>
                </div>
              </div>
            </>
          ),
        },
      ]);
    });
  return (
    <div>
      <h1 className="text-lg my-2 text-orange-500">
        Activities Ready to Bill Not Billed
      </h1>
      <div>
        <UseTable
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        ></UseTable>
      </div>
      {openEditModal && (
        <ERAActionModal
          handleClose={handleClose}
          open={openEditModal}
          row={editableRowIndex}
        ></ERAActionModal>
      )}
    </div>
  );
};

export default DownloadView;

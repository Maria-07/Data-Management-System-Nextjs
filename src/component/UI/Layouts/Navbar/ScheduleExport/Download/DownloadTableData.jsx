export const DownloadTableData = [
  {
    sl_no: "asd",
  },
  {
    patient: "mina",
  },
];

export const DownloadTableDataColumn = [
  {
    Header: () => {
      return <span className="">SL. No</span>;
    },
    accessor: "sl_no",
  },
  {
    Header: () => {
      return <span className="">File Name</span>;
    },
    accessor: "file_name",
  },
  {
    Header: () => {
      return <span className="">Download Time</span>;
    },
    accessor: "download_time",
  },
  {
    Header: () => {
      return <span className="">Downloaded By</span>;
    },
    accessor: "downloaded_by",
  },
  {
    Header: "Status",
    Cell: ({ row }) => {
      return (
        <>
          <div className="text-secondary font-normal">Complete</div>
        </>
      );
    },
  },
];

export default DownloadTableData;

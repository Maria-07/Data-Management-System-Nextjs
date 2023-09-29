import { Link } from "react-router-dom";
import PatientLedgerAction from "./PatientLedgerAction";
import { BsFileEarmarkPlusFill } from "react-icons/bs";

export const PatientLedgerColumnsData = [
  {
    id: "1200245453244",
    tx_type: "125",
  },
];

export const PatientLedgerColumnsColumn = [
  {
    Header: "Patient",
    Cell: ({ row }) => {
      return (
        <div>
          <Link
            className="font-normal text-secondary"
            to={"/admin/patient-List"}
          >
            Andrew Philippe
          </Link>
        </div>
      );
    },
  },
  {
    Header: () => {
      return <span className="">Provider</span>;
    },
    accessor: "provider",
  },
  {
    Header: () => {
      return <span className="">DOS</span>;
    },
    accessor: "Dos",
  },
  {
    Header: () => {
      return <span className="">CPT</span>;
    },
    accessor: "CPT",
  },
  {
    Header: () => {
      return <span className="">Unit</span>;
    },
    accessor: "unit",
  },
  {
    Header: () => {
      return <span className="">Date Billed</span>;
    },
    accessor: "date_billed",
  },
  {
    Header: () => {
      return <span className="">Billed Amt</span>;
    },
    accessor: "billed",
  },
  {
    Header: () => {
      return <span className="">Allowed Amt</span>;
    },
    accessor: "allowed",
  },
  {
    Header: () => {
      return <span className="">Paid</span>;
    },
    accessor: "paid",
  },
  {
    Header: () => {
      return <span className="">Adj</span>;
    },
    accessor: "adj",
  },
  {
    Header: () => {
      return <span className="">Balance</span>;
    },
    accessor: "balance",
  },
  {
    Header: () => {
      return <span className="">Insurance Name</span>;
    },
    accessor: "insurance_name",
  },
  {
    Header: "Claims",
    Cell: ({ row }) => {
      return (
        <div>
          <button className="font-normal text-secondary">1002</button>
        </div>
      );
    },
  },
  {
    Header: "NT",
    Cell: ({ row }) => {
      return (
        <div className="mx-auto">
          <span className="font-normal flex justify-center items-center text-gray-500">
            <BsFileEarmarkPlusFill />
          </span>
          {/* <span className="font-normal flex justify-center items-center text-green-600">
            <BsFileEarmarkPlusFill />
          </span> */}
        </div>
      );
    },
  },
  {
    Header: "Action",
    Cell: ({ row }) => {
      return <PatientLedgerAction row={row}></PatientLedgerAction>;
    },
  },
];

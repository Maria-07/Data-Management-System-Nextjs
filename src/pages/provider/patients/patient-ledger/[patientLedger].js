import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import PatientLedgerAction from "@/component/UI/Patients/Patients/PatientLedger/PatientLedgerAction";
import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import { Switch, Table, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { FaArrowsAltH } from "react-icons/fa";

const PatientLedger = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.patientLedger;
  // console.log(id);

  const [table, setTable] = useState(false);
  const [value, setValue] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const [allData, setAllData] = useState([
    {
      key: 1,
      patient: "Claudette",
      provider: "Girardoni",
      dos: "03-05-2022",
      cpt: "S63275D",
      unit: "3381961470",
      date_billed: "30-12-2021",
      billed_amount: 18,
      allowed_amount: 20,
      paid: 87,
      adj: 60,
      balance: 40,
      insurance_name: "Onset Dermatologics LLC",
      claim_no: "T25692D",
      nt: true,
    },
    {
      key: 2,
      patient: "Mela",
      provider: "Sweetmore",
      dos: "20-02-2022",
      cpt: "S58922D",
      unit: "9956726737",
      date_billed: "19-12-2021",
      billed_amount: 16,
      allowed_amount: 84,
      paid: 27,
      adj: 40,
      balance: 50,
      insurance_name: "BioActive Nutritional, Inc.",
      claim_no: "S49131P",
      nt: false,
    },
    {
      key: 3,
      patient: "Guglielmo",
      provider: "Moncreif",
      dos: "27-04-2022",
      cpt: "D684",
      unit: "0502821620",
      date_billed: "14-03-2022",
      billed_amount: 74,
      allowed_amount: 85,
      paid: 21,
      adj: 49,
      balance: 77,
      insurance_name: "Pharmaceutical Associates, Inc.",
      claim_no: "N996",
      nt: true,
    },
    {
      key: 4,
      patient: "Blane",
      provider: "Minty",
      dos: "28-06-2022",
      cpt: "V80731A",
      unit: "4221709553",
      date_billed: "26-02-2022",
      billed_amount: 9,
      allowed_amount: 5,
      paid: 29,
      adj: 91,
      balance: 32,
      insurance_name: "Nelco Laboratories, Inc.",
      claim_no: "M05461",
      nt: false,
    },
    {
      key: 5,
      patient: "Bertram",
      provider: "Holligan",
      dos: "05-06-2022",
      cpt: "I97620",
      unit: "0805199578",
      date_billed: "22-12-2021",
      billed_amount: 39,
      allowed_amount: 54,
      paid: 77,
      adj: 19,
      balance: 67,
      insurance_name: "Boehringer Ingelheim Pharmaceuticals Inc.",
      claim_no: "M1107",
      nt: true,
    },
    {
      key: 6,
      patient: "Urban",
      provider: "Grealy",
      dos: "14-09-2022",
      cpt: "S31040D",
      unit: "8724915297",
      date_billed: "26-07-2022",
      billed_amount: 20,
      allowed_amount: 4,
      paid: 71,
      adj: 27,
      balance: 35,
      insurance_name: "Noven Therapeutics, LLC",
      claim_no: "T563X1S",
      nt: false,
    },
    {
      key: 7,
      patient: "Cynthia",
      provider: "Brinicombe",
      dos: "07-06-2022",
      cpt: "T179",
      unit: "1118232895",
      date_billed: "31-12-2021",
      billed_amount: 45,
      allowed_amount: 26,
      paid: 80,
      adj: 33,
      balance: 45,
      insurance_name: "RedPharm Drug Inc.",
      claim_no: "S61243A",
      nt: true,
    },
    {
      key: 8,
      patient: "Woodie",
      provider: "Newlove",
      dos: "19-02-2022",
      cpt: "S41051S",
      unit: "9203473874",
      date_billed: "04-12-2021",
      billed_amount: 41,
      allowed_amount: 87,
      paid: 32,
      adj: 89,
      balance: 40,
      insurance_name: "TopCo Associates LLC",
      claim_no: "M7967",
      nt: true,
    },
    {
      key: 9,
      patient: "Leela",
      provider: "Mingasson",
      dos: "17-09-2021",
      cpt: "V594",
      unit: "9901449537",
      date_billed: "23-02-2022",
      billed_amount: 64,
      allowed_amount: 67,
      paid: 19,
      adj: 80,
      balance: 47,
      insurance_name: "The Procter & Gamble Manufacturing Company",
      claim_no: "M9961",
      nt: true,
    },
    {
      key: 10,
      patient: "Cody",
      provider: "Wanden",
      dos: "21-02-2022",
      cpt: "G4360",
      unit: "5012627997",
      date_billed: "04-06-2022",
      billed_amount: 86,
      allowed_amount: 4,
      paid: 45,
      adj: 11,
      balance: 81,
      insurance_name: "Hyland's",
      claim_no: "S13111S",
      nt: false,
    },
    {
      key: 11,
      patient: "Ashia",
      provider: "Visco",
      dos: "18-07-2022",
      cpt: "S72062K",
      unit: "8480629150",
      date_billed: "14-04-2022",
      billed_amount: 52,
      allowed_amount: 42,
      paid: 47,
      adj: 34,
      balance: 72,
      insurance_name: "Laser Pharmaceuticals LLC",
      claim_no: "S45991A",
      nt: false,
    },
    {
      key: 12,
      patient: "Valle",
      provider: "McManamon",
      dos: "25-04-2022",
      cpt: "V543XXD",
      unit: "4498357620",
      date_billed: "21-01-2022",
      billed_amount: 85,
      allowed_amount: 2,
      paid: 61,
      adj: 89,
      balance: 85,
      insurance_name: "Sandoz Inc.",
      claim_no: "T84111S",
      nt: true,
    },
    {
      key: 13,
      patient: "Mada",
      provider: "Phillp",
      dos: "07-11-2021",
      cpt: "S60222S",
      unit: "9713968867",
      date_billed: "03-12-2021",
      billed_amount: 82,
      allowed_amount: 46,
      paid: 83,
      adj: 36,
      balance: 38,
      insurance_name: "PD-Rx Pharmaceuticals, Inc.",
      claim_no: "Q233",
      nt: true,
    },
    {
      key: 14,
      patient: "Pierce",
      provider: "Geldeard",
      dos: "14-09-2022",
      cpt: "S56219",
      unit: "8111459254",
      date_billed: "13-05-2022",
      billed_amount: 80,
      allowed_amount: 50,
      paid: 30,
      adj: 9,
      balance: 35,
      insurance_name: "Physicians Total Care, Inc.",
      claim_no: "O660",
      nt: true,
    },
    {
      key: 15,
      patient: "Melony",
      provider: "Laven",
      dos: "04-02-2022",
      cpt: "V575",
      unit: "6358482025",
      date_billed: "12-11-2021",
      billed_amount: 95,
      allowed_amount: 100,
      paid: 22,
      adj: 70,
      balance: 71,
      insurance_name: "Air Liquide America L.P.",
      claim_no: "O43122",
      nt: false,
    },
    {
      key: 16,
      patient: "Wade",
      provider: "Fozard",
      dos: "24-06-2022",
      cpt: "S53122D",
      unit: "8543651646",
      date_billed: "16-12-2021",
      billed_amount: 17,
      allowed_amount: 53,
      paid: 86,
      adj: 75,
      balance: 46,
      insurance_name: "BioMed Systems, Inc.",
      claim_no: "T374X2",
      nt: true,
    },
    {
      key: 17,
      patient: "Katharyn",
      provider: "Biddles",
      dos: "06-03-2022",
      cpt: "S85809S",
      unit: "8410608375",
      date_billed: "10-05-2022",
      billed_amount: 16,
      allowed_amount: 61,
      paid: 27,
      adj: 48,
      balance: 99,
      insurance_name: "Rite Aid Corporation",
      claim_no: "Y37240D",
      nt: true,
    },
    {
      key: 18,
      patient: "Trixy",
      provider: "Forst",
      dos: "28-03-2022",
      cpt: "E13349",
      unit: "5999399920",
      date_billed: "15-11-2021",
      billed_amount: 13,
      allowed_amount: 92,
      paid: 90,
      adj: 86,
      balance: 37,
      insurance_name: "Cardinal Health",
      claim_no: "T63011D",
      nt: false,
    },
    {
      key: 19,
      patient: "Flory",
      provider: "Keniwell",
      dos: "07-08-2022",
      cpt: "S52009N",
      unit: "1572041595",
      date_billed: "23-03-2022",
      billed_amount: 67,
      allowed_amount: 84,
      paid: 97,
      adj: 33,
      balance: 24,
      insurance_name: "Actavis Elizabeth LLC",
      claim_no: "K602",
      nt: false,
    },
    {
      key: 20,
      patient: "Cher",
      provider: "Cordie",
      dos: "25-03-2022",
      cpt: "S92033B",
      unit: "4698249600",
      date_billed: "03-01-2022",
      billed_amount: 86,
      allowed_amount: 36,
      paid: 6,
      adj: 48,
      balance: 27,
      insurance_name: "RedPharm Drug Inc.",
      claim_no: "O3671X9",
      nt: true,
    },
  ]);

  const { Text } = Typography;

  //! table config --------------------------------
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };

  const column = [
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.patient || null,
      onFilter: (value, record) => record.patient.includes(value),
      sorter: (a, b) => {
        return a.patient > b.patient ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "patient" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { patient }) => {
        return (
          <div>
            <Link
              className="font-normal text-secondary"
              href={"/admin/patients"}
            >
              {patient}
            </Link>
          </div>
        );
      },
    },
    {
      index: 2,
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      width: 100,
      filters: [
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.provider || null,
      onFilter: (value, record) => record.provider.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.provider > b.provider ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "provider" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "DOS",
      key: "dos",
      dataIndex: "dos",
      width: 80,
      filters: [{}],
      filteredValue: filteredInfo.dos || null,
      onFilter: (value, record) => record.dos.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.dos > b.dos ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "dos" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "CPT",
      key: "cpt",
      dataIndex: "cpt",
      width: 80,
      filters: [{}],
      filteredValue: filteredInfo.cpt || null,
      onFilter: (value, record) => record.cpt.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.cpt > b.cpt ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "cpt" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Unit",
      key: "unit",
      dataIndex: "unit",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.unit || null,
      onFilter: (value, record) => record.unit.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.unit > b.unit ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "unit" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Date Billed",
      key: "date_billed",
      dataIndex: "date_billed",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.date_billed || null,
      onFilter: (value, record) => record.date_billed.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.date_billed > b.date_billed ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "date_billed" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Billed Amount",
      key: "billed_amount",
      dataIndex: "billed_amount",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.billed_amount || null,
      onFilter: (value, record) => record.billed_amount.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.billed_amount > b.billed_amount ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "billed_amount" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { billed_amount }) => {
        //console.log("Status : ", Status);
        return <div className="flex justify-end">{billed_amount}</div>;
      },
    },
    {
      title: "Allowed Amount",
      key: "allowed_amount",
      dataIndex: "allowed_amount",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.allowed_amount || null,
      onFilter: (value, record) => record.allowed_amount.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.allowed_amount > b.allowed_amount ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "allowed_amount" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { allowed_amount }) => {
        //console.log("Status : ", Status);
        return <div className="flex justify-end">{allowed_amount}</div>;
      },
    },

    {
      title: "Paid",
      key: "paid",
      dataIndex: "paid",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.paid || null,
      onFilter: (value, record) => record.paid.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.paid > b.paid ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "paid" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { paid }) => {
        //console.log("Status : ", Status);
        return <div className="flex justify-end">{paid}</div>;
      },
    },
    {
      title: "Adj",
      key: "adj",
      dataIndex: "adj",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.adj || null,
      onFilter: (value, record) => record.adj.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.adj > b.adj ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "adj" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { adj }) => {
        //console.log("Status : ", Status);
        return <div className="flex justify-end">{adj}</div>;
      },
    },
    {
      title: "Balance",
      key: "balance",
      dataIndex: "balance",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.balance || null,
      onFilter: (value, record) => record.balance.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.balance > b.balance ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "balance" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { balance }) => {
        //console.log("Status : ", Status);
        return <div className="flex justify-end">{balance}</div>;
      },
    },
    {
      title: "Insurance Name",
      key: "insurance_name",
      dataIndex: "insurance_name",
      width: 110,
      filters: [{}],
      filteredValue: filteredInfo.insurance_name || null,
      onFilter: (value, record) => record.insurance_name.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.insurance_name > b.insurance_name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "insurance_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Claim No",
      key: "claim_no",
      dataIndex: "claim_no",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.claim_no || null,
      onFilter: (value, record) => record.claim_no.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.claim_no > b.claim_no ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "claim_no" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "NT",
      key: "nt",
      dataIndex: "nt",
      width: 60,
      filters: [{}],
      filteredValue: filteredInfo.nt || null,
      onFilter: (value, record) => record.nt.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.nt > b.nt ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "nt" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { nt }) => {
        return (
          <div className="mx-auto">
            {nt === true ? (
              <span className="font-normal flex justify-center items-center text-green-600">
                <BsFileEarmarkPlusFill />
              </span>
            ) : (
              <span className="font-normal flex justify-center items-center text-gray-500">
                <BsFileEarmarkPlusFill />
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 90,
      render: (_, { nt }) => {
        return <PatientLedgerAction></PatientLedgerAction>;
      },
    },
  ];

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      filters: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setTable(true);
  };

  //Date converter function [yy-mm-dd]
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  //Date Range Picker
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleCancelDate = () => {
    setRange([
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ]);
    setOpenCalendar(false);
  };

  // date year range

  // date range picker calendar
  const startDate = range ? range[0]?.startDate : null;
  const endDate = range ? range[0]?.endDate : null;
  const startMonth = startDate
    ? startDate.toLocaleString("en-us", { month: "short" })
    : null;
  const endMonth = endDate
    ? endDate.toLocaleString("en-us", { month: "short" })
    : null;
  const startDay = startDate ? startDate.getDate() : null;
  const endDay = endDate ? endDate.getDate() : null;
  const startYear = startDate
    ? startDate.getFullYear().toString().slice(2, 4)
    : null;
  const endYear = endDate ? endDate.getFullYear().toString().slice(2, 4) : null;

  //test design
  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    setClicked(true);
  };

  // Hide calendar on outside click
  const refClose = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refClose.current && !refClose.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  };
  //end outside click
  return (
    <div>
      <div className={table ? "" : "h-[100vh]"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-lg mt-2 text-orange-500">Patient Ar Ledger</h1>
        </form>

        <div className="my-5">
          <div className="flex justify-between items-center my-2">
            <div className=" flex flex-wrap items-center gap-3">
              <div>
                <label className="label">
                  <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                    Patient
                  </span>
                </label>
                <select
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
                  {...register("patient")}
                >
                  <option value="name"> </option>
                  <option value="name"> Abcgfdgfdgdrtdrtfd </option>
                  <option value="name"> abcd </option>
                </select>
              </div>
              <div className="w-[250px]">
                <label className="label">
                  <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                    Selected date
                  </span>
                </label>
                <div className="ml-1">
                  <div className="flex flex-wrap justify-between items-center text-gray-600 input-border-bottom rounded-sm px-1 mx-1 w-full">
                    <input
                      value={
                        startDate
                          ? `${startMonth} ${startDay}, ${startYear}`
                          : "Start Date"
                      }
                      readOnly
                      onClick={() => setOpenCalendar(true)}
                      className="focus:outline-none font-medium text-center pb-[1.8px] text-[14px] text-gray-600 bg-transparent w-1/3 cursor-pointer"
                    />
                    <FaArrowsAltH
                      onClick={() => setOpenCalendar(true)}
                      className="w-1/3 cursor-pointer text-gray-600 text-[14px] font-medium"
                    ></FaArrowsAltH>
                    <input
                      value={
                        endDate
                          ? `${endMonth} ${endDay}, ${endYear}`
                          : "End Date"
                      }
                      readOnly
                      onClick={() => setOpenCalendar(true)}
                      className="focus:outline-none font-medium text-center bg-transparent text-[14px] text-gray-600 w-1/3 cursor-pointer"
                    />
                  </div>

                  {/* Multi date picker component called */}
                  <div
                    ref={refClose}
                    className="absolute z-10 md:ml-[-15%] lg:ml-0 xl:ml-0 2xl:ml-[35%]s"
                  >
                    {openCalendar && (
                      <CustomDateRange
                        range={range}
                        setRange={setRange}
                        handleCancelDate={handleCancelDate}
                        setOpen={setOpenCalendar}
                      ></CustomDateRange>
                    )}
                  </div>
                </div>
              </div>

              {/* CPT Code  */}
              <div>
                <label className="label">
                  <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                    CPT Code
                  </span>
                </label>
                <select
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
                  {...register("CPT_Code")}
                >
                  <option value="name"></option>
                  <option value="name">EFT</option>
                  <option value="name">rounded-sm</option>
                  <option value="name">EFT</option>
                  <option value="name">EFT</option>
                </select>
              </div>

              {/*Aging Status  */}
              <div>
                <label className="label">
                  <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                    Aging Status
                  </span>
                </label>
                <select
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
                  {...register("aging_status")}
                >
                  <option value="name">EFT</option>
                </select>
              </div>
              <div className="mt-[26px] flex items-center sm:col-span-2">
                <div>
                  <Switch
                    size="small"
                    checked={value ? true : false}
                    onClick={() => setValue(!value)}
                  />
                  <span className="text-[14px] font-medium text-gray-500 mx-3">
                    Zero to Paid
                  </span>
                </div>

                <div>
                  {/* submit  */}
                  <button
                    onClick={() => setTable(true)}
                    className="dcm-input-button "
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
            >
              Clear filters
            </button>
          </div>
          {table && (
            <>
              <div className=" overflow-scroll py-3">
                <Table
                  pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                  size="small"
                  bordered
                  className=" text-xs font-normal "
                  columns={column}
                  dataSource={allData}
                  rowSelection={{
                    ...rowSelection,
                  }}
                  scroll={{
                    y: 700,
                  }}
                  onChange={handleChange}
                  summary={(pageData) => {
                    let totalBill = 0;
                    let totalAllowed = 0;
                    let totalPaid = 0;
                    let totalBalance = 0;
                    let totalAdj = 0;
                    pageData.forEach(
                      ({
                        billed_amount,
                        allowed_amount,
                        paid,
                        adj,
                        balance,
                      }) => {
                        totalBill += billed_amount;
                        totalAllowed += allowed_amount;
                        totalPaid += paid;
                        totalBalance += balance;
                        totalAdj += adj;
                      }
                    );
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={2} colSpan={7}>
                            <span className="text-black font-bold flex justify-end mx-5 ">
                              {" "}
                              Total
                            </span>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={8}>
                            <Text className="text-black font-bold flex justify-end">
                              {totalBill}
                            </Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}>
                            <Text className="text-black font-bold flex justify-end">
                              {totalAllowed}
                            </Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}>
                            <Text className="text-black font-bold flex justify-end">
                              {totalPaid}
                            </Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}>
                            <Text className="text-black font-bold flex justify-end">
                              {totalAdj}
                            </Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}>
                            <Text className="text-black font-bold flex justify-end">
                              {totalBalance}
                            </Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell
                            index={2}
                            colSpan={4}
                          ></Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </div>

              <div className="flex item-center flex-wrap my-5">
                <div>
                  <select
                    onChange={handleSortBy}
                    name="type"
                    className="border border-gray-300 rounded-sm py-[5px] font-normal px-2 w-36 text-xs "
                  >
                    <option value=""></option>
                    <option value="Specific_Date">Specific Date</option>
                    <option value="Date_Range">Provider</option>
                  </select>
                </div>
                <button className="  px-3 ml-3 text-xs font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-md">
                  Go
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientLedger;

PatientLedger.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

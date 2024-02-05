import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import PatientLedgerAction from "@/component/UI/Patients/Patients/PatientLedger/PatientLedgerAction";
import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import MultiSelectGlobal from "@/shared/CustomeMultiSelect/MultiselectGlobal";
import { Table } from "antd";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { FaArrowsAltH } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";

const PatientSessionNote = () => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      filters: [],
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
  };

  const [table, setTable] = useState(false);
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

  //!-------------------Date Range Picker
  const refClose = useRef(null);
  const [startD, setStartD] = useState(null);
  const [endD, setEndD] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      // startDate: new Date(),
      startDate: null,
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

  // date range picker Start Date and End Date Modifer Part
  const startDate = range ? range[0]?.startDate : null;
  const endDate = range ? range[0]?.endDate : null;
  // console.log("calender date", startDate, endDate);
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

  //! End Date Range Picker

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
      title: "Service & Hrs.",
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
      title: "Hours",
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
      title: "Status",
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
      title: "Status",
      dataIndex: "operation",
      key: "operation",
      width: 80,
      render: (_, { nt }) => {
        return <div></div>;
      },
    },
    {
      title: "Notes",
      dataIndex: "operation",
      key: "operation",
      width: 200,
      render: (_, { nt }) => {
        return (
          <div className="px-3">
            <h1 className="text-primary text-sm">
              Direct Service Parent Training Form Session Notes
            </h1>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="flex items-center gap-5 flex-wrap">
          <div>
            <label className="label">
              <span className=" label-font ">Provider</span>
            </label>
            <div className="py-[2px]  mt-2">
              <MultiSelectGlobal
                allData={[
                  {
                    id: 1,
                    first_name: "Thea",
                    last_name: "Thoday",
                    npi: 39,
                    upin: 75,
                  },
                  {
                    id: 2,
                    first_name: "Grover",
                    last_name: "Rheubottom",
                    npi: 54,
                    upin: 100,
                  },
                  {
                    id: 3,
                    first_name: "Renate",
                    last_name: "Bould",
                    npi: 90,
                    upin: 68,
                  },
                  {
                    id: 4,
                    first_name: "Evin",
                    last_name: "Manville",
                    npi: 29,
                    upin: 66,
                  },
                  {
                    id: 5,
                    first_name: "Stormi",
                    last_name: "Vanezis",
                    npi: 59,
                    upin: 45,
                  },
                ]}
                id={121}
                // patientsLoading={patientsLoading}
              />
            </div>
          </div>
          <div>
            <label className="label">
              <span className=" label-font ">Status</span>
            </label>
            <div className="py-[2px]  mt-2">
              <MultiSelectGlobal
                allData={[
                  {
                    id: 1,
                    first_name: "Thea",
                    last_name: "Thoday",
                    npi: 39,
                    upin: 75,
                  },
                  {
                    id: 2,
                    first_name: "Grover",
                    last_name: "Rheubottom",
                    npi: 54,
                    upin: 100,
                  },
                  {
                    id: 3,
                    first_name: "Renate",
                    last_name: "Bould",
                    npi: 90,
                    upin: 68,
                  },
                  {
                    id: 4,
                    first_name: "Evin",
                    last_name: "Manville",
                    npi: 29,
                    upin: 66,
                  },
                  {
                    id: 5,
                    first_name: "Stormi",
                    last_name: "Vanezis",
                    npi: 59,
                    upin: 45,
                  },
                ]}
                id={121}
                // patientsLoading={patientsLoading}
              />
            </div>
          </div>
          <div className="sm:w-[240px] w-[200px]">
            <label className="label">
              <span className="label-font ">Place of Services</span>
            </label>
            <div>
              <select
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                {...register("status")}
              >
                <option value="" className="text-black">
                  Select
                </option>
                <option value="Scheduled" className="text-black">
                  Scheduled
                </option>
                <option className="text-black" value="No Show">
                  No Show
                </option>
                <option className="text-black" value="Hold">
                  Hold
                </option>
                <option className="text-black" value="Cancelled by Client">
                  Cancelled by Client
                </option>
                <option className="text-black" value="CC more than 24 hrs">
                  CC more than 24 hrs
                </option>
                <option className="text-black" value="CC less than 24 hrs">
                  CC less than 24 hrs
                </option>
                <option className="text-black" value="Cancelled by Provider">
                  Cancelled by Provider
                </option>
                <option className="text-black" value="Rendered">
                  Rendered
                </option>
              </select>
            </div>
          </div>
          <div className="w-[200px]">
            <div>
              <label className="label">
                <h1 className="label-font mb-2 ml-1">Selected date</h1>
              </label>
              <div className="ml-1">
                <div className="flex  justify-between items-center text-gray-600 input-border-bottom rounded-sm px-1  w-full">
                  <input
                    value={
                      startDate
                        ? `${startMonth} ${startDay}, ${startYear}`
                        : `${startD}`
                    }
                    readOnly
                    onClick={() => setOpenCalendar(true)}
                    {...register("start_date")}
                    className="focus:outline-none font-semibold text-center pb-[1.8px] text-[14px] text-gray-600 bg-transparent w-2/5 cursor-pointer"
                  />
                  <FaArrowsAltH
                    onClick={() => setOpenCalendar(true)}
                    className="cursor-pointer  text-gray-600 text-[14px] font-medium w-1/5"
                  ></FaArrowsAltH>
                  <input
                    // defaultValue={"5-10-2034"}
                    value={
                      endDate ? `${endMonth} ${endDay}, ${endYear}` : `${endD}`
                    }
                    readOnly
                    onClick={() => setOpenCalendar(true)}
                    {...register("end_date")}
                    className="focus:outline-none font-semibold text-center bg-transparent text-[14px] text-gray-600 w-2/5 cursor-pointer"
                  />
                </div>

                {/* Multi date picker component called */}
                <div
                  ref={refClose}
                  className="absolute z-10 md:ml-[-9%] lg:ml-0 xl:ml-0 2xl:ml-[35%]s "
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
            {/* Multi date picker component called */}
            <div>
              <div
                // ref={refClose}
                // className="absolute z-10 2xl:ml-[0%] xl:ml-[0%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] sm:mr-[14%] mt-1 "
                className="absolute z-10 2xl:ml-[0%] xl:ml-[-45%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] ml-[-4%] mr-[8%] mt-1  "
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
          <div>
            <label className="label">
              <h1 className="label-font mb-1  ml-1">
                Locked
                <span className="text-red-500">*</span>
              </h1>
            </label>
            <select
              className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
              {...register("is_primary")}
            >
              <option value="">Select Any</option>
              <option value="1">Primary</option>
              <option value="2">Secondary</option>
              <option value="3">Tertiary</option>
            </select>
          </div>
          <div>
            {/* submit  */}
            <button
              onClick={() => setTable(true)}
              className="dcm-input-button mt-[26px] "
            >
              Go
            </button>
          </div>
        </div>
      </form>
      <div>
        {table && (
          <div className=" overflow-scroll py-3">
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              bordered
              className=" text-xs font-normal "
              columns={column}
              dataSource={allData}
              scroll={{
                y: 700,
              }}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSessionNote;

PatientSessionNote.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

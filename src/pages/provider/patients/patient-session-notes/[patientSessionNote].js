import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import PatientLedgerAction from "@/component/UI/Patients/Patients/PatientLedger/PatientLedgerAction";
import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import MultiSelectGlobal from "@/shared/CustomeMultiSelect/MultiselectGlobal";
import { Table } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { FaArrowsAltH } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetAppointmentPOSQuery } from "@/Redux/features/Appointment/appointmentApi";
import axios from "axios";
const PatientSessionNote = () => {
  const patientId = localStorage.getItem("PId");
  
  const token = getAccessToken();
  const [allData,setAllData] = useState([]);
  const [stuffs, setStuffs] = useState();
  const [stuffsId, setStuffsId] = useState([]);
  const [location, setLocation] = useState("");
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      filters: [],
    },
  });
  const { data: posData, isLoading: posDataLoading } =
  useGetAppointmentPOSQuery(token);
//console.log("pos data", posData?.point_of_service);
  const getPatientsData = async (payload) => {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/patient/session-note`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": token || null,
      },
      data : payload
    });
    const data = res?.data?.session_note?.data;
    setAllData(data);
  };

  useEffect(() => {
    var current_date = new Date();
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
   const filterData = {
    patient_id:patientId,    
    /*"report_range": {
      "start_date": convert(prev_date),
      "end_date": convert(current_date)
    }*/
  }
   console.log('filterData',filterData);
    getPatientsData(filterData);
  }, [token]);
  //Provider multi select data from server(Provider=>Staff)
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  useEffect(() => {
    const getProviderData = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/filter/providers`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": token || null,
        },
      });
      const data = res?.data?.provider_data;
      setStuffs(data);
    };
    getProviderData();
  }, [token]);
  const onSubmit = async (data) => {
    console.log(data);
    const from_date = convert(startDate);
    const to_date = convert(endDate);
    const payLoad = {
      patient_id: patientId,
      provider_ids: stuffsId?.length > 0 ? stuffsId : [],
      status: data?.status!='' ? [data?.status] : [],
      pos: location,
      report_range:{start_date:from_date,end_date:to_date}
    };
    console.log("payload", payLoad);    
    getPatientsData(payLoad);
  };

    //console.log('calllogData',calllogData);
  const [table, setTable] = useState(true);


  //!-------------------Date Range Picker
  const refClose = useRef(null);
  const [startD, setStartD] = useState(null);
  const [endD, setEndD] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  var prev_date = new Date();
  prev_date.setDate(prev_date.getDate() - 1);
  const [range, setRange] = useState([
    {
      // startDate: new Date(),
      startDate: prev_date,
      endDate: new Date(),
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
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const column = [
    {
      title: "Service & Hrs.",
      dataIndex: "service_hour",
      key: "service_hour",
      width: 100,
      /*filters: [{}],
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
      },*/
    },
    {
      index: 2,
      title: "Provider",
      dataIndex: "provider_name",
      key: "provider_name",
      width: 100,
      /*filters: [
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
      ellipsis: true,*/
    },
    {
      title: "POS",
      key: "pos",
      dataIndex: "pos",
      width: 80,
      /*filters: [{}],
      filteredValue: filteredInfo.dos || null,
      onFilter: (value, record) => record.dos.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.dos > b.dos ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "dos" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Scheduled Date",
      key: "scheduled_date",
      dataIndex: "scheduled_date",
      width: 120,
    },
    {
      title: "Hours",
      key: "hours",
      dataIndex: "hours",
      width: 120,
      /*filters: [{}],
      filteredValue: filteredInfo.date_billed || null,
      onFilter: (value, record) => record.date_billed.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.date_billed > b.date_billed ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "date_billed" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 100,
      /*filters: [{}],
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
      },*/
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 200,
      /*render: (_, { nt }) => {
        return (
          <div className="px-3">
            <h1 className="text-primary text-sm">
              Direct Service Parent Training Form Session Notes
            </h1>
          </div>
        );
      },*/
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
                allData={stuffs}
                setId={setStuffsId}
                // patientsLoading={patientsLoading}
              />
            </div>
          </div>
          <div>
            <label className="label">
              <span className=" label-font ">Place of Service</span>
            </label>
            <div className="py-[2px]  mt-2">
              <select
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                    {...register("pos")}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="" className="text-black">
                      Select
                    </option>
                    {posData?.point_of_service?.map((p) => {
                      return (
                        <option
                          className="text-black"
                          key={p?.id}
                          value={p?.pos_code}
                        >
                          {p?.pos_name}
                        </option>
                      );
                    })}
                  </select>
            </div>
          </div>
          <div className="sm:w-[240px] w-[200px]">
            <label className="label">
              <span className="label-font ">Status</span>
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
                  className="absolute z-10 md:ml-[-9%] lg:ml-0 xl:ml-0 2xl:ml-[-27%] "
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
          </div>
          <div>
            <label className="label">
              <h1 className="label-font mb-1">
                Locked
              </h1>
            </label>
            <select
              className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
              {...register("is_primary")}
            >
              <option value="">Select Any</option>
              <option value="all">All</option>
              <option value="locked">Locked</option>
              <option value="unlocked">Unlocked</option>
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

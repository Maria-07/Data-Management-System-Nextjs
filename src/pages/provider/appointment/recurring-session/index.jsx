import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Table } from "antd";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { useRecurringGetAllInfosMutation } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";
import { getAccessToken } from "@/Redux/api/apiSlice";
import Link from "next/link";
import Providers from "@/component/UI/Appointment/MultiSelectComponents/Providers";
import Clients from "@/component/UI/Appointment/MultiSelectComponents/Clients";
import RootLayout from "@/component/Layouts/RootLayout";
import { dateConverter } from "@/shared/Dateconverter/DateConverter";

const RecurringSession = () => {
  const token = getAccessToken();
  const [table, setTable] = useState(false);
  const [select, setSelect] = useState("");
  const [sessionData, setSessionData] = useState([]);
  // For Antd table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [fetchQuery, setFetchQuery] = useState(false);
  const [patientId, setPatientId] = useState([]);
  const [providerId, setProviderId] = useState([]);
  const [allProvider, setAllProvider] = useState([]);

  
  const [patientList, setPatientList] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [page, setPage] = useState(1);

  //console.log(patientId, providerId);

  useEffect(() => {
    const getPatientData = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/recurring/filter/patients`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": token || null,
        },
      });
      const data = res?.data?.patient_data;
      
      setPatientList(data);
    };
    getPatientData();
  }, [token]);

  useEffect(() => {
    const getProviderData = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/recurring/filter/providers`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": token || null,
        },
      });
      const data = res?.data?.provider_data;
      let pdata = [];
      for(let x of data)
      {
        pdata.push(x?.id)
      }
      setProviderList(data);
      setAllProvider(pdata);
      setProviderId(pdata);
    };
    getProviderData();
  }, [token]);

 
const getRecurringSessionData = async () => {
  let res = await axios({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/recurring/list`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization": token || null,
    },
    data: {
      sort_by: select === "Patients" ? 2 : select === "Provider" ? 3 : 3,
      patient_ids: patientId,
      provider_ids: providerId,
    },
  });
  const data = res?.data?.recurring_sessions;
  console.log('data --',res?.data);
  setSessionData(data);
};


//console.log('sessionData',sessionData);
 /* const fetchData = async (payload) => {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/recurring/list`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": token || null,
      },
      body: payload,
    });
    
    console.log(response);
  };*/

  //Patient Data get api
  /*const [recurringGetAllInfos, { data: allData, isLoading: dataLoading }] =
    useRecurringGetAllInfosMutation();
console.log(recurringGetAllInfos);*/
  /*useEffect(() => {
      //console.log('allProvider',allProvider);
      recurringGetAllInfos({
        token,
        payload: { sortBy: 2,provider_ids:allProvider},
      });
  }, [token]);*/

  //Get Recurring Session Data
  //get data from API + data fetch from api while scrolling[Important]
 /*useEffect(() => {
    const getRecurringSessionData = async () => {
      let res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/recurring/session/get/all/data`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
        data: {
          sort_by: select === "Patients" ? 2 : select === "Provider" ? 3 : 1,
          patient_ids: patientId,
          provider_ids: providerId,
        },
      });
      const data = res?.data?.recurring_sessions;
      setSessionData(data);
    };
    if (fetchQuery) {
      getRecurringSessionData();
    }
  }, [token, fetchQuery, select, patientId, providerId]);*/
  // console.log("This is satff data of first page", staffData);

  // const fetchProviders = async () => {
  //   let res = await axios({
  //     method: "post",
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/pri/process/claim/get/billing/data`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "x-auth-token": token,
  //     },
  //     data: {
  //       activitytype: selectedSortOptionOne,
  //       payor_id: insuranceSelect,
  //       page: page,
  //       to_date: toDate,
  //     },
  //   });
  //   const data = res?.data?.processClaims?.data;
  //   // console.log(data);
  //   return data;
  // };

  // const fetchData = async () => {
  //   const providersFromServer = await fetchProviders();
  //   //console.log(providersFromServer);
  //   setStaffData([...staffData, ...providersFromServer]);
  //   if (providersFromServer.length === 0) {
  //     setHasMore(false);
  //   }
  //   setPage(page + 1);
  // };
  // console.log("final total staffs", staffData);

  const handleOptionChange = (val) => {
   
    setSelect(val);
    setFetchQuery(false);
    setPatientId([]);
    val == 'all' ? setProviderId(allProvider): setProviderId([]);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  // Table columns
  const columns = [
    {
      title: "Patients",
      dataIndex: "patient_name",
      key: "patient_name",
      width: 120,
      /*sorter: (a, b) => {
        return a.client_name > b.client_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "client_name" ? sortedInfo.order : null,
      render: (_, { client_name }) => {
        return (
          <div className="flex justify-start px-2">
            <button className="text-secondary">{client_name}</button>
          </div>
        );
      },
      ellipsis: false,*/
    },
    {
      title: "Service & Hrs.",
      dataIndex: "service_hour",
      key: "service_hour",
      width: 120,
      // render contains what we want to reflect as our data
      /*render: (_, { activity_name }) => {
        return (
          <div className="flex justify-start px-2">
            <h1 className="text-center">
              {activity_name ? activity_name : "No Data"}
            </h1>
          </div>
        );
      },*/
      // filters: [
      //   { text: "Milissent", value: "Milissent" },
      //   { text: "Timmy", value: "Timmy" },
      //   {
      //     text: `Jamey`,
      //     value: "Jamey",
      //   },
      //   {
      //     text: `Minnie`,
      //     value: "Minnie",
      //   },
      // ],
      // filteredValue: filteredInfo.Service_hrs || null,
      // onFilter: (value, record) => record.Service_hrs.includes(value),
      /*sorter: (a, b) => {
        return a.activity_name > b.activity_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "activity_name" ? sortedInfo.order : null,
      ellipsis: false,*/
    },
    {
      title: "Provider",
      dataIndex: "provider_name",
      key: "provider_name",
      width: 100,
      //   sorter is for sorting asc or dsc purpose
      /*sorter: (a, b) => {
        return a.provider_name > b.provider_name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "provider_name" ? sortedInfo.order : null,
      ellipsis: false,*/
    },
    {
      title: "Pos",
      key: "pos",
      dataIndex: "pos",
      width: 80,
      /*render: (_, { pos }) => {
        //console.log("pos : ", pos);
        return (
          <>
            {pos === "telehealth" ? (
              <div className=" flex items-center justify-center">
                <div className="flex mx-auto items-center gap-2 ">
                  Telehealth
                  <BsFillCameraVideoFill className="text-green-500" />
                </div>
              </div>
            ) : (
              <div>{pos}</div>
            )}
          </>
        );
      },
      filters: [
        {
          text: "telehealth",
          value: "telehealth",
        },
        {
          text: "School",
          value: "School",
        },
        {
          text: "Office",
          value: "office",
        },
      ],
      filteredValue: filteredInfo.pos || null,
      onFilter: (value, record) => record.pos.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.pos > b.pos ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "pos" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      width: 80,
      /*render: (_, { schedule_date_start }) => {
        return (
          <div className="flex justify-start px-2">
            <h1>
              {schedule_date_start
                ? dateConverter(schedule_date_start)
                : "No Data"}
            </h1>
          </div>
        );
      },
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.schedule_date_start > b.schedule_date_start ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "schedule_date_start"
          ? sortedInfo.order
          : null,
      ellipsis: true,*/
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: 80,
      /*render: (_, { schedule_date_end }) => {
        return (
          <div className="flex justify-start px-2">
            <h1>
              {schedule_date_end ? dateConverter(schedule_date_end) : "No Data"}
            </h1>
          </div>
        );
      },
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.schedule_date_end > b.schedule_date_end ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "schedule_date_end" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
      width: 100,
      /*filters: [
        {
          text: `9:57 PM`,
          value: "9:57 PM",
        },
        {
          text: "3:01 PM",
          value: "3:01 PM",
        },
      ],
      filteredValue: filteredInfo.Hours || null,
      onFilter: (value, record) => {
        return record.Hours.includes(value);
      },
      sorter: (a, b) => {
        return a.Hours > b.Hours ? -1 : 1;
        // a.Hours - b.Hours,
      },
      sortOrder: sortedInfo.columnKey === "Hours" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_, { session_id }) => (
        <div className="flex justify-center">
          <Link href={`/provider/appointment/recurring-session/edit/${session_id}`}>
            <BiEdit className="text-[#34A6B7] text-lg" />
          </Link>
        </div>
      ),
    },
  ];

  const clearFilters = () => {
    setFilteredInfo({});
  };
  // -----------------------------------------------form-------------------------------
  const { handleSubmit } = useForm({
    defaultValues: {
      filters: [],
    },
  });
  const onSubmit = (data) => {
    console.log('submittedData',data);
    setFetchQuery(true);
    setTable(true);
    getRecurringSessionData();
  };

  //test design
  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    setClicked(true);
  };
  const handleClose = () => {
    setClicked(!clicked);
  };

  // console.log(selectedFlatRows);

  return (
    <div className={!table ? "h-[100vh]" : ""}>
      <div className="cursor-pointer">
        <div className="bg-gradient-to-r from-secondary to-primary rounded-lg px-4 py-2">
          <div
            onClick={clickHandler}
            className="  flex items-center justify-between"
          >
            {!clicked && (
              <>
                <div className="text-[14px]  text-white font-semibold ">
                  Recurring Session
                </div>
                <lord-icon
                  src="https://cdn.lordicon.com/rxufjlal.json"
                  trigger="loop"
                  style={{ height: "25px" }}
                  colors="primary:#fff"
                  state="hover-1"
                  // style="width:250px;height:250px"
                ></lord-icon>
              </>
            )}
          </div>
          {/* Upper div */}
          {clicked && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[16px]  text-white font-semibold ">
                  Recurring Session
                </h1>
                <div className="  flex justify-end gap-3">
                  <div>
                    <button
                      onClick={handleClose}
                      className="text-white text-2xl font-light"
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex sm:flex-wrap gap-4">
                  {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 my-5 mr-2 gap-x-3"> */}
                  <div className="sm:w-[140px] w-[100px]">
                    <label className="label">
                      <span className="label-text text-[14px] text-gray-100 text-left">
                        Select Any
                      </span>
                    </label>
                    <div>
                      <select
                        className=" bg-transparent border-b-[2px] border-[#ffffff] text-white py-[4px]  font-medium  text-[14px] w-full focus:outline-none"
                        onChange={(e) => handleOptionChange(e.target.value)}
                      >
                        <option value="all" className="text-black">
                          All
                        </option>
                        <option value="Patients" className="text-black">
                          Patients
                        </option>
                        <option value="Provider" className="text-black">
                          Provider
                        </option>
                      </select>
                    </div>
                  </div>
                  {select === "Patients" ? (
                    <div>
                      <label className="label">
                        <div className="label-text mb-[8px] text-[14px] text-gray-100 text-left">
                          Patient
                        </div>
                      </label>
                      <Clients
                        patients={patientList}
                        setPatientId={setPatientId}
                        setFetchQuery={setFetchQuery}
                      ></Clients>
                    </div>
                  ) : select === "Provider" ? (
                    <div className="">
                      <label className="label">
                        <div className="label-text mb-[8px] text-[14px] text-gray-100 text-left">
                          Provider
                        </div>
                      </label>
                      <Providers
                        stuffs={providerList}
                        setStuffsId={setProviderId}
                        setFetchQuery={setFetchQuery}
                      ></Providers>
                    </div>
                  ) : (
                    <></>
                  )}
                  <button className=" mb-3 mt-[29px] dtm-button" type="submit">
                    Go
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* table  */}
      {table && (
        <div className="my-3">
          <div className="flex items-center justify-between gap-2 my-2">
            <h1 className="text-lg text-orange-500 text-left font-semibold ">
              Recurring Session
            </h1>
          </div>
          <div className="overflow-scroll">
            <Table
              rowKey="id"
              pagination={false}
              bordered
              size="small"
              className=" text-xs font-normal"
              columns={columns}
              dataSource={sessionData}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringSession;

RecurringSession.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

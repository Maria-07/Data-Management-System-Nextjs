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

  console.log(patientId, providerId);
  //Patient Data get api
  const [recurringGetAllInfos, { data: allData, isLoading: dataLoading }] =
    useRecurringGetAllInfosMutation();

  useEffect(() => {
    if (select === "Patients") {
      recurringGetAllInfos({
        url: "inadmin/recurring/session/get/all/info",
        token,
        payload: { sortBy: 2 },
      });
    }
    if (select === "Provider") {
      recurringGetAllInfos({
        url: "inadmin/recurring/session/get/all/info",
        token,
        payload: { sortBy: 3 },
      });
    }
  }, [select, token, recurringGetAllInfos]);

  //Get Recurring Session Data
  //get data from API + data fetch from api while scrolling[Important]
  useEffect(() => {
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
  }, [token, fetchQuery, select, patientId, providerId]);
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
    setProviderId([]);
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
      dataIndex: "client_name",
      key: "client_name",
      width: 120,
      sorter: (a, b) => {
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
      ellipsis: false,
    },
    {
      title: "Service & Hrs.",
      dataIndex: "activity_name",
      key: "activity_name",
      width: 120,
      // render contains what we want to reflect as our data
      render: (_, { activity_name }) => {
        return (
          <div className="flex justify-start px-2">
            <h1 className="text-center">
              {activity_name ? activity_name : "No Data"}
            </h1>
          </div>
        );
      },
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
      sorter: (a, b) => {
        return a.activity_name > b.activity_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "activity_name" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Provider",
      dataIndex: "provider_name",
      key: "provider_name",
      width: 100,
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.provider_name > b.provider_name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "provider_name" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Pos",
      key: "pos",
      dataIndex: "pos",
      width: 80,
      render: (_, { pos }) => {
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
      ellipsis: true,
    },
    {
      title: "Start Date",
      dataIndex: "schedule_date_start",
      key: "schedule_date_start",
      width: 80,
      render: (_, { schedule_date_start }) => {
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
      ellipsis: true,
    },
    {
      title: "End Date",
      dataIndex: "schedule_date_end",
      key: "schedule_date_end",
      width: 80,
      render: (_, { schedule_date_end }) => {
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
      ellipsis: true,
    },
    {
      title: "Hours",
      dataIndex: "Hours",
      key: "Hours",
      width: 100,
      filters: [
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
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_, { id }) => (
        <div className="flex justify-center">
          <Link href={`/provider/appointment/recurring-session/edit/${id}`}>
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
  const onSubmit = () => {
    setFetchQuery(true);
    setTable(true);
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
                        patients={allData?.allClients}
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
                        stuffs={allData?.allEmployees}
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
            <button
              onClick={clearFilters}
              className="px-2 py-2 bg-white from-primary text-xs  hover:to-secondary text-secondary border border-secondary rounded-sm flex items-center"
            >
              Clear Filters
            </button>
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

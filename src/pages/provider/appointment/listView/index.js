/* eslint-disable react-hooks/rules-of-hooks */
// import { getAccessToken } from "@/Redux/api/apiSlice";
// import { useGetAppointmentPOSQuery } from "@/Redux/features/Appointment/appointmentApi";
// import RootLayout from "@/component/Layouts/RootLayout";
// import Clients from "@/component/UI/Appointment/MultiSelectComponents/Clients";
// import Providers from "@/component/UI/Appointment/MultiSelectComponents/Providers";
// import SessionCard from "@/component/UI/Patients/Patients/CinicalData/SessionsCard";
// import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetAppointmentPOSQuery } from "@/Redux/features/Appointment/appointmentApi";
import { useAppointmentInfoQuery } from "@/Redux/features/Appointment/appointmentApi";
import RootLayout from "@/component/Layouts/RootLayout";
import Clients from "@/component/UI/Appointment/MultiSelectComponents/Clients";
import Providers from "@/component/UI/Appointment/MultiSelectComponents/Providers";
import CardShimmer from "@/component/UI/Layouts/Shimmer/CardShimmer";
import SessionCard from "@/component/UI/Patients/Patients/CinicalData/SessionsCard";
import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import { Dropdown, Switch } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { DownOutlined } from "@ant-design/icons";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowsAltH, FaFilter } from "react-icons/fa";
import ListViewTable from "@/component/UI/Appointment/Schedule/ListView/Tables/ListViewTable";

const listViewPage = () => {
  const token = getAccessToken();
  const [billable, setBillable] = useState("billable");
  const [table, setTable] = useState(false);
  const [TData, setTData] = useState([]);
  const [listView, setListView] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [patients, setPatients] = useState();
  const [stuffs, setStuffs] = useState();
  const [patientId, setPatientId] = useState();
  const [stuffsId, setStuffsId] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [responseError, setResponseError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [statusName, setStatusName] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [items, setItems] = useState([]);
  const [check, setCheck] = useState(false);
  const [sessionlist, setSessionlist] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [paginateActive, setPaginateActive] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [type, setType] = useState("Card View");
  const [filter, setFilter] = useState(true);
  const [cssType, setCssType] = useState(false);

  // For Non-Billable Manage Sessions
  const [nonBillablePage, setNonBillablePage] = useState(1);
  const [nonBillableTotalPage, setNonBillableTotalPage] = useState(0);
  const [nonBillableListLoading, setNonBillableListLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [procceed, setprocceed] = useState(false);
  const [nonBillableData, setNonBillableData] = useState([]);
  const [hide, setHide] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [message, setMessage] = useState(null);

  const Layouts = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  useEffect(() => {
    const getPatientsData = async () => {
      /*const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/manage/session/get/all/client`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token || null,
        },
      });
      const data = res?.data;*/
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/filter/patients`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token || null,
        },
      });
      const data = res?.data?.patient_data;
      setPatients(data);
    };
    getPatientsData();
  }, [token]);

  //Provider multi select data from server(Provider=>Staff)
  useEffect(() => {
    const getProviderData = async () => {
      /*const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/manage/session/get/all/provider`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token || null,
        },
      });
      const data = res?.data;*/

      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/filter/providers`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token || null,
        },
      });
      const data = res?.data?.provider_data;
      setStuffs(data);
    };
    getProviderData();
  }, [token]);

  // console.log("selected stuffs", stuffsId);

  // is fixed toggle
  const isToggled = useSelector((state) => state.sideBarInfo);

  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    setClicked(true);
  };

  const handleClose = () => {
    setClicked(!clicked);
    // setTable(false);
    setprocceed(false); //Non-billable Session Table Will be closed
    setNonBillableData([]); //Non-billable Session Table Data will be empty when close button clicked
  };

  const handleBillable = (e) => {
    setBillable(!billable);
    //billable Session Table Will be closed and setItems is empty when toggle goes to billable to non-billable
    setTable(false);
    setItems([]);

    //Non-billable Session Table Will be closed and
    setprocceed(false);
    setNonBillableData([]);
    setNonBillablePage(1);
  };

  const handleListView = () => {
    setListView(!listView);
    //To Closed the Non-billable Session List view
    // setprocceed(!procceed);
    setHide(!hide);
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

  //Date converter function [yy-mm-dd]
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  //Date Range Picker
  var prev_date = new Date();
  prev_date.setDate(prev_date.getDate() - 1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState([
    {
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

  //End Date Range Picker

  //Appointment Pos get API
  const { data: posData, isLoading: posDataLoading } =
    useGetAppointmentPOSQuery(token);
  //console.log("pos data", posData?.point_of_service);

  const [formData, setFromData] = useState([]);
  useEffect(() => {
    var current_date = new Date();
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    const apppointmentFilter = {
      page: 1,
      report_range: {
        start_date: convert(prev_date),
        end_date: convert(current_date),
      },
    };
    setFromData(apppointmentFilter);
    //getAppointmentData(apppointmentFilter);
  }, [token]);
  const getAppointmentData = async () => {
    setMessage("");
    const from_date = convert(startDate);
    const to_date = convert(endDate);
    const payload = {
      patient_ids: patientId,
      provider_ids: stuffsId?.length > 0 ? stuffsId : "",
      status: statusName,
      ses_pos: location,
      ses_app_type: 1,
      page: page,
      report_range: { start_date: from_date, end_date: to_date },
    };
    // console.log("payload -- ", payload);
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointments/list`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token || null,
      },
      data: payload,
    });
    const result = res?.data?.appointments;
    if (result.total == 0) {
      setMessage("No Results Found");
    }
    if (result?.data?.length > 0) {
      setAppointmentData([...appointmentData, ...result?.data]);
      setPage(page + 1);
      if (result?.data?.length < result.per_page) {
        setHasMore(false);
      }
    } else {
      setHasMore(false); // No more data to load
    }
    //setAppointmentData(data);
  };
  // -----------------------------------------------Form-------------------------------
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      filters: [],
    },
  });

  const onSubmit = async (data) => {
    setCheck(true);
    setFilteredInfo({}); //When Go btn is pressed
    setAppointmentData([]);
    setPage(1);
    setFromData({});
    setHasMore(true);
    // console.log("form-data", data);
    //const from_date = convert(data?.start_date);
    //const to_date = convert(data?.end_date);
    const from_date = convert(startDate);
    const to_date = convert(endDate);
    const payLoad = {
      patient_ids: patientId,
      provider_ids: stuffsId?.length > 0 ? stuffsId : "",
      status: statusName,
      ses_pos: location,
      ses_app_type: 1,
      page: 1,
      report_range: { start_date: from_date, end_date: to_date },
    };
    //console.log("payload", payLoad);
    setFromData(payLoad);
    //getAppointmentData(payLoad);
    /*if (payLoad?.to_date === "NaN-aN-aN") {
      toast.error(<h1 className="font-bold">Select Valid Date-Range</h1>, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
      });
    } else {
      setFromData(payLoad);
      setPage(1);
    }*/
    //handlePageClick({ selected: 0 });
  };
  useEffect(() => {
    getAppointmentData();
  }, [formData]);

  return (
    <div>
      {
        <div className="cursor-pointer lg:hidden">
          <div className="bg-gradient-to-r from-secondary to-primary rounded-lg px-4 py-2">
            <div
              onClick={clickHandler}
              className="flex items-center justify-between "
            >
              {!clicked && (
                <>
                  <div className="text-[14px]  text-white font-semibold ">
                    Manage Sessions
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
                <div className="flex justify-between items-center flex-wrap">
                  <h1 className="text-[16px] text-white font-semibold ">
                    Manage Sessions
                  </h1>
                  <div>
                    <button
                      onClick={handleClose}
                      className="text-white text-2xl font-light"
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                </div>
                <div className="flex items-center sm:justify-end sm:my-0 my-2 flex-wrap gap-2">
                  <div>
                    <Switch
                      color="default"
                      defaultChecked
                      size="small"
                      // onClick={handleBillable}
                    />

                    <label
                      className="form-check-label inline-block ml-2 text-[14px] text-gray-100"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      {billable ? "Billable" : "Non-Billable"}
                    </label>
                  </div>
                  {/* List view or table view  */}

                  <div
                    className={
                      listView ? "flex justify-end " : "flex justify-end "
                    }
                  >
                    {/* <div>
                    <Switch
                      color="default"
                      defaultChecked
                      size="small"
                      onClick={handleListView}  
                    />

                    <label
                      className="form-check-label inline-block ml-2 text-base text-gray-100"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      {listView ? (
                        <span className="">List View</span>
                      ) : (
                        "Card View"
                      )}
                    </label>
                  </div> */}
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                  <div className=" flex item-center  flex-wrap gap-3 ">
                    {/* <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 2xl:grid-cols-8 gap-2 mb-2"> */}

                    {billable ? (
                      <>
                        <div>
                          <h1 className="label pb-1">
                            <span className="label-text  text-[14px] text-gray-100 text-left">
                              Clients
                            </span>
                          </h1>

                          <Clients
                            theme={true}
                            patients={patients}
                            setPatientId={setPatientId}
                          ></Clients>
                        </div>
                        <div className="">
                          <h1 className="pb-1">
                            <span className="label-text mb-[2px] text-[14px] text-gray-100 text-left">
                              Provider
                            </span>
                          </h1>

                          <Providers
                            theme={true}
                            stuffs={stuffs}
                            setStuffsId={setStuffsId}
                          ></Providers>
                        </div>
                        <div className="sm:w-[240px] w-[200px]">
                          <label className="label">
                            <span className="label-text text-[14px] text-gray-100 text-left">
                              Place of Services
                            </span>
                          </label>
                          <div>
                            <select
                              className=" bg-transparent border-b-[2px] border-[#ffffff] text-white py-[4px]  px-1  font-medium  text-[14px] w-full focus:outline-none"
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
                        <div className="w-[200px]">
                          <label className="label">
                            <span className="label-text  text-[14px] text-gray-100 text-left">
                              Selected date
                            </span>
                          </label>
                          {/* Date Range calender will be set here */}
                          <div className="">
                            <div
                              onClick={() => setOpenCalendar(true)}
                              className="flex  justify-center items-center border-b-[2px] border-[#ffffff] px-1 py-[3px] text-[14px] w-full"
                            >
                              <input
                                value={
                                  startDate
                                    ? `${startMonth} ${startDay}, ${startYear}`
                                    : "Start Date"
                                }
                                readOnly
                                className="focus:outline-none py-[1px] font-medium text-center bg-transparent text-white w-2/5 cursor-pointer"
                                {...register("start_date")}
                              />
                              <RiArrowLeftRightLine className="w-1/5 text-white"></RiArrowLeftRightLine>

                              <input
                                value={
                                  endDate
                                    ? `${endMonth} ${endDay}, ${endYear}`
                                    : "End Date"
                                }
                                readOnly
                                className="focus:outline-none font-medium text-center bg-transparent text-white w-2/5 cursor-pointer"
                                {...register("end_date")}
                              />
                            </div>
                          </div>
                          {/* Multi date picker component called */}
                          <div>
                            <div
                              ref={refClose}
                              // className="absolute z-10 2xl:ml-[0%] xl:ml-[0%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] sm:mr-[14%] mt-1 "
                              className={
                                !isToggled
                                  ? "absolute z-10 2xl:ml-[0%] xl:ml-[-17%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] ml-[-4%] mr-[8%] mt-1 "
                                  : "absolute z-10 2xl:ml-[0%] xl:ml-[-45%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] ml-[-4%] mr-[8%] mt-1  "
                              }
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
                        <div className="flex gap-5 w-[200px]">
                          <div>
                            <label className="label">
                              <span className="label-text text-[14px] text-gray-100 text-left">
                                status
                              </span>
                            </label>
                            <div>
                              <select
                                className="bg-transparent border-b-[2px] border-[#ffffff] px-1 py-[4px] font-medium text-white  text-[14px] w-full focus:outline-none"
                                {...register("status")}
                                onChange={(e) => setStatusName(e.target.value)}
                              >
                                <option value="" className="text-black">
                                  Select
                                </option>
                                <option
                                  value="Scheduled"
                                  className="text-black"
                                >
                                  Scheduled
                                </option>
                                <option className="text-black" value="No Show">
                                  No Show
                                </option>
                                <option className="text-black" value="Hold">
                                  Hold
                                </option>
                                <option
                                  className="text-black"
                                  value="Cancelled by Client"
                                >
                                  Cancelled by Client
                                </option>
                                <option
                                  className="text-black"
                                  value="CC more than 24 hrs"
                                >
                                  CC more than 24 hrs
                                </option>
                                <option
                                  className="text-black"
                                  value="CC less than 24 hrs"
                                >
                                  CC less than 24 hrs
                                </option>
                                <option
                                  className="text-black"
                                  value="Cancelled by Provider"
                                >
                                  Cancelled by Provider
                                </option>
                                <option className="text-black" value="Rendered">
                                  Rendered
                                </option>
                              </select>
                            </div>
                          </div>
                          <button
                            className=" mb-3 mt-[27px] sm:w-1/4 dtm-button"
                            type="submit"
                          >
                            Go
                          </button>
                        </div>
                      </>
                    ) : (
                      // Non billable session component called
                      // <NonBillableSession
                      //   stuffs={stuffs}
                      //   stuffsId={stuffsId}
                      //   setStuffsId={setStuffsId}
                      // ></NonBillableSession>
                      <div className="flex flex-wrap">
                        <div className="mr-2">
                          <label className="label">
                            <span className="label-text text-[14px] text-gray-100 text-left">
                              Provider
                            </span>
                          </label>

                          <Providers
                            stuffs={stuffs}
                            setStuffsId={setStuffsId}
                          ></Providers>
                        </div>
                        <button
                          className=" pms-white-button"
                          onClick={nonBillableSessionHandler}
                        >
                          Go
                        </button>
                      </div>
                    )}
                    {table && (
                      <>
                        {/*

                      <button
                          onClick={clearFilters}
                          className="2xl:mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mt-[35px] xl:mt-[0px] py-2 px-1  bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm" ````>
                          Clear filters
                        </button> 
                      */}
                      </>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      }
      {/* <div className="h-[40%] mx-auto w-[100%] lg:w-[80%]">
        <div className="overflow-y-scroll">
          <InfiniteScroll
            dataLength={appointmentData.length} //items is basically all data here
            next={appointmentData.length > 0 && getAppointmentData} //This condition is mendatory for perfectly working with infinite scrolling
            hasMore={hasMore}
            loader={<CardShimmer></CardShimmer>}
          >
            {appointmentData.map((p, i) => {
              return (
                <SessionCard key={i} appointment={p}>
                  {" "}
                </SessionCard>
              );
            })}
          </InfiniteScroll>
        </div>
      </div> */}

      {/* Card view in large device  */}
      <div className="mt-3 lg:visible hidden lg:block ">
        <div className="w-full border py-[2px] rounded-t-md px-2">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-semibold">Manage Session</h1>{" "}
            <div className="flex items-center justify-end gap-2">
              <Dropdown
                dropdownRender={() => (
                  <>
                    <div className="w-[180px] mt-1">
                      <div className="bg-white border shadow-md rounded-md p-1">
                        <button
                          onClick={() => {
                            setType("Card View");
                          }}
                          className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-green-200 text-center  border rounded-md font-semibold"
                        >
                          Card View
                        </button>
                        <br />
                        <button
                          onClick={() => {
                            setType("List View");
                          }}
                          className="px-3 py-1 w-full hover:bg-gray-400 hover:text-white transition-all bg-sky-200 text-center my-[2px] border rounded-md font-semibold"
                        >
                          List View
                        </button>
                        <br />
                      </div>
                    </div>
                  </>
                )}
                placement="bottom"
                arrow
                trigger={["click"]}
              >
                {/* <IoMdNotificationsOutline className="hover:text-primary" />/ */}
                <div className="my-3 text-sm flex items-center gap-2">
                  <span className="text-gray-500">Layout : </span>{" "}
                  <button className="text-black font-semibold flex items-center gap-2">
                    {type} <IoIosArrowDown />
                  </button>
                </div>
              </Dropdown>
              <div
                onClick={() => {
                  setFilter(!filter);
                  setCssType(!cssType);
                }}
                className="border p-1 shadow-md bg-gray-50 rounded-md"
              >
                <FaFilter />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 ">
        <div
          className={
            filter
              ? `col-span-4 bg-gray-100 border overflow-y-scroll my-5 h-[100vh]`
              : `col-span-5  mx-auto my-5 ${
                  type === "Card View" ? `w-[100%] lg:w-[80%]` : `w-[100%] `
                }`
          }
        >
          {type === "Card View" ? (
            <div className=" p-2  ">
              <div className="overflow-y-scroll">
                <InfiniteScroll
                  dataLength={appointmentData.length} //items is basically all data here
                  next={appointmentData.length > 0 && getAppointmentData} //This condition is mendatory for perfectly working with infinite scrolling
                  hasMore={hasMore}
                  loader={<CardShimmer></CardShimmer>}
                >
                  {appointmentData.map((p, i) => {
                    return (
                      <SessionCard key={i} appointment={p}>
                        {" "}
                      </SessionCard>
                    );
                  })}
                </InfiniteScroll>
              </div>
            </div>
          ) : (
            <>
              <ListViewTable></ListViewTable>
            </>
          )}
        </div>
        {filter && (
          <div className="border p-3 bg-gray-50 ">
            <h1 className="font-semibold text-sm ">Filters</h1>
            <div>
              {" "}
              <form onSubmit={handleSubmit(onSubmit)} className="relative">
                <div className="gap-3 ">
                  {/* <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 2xl:grid-cols-8 gap-2 mb-2"> */}

                  {billable ? (
                    <>
                      <div className="w-[100%] my-4">
                        <label className="label">
                          <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                            Selected date
                          </span>
                        </label>
                        <div className="ml-1">
                          <div className="flex flex-wrap justify-between items-center text-gray-600 input-border-bottom rounded-sm px-1  w-full">
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
                            className="absolute z-10 md:ml-[-50%] lg:ml-0 xl:ml-[-150%] 2xl:mr-[-170%]"
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
                      <div className="mb-4">
                        <h1 className="label pb-1">
                          <span className="label-font">Clients</span>
                        </h1>

                        <Clients
                          theme={cssType}
                          patients={patients}
                          setPatientId={setPatientId}
                        ></Clients>
                      </div>
                      <div className="mb-4">
                        <h1 className="pb-1">
                          <span className="label-font">Provider</span>
                        </h1>

                        <Providers
                          stuffs={stuffs}
                          setStuffsId={setStuffsId}
                        ></Providers>
                      </div>
                      <div className=" mb-4">
                        <label className="label">
                          <span className="label-font">Place of Services</span>
                        </label>
                        <div>
                          <select
                            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
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

                      {/* <div className="w-[200px]">
                        <label className="label">
                          <span className="label-font">Selected date</span>
                        </label>
                        {/* Date Range calender will be set here
                        <div className="">
                          <div
                            onClick={() => setOpenCalendar(true)}
                            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                          >
                            <input
                              value={
                                startDate
                                  ? `${startMonth} ${startDay}, ${startYear}`
                                  : "Start Date"
                              }
                              readOnly
                              className="focus:outline-none py-[1px] font-medium text-center bg-transparent text-white w-2/5 cursor-pointer"
                              {...register("start_date")}
                            />
                            <RiArrowLeftRightLine className="w-1/5 text-white"></RiArrowLeftRightLine>

                            <input
                              value={
                                endDate
                                  ? `${endMonth} ${endDay}, ${endYear}`
                                  : "End Date"
                              }
                              readOnly
                              className="focus:outline-none font-medium text-center bg-transparent text-white w-2/5 cursor-pointer"
                              {...register("end_date")}
                            />
                          </div>
                        </div>
                        {/* Multi date picker component called 
                        <div>
                          <div
                            ref={refClose}
                            // className="absolute z-10 2xl:ml-[0%] xl:ml-[0%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] sm:mr-[14%] mt-1 "
                            className={
                              !isToggled
                                ? "absolute z-10 2xl:ml-[0%] xl:ml-[-17%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] ml-[-4%] mr-[8%] mt-1 "
                                : "absolute z-10 2xl:ml-[0%] xl:ml-[-45%] lg:ml-[0%] md:ml-[0%] md:mr-[5%] ml-[-4%] mr-[8%] mt-1  "
                            }
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
                      </div> */}
                      <div className="w-[100%] mb-4">
                        <div>
                          <label className="label">
                            <span className="label-font">status</span>
                          </label>
                          <div>
                            <select
                              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                              {...register("status")}
                              onChange={(e) => setStatusName(e.target.value)}
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
                              <option
                                className="text-black"
                                value="Cancelled by Client"
                              >
                                Cancelled by Client
                              </option>
                              <option
                                className="text-black"
                                value="CC more than 24 hrs"
                              >
                                CC more than 24 hrs
                              </option>
                              <option
                                className="text-black"
                                value="CC less than 24 hrs"
                              >
                                CC less than 24 hrs
                              </option>
                              <option
                                className="text-black"
                                value="Cancelled by Provider"
                              >
                                Cancelled by Provider
                              </option>
                              <option className="text-black" value="Rendered">
                                Rendered
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        className=" mb-3 mt-[27px] sm:w-1/4 dtm-button"
                        type="submit"
                      >
                        Go
                      </button>
                    </>
                  ) : (
                    // Non billable session component called
                    // <NonBillableSession
                    //   stuffs={stuffs}
                    //   stuffsId={stuffsId}
                    //   setStuffsId={setStuffsId}
                    // ></NonBillableSession>
                    <div className="flex flex-wrap">
                      <div className="mr-2">
                        <label className="label">
                          <span className="label-text text-[14px] text-gray-100 text-left">
                            Provider
                          </span>
                        </label>

                        <Providers
                          stuffs={stuffs}
                          setStuffsId={setStuffsId}
                        ></Providers>
                      </div>
                      <button
                        className=" pms-white-button"
                        onClick={nonBillableSessionHandler}
                      >
                        Go
                      </button>
                    </div>
                  )}
                  {table && (
                    <>
                      {/*

                      <button
                          onClick={clearFilters}
                          className="2xl:mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mt-[35px] xl:mt-[0px] py-2 px-1  bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm" ````>
                          Clear filters
                        </button> 
                      */}
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <h4 className="text-center">{message}</h4>
    </div>
  );
};

export default listViewPage;

listViewPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { Divider, Input, Tabs } from "antd";
import RecurringSessionModal from "@/component/UI/Appointment/RecurringSession/RecurringSessionModal";
import Link from "next/link";
import RootLayout from "@/component/Layouts/RootLayout";
import DayView from "@/component/UI/Appointment/RecurringSession/RecurringSessionEdit/DayView";
import SingleView from "@/component/UI/Appointment/RecurringSession/RecurringSessionEdit/SingleView";
import { useTheme } from "next-themes";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useRouter } from "next/router";
import axios from "axios";
import MultiSelectEdit from "@/shared/CustomeMultiSelect/MultiselectEdit";
import { useGetProvidersListQuery, useGetStatusListQuery } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";

const TextArea = Input;

const RecurringSessionEdit = () => {
  //! Theme system
  const token = getAccessToken();
  const router = useRouter();
  const { query } = router;
  const id = query.edit;

  const { theme } = useTheme();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sessionData,setSessionData] = useState([]);
  const [allData,setAllData] = useState([]);
  const [stuffs, setStuffs] = useState();
  const [stuffsId, setStuffsId] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const { data: providerData, isLoading: providerDataLoading } =
  useGetProvidersListQuery({token});

  const { data: statusData, isLoading: statusDataLoading } =
  useGetStatusListQuery({token});

  const handleClickOpen = () => {
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    const getSessionData = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/recurring/details/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": token || null,
        },
      });
      const data = res?.data;
      setSessionData(data);
      setStuffs(data?.services)

      let serviesList = [];
      for (let x of data?.services) {
        serviesList[x?.id] =  {label: x?.name, value: x?.name, id: x?.id}
      }
      
      let selectedServiceList = []
      data?.selected_activities?.map((p)=>{
        selectedServiceList.push(serviesList[p]);
      })
      setSelectedService(selectedServiceList);
      console.log(selectedServiceList);
    };
    if(id>0)
    {
      getSessionData();
    }
  }, [id]);


  const convertTime12to24 = (time12h) => {  
    if(typeof time12h !== 'undefined') {
        let [times, modifier] = time12h.split(' ');  
        let [hours, minutes] = times.split(':'); 
        if (hours === '12') {
          hours = '00';
        }  
        if (modifier === 'PM' || modifier === 'pm') {
          hours = parseInt(hours, 10) + 12;
        }  
        return `${hours}:${minutes}:00`;    
      }
    return null;
  }
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  //console.log(errors);
  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        client_id:sessionData?.client_details?.id,
        Auth:sessionData?.session_data?.authorization_id,
        Provider_name:sessionData?.session_data?.provider_id,
        location:sessionData?.session_data?.location,
        from_time:convertTime12to24(sessionData?.session_data?.from_time),
        to_time:convertTime12to24(sessionData?.session_data?.to_time),
        status:sessionData?.session_data?.status,
        notes:sessionData?.session_data?.notes
      })
    })
  },[sessionData,reset])
  const tabItems = [
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Day View{" "}
          <span className="bg-orange-400 text-white text-[10px] px-2 py-1 rounded-lg">
            View - 1
          </span>
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <DayView token={token} id={id}></DayView>
        </div>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Single View{" "}
          <span className="bg-orange-400 text-white text-[10px] px-2 py-1 rounded-lg">
            View - 2
          </span>
        </h1>
      ),
      key: 2,
      children: <SingleView token={token} id={id}></SingleView>,
    },
  ];
  return (
    <div className="sm:min-h-[100vh]">
      <div className="flex items-start flex-wrap gap-2 justify-between">
        <h1 className="text-base text-cyan-700 font-semibold">
          Edit Recurring Session
        </h1>

        <Link href={"/provider/appointment/recurring-session"} className=" ">
          <button className="dtm-button flex items-center">
            <IoCaretBackCircleOutline className="mr-1 text-sm" /> Back{" "}
          </button>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-2"
        style={{
          transition: "all .3s ease-out",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 my-3 mr-2 gap-6">
            {/* name  */}
            <div>
              <label className="label">
                <span className=" label-font">Patient Name</span>
              </label>
              <select
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                {...register("client_id")}
              >
                <option value={sessionData?.client_details?.id}>{sessionData?.client_details?.client_full_name}</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Auth</span>
              </label>
              <select
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                    {...register("Auth")}
                  >
              <option value=""></option>
              {sessionData?.authorizations?.map((p) => {
                  return(
                    <option value={p.id} key={p.id}>{p.name}</option>
                  )
              })}
            </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Service</span>
              </label>
                <div className="py-[2px]  mt-2">
                  <MultiSelectEdit
                    allData={stuffs}
                    setId={setStuffsId}
                    selectedService={selectedService}
                  />
                </div>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Provider Name</span>
              </label>
              <select
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                {...register("Provider_name")}
              >
              <option value=""></option>
              {providerData?.provider_data?.map((p) => {
                  return(
                    <option value={p.id} key={p.id}>{p.name}</option>
                  )
              })}
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">POS</span>
              </label>
              <select
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                {...register("location")}
              >
              <option value=""></option>
              <option value="03">School (03)</option>
              <option value="11" selected="">Office (11)</option>
              <option value="12">Home (12)</option>
              <option value="99">Others (99)</option>
              <option value="02">Telehealth (02)</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className=" label-font">From Date</span>
              </label>
              <input
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                type="date"
                defaultValue={sessionData?.start_date}
                {...register("from_Date")}
                readOnly
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">To Date</span>
              </label>
              <input
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                type="date"
                defaultValue={sessionData?.end_date}
                {...register("To_Date")}
                readOnly
              />
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className=" label-font">From Time</span>
                </label>
                <input
                  className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                  type="time"
                  {...register("from_time")}
                />
              </div>
              <div>
                <label className="label">
                  <span className=" label-font">To Time</span>
                </label>
                <input
                  className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                  type="time"
                  {...register("to_time")}
                />
              </div>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Status</span>
              </label>
              <select
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 mt-1  w-full focus:outline-none"
                {...register("status")}
              >
              <option value=""></option>
              {statusData?.status_list?.map((p) => {
                  return(
                    <option value={p} key={p}>{p}</option>
                  )
              })}
              </select>
            </div>
            {/* <div></div> */}
            <div className="md:col-span-2">
              <label className="label">
                <span className=" label-font">Office Notes</span>
              </label>
              <div className="">
              <textarea
                className="input-border input-font py-[1px] w-full focus:outline-none"
                {...register("notes")}
                rows={4}
                cols={40}
              />
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <Divider></Divider>
          {/* submit  */}
          <div className="mt-10">
            <button
              onClick={handleClickOpen}
              className=" dtm-button mr-2"
              type="submit"
            >
              Save
            </button>
            <Link href={"/provider/appointment/recurring-session"}>
              <button className="dcm-close-button" autoFocus onClick={reset}>
                CANCEL
              </button>
            </Link>
          </div>
        </form>
      </motion.div>

      <div className="my-10">
        <Tabs type="card" items={tabItems} />
      </div>
      {openEditModal && (
        <RecurringSessionModal
          handleClose={handleClose}
          open={openEditModal}
        ></RecurringSessionModal>
      )}
    </div>
  );
};

export default RecurringSessionEdit;

RecurringSessionEdit.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

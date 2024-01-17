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
import MultiSelectGlobal from "@/shared/CustomeMultiSelect/MultiselectGlobal";
import { useGetSessionDataMutation } from "@/Redux/features/Appointment/RecurringSession/RecurringSessionApi";

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

  console.log('stuffsId - ', stuffsId);
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
      console.log(res);
      const data = res?.data;
      setSessionData(data);
      setStuffs(data?.services)
      setStuffsId(data?.selected_activities)
    };
    if(id>0)
    {
      getSessionData();
    }
  }, [id]);


  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  //console.log(errors);

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
                className="input-border input-font w-full focus:outline-none"
                {...register("patient_name")}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Auth</span>
              </label>
              <select
                className="input-border input-font w-full focus:outline-none"
                {...register("Auth")}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Service</span>
              </label>
                <div className="py-[2px]  mt-2">
                  <MultiSelectGlobal
                    allData={stuffs}
                    setId={setStuffsId}
                  />
                </div>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Provider Name</span>
              </label>
              <select
                className="input-border input-font w-full focus:outline-none"
                {...register("Provider_name")}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">POS</span>
              </label>
              <select
                className="input-border input-font w-full focus:outline-none"
                {...register("Pos")}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className=" label-font">From Date</span>
              </label>
              <input
                className="input-border input-font w-full focus:outline-none"
                type="date"
                {...register("from_Date")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">To Date</span>
              </label>
              <input
                className="input-border input-font w-full focus:outline-none"
                type="date"
                {...register("To_Date")}
              />
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className=" label-font">From Time</span>
                </label>
                <input
                  className="input-border input-font w-full focus:outline-none"
                  type="time"
                  {...register("from_time")}
                />
              </div>
              <div>
                <label className="label">
                  <span className=" label-font">To Time</span>
                </label>
                <input
                  className="input-border input-font w-full focus:outline-none"
                  type="time"
                  {...register("To_time")}
                />
              </div>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Status</span>
              </label>
              <select
                className="input-border input-font w-full focus:outline-none"
                {...register("Status")}
              >
                <option value="Rendered">Rendered</option>
                <option value="Show">Show</option>
                <option value="Hold">Hold</option>
                <option value="No Show">No Show</option>
              </select>
            </div>
            {/* <div></div> */}
            <div className="md:col-span-2">
              <label className="label">
                <span className=" label-font">Office Notes</span>
              </label>
              <div className="">
                <TextArea rows={6} placeholder=" Notes" size="large" />
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

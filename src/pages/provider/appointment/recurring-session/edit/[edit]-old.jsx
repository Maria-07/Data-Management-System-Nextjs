import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { Input } from "antd";
import RecurringSessionModal from "@/component/UI/Appointment/RecurringSession/RecurringSessionModal";
import Link from "next/link";
import RootLayout from "@/component/Layouts/RootLayout";
import { useRouter } from "next/router";
import { getAccessToken } from "@/Redux/api/apiSlice";
import axios from "axios";

const TextArea = Input;

const RecurringSessionEdit = () => {
  const token = getAccessToken();
  const router = useRouter();
  const { query } = router;
  const id = query.edit;  
  const [recurringData,setRecurringData] = useState([]);
  const [providerList,setProviderList] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    const getRecurringData = async () => {
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
      setRecurringData(data);
    };
    getRecurringData();
  }, [id,token]);

  useEffect(() => {
    const getProviderData = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/appointment/recurring/provider/list`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": token || null,
        },
      });
      const data = res?.data;
      //console.log('provider - ', data)
      setProviderList(data);
    };
    getProviderData();
  }, [id,token]);

  console.log('data --', recurringData);

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        patient_name: recurringData?.client_details?.client_full_name,
        Pos:recurringData?.session_data?.location,
        Provider_name:recurringData?.session_data?.provider_id,
        from_Date:recurringData?.start_date,
        To_Date:recurringData?.end_date,
        from_time:recurringData?.session_data?.from_time.substr(11,8),
        To_time:recurringData?.session_data?.to_time.substr(11,8),
        Status:recurringData?.session_data?.status,
        notes:recurringData?.session_data?.notes
      });
    }, 0);
  }, [id,recurringData]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  //console.log(errors);

  return (
    <div className="sm:h-[100vh]">
      <div className="flex items-start flex-wrap gap-2 justify-between">
        <h1 className="text-sm md:text-lg text-gray-700">
          Edit Recurring Session
        </h1>
        <div className="pms-button">
          <Link
            href={"/provider/appointment/recurring-session"}
            className=" flex items-center"
          >
            <IoCaretBackCircleOutline className="mr-1 text-sm" /> Back
          </Link>
        </div>
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
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 my-3 mr-2 gap-6">
            {/* name  */}
            <div>
              <label className="label">
                <span className=" label-font">Patient Name</span>
              </label>
              <input
                  type="text"
                  className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                  {...register("patient_name")}  
                  disabled                             
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Auth</span>
              </label>
              <select
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
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
              <select
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                {...register("Service")}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Provider Name</span>
              </label>
              <select
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                {...register("Provider_name")}
              >
                <option value="" className="text-black">
                    Select
                  </option>
                  {providerList?.provider_data?.map((p) => {
                    return (
                      <option
                        className="text-black"
                        key={p?.id}
                        value={p?.id}
                      >
                        {p?.last_name}, {p?.first_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">POS</span>
              </label>
              <select
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                {...register("Pos")}
              >
                <option value="03">School (03)</option>
                <option value="11">Office (11)</option>
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
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                type="text"
                {...register("from_Date")}
                disabled
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">To Date</span>
              </label>
              <input
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                type="text"
                {...register("To_Date")}
                disabled
              />
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
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
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
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
          {/* submit  */}
          <div className="mt-4">
            <button
              className=" dtm-button"
              type="submit"
            >
              Save
            </button>
            <Link href={"/provider/appointment/recurring-session"}>
              <button className=" ml-2 dcm-close-button" autoFocus onClick={reset}>
                CANCEL
              </button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RecurringSessionEdit;

RecurringSessionEdit.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

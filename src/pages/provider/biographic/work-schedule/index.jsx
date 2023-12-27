/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useGetWorkingScheduleQuery,
  useUpdateWorkingScheduleMutation,
} from "@/Redux/features/staff/workingSchedule/workingScheduleApi";
import BiographyLayout from "@/component/Layouts/BiographyLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import BlockOffTime from "@/component/UI/Staff/WorkSchedule/BlockOffTime";
import { Switch } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

const timeConvertForInput = (receivedTime) => {
  if (receivedTime === null || receivedTime === undefined) return null;

  const receivedDate = new Date(receivedTime);

  if (isNaN(receivedDate)) {
    // Handle invalid date
    return null;
  };
  const timeString = receivedDate.toLocaleTimeString();
  const [time, period] = timeString.split(" ");
  let [hours, minutes, seconds] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
};

const convertTime12to24 = (time12h) => {
  
  if(typeof time12h !== 'undefined') {
        let [hours, minutes, modifier] = time12h.split(':');

      if (hours === '12') {
        hours = '00';
      }

      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}:${minutes}:00`;
  }
  return null;
}

function tConvert (time) {   
    var time_part_array = time.split(":");
    var ampm = 'AM';

    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }

    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
        if(time_part_array[0]<10)
        {
          time_part_array[0] = '0' + time_part_array[0];
        }
    }

    if(time=='00:00:00' || time=='00:00')
    {
      time_part_array[0] = '12';
    } 

    let formatted_time = time_part_array[0]  + ':' + time_part_array[1] +  ':' + ampm;
    

    return formatted_time;
}


const workSchedule = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  // const id = query.workSchedule;
  // console.log(id);
  const token = getAccessToken();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      filters: [],
    },
  });

  const [check, setCheck] = useState(false);

  //get working schedule
  const {
    data: workingSchedule,
    isLoading,
    isSuccess,
  } = useGetWorkingScheduleQuery({ token: token });

  //for craeting working schedule
  const [
    updateWorkingSchedule,
    { isSuccess: createSuccess, isError: createError },
  ] = useUpdateWorkingScheduleMutation();
  const workData =  {
    mon_start : workingSchedule?.work_schedule?.monday?.start,
    mon_end : workingSchedule?.work_schedule?.monday?.end,
    tue_start : workingSchedule?.work_schedule?.tuesday?.start,
    tue_end : workingSchedule?.work_schedule?.tuesday?.end,
    wed_start : workingSchedule?.work_schedule?.wednesday?.start,
    wed_end : workingSchedule?.work_schedule?.wednesday?.end,
    thu_start : workingSchedule?.work_schedule?.thursday?.start,
    thu_end : workingSchedule?.work_schedule?.thursday?.end,
    sun_start : workingSchedule?.work_schedule?.sunday?.start,
    sun_end : workingSchedule?.work_schedule?.sunday?.end,
    sat_start : workingSchedule?.work_schedule?.saturday?.start,
    sat_end : workingSchedule?.work_schedule?.saturday?.end,
    fri_start : workingSchedule?.work_schedule?.friday?.start,
    fri_end : workingSchedule?.work_schedule?.friday?.end,
  }

  const {
    mon_start,
    mon_end,
    tue_start,
    tue_end,
    wed_start,
    wed_end,
    thu_start,
    thu_end,
    sun_start,
    sun_end,
    sat_start,
    sat_end,
    fri_start,
    fri_end,
  } = workData || {};

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        mon_start: convertTime12to24(mon_start),
        mon_end: convertTime12to24(mon_end),
        tue_start: convertTime12to24(tue_start),
        tue_end: convertTime12to24(tue_end),
        wed_start: convertTime12to24(wed_start),
        wed_end: convertTime12to24(wed_end),
        thu_start: convertTime12to24(thu_start),
        thu_end: convertTime12to24(thu_end),
        sun_start: convertTime12to24(sun_start),
        sun_end: convertTime12to24(sun_end),
        sat_start: convertTime12to24(sat_start),
        sat_end: convertTime12to24(sat_end),
        fri_start: convertTime12to24(fri_start),
        fri_end: convertTime12to24(fri_end),
      });
    }, 0);
  }, [
    reset,
    mon_start,
    mon_end,
    tue_start,
    tue_end,
    wed_start,
    wed_end,
    thu_start,
    thu_end,
    sun_start,
    sun_end,
    sat_start,
    sat_end,
    fri_start,
    fri_end,
  ]);

  const onSubmit = (data) => {
    const payload = {
          "monday": {
            "start": tConvert(data.mon_start),
            "end": tConvert(data.mon_end)
          },
          "tuesday": {
              "start": tConvert(data.tue_start),
              "end": tConvert(data.tue_end),
          },
          "wednesday": {
              "start": tConvert(data.wed_start),
              "end": tConvert(data.wed_end),
          },
          "thursday": {
              "start": tConvert(data.thu_start),
              "end": tConvert(data.thu_end),
          },
          "friday": {
              "start": tConvert(data.fri_start),
              "end": tConvert(data.fri_end),
          },
          "saturday": {
              "start": tConvert(data.sat_start),
              "end": tConvert(data.sat_end),
          },
          "sunday": {
              "start": tConvert(data.sun_start),
              "end": tConvert(data.sun_end),
          }
    }
    console.log(data);
    console.log(payload);
    if (payload) {
      updateWorkingSchedule({
        token: token,
        payload: payload,
      });
    }
    // reset();
  };

  useEffect(() => {
    if (createSuccess) {
      toast.success("successfully updated the working schedule", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (createError) {
      toast.error("server error occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [createSuccess, createError]);

  //Bypass work schedule validation
  useEffect(() => {
    if (check) {
      toast.success("successfully bypassed working schedule", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [check]);

  return (
    <div>
      <div className="">
        <div className="flex items-center">
          <h1 className="text-lg mt-2 text-left text-orange-400">
            Work Schedule
          </h1>
          <div className="flex items-center gap-2 ml-4 mt-1">
            <Switch
              checked={check}
              onChange={() => setCheck(!check)}
              size="small"
            />
            <span className="text-sm text-gray-400">
              Bypass Work Schedule Validation
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* working hours  */}
          <div className="my-5 mx-5">
            <h1 className="">Select Working Hours</h1>
            <div>
              <div className=" my-2 mr-2 gap-5 overflow-scroll">
                <div className="flex items-center my-3 gap-2">
                  <h5 className="text-sm text-gray-500 w-[80px] mr-5 ">Day</h5>
                  <h5 className="text-sm text-gray-500 w-[125px] px-1">
                    Start Time
                  </h5>

                  <h5 className="text-sm text-gray-500 w-[130px] mr-5 ">
                    End Time
                  </h5>
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Monday
                  </h5>
                  <input
                    type="time"
                    name="mon_start_time"
                    // value={time?.mon_end_time}
                    format="h:mm A"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("mon_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>
                  <input
                    type="time"
                    name="mon_end_time"
                    format="h:mm A"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("mon_end")}
                  />
                  <div className="flex items-center gap-2 text-sm font-normal">
                    <FiCopy className="text-secondary" /> Copy time to all
                  </div>
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Tuesday
                  </h5>
                  <input
                    type="time"
                    name="tus_start"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("tue_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>
                  <input
                    type="time"
                    name="tus_end"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("tue_end")}
                  />
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Wednesday
                  </h5>
                  <input
                    type="time"
                    name="wed_start"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("wed_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>
                  <input
                    type="time"
                    name="wed_end"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("wed_end")}
                  />
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Thursday
                  </h5>
                  <input
                    type="time"
                    name="thur_start"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("thu_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>
                  <input
                    type="time"
                    name="thur_end"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("thu_end")}
                  />
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Friday
                  </h5>
                  <input
                    type="time"
                    name="fri_start"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("fri_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>
                  <input
                    type="time"
                    name="fri_end"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("fri_end")}
                  />
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Saturday
                  </h5>
                  <input
                    type="time"
                    name="sat_start"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("sat_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>
                  <input
                    type="time"
                    name="sat_end"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("sat_end")}
                  />
                </div>
                <div className="flex items-center my-1 gap-2">
                  <h5 className="text-sm text-gray-600 w-[80px] mr-5 ">
                    Sunday
                  </h5>
                  <input
                    type="time"
                    name="sun_start"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("sun_start")}
                  />

                  <span className="text-sm text-gray-600 w-[30px] text-center">
                    to
                  </span>

                  <input
                    type="time"
                    name="sun_end"
                    className="border rounded-sm px-2 py-[5px] mx-1 text-xs w-[105px]"
                    {...register("sun_end")}
                  />
                </div>
              </div>
              {/* submit  */}
              <input className="dcm-button mb-3" type="submit" value={"Save"} />
            </div>
          </div>
        </form>
        <BlockOffTime token={token}></BlockOffTime>
      </div>
    </div>
  );
};

export default workSchedule;

workSchedule.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <BiographyLayout>{page}</BiographyLayout>
    </RootLayout>
  );
};

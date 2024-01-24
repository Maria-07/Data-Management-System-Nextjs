import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import InsuranceMultiSelect from "@/shared/CustomeMultiSelect/InsuranceMultiSelect/InsuranceMultiSelect";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowsAltH } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import Clients from "../../MultiSelectComponents/Clients";
import PatientMultiSelectGlobal from "@/shared/CustomeMultiSelect/PatientMultiSelectGlobal";
import Providers from "../../MultiSelectComponents/Providers";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const CalenderFilter = () => {
  const isToggled = useSelector((state) => state.sideBarInfo);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      filters: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
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

  // Hide calendar on outside click
  const refClose = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnClickOutside = (e) => {
    if (refClose.current && !refClose.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  };
  return (
    <div className="bg-gradient-to-r from-secondary to-primary rounded-lg px-4 py-2 mb-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center my-2">
          <div className=" flex flex-wrap items-center gap-3">
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
                      endDate ? `${endMonth} ${endDay}, ${endYear}` : "End Date"
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
            <div className="sm:w-[240px] w-[200px]">
              <label className="label">
                <span className="label-text text-[14px] text-gray-100 text-left">
                  Treatment
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
                  {[]?.pos?.map((p) => {
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
            <div>
              <h1 className="label pb-1">
                <span className="label-text  text-[14px] text-gray-100 text-left">
                  Patients
                </span>
              </h1>

              <Clients patients={[]} setPatientId={123}></Clients>
            </div>
            <div className="">
              <h1 className="pb-1">
                <span className="label-text mb-[2px] text-[14px] text-gray-100 text-left">
                  Provider
                </span>
              </h1>

              <Providers stuffs={[]} setStuffsId={123}></Providers>
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
                  {[]?.pos?.map((p) => {
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
            <div>
              <h1 className="label pb-1">
                <span className="label-text  text-[14px] text-gray-100 text-left">
                  Services
                </span>
              </h1>

              <Clients patients={[]} setPatientId={123}></Clients>
            </div>
            <div>
              <h1 className="label pb-1">
                <span className="label-text  text-[14px] text-gray-100 text-left">
                  Status
                </span>
              </h1>

              <Clients patients={[]} setPatientId={123}></Clients>
            </div>
            <div className="mt-[26px] flex items-center sm:col-span-2">
              <div>
                {/* submit  */}
                <button
                  //   onClick={() => setTable(true)}
                  className="dcm-input-button "
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalenderFilter;

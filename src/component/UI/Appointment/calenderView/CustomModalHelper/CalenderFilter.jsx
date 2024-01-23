import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import InsuranceMultiSelect from "@/shared/CustomeMultiSelect/InsuranceMultiSelect/InsuranceMultiSelect";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowsAltH } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import Clients from "../../MultiSelectComponents/Clients";
import PatientMultiSelectGlobal from "@/shared/CustomeMultiSelect/PatientMultiSelectGlobal";

const CalenderFilter = () => {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center my-2">
          <div className=" flex flex-wrap items-center gap-3">
            <div className="w-[250px]">
              <label className="label">
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Selected date
                </span>
              </label>
              <div className="ml-1">
                <div className="flex flex-wrap justify-between items-center text-gray-600 input-border-bottom rounded-sm px-1 mx-1 w-full">
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
                      endDate ? `${endMonth} ${endDay}, ${endYear}` : "End Date"
                    }
                    readOnly
                    onClick={() => setOpenCalendar(true)}
                    className="focus:outline-none font-medium text-center bg-transparent text-[14px] text-gray-600 w-1/3 cursor-pointer"
                  />
                </div>

                {/* Multi date picker component called */}
                <div
                  ref={refClose}
                  className="absolute z-10 md:ml-[-15%] lg:ml-0 xl:ml-0 2xl:ml-[35%]s"
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
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Treatment Type
                </span>
              </label>
              <select
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
                {...register("patient")}
              >
                <option value="name"> </option>
                <option value="name"> Abcgfdgfdgdrtdrtfd </option>
                <option value="name"> abcd </option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Patients
                </span>
              </label>

              <div className="mt-1">
                <PatientMultiSelectGlobal
                  patients={[]}
                  setPatientId={123}
                ></PatientMultiSelectGlobal>
              </div>
            </div>
            <div>
              <label className="label">
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Provider
                </span>
              </label>

              <div className="mt-1">
                <PatientMultiSelectGlobal
                  patients={[]}
                  setPatientId={123}
                ></PatientMultiSelectGlobal>
              </div>
            </div>
            <div>
              <label className="label">
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Place Of Service
                </span>
              </label>
              <select
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1  w-full focus:outline-none"
                {...register("patient")}
              >
                <option value="name"> </option>
                <option value="name"> Abcgfdgfdgdrtdrtfd </option>
                <option value="name"> abcd </option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Service
                </span>
              </label>

              <div className="mt-1">
                <PatientMultiSelectGlobal
                  patients={[]}
                  setPatientId={123}
                ></PatientMultiSelectGlobal>
              </div>
            </div>
            <div>
              <label className="label">
                <span className="label-font text-[17px] font-medium text-[#9b9b9b] text-left">
                  Status
                </span>
              </label>

              <div className="mt-1">
                <PatientMultiSelectGlobal
                  patients={[]}
                  setPatientId={123}
                ></PatientMultiSelectGlobal>
              </div>
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

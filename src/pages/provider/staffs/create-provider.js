/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetSelectedStaffQuery } from "@/Redux/features/settings/addStaffType/addStaffApi";
import { useGetAllSelectedTreatmentsQuery } from "@/Redux/features/settings/addTreatment/addTreatmentApi";
import { useCreateStuffMutation } from "@/Redux/features/staff/staff/staffApi";
import RootLayout from "@/component/Layouts/RootLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const createProvider = () => {
  const [gender, setGender] = useState();
  const token = getAccessToken();
  const router = useRouter();

  //! selected treatments data get api
  const { data: selectedTreatmentData, isLoading: selectedTreatmentLoading } =
    useGetAllSelectedTreatmentsQuery({ token: token });
  // console.log("Selected Treatment", selectedTreatmentData?.data);

  //! selected employee type data get api
  const { data: credentialType, isLoading: typeLoading } =
    useGetSelectedStaffQuery({ token: token });
  // console.log("Selected credential_type", credentialType?.data);

  //! create staff api
  const [createStuff, { isSuccess: createSuccess, isError: createError }] =
    useCreateStuffMutation();

  //select treatment boiler plate
  let treatmentSelect = null;
  if (selectedTreatmentData?.data?.length === 0) {
    treatmentSelect = <div className="text-red-700">Select Treatments</div>;
  } else if (selectedTreatmentData?.data?.length > 0) {
    treatmentSelect = (
      <>
        {selectedTreatmentData?.data?.map((treatment) => {
          return (
            <option key={treatment?.id} value={treatment?.id}>
              {treatment?.treatment_name}
            </option>
          );
        })}
      </>
    );
  }
  //select Credential type boiler plate
  let credentialSelect = null;
  if (credentialType?.data?.length === 0) {
    credentialSelect = (
      <div className="text-red-700">Select Credential Type</div>
    );
  } else if (credentialType?.data?.length > 0) {
    credentialSelect = (
      <>
        {credentialType?.data?.map((c) => {
          return (
            <option key={c?.id} value={c?.id}>
              {c?.type_name}
            </option>
          );
        })}
      </>
    );
  }
  //gender option pick
  const handlegender = (e) => {
    setGender(e.target.value);
  };
  // console.log(gender);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let payload = {
      ...data,
      gender,
      employee_type: "provider",
    };
    // console.log("create staff data ", payload);
    if (payload) {
      const response = await createStuff({
        token,
        payload,
      });

      // console.log("response", response);
    }
    // console.log(payload);
  };

  useEffect(() => {
    if (createSuccess) {
      toast.success("Successfully Staff Created", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      // reset();
      navigate("/admin/staffs");
    } else if (createError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [createSuccess, createError]);

  return (
    <div>
      <div className="sm:h-[100vh]">
        <div className="flex items-center flex-wrap gap-2 justify-between">
          <h1 className="text-lg my-2 text-orange-500">Provider</h1>
          <div className="flex items-center gap-3">
            <Link
              href={"/admin/staffs"}
              className=" py-[6px] flex items-center  px-4  text-[13px] font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-md"
            >
              <IoCaretBackCircleOutline className="mr-1 text-sm" /> Back
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-3 mr-2 gap-4">
            {/* name  */}
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  First Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="first_name"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("first_name")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Middle Name
                </span>
              </label>
              <input
                type="text"
                name="middle_name"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("middle_name")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Last Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="last_name"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("last_name")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Nick Name
                </span>
              </label>
              <input
                type="text"
                name="nick_name"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("nickname")}
              />
            </div>
            {/* DOB */}
            <div>
              {" "}
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Staff Birthday<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px]  font-medium w-full focus:outline-none"
                type="date"
                {...register("staff_birthday")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  SSN
                </span>
              </label>
              <input
                type="text"
                name="ssn"
                placeholder="XX-YYYYYY"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("ssn")}
              />
            </div>
            {/* phone & email  */}
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Office Phone <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                name="office_phone"
                placeholder="(XXX)-YYY-ZZZZ"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("office_phone")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Office Fax
                </span>
              </label>
              <input
                type="text"
                name="office_phone"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("office_fax")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Office Email<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="office_email"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("office_email")}
              />
            </div>
            {/* driving license */}
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Drivers License & Expiration Date
                </span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  mr-2 gap-x-2 gap-y-1">
                <div>
                  <input
                    type="text"
                    name="driving_license"
                    className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                    {...register("driver_license")}
                  />
                </div>
                <div className="">
                  {" "}
                  <input
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px]  font-medium w-full focus:outline-none"
                    type="date"
                    {...register("license_exp_date")}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Title
                </span>
              </label>
              <input
                type="text"
                name="title"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("title")}
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Hiring Date with Company
                </span>
              </label>
              <input
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px]  font-medium w-full focus:outline-none"
                type="date"
                {...register("hir_date_compnay")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Credential Type
                </span>
              </label>
              <select
                disabled={typeLoading ? true : false}
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px]  font-medium w-full focus:outline-none"
                {...register("credential_type")}
              >
                <option value="0">Select Credential Type</option>
                {credentialSelect}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Treatment Type
                </span>
              </label>
              <select
                disabled={selectedTreatmentLoading ? true : false}
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px]  font-medium w-full focus:outline-none"
                {...register("treatment_type")}
              >
                <option value="0">Select Treatment Type</option>
                {treatmentSelect}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Individual NPI
                </span>
              </label>
              <input
                type="text"
                name="individual_npi"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("individual_npi")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  CAQH Id
                </span>
              </label>
              <input
                type="text"
                name="cahq_id"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("cahq_id")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Service Area Zip
                </span>
              </label>
              <input
                type="text"
                name="service_area_zip"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("service_area_zip")}
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Termination Date
                </span>
              </label>
              <input
                className="input-border-bottom text-gray-600 rounded-sm  text-[14px]  font-medium w-full focus:outline-none"
                type="date"
                {...register("terminate_Date")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-font ml-1 text-[13px] font-medium  text-left">
                  Language(s)
                </span>
              </label>
              <input
                type="text"
                name="language"
                className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                {...register("language")}
              />
            </div>
            <div className="flex items-center gap-2">
              <div>
                {" "}
                <label className="label">
                  <span className="label-font ml-1 text-[13px] font-medium  text-left">
                    Taxonomy Code
                  </span>
                </label>
                <input
                  type="text"
                  name="taxonomy_code"
                  className="input-border-bottom text-gray-600 rounded-sm py-[1px] text-[14px] font-medium w-full ml-1 focus:outline-none"
                  {...register("taxonomy_code")}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-font ml-1 text-[13px] font-medium  text-left">
                    Gender <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex ml-1 mt-1 items-center">
                    <input
                      type="radio"
                      name="patient"
                      value={2}
                      onChange={handlegender}
                    />
                    <h1 className="text-[13px] ml-1 text-gray-600 font-bold">
                      female
                    </h1>
                  </div>
                  <div className="flex ml-1 mt-1 items-center">
                    <input
                      type="radio"
                      name="patient"
                      value={1}
                      onChange={handlegender}
                    />
                    <h1 className="text-[13px] ml-1 text-gray-600 font-semibold">
                      male
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                className=" py-[5px]  px-4  text-[13px] font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-md"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createProvider;

createProvider.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

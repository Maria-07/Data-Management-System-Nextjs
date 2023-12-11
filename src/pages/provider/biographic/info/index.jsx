/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetSelectedStaffQuery } from "@/Redux/features/settings/addStaffType/addStaffApi";
import { useGetAllSelectedTreatmentsQuery } from "@/Redux/features/settings/addTreatment/addTreatmentApi";
import {
  useGetInfoQuery,
  useUpdateStaffMutation,
} from "@/Redux/features/staff/staff/staffApi";
import BiographyLayout from "@/component/Layouts/BiographyLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import Loading from "@/component/UI/Layouts/Loading";
import BoolConverter from "@/shared/BoolConverter/BoolConverter";
import { Switch } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const biographyInfo = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const [staffBirthday, setStaffBirthday] = useState();

  //! Id get
  const router = useRouter();
  const { query } = router;
  // const id = query.biographyInfo;
  // console.log(id);
  const token = getAccessToken();

  //! get staff info api
  const { data: staffData, isLoading: staffDataLoading } = useGetInfoQuery({
    token,
    // id: id,
  });
  console.log("staff data", staffData, staffDataLoading);

  //! update staff api
  const [updateStaff, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateStaffMutation();

  //! selected treatments data get api
  const { data: selectedTreatmentData, isLoading: selectedTreatmentLoading } =
    useGetAllSelectedTreatmentsQuery({ token: token });
  console.log("Selected Treatment", selectedTreatmentData?.data);

  //! selected employee type data get api
  const { data: credentialType, isLoading: typeLoading } =
    useGetSelectedStaffQuery({ token: token });
  console.log("Selected Treatments", credentialType?.data);

  //! select treatment boiler plate
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

  //! select Credential type boiler plate
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

  const {
    caqh_id,
    first_name,
    middle_name,
    last_name,
    nickname,
    staff_birthday,
    ssn,
    office_email,
    office_phone,
    office_fax,
    driver_license,
    license_exp_date,
    hir_date_compnay,
    treatment_type,
    credential_type,
    individual_npi,
    is_active,
    taxonomy_code,
    terminated_date,
    title,
    language,
    gender,
    back_color,
    email_remainder,
    session_check,
    service_area_zip,
    notes,
  } = staffData?.employee_info || {};

  const converted_date = moment(staff_birthday).utc().format("YYYY-MM-DD");

  useEffect(() => {
    setStaffBirthday(converted_date);
  }, [converted_date]);
  console.log("staff birthday", staffBirthday);

  const [createSession, setCreateSession] = useState(
    BoolConverter(session_check)
  );
  const [emailReminder, setEmailReminder] = useState(
    BoolConverter(email_remainder)
  );
  useEffect(() => {
    setCreateSession(BoolConverter(session_check));
  }, [session_check]);
  useEffect(() => {
    setEmailReminder(BoolConverter(email_remainder));
  }, [email_remainder]);

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        caqh_id: caqh_id,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        nickname: nickname,
        ssn: ssn,
        office_email: office_email,
        office_phone: office_phone,
        office_fax: office_fax,
        hir_date_compnay: hir_date_compnay,
        individual_npi: individual_npi,
        is_active: is_active,
        taxonomy_code: taxonomy_code,
        terminated_date: terminated_date,
        treatment_type: treatment_type,
        credential_type,
        title: title,
        service_area_zip: service_area_zip,
        driver_license: driver_license,
        license_exp_date: license_exp_date,
        language: language,
        gender: String(gender),
        notes: notes,
      });
    }, 0);
  }, [
    reset,
    caqh_id,
    first_name,
    middle_name,
    last_name,
    nickname,
    ssn,
    office_email,
    office_phone,
    office_fax,
    hir_date_compnay,
    individual_npi,
    is_active,
    taxonomy_code,
    terminated_date,
    treatment_type,
    credential_type,
    title,
    driver_license,
    license_exp_date,
    language,
    service_area_zip,
    gender,
    notes,
  ]);

  console.log(
    "after calling boolConverter",
    BoolConverter(emailReminder),
    BoolConverter(createSession)
  );

  const onSubmit = (data) => {
    // console.log(note);
    const payload = {
      // employee_id: id,
      ...data,
      staff_birthday: staffBirthday,
      session_check: BoolConverter(createSession),
      email_remainder: BoolConverter(emailReminder),
    };

    //update staff api call
    if (payload) {
      updateStaff({
        token,
        payload,
      });
    }
    console.log("data", payload);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Successfully updated", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (updateError) {
      toast.error("Cann't be Updated", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [updateSuccess, updateError]);

  if (staffDataLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {" "}
      <div className="">
        <h1 className="text-lg mt-2 text-left text-orange-400">Bio&apos;s</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-3 mr-2 gap-x-6 gap-y-3 ">
            {/* First Name with all the validation  */}
            <div>
              <label className="label">
                <span className=" label-font">
                  First Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="first_name"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("first_name")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Middle Name</span>
              </label>
              <input
                type="text"
                name="middle_name"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("middle_name")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">
                  Last Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="last_name"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("last_name")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Nick Name</span>
              </label>
              <input
                type="text"
                name="nickname"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("nickname")}
              />
            </div>
            {/* DOB */}
            <div>
              <label className="label">
                <span className=" label-font">
                  Date of Birth<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                className="input-border-bottom mb-1 input-font  w-full focus:outline-none"
                type="date"
                value={staffBirthday}
                onChange={(e) => setStaffBirthday(e.target.value)}
              />
              {/* <input
              className="input-border-bottom mb-1 input-font w-full focus:outline-none"
              type="date"
              {...register("staff_birthday")}
            /> */}
            </div>
            <div>
              <label className="label">
                <span className=" label-font">SSN</span>
              </label>
              <input
                type="text"
                name="ssn"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("ssn")}
              />
            </div>
            {/* phone & email  */}
            <div>
              <label className="label">
                <span className=" label-font">
                  Office Phone <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="office_phone"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("office_phone")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">
                  Office Email<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="office_email"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("office_email")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">
                  Office Fax<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="office_fax"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("office_fax")}
              />
            </div>
            {/* driving license */}
            <div>
              <label className="label">
                <span className=" label-font">
                  Drivers License & Expiration Date
                </span>
              </label>
              <input
                type="text"
                name="driver_license"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("driver_license")}
              />
            </div>
            <div className="mt-[24px]">
              {" "}
              <input
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                type="date"
                {...register("license_exp_date")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Title</span>
              </label>
              <input
                type="text"
                name="title"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("title")}
              />
            </div>
            <div className="">
              <label className="label">
                <span className=" label-font">Hiring Date with Company</span>
              </label>
              <input
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                type="date"
                {...register("hir_date_compnay")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Credential Type</span>
              </label>
              <select
                className="input-border-bottom mb-1 input-font mt-[1px] w-full focus:outline-none"
                {...register("credential_type")}
              >
                {credentialSelect}
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">
                  Tx Type <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                className="input-border-bottom mb-1 input-font mt-[1px] w-full focus:outline-none"
                {...register("treatment_type")}
              >
                {treatmentSelect}
              </select>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Individual NPI</span>
              </label>
              <input
                type="text"
                name="individual_npi"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("individual_npi")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">CAQH Id</span>
              </label>
              <input
                type="text"
                name="caqh_id"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("caqh_id")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Service Area Zip</span>
              </label>
              <input
                type="text"
                name="service_area_zip"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("service_area_zip")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Termination Date</span>
              </label>
              <input
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                type="date"
                {...register("terminated_date")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Language(s)</span>
              </label>
              <input
                type="text"
                name="language"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("language")}
              />
            </div>
            <div>
              <label className="label">
                <span className=" label-font">Taxonomy Code</span>
              </label>
              <input
                type="text"
                name="taxonomy_code"
                className="input-border-bottom mb-1 input-font w-full focus:outline-none"
                {...register("taxonomy_code")}
              />
            </div>

            <div>
              <div>
                <label className="label">
                  <span className=" label-font">
                    Gender <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex items-center">
                  <div className="flex ml-1 mt-1 items-center">
                    <input type="radio" value={2} {...register("gender")} />
                    <span className="text-sm ml-1 text-gray-600 font-medium">
                      female
                    </span>
                  </div>
                  <div className="flex ml-1 mt-1 items-center">
                    <input type="radio" value={1} {...register("gender")} />
                    <span className="text-sm ml-1 text-gray-600 font-medium">
                      male
                    </span>
                  </div>
                </div>
              </div>
              {/* <div>
                <div className="flex items-center gap-2 ml-1 my-5">
                  <Switch
                    checked={emailReminder}
                    onChange={() => setEmailReminder(!emailReminder)}
                    size="small"
                  />
                  <span className="text-sm">Email Reminder</span>
                </div>
              </div> */}
            </div>

            {/* <div className="">
              <label className="label">
                <span className=" label-font">Notes</span>
              </label>
              <textarea
                type="text"
                name="notes"
                rows={4}
                placeholder="Notes..."
                size="middle"
                className="border border-blue-900 rounded-md w-full focus:outline-none p-2 text-sm text-gray-6"
                {...register("notes")}
              />
            </div> */}

            {/* <div className="ml-2 mt-[12px] ">
              <CustomFileUploader
                signatureUpload={signatureUpload}
                setSignatureUpload={setSignatureUpload}
              ></CustomFileUploader>
              <p className="mt-3 text-sm ">Upload Signature</p>
            </div> */}
          </div>
          <div className="my-5">
            <button className=" dcm-button mr-2" type="submit">
              Save
            </button>
            <button onClick={reset} className="dcm-close-button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default biographyInfo;

biographyInfo.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <BiographyLayout>{page}</BiographyLayout>
    </RootLayout>
  );
};

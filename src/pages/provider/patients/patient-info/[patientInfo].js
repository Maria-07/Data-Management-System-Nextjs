/* eslint-disable react-hooks/rules-of-hooks */
import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import BasicInfo from "@/component/UI/Patients/Patients/PatientInfo/BasicInfo";
import DynamicAddress from "@/component/UI/Patients/Patients/PatientInfo/PatientAddress/DynamicAddress";
import PrimaryAddress from "@/component/UI/Patients/Patients/PatientInfo/PatientAddress/PrimaryAddress";
import DynamicPhone from "@/component/UI/Patients/Patients/PatientInfo/PhoneAddress/DynamicPhone";
import PrimaryPhone from "@/component/UI/Patients/Patients/PatientInfo/PhoneAddress/PrimaryPhone";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import DynamicEmail from "@/component/UI/Patients/Patients/PatientInfo/Emailaddress/DynamicEmail";
import PrimaryEmail from "@/component/UI/Patients/Patients/PatientInfo/Emailaddress/PrimaryEmail";
import AboutPatient from "@/component/UI/Patients/Patients/PatientInfo/AboutPatient/AboutPatient";
import GuarantorInfo from "@/component/UI/Patients/Patients/PatientInfo/GuarantorInfo/GuarantorInfo";
import { Divider, Input } from "antd";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useSelector } from "react-redux";
import Loading from "@/component/UI/Layouts/Loading";

const { TextArea } = Input;

const PatientInfo = () => {
  const [active, setActive] = useState(false);
  const [Guarantor, setGuarantor] = useState(false);
  const [checkLocation, setLocation] = useState(false);
  //file uploaded issue
  const [signatureUpload, setSignatureUpload] = useState("");
  const token = getAccessToken();
  const [hook, setHook] = useState("");

  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.patientInfo;
  console.log(id);

  //! fetch Patient's info
  // const data = useSelector(
  //   (state) => state?.patientInfo?.patientDetails?.data?.client_info || {}
  // );
  // console.log("data", data);
  const data = useSelector((state) => state.patientInfo);

  console.log("Initial Data Coming from database", data);
  const patient_details = data?.patientDetails?.data?.client_info;
  const patientOtherDetails = data?.patientDetails?.data?.client_other_info;
  const loading = data?.loading;
  const primaryPhone = patient_details?.phone_number;
  const primaryEmail = patient_details?.email;

  console.log("patient details", patient_details);
  console.log("patient other details", patientOtherDetails);

  const [dob, setDob] = useState();
  console.log("dob", dob);
  //for showing default date in real time
  useEffect(() => {
    setDob(patient_details?.client_dob);
  }, [patient_details?.client_dob]);

  useEffect(() => {
    setTimeout(() => {
      console.log("hello world ");
    }, 1000);
  }, [patient_details]);

  console.log(
    "data?.patientDetails?.data?.address-",
    data?.patientDetails?.data?.address
  );

  const { register, control, handleSubmit, reset, setValue, getValues } =
    useForm({
      defaultValues: {
        // address: patient_details?.client_address,
        // number: patient_details?.client_phone,
        // Email: patient_details?.client_email,
        // new code added
        address: data?.patientDetails?.data?.address,
        number: data?.patientDetails?.data?.phones,
        // number: patient_details?.client_phone,
        Email: data?.patientDetails?.data?.emails,
      },
    });

  // this code very important
  useEffect(() => {
    reset({
      number: data?.patientDetails?.data?.phones,
      address: data?.patientDetails?.data?.address,
      Email: data?.patientDetails?.data?.emails,

      // address: patient_details?.client_address,
      // number: patient_details?.client_phone,
      // Email: patient_details?.client_email,
    });
  }, [
    data?.patientDetails?.data?.address,
    data?.patientDetails?.data?.emails,
    data?.patientDetails?.data?.phones,
    reset,
  ]);
  // patient_details?.client_address, patient_details?.client_email, patient_details?.client_phone, reset

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
    // name: "number",
  });

  const {
    fields: phoneFields,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    control,
    // name: "address",
    name: "number",
  });

  const {
    fields: emailFields,
    append: emailAppend,
    remove: emailRemove,
  } = useFieldArray({
    control,
    name: "Email",
  });

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        first_name: patient_details?.client_first_name,
        middle_name: patient_details?.client_middle
          ? patient_details?.client_middle
          : null,
        last_name: patient_details?.client_last_name,
        login_email: patient_details?.login_email,
        zone: patient_details?.zone,
        gender: patient_details?.client_gender,
        fruit: patient_details?.client_gender,
        checkedActive: patient_details?.is_active_client,
        // address
        client_street: patient_details?.client_street,
        client_city: patient_details?.client_city,
        client_state: patient_details?.client_state,
        client_zip: patient_details?.client_zip,
        // all gurantor
        guarantor_first_name:
          patient_details?.client_granter?.guarantor_first_name,
        guarantor_last_name:
          patient_details?.client_granter?.guarantor_last_name,
        guarantor_first_name:
          patient_details?.client_granter?.guarantor_first_name,
        guarantor_last_name:
          patient_details?.client_granter?.guarantor_last_name,
        guarantor_check_Date: patient_details?.client_granter?.guarantor_dob,
        GuaratorStreet: patient_details?.client_granter?.g_street,
        GuaratorCity: patient_details?.client_granter?.g_city,
        GuratorCountry: patient_details?.client_granter?.g_state,
        GuratorZip: patient_details?.client_granter?.g_zip,
        relationship: patientOtherDetails?.relationship,
      });
      if (patientOtherDetails?.relationship !== "Self") {
        setGuarantor(true);
        setRelation(patientOtherDetails?.relationship);
      } else {
        setGuarantor(false);
        setRelation(patientOtherDetails?.relationship);
      }
    }, 0);
  }, [patientOtherDetails?.relationship, patient_details, reset]);

  const onSubmit = (data) => {
    console.log(data);
    const is_client_active = data?.checkedActive ? 1 : 0;
    const formData = {
      is_client_active,
    };
    console.log(formData);
    //console.log(file);
  };

  ///relation value handle
  const [relation, setRelation] = useState(patientOtherDetails?.relationship);
  const settingRelation = (e) => {
    console.log("e value", e.target.value);
    if (e.target.value === "Self") {
      setGuarantor(false);
      document.getElementById("checkbox").checked = false;
    } else if (e.target.value !== "Self") {
      setGuarantor(true);
    }

    //setRelation(relation);
    setRelation(e.target.value);
  };

  // const settingRelation = (e) => {
  //   if (e.target.value === "Self") {
  //     setGuarantor(false);
  //   } else {
  //     setGuarantor(true);
  //   }

  //   setRelation(e.target.value);
  // };

  // const handleChange = () => {
  //   if (guarantor) {
  //     setGuarantor(false);
  //   } else {
  //     setGuarantor(true);
  //   }
  // };

  // Guarentor handler code
  // const handleChange = (event) => {
  //   console.log("check event", event.target);
  //   if (event.target.checked) {
  //     //console.log("✅ Checkbox is checked");
  //     setGuarantor(true);
  //   } else {
  //     //console.log("⛔️ Checkbox is NOT checked");
  //     setGuarantor(false);
  //   }
  // };

  const handleChange = (event) => {
    if (event.target.checked) {
      setGuarantor(true);
    } else {
      setGuarantor(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  const SameasPatientBtn = () => {
    setLocation(true);
    setValue("GuaratorStreet", getValues("client_street"));
    setValue("GuaratorCity", getValues("client_city"));
    setValue("GuratorCountry", getValues("client_state"));
    setValue("GuratorZip", getValues("client_zip"));
    console.log("getvalue street", getValues("Street"));
    console.log("getvalue city", getValues("City"));
    console.log("getvalue country", getValues("country"));
    console.log("getvalue zip", getValues("zip"));
  };

  console.log("patientAdd");

  console.log("fields", phoneFields);
  return (
    <div className={data?.patient_details?.data?.address?.length < 1 ? "" : ""}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BasicInfo
            adData={{
              dob,
              setDob,
              control,
              Controller,
              setActive,
              active,
              settingRelation,
              register,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 my-1 mr-2 gap-x-6 gap-y-1 mt-5">
            {/* <div className="flex flex-wrap my-1 mr-2 md:gap-x-2 gap-y-5"> */}
            {/* address  */}
            <div className="pr-6">
              <PrimaryAddress append={append} rg={register} />
              <br></br>
              {patient_details?.admin_id && (
                <DynamicAddress
                  adData={{
                    fields,
                    register,
                    remove,
                  }}
                />
              )}

              {/* <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-1 gap-x-4 gap-y-2"> */}
              <div className=" flex items-center justify-between my-1 gap-x-4 gap-y-2">
                <div className="w-full">
                  <label className="label">
                    <span className=" label-font">
                      POS<span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                    {...register("pos")}
                  >
                    <option value="Main Office">Main Office</option>
                    <option value="Telehealth">Telehealth</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className=" label-font">
                      Region<span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                    {...register("zone")}
                  >
                    <option value="2"></option>
                    <option value="6">Main Zone</option>
                    <option value="27">ABC Behavioral Therapy Center</option>
                  </select>
                </div>
              </div>
            </div>
            {/* phone  */}
            <div className="">
              <PrimaryPhone
                adData={{
                  phoneAppend,
                  register,
                  primaryPhone,
                }}
              />
              <br></br>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.2 }}
              >
                <DynamicPhone
                  adData={{
                    phoneFields,
                    phoneRemove,
                    register,
                  }}
                />
              </motion.div>
            </div>
            {/* Email  */}
            <div className="">
              <PrimaryEmail
                adData={{
                  emailAppend,
                  register,
                  primaryEmail,
                }}
              />
              <br></br>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DynamicEmail
                  adData={{
                    register,
                    emailFields,
                    emailRemove,
                  }}
                />
              </motion.div>
            </div>
          </div>

          <AboutPatient register={register}></AboutPatient>
          <Divider></Divider>
          <div className="flex ml-1 mt-1 items-center">
            <input
              disabled={relation === "Self" ? true : false}
              type="checkbox"
              checked={relation !== "Self"}
              onChange={handleChange}
              id="checkbox"
            />
            {/* <input
              disabled={relation === "Self"}
              type="checkbox"
              checked={Guarantor}
              onChange={handleChange}
              id="checkbox"
            /> */}

            <span className="text-sm ml-1 text-gray-700 font-medium">
              Is Guarantor Available?
            </span>
          </div>

          {Guarantor && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.2 }}
            >
              <GuarantorInfo
                register={register}
                checkLocation={checkLocation}
                SameasPatientBtn={SameasPatientBtn}
                hook={hook}
              ></GuarantorInfo>
            </motion.div>
          )}

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  mr-2 gap-x-3 gap-y-1 my-5">
            <div className="w-full">
              <label className="label">
                <span className=" label-font">Insurance:</span>
              </label>
              <select
                className="input-border-bottom input-font py-[1px] mt-2 w-full focus:outline-none"
                {...register("pos")}
              >
                <option value="Main Office">Main Office</option>
                <option value="Telehealth">Telehealth</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div className="w-full sm:col-span-2">
              <div className="label mb-2">
                <span className=" label-font">Patient Notes:</span>
              </div>
              <TextArea rows={4} placeholder=" Notes" size="large" />
            </div>
            <div className="w-full sm:col-span-2">
              <div className="label mb-2">
                <span className=" label-font">Additional Information:</span>
              </div>
              <TextArea rows={4} placeholder="Notes" size="large" />
            </div>

            {/* <div className="ml-2 mt-[12px] ">
              <CustomFileUploader
                signatureUpload={signatureUpload}
                setSignatureUpload={setSignatureUpload}
              ></CustomFileUploader>
              <p className="mt-3 text-sm ">Upload Signature</p>
            </div> */}
          </div>

          <div className="my-10">
            <div className="flex items-center justify-around gap-2 mb-4 ">
              <h3 className="text-sm font-semibold w-80">Treatment </h3>
              <h3 className="text-sm font-semibold w-80 text-center">
                Physician Type
              </h3>
              <h3 className="text-sm font-semibold w-80 text-center">
                Referred By
              </h3>
              <h3 className="text-sm font-semibold w-80 text-center">
                Diagnosis1
              </h3>
              <h3 className="text-sm font-semibold w-80 text-center">
                Diagnosis2
              </h3>
              <h3 className="text-sm font-semibold w-80 text-center">
                Diagnosis3
              </h3>
              <h3 className="text-sm font-semibold w-80 text-center">
                Diagnosis4
              </h3>
            </div>
            <div className="flex items-center justify-around gap-5 mb-4 ">
              <h3 className="text-sm font-medium w-80">Behavioral therapy </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <select
                  className="input-border-bottom input-font w-full focus:outline-none"
                  {...register("pos")}
                >
                  <option value="Main Office">Main Office</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Home">Home</option>
                </select>
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <select
                  className="input-border-bottom input-font  w-full focus:outline-none"
                  {...register("pos")}
                >
                  <option value="Main Office">Main Office</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Home">Home</option>
                </select>
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
            </div>
            <div className="flex items-center justify-around gap-5 mb-4 ">
              <h3 className="text-sm font-medium w-80">Mental Health </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <select
                  className="input-border-bottom input-font w-full focus:outline-none"
                  {...register("pos")}
                >
                  <option value="Main Office">Main Office</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Home">Home</option>
                </select>
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <select
                  className="input-border-bottom input-font  w-full focus:outline-none"
                  {...register("pos")}
                >
                  <option value="Main Office">Main Office</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Home">Home</option>
                </select>
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
            </div>
            <div className="flex items-center justify-around gap-5 mb-4 ">
              <h3 className="text-sm font-medium w-80">Mucsic Therapy</h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <select
                  className="input-border-bottom input-font w-full focus:outline-none"
                  {...register("pos")}
                >
                  <option value="Main Office">Main Office</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Home">Home</option>
                </select>
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <select
                  className="input-border-bottom input-font  w-full focus:outline-none"
                  {...register("pos")}
                >
                  <option value="Main Office">Main Office</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Home">Home</option>
                </select>
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
              <h3 className="text-sm font-medium w-80 text-center">
                <input
                  type="text"
                  name="provider_level"
                  className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                  {...register("provider_level")}
                />
              </h3>
            </div>

            {/* {!otherSetupLoading ? (
            <Loading />
          ) : ( */}
            {/* {loading ? (
              <p>loading</p>
            ) : (
              <OtherSetUpBottom
                // propdata={{ fields, register, OtherSetupApiData, dm }}
                propdata={{ register, txTypedata, loading }}
              />
            )} */}
            {/* )} */}
          </div>
          <div className="mb-24">
            {/* submit  */}
            <button className="dtm-button my-3" type="submit">
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientInfo;

PatientInfo.getLayout = function getLayout(page) {
  const router = useRouter();
  const { query } = router;
  const id = query.patientInfo;
  return (
    <RootLayout>
      <PatientLayout id={id}>{page}</PatientLayout>
    </RootLayout>
  );
};

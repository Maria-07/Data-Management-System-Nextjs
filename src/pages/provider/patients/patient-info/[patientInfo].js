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
import Image from "next/image";
import { toast } from "react-toastify";
import {
  useGetPatientInfoQuery,
  useDeleteSignatureMutation,
  useUpdateSignatureMutation,
  useUpdatePatientMutation,
} from "@/Redux/features/patient/patient-info/patientInfoApi";

const { TextArea } = Input;

const PatientInfo = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.patientInfo;
  // console.log(id);
  const [active, setActive] = useState(false);
  const [Guarantor, setGuarantor] = useState(false);
  const [checkLocation, setLocation] = useState(false);
  //file uploaded issue
  const [signatureUpload, setSignatureUpload] = useState("");
  const token = getAccessToken();
  const [hook, setHook] = useState("");
  const [imageData, setImageData] = useState(null);
  const [filenameData, setFilenameData] = useState(null);
  const [uploadButton, setUploadButton] = useState(false);

  //File Upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // update patient info
  const [
    updatePatientInfo,
    { isSuccess: patientUpdateSuccess, isError: patientUpdateError },
  ] = useUpdatePatientMutation();

  useEffect(() => {
    if (patientUpdateSuccess) {
      toast.success("Patient info updated successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (patientUpdateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [patientUpdateSuccess, patientUpdateError]);

  // update signature
  const [
    updateSignature,
    { isSuccess: signUpdateSuccess, isError: signUpdateError },
  ] = useUpdateSignatureMutation();
  const uploadSignature = () => {
    const signData = imageData.split(",");
    updateSignature({
      token,
      payload: {
        patient_id: id,
        signature_file_name: filenameData,
        signature_file: signData[1],
      },
    });
  };

  useEffect(() => {
    if (signUpdateSuccess) {
      toast.success("Signature updated successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (signUpdateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [signUpdateSuccess, signUpdateError]);

  // delete signature
  const [
    deleteSignature,
    { isSuccess: signDeleteSuccess, isError: signDeleteError },
  ] = useDeleteSignatureMutation();
  const deletePreview = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setUploadButton(false);
    deleteSignature({
      token,
      payload: { patient_id: id },
    });
  };
  useEffect(() => {
    if (signDeleteSuccess) {
      toast.success("Signature deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (signDeleteError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [signDeleteSuccess, signDeleteError]);
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    setFilenameData(file.name);
    const base64 = await convertBase64(file);
    setImageData(base64);
    setUploadButton(true);
  };

  const { data: PatienInfoData, isLoading: patientinfoloading } =
    useGetPatientInfoQuery({
      token,
      id,
    });

  const data =
    id > 0 && PatienInfoData?.patient_info?.length > 0
      ? PatienInfoData?.patient_info[0]
      : [];

  // console.log("data -- ", data);
  const patient_details = data?.patientDetails?.data?.client_info;
  const patientOtherDetails = data?.patientDetails?.data?.client_other_info;
  const loading = data?.loading;
  const primaryPhone = data?.patient_phone_number;
  const primaryEmail = data?.patient_email;

  // console.log("patient details", patient_details);
  // console.log("patient other details", patientOtherDetails);

  const [dob, setDob] = useState();
  // console.log("dob", dob);
  //for showing default date in real time
  useEffect(() => {
    setDob(data?.patient_dob);
  }, [data?.patient_dob]);

  useEffect(() => {
    setTimeout(() => {
      // console.log("hello world ");
    }, 1000);
  }, [patient_details]);

  /*console.log(
    "data?.patientDetails?.data?.address-",
    data?.patientDetails?.data?.address
  );*/

  const { register, control, handleSubmit, reset, setValue, getValues } =
    useForm({
      defaultValues: {
        address: data?.patient_other_addresses,
        number: data?.patient_other_phone_number,
        Email: data?.patient_other_email,
      },
    });

  // this code very important
  useEffect(() => {
    reset({
      address: data?.patient_other_addresses,
      number: data?.patient_other_phone_number,
      Email: data?.patient_other_email,
    });
  }, [
    data?.patient_other_addresses,
    data?.patient_other_phone_number,
    data?.patient_other_email,
    reset,
  ]);
  // patient_details?.client_address, patient_details?.client_email, patient_details?.client_phone, reset

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
    keyName: "addressId",
  });

  const {
    fields: phoneFields,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    control,
    name: "number",
    keyName: "phoneId",
  });

  const {
    fields: emailFields,
    append: emailAppend,
    remove: emailRemove,
  } = useFieldArray({
    control,
    name: "Email",
    keyName: "emailId",
  });

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        first_name: data?.patient_first_name,
        middle_name: data?.patient_middle_name
          ? patient_details?.patient_middle_name
          : null,
        last_name: data?.patient_last_name,
        login_email: data?.patient_email,
        zone: data?.zone,
        gender: data?.patient_gender,
        race_details: data?.race_ethnicity,
        language: data?.preferred_language,
        first_date: data?.patient_date_first_seen,
        assignment: data?.asignment,
        group2: data?.patient_email_type,
        email_ok: data?.patient_email_reminder == 1 ? true : false,
        patient_parent_first_name: data?.patient_parent_first_name,
        patient_parent_last_name: data?.patient_parent_last_name,
        //checkedActive: patient_details?.is_active_client,
        // address
        client_street: data?.patient_main_address?.street,
        client_city: data?.patient_main_address?.city,
        client_state: data?.patient_main_address?.state,
        client_zip: data?.patient_main_address?.zip,
        // all gurantor
        guarantor_first_name:
          data?.patient_guarantor_info?.guarantor_first_name,
        guarantor_last_name: data?.patient_guarantor_info?.guarantor_last_name,
        guarantor_check_Date: data?.patient_guarantor_info?.guarantor_dob,
        GuaratorStreet: data?.patient_guarantor_info?.guarantor_street,
        GuaratorCity: data?.patient_guarantor_info?.guarantor_city,
        GuratorCountry: data?.patient_guarantor_info?.guarantor_state,
        GuratorZip: data?.patient_guarantor_info?.guarantor_zip,
        notes: data?.patient_notes,
        background_color: data?.background_color,
        //relationship: data?.patient_relationship,
      });
      setPreviewUrl(null);
      if (data?.patient_signature != "") {
        setPreviewUrl("data:image/png;base64," + data?.patient_signature);
      }

      if (data?.patient_relationship !== "Self") {
        setGuarantor(true);
        setRelation(data?.patient_relationship);
      } else {
        setGuarantor(false);
        setRelation(data?.patient_relationship);
      }
    }, 0);
  }, [data?.patient_relationship, data, reset]);
  const onSubmit = (data) => {
    // console.log("Full Data", data);
    const payload = {
      patient_id: id,
      patient_first_name: data.first_name,
      patient_middle_name: data.middle_name,
      patient_last_name: data.last_name,
      patient_dob: data.guarantor_check_Date,
      patient_gender: data.gender,
      patient_relationship: data.relationship,
      patient_parent_first_name: data.patient_parent_first_name,
      patient_parent_last_name: data.patient_parent_last_name,
      patient_main_address: {
        street: data.client_street,
        city: data.client_city,
        state: data.client_state,
        zip: data.client_zip,
      },
      patient_other_addresses: data.address,
      patient_email: data.login_email,
      patient_email_type: data.group2,
      patient_email_reminder: data.send_mail,
      patient_other_email: data.Email,
      patient_phone_number: data.phone_number,
      patient_phone_is_send_sms: data.phonecheck,
      patient_other_phone_number: data.number,
      pos: data.pos,
      zone: data.zone,
      race_ethnicity: data.race_details,
      preferred_language: data.language,
      patient_date_first_seen: data.first_date,
      asignment: data.phonecheck,
      patient_guarantor_info: {
        guarantor_first_name: data.guarantor_first_name,
        guarantor_last_name: data.guarantor_last_name,
        guarantor_dob: data.guarantor_check_Date,
        guarantor_street: data.GuaratorStreet,
        guarantor_city: data.GuaratorCity,
        guarantor_state: data.GuratorCountry,
        guarantor_zip: data.GuratorZip,
      },
      patient_notes: data.notes,
      background_color: data.background_color,
    };
    // console.log("payload - ", payload);
    updatePatientInfo({
      token,
      payload,
    });
  };

  ///relation value handle
  const [relation, setRelation] = useState(data?.patient_relationship);
  const settingRelation = (e) => {
    // console.log("e value", e.target.value);
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
    // console.log("getvalue street", getValues("Street"));
    // console.log("getvalue city", getValues("City"));
    // console.log("getvalue country", getValues("country"));
    // console.log("getvalue zip", getValues("zip"));
  };

  // console.log("patientAdd");

  // console.log("fields", phoneFields);
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
              {/* {patient_details?.admin_id && (
                <DynamicAddress
                  adData={{
                    fields,
                    register,
                    remove,
                  }}
                />
              )} */}
              <DynamicAddress
                adData={{
                  fields,
                  register,
                  remove,
                }}
                patientId={id}
              />

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
                  patientId={id}
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
                  patientId={id}
                />
              </motion.div>
            </div>
          </div>

          <AboutPatient
            register={register}
            patientData={data}
            setValue={setValue}
            getValues={getValues}
          ></AboutPatient>
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
            {/* <div className="w-full">
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
            </div> */}
            <div className="w-full sm:col-span-2">
              <div className="label mb-2">
                <span className=" label-font">Patient Notes</span>
              </div>
              <textarea
                className="input-border input-font py-[1px] w-full focus:outline-none"
                {...register("notes")}
                rows={4}
                cols={40}
              />
            </div>
            <div className="w-full sm:col-span-2">
              <div className="label mb-2">
                <span className=" label-font">Upload Signature</span>
              </div>
              <div
                class="flex items-center justify-center w-full"
                onChange={handleFileChange}
              >
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-[100px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Select your Signature</span>
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={handleFileRead}
                  />
                </label>
              </div>
            </div>
            {previewUrl && (
              <div className="w-full sm:col-span-2">
                <div className="label mb-2">
                  <span className="label-font">Preview</span>
                </div>
                <div className="h-[100px] border border-gray-600 rounded p-2 flex">
                  <img src={previewUrl} alt="Preview" className="w-[95%]" />
                  <button
                    id="delete-btn"
                    onClick={deletePreview}
                    className="w-[5%] text-rose-600 font-bold text-center"
                  >
                    X
                  </button>
                </div>
                <div class="text-center">
                  {uploadButton && (
                    <span className="dtm-button" onClick={uploadSignature}>
                      Upload Signature
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* <div className="w-full sm:col-span-2">
              <div className="label mb-2">
                <span className=" label-font">Additional Information:</span>
              </div>
              <TextArea rows={4} placeholder="Notes" size="large" />
            </div> */}

            {/* <div className="ml-2 mt-[12px] ">
              <CustomFileUploader
                signatureUpload={signatureUpload}
                setSignatureUpload={setSignatureUpload}
              ></CustomFileUploader>
              <p className="mt-3 text-sm ">Upload Signature</p>
            </div> */}
          </div>

          {/* <div className="my-10"> */}
          {/* <div className="flex items-center justify-around gap-2 mb-4 ">
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
            </div> */}
          {/* <div className="flex items-center justify-around gap-5 mb-4 ">
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
            </div> */}
          {/* <div className="flex items-center justify-around gap-5 mb-4 ">
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
            </div> */}
          {/* <div className="flex items-center justify-around gap-5 mb-4 ">
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
            </div> */}

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
          {/* </div> */}
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

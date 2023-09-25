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
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
const { TextArea } = Input;

const PatientInfo = () => {
  const [active, setActive] = useState(false);
  const [Guarantor, setGuarantor] = useState(false);
  const [relation, setRelation] = useState("Self");
  const [checkLocation, setLocation] = useState(false);
  //file uploaded issue
  const [signatureUpload, setSignatureUpload] = useState("");

  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.patientInfo;
  console.log(id);

  const { register, control, handleSubmit, reset, setValue, getValues } =
    useForm();
  const onSubmit = (data) => {
    console.log(data);
    const is_client_active = data?.checkedActive ? 1 : 0;
    const formData = {
      is_client_active,
    };
    console.log(formData);
    // //console.log(file);
  };

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

  const handleChange = (event) => {
    if (event.target.checked) {
      setGuarantor(true);
    } else {
      setGuarantor(false);
    }
  };

  //! relation value handle
  const [hook, setHook] = useState("");

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
  return (
    <div>
      {" "}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BasicInfo
            adData={{
              // dob,
              // setDob,
              // control,
              // Controller,
              // setActive,
              // active,
              settingRelation,
              register,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 my-1 mr-2 gap-x-6 gap-y-1 mt-5">
            <div className="pr-6">
              <PrimaryAddress append={append} rg={register} />
              <br></br>
              {/* {patient_details?.admin_id && ( */}
              <DynamicAddress
                adData={{
                  fields,
                  register,
                  remove,
                }}
              />
              {/* )} */}

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
                  // primaryPhone,
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
                {/* <DynamicPhone
                  adData={{
                    // phoneFields,
                    phoneRemove,
                    register,
                  }}
                /> */}
              </motion.div>
            </div>
            {/* Email  */}
            <div className="">
              <PrimaryEmail
                adData={{
                  emailAppend,
                  register,
                  // primaryEmail,
                }}
              />
              <br></br>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* <DynamicEmail
                  adData={{
                    register,
                    // emailFields,
                    emailRemove,
                  }}
                /> */}
              </motion.div>
            </div>
          </div>

          <AboutPatient register={register}></AboutPatient>
          <Divider></Divider>
          <div className="flex ml-1 mt-1 items-center">
            {/* <input
              disabled={relation === "Self" ? true : false}
              type="checkbox"
              // checked={relation !== "Self"}
              onChange={handleChange}
              id="checkbox"
            /> */}
            <input
              disabled={relation === "Self"}
              type="checkbox"
              // checked={Guarantor}
              onChange={handleChange}
              id="checkbox"
            />

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
                // SameasPatientBtn={SameasPatientBtn}
                hook={hook}
              ></GuarantorInfo>
            </motion.div>
          )}

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-1 mr-2 gap-x-3 gap-y-1">
            <div className="mt-3">
              <TextArea rows={7} placeholder=" Notes" size="large" />
            </div>

            {/* <div className="ml-2 mt-[12px] ">
              <div>dfsdg</div>
              <p className="mt-3 text-sm ">Upload Signature</p>
            </div> */}
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

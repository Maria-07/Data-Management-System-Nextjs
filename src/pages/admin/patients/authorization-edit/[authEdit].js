import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useGetPatientAuthorizationActivityQuery,
  useGetPatientAuthorizationInfoQuery,
  usePatientAuthorizationUpdateMutation,
} from "@/Redux/features/patient/authorization/authorizationApi";
import Loading from "@/component/UI/Layouts/Loading";
import BoolConverter from "@/shared/BoolConverter/BoolConverter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { BiSolidRightArrow } from "react-icons/bi";
import CustomDateRange from "@/shared/CustomDateRange/CustomDateRange";
import { Switch } from "antd";
import AuthorizationActivityNestedTable from "@/component/UI/Patients/Patients/Authorization/AuthorizationEdit/AuthorizationActivityNestedTable";
import AuthorizationActivityAddModal from "@/component/UI/Patients/Patients/Authorization/AuthorizationActivityTable/AuthorizationActivityAddModal";
import RootLayout from "@/component/Layouts/RootLayout";
import { FaArrowsAltH } from "react-icons/fa";
import { toast } from "react-toastify";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const AuthorizationEdit = () => {
  const [textNotes, setTextNotes] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [authEditData, setauthEditData] = useState([]);
  const [treatmentType, setTreatmentType] = useState();

  const handleClose = () => {
    setAddServiceModal(false);
  };

  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.authEdit;
  const patientId = localStorage.getItem("PId");
  const token = getAccessToken();

  //! Patient authorization info API(ID wise) and RTK-query
  const {
    data: authorizationInfo,
    isLaoding,
    isError,
  } = useGetPatientAuthorizationInfoQuery({
    token,
    id,
  });
//console.log('authorizationInfo',authorizationInfo?.authorization_details[0]);
  //! Patient Authorization Activity nested table data api
  const {
    data: allActivityData,
    isLoading: activityLoading,
    isError: activityError,
  } = useGetPatientAuthorizationActivityQuery({
    token, id
    /*payload: {
      authorization_id: id,
    },*/
  });

  //! Patient Authorization update api
  const [
    patientAuthorizationUpdate,
    { isSuccess: updateSuccess, isError: updateError },
  ] = usePatientAuthorizationUpdateMutation();

  const allAuthorizationActivity = allActivityData?.authorization_service_list || [];

  //! API date Data Destructring
  let selectedDate =
    authorizationInfo?.client_authorization_info?.selected_date || null;
    const authData = {
      description : authorizationInfo?.authorization_details[0]?.description,
      authorization_name : '',
      payor_id : authorizationInfo?.authorization_details[0]?.insurance_id,
      authorization_number : authorizationInfo?.authorization_details[0]?.authorization_number,
      uci_id : authorizationInfo?.authorization_details[0]?.insurance_id,
      treatment_type : authorizationInfo?.authorization_details[0]?.tx_type,
      treatment_type_id : '',
      supervisor_id : '',
      diagnosis_one : authorizationInfo?.authorization_details[0]?.diagnosis_one,
      diagnosis_two : authorizationInfo?.authorization_details[0]?.diagnosis_two,
      diagnosis_three : authorizationInfo?.authorization_details[0]?.diagnosis_three,
      diagnosis_four : authorizationInfo?.authorization_details[0]?.diagnosis_four,
      deductible : authorizationInfo?.authorization_details[0]?.deductible,
      in_network : authorizationInfo?.authorization_details[0]?.in_network,
      copay : authorizationInfo?.authorization_details[0]?.copay,
      cms_four : authorizationInfo?.authorization_details[0]?.cms_four,
      cms_eleven : authorizationInfo?.authorization_details[0]?.cms_eleven,
      is_valid : authorizationInfo?.authorization_details[0]?.is_active,
      is_placeholder : authorizationInfo?.authorization_details[0]?.is_placeholder,
      is_primary : false,
      notes : authorizationInfo?.authorization_details[0]?.notes,
    };

  // API Destructuring
  const {
    description,
    authorization_name,
    payor_id,
    authorization_number,
    uci_id,
    treatment_type,
    treatment_type_id,
    supervisor_id,
    diagnosis_one,
    diagnosis_two,
    diagnosis_three,
    diagnosis_four,
    deductible,
    in_network,
    copay,
    cms_four,
    cms_eleven,
    is_valid,
    is_placeholder,
    is_primary,
    notes,
  } = authData || {};

  //Toggle handler code
  const [network, setNetwork] = useState(BoolConverter(in_network));
  const [valid, setValid] = useState(BoolConverter(is_valid));
  const [place_holder, setPlace_holder] = useState(
    BoolConverter(is_placeholder)
  );

  //! All payors array
  const txType = authorizationInfo?.treatment_types;

  //!All supervisor array
  const insurance = authorizationInfo?.all_payors;

  //!All treatment types
  const supvProvider = authorizationInfo?.supervisor;

  //! initial TxType
  useEffect(() => {
    setTreatmentType(treatment_type);
  }, [treatment_type]);

  useEffect(() => {
    setNetwork(BoolConverter(in_network));
  }, [in_network]);

  useEffect(() => {
    setValid(BoolConverter(is_valid));
  }, [is_valid]);

  useEffect(() => {
    setPlace_holder(BoolConverter(is_placeholder));
  }, [is_placeholder]);

  //!-------------------Date Range Picker
  const [startD, setStartD] = useState(null);
  const [endD, setEndD] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      // startDate: new Date(),
      startDate: null,
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

  // date range picker Start Date and End Date Modifer Part
  const startDate = range ? range[0]?.startDate : null;
  const endDate = range ? range[0]?.endDate : null;
  // console.log("calender date", startDate, endDate);
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

  //!-------------------Date Range Picker END

  //Date spliter function
  const SingleDate = (x) => {
    const singlyValue = x.split("-", 2);
    return {
      first: singlyValue[0],
      last: singlyValue[1],
    };
  };
  //Date to String Date converter function
  const convertToString = (param) => {
    let splitedData = param.split("/");
    //console.log(splitedData);
    const monthNumber = splitedData[0];

    const date = new Date();
    date.setMonth(monthNumber - 1);

    const createDate = date.toLocaleString("en-US", { month: "short" });
    const newDate = `${createDate} ${splitedData[1]}, ${splitedData[2]}`;
    return newDate;
  };
  //String Date to [mm/dd/yy] converter function
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");
  }
  useEffect(() => {
    if (selectedDate !== null) {
      let result = SingleDate(selectedDate);
      setStartD(convertToString(result?.first));
      setEndD(convertToString(result?.last));
    }
  }, [selectedDate]);
  // console.log(startD, endD);

  // Hide calendar on outside click
  const refClose = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refClose.current && !refClose.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  };
  //end outside click

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        description: description || null,
        authorization_number: authorization_number || null,
        uci_id: uci_id || null,
        start_date: startDate
          ? `${startMonth} ${startDay}, ${startYear}`
          : startD,
        end_date: endDate ? `${endMonth} ${endDay}, ${endYear}` : endD,
        is_primary,
        diagnosis_one,
        diagnosis_two,
        diagnosis_three,
        diagnosis_four,
        deductible,
        cms_four,
        cms_eleven,
        copay,
        notes,
      });
    }, 0);
  }, [
    startD,
    endD,
    reset,
    startDate,
    endDate,
    is_primary,
    diagnosis_one,
    diagnosis_two,
    diagnosis_three,
    diagnosis_four,
    deductible,
    cms_four,
    cms_eleven,
    copay,
    authorization_number,
    description,
    endDay,
    endMonth,
    endYear,
    startDay,
    startMonth,
    startYear,
    uci_id,
    notes,
  ]);

  const onSubmit = (data) => {
    console.log(data);
    /*const payload = {
      edit_authorization_id: id,
      ...data,
      select_date: `${convert(data?.start_date)} - ${convert(data?.end_date)}`,
      in_network: BoolConverter(network),
      is_valid: BoolConverter(valid),
      is_placeholder: BoolConverter(place_holder),
      notes: textNotes,
    };*/
    const payload = {
      "authorization_id": id,
      "diagnosis_one": data.diagnosis_one,
      "diagnosis_two": data.diagnosis_two,
      "diagnosis_three": data.diagnosis_three,
      "diagnosis_four": data.diagnosis_four,
    }
    patientAuthorizationUpdate({
      token,
      payload,
    });
    console.log(payload);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Successfully Authorization Updated", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (updateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [updateSuccess, updateError]);

  if (isLaoding) {
    return <Loading></Loading>;
  }

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {/* Changes needed */}
        <Link
          href={`/admin/patients/patient-authorization/${patientId}`}
          className="text-primary text-lg"
        >
          <IoCaretBackCircleOutline />
        </Link>
        <div className="text-xs font-medium">
          <span className="text-sm font-semibold text-primary">Amro LLC |</span>
          <span className="text-orange-400 font-semibold"> DOB :</span>
          09/28/2021 |
          <span className="text-orange-400 font-semibold"> Phone : </span>
          (894)-023-8043 |
          <span className="text-orange-400 font-semibold"> Address : </span>
          1222, OTtn, With Jersey City NJ 32809
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-medium mx-1">Edit Auth</h1>
        {/* <Link href={`/admin/patients/patient-authorization/${patientId}`}>
          <button
            type="button"
            className="px-2 flex items-center py-2 bg-gradient-to-r from-secondary to-primary text-xs font-medium  hover:to-secondary text-white rounded-md"
          >
            <IoCaretBackCircleOutline className="mr-1 text-sm" />
            Back
          </button>
        </Link> */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-3 mr-2 gap-x-6 gap-y-3">
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    Description<span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="description"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.description}
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    Insurance
                    <span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="insurance_name"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.insurance_name}
                  disabled
                />
                  
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    Tx Type
                    <span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="tx_type"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.tx_type}
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    SUPV. Provider
                    <span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="supervisor_provider"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.supervisor_provider}
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">Selected date</h1>
                </label>
                
                <input
                  type="text"
                  name="selected_date"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.selected_date}
                  disabled
                />
              </div>

              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    Authorization Number
                    <span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="authorization_number"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  {...register("authorization_number")}
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    UCI / Insurance ID<span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="insurance_id"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.insurance_id}
                  disabled
                />
              </div>

              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    COB
                    <span className="text-red-500">*</span>
                  </h1>
                </label>
                <input
                  type="text"
                  name="cob"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  defaultValue={authorizationInfo?.authorization_details[0]?.cob}
                  disabled
                />
              </div>

              <div className="">
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    Upload Authorization
                  </h1>
                </label>
                <input
                  type="file"
                  className=" ml-1 py-[5px]  text-xs w-full"
                  {...register("fileName")}
                  disabled
                />
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  mr-2 gap-x-4 gap-y-1">
                <div>
                  <label className="label">
                    <h1 className="label-font mb-1 mt-3  ml-1">
                      Diagnosis1<span className="text-red-500">*</span>
                    </h1>
                  </label>
                  <input
                    type="text"
                    name="diagnosis1"
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                    {...register("diagnosis_one")}
                  />
                </div>
                <div>
                  <label className="label">
                    <h1 className="label-font mb-1 mt-3  ml-1">Diagnosis2</h1>
                  </label>
                  <input
                    type="text"
                    name="diagnosis2"
                    // className="border border-gray-300 rounded-sm py-[5px] mx-2 text-xs w-full"
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                    {...register("diagnosis_two")}
                  />
                </div>
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mr-2 gap-x-4 gap-y-1">
                <div>
                  <label className="label">
                    <h1 className="label-font mb-1 mt-3  ml-1">
                      Diagnosis3<span className="text-red-500">*</span>
                    </h1>
                  </label>
                  <input
                    type="text"
                    name="diagnosis3"
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                    {...register("diagnosis_three")}
                  />
                </div>
                <div>
                  <label className="label">
                    <h1 className="label-font mb-1 mt-3  ml-1">Diagnosis4</h1>
                  </label>
                  <input
                    type="text"
                    name="diagnosis4"
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                    {...register("diagnosis_four")}
                  />
                </div>
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  mr-2 gap-x-4 gap-y-1">
                <div>
                  <label className="label">
                    <h1 className="label-font mb-1 mt-3  ml-1">Deductible</h1>
                  </label>
                  <input
                    type="text"
                    name="diagnosis1"
                    className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                    {...register("deductible")}
                    disabled
                  />
                </div>
                <div className="mt-[30px]">
                  <div className="flex ml-1 mt-1 items-center">
                    <Switch
                      checked={in_network !==false ? in_network : ''}
                      size="small"
                    />
                    <span className="text-[14px] ml-1 text-gray-600 font-medium">
                      In Network
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">CoPay</h1>
                </label>
                <input
                  type="text"
                  name="copay"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  {...register("copay")}
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    CMS 4 (Insured Name)
                  </h1>
                </label>
                <input
                  type="text"
                  name="cms4"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  {...register("cms_four")}
                  disabled
                />
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">
                    CMS 11 (Group No)
                  </h1>
                </label>
                <input
                  type="text"
                  name="cms11"
                  className="input-border-bottom text-gray-600 rounded-sm  text-[14px] font-medium ml-1 py-[1px] w-full focus:outline-none"
                  {...register("cms_eleven")}
                  disabled
                />
              </div>
              <div className="ml-2 mt-5 flex gap-3 items-center">
                <div className="flex items-center">
                  <Switch
                    checked={is_valid !==false ? is_valid : ''}
                    size="small"
                  />
                  <span className="text-[14px] ml-2 font-medium text-gray-500">
                    Active
                  </span>
                </div>
                <div className="flex items-center">
                  <Switch
                    checked={is_placeholder !== false ? is_placeholder : ''}
                    size="small"
                  />
                  <span className="text-[14px] ml-2 font-medium text-gray-500">
                    Placeholder
                  </span>
                </div>
              </div>
              <div>
                <label className="label">
                  <h1 className="label-font mb-1 mt-3  ml-1">Notes</h1>
                </label>
                <textarea
                  {...register("notes")}
                  name="comment"
                  className="border border-gray-300 text-sm p-2  ml-1 h-24 w-full"
                  disabled
                ></textarea>
              </div>
            </div>
            {/* submit  */}
            <button className=" dtm-button" type="submit">
              Save
            </button>

            <Link href={`/admin/patient/patient-authorization/${patientId}`}>
              <button className=" ml-2 dcm-close-button" autoFocus>
                Cancel
              </button>
            </Link>
          </>
        </form>
      </motion.div>
      {id && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="divider"></div>

          {/* Table */}
          <AuthorizationActivityNestedTable
            allAuthorizationActivity={allAuthorizationActivity}
            treatment_name={treatmentType}
            defaultTreatment={treatment_type}
            allTreatment={txType}
          ></AuthorizationActivityNestedTable>
        </motion.div>
      )}
      {addServiceModal && (
        <AuthorizationActivityAddModal
          id={id}
          treatment_name={treatmentType}
          handleClose={handleClose}
          open={addServiceModal}
        ></AuthorizationActivityAddModal>
      )}
    </div>
  );
};

export default AuthorizationEdit;

AuthorizationEdit.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

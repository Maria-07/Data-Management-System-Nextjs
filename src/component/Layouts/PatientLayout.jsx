import { motion } from "framer-motion";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import {
  BiData,
  BiLogoPaypal,
  BiSolidUserRectangle,
  BiTimer,
  BiUserCircle,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IoCall,
  IoCaretBackCircleOutline,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import Image from "next/image";
import doctor from "../../assets/img/doctor.png";
import { AiOutlineFileAdd, AiOutlineFileText } from "react-icons/ai";
import { getPatientsDetails } from "@/Redux/features/patient/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { FaBusinessTime, FaUsers } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";
import axios from "axios";
import { RiMiniProgramLine } from "react-icons/ri";

const PatientLayout = ({ id, children }) => {
  //! Theme system
  const { theme } = useTheme();
  // const [patientId, setPatientId] = useState(id);
  const [patientData, setPatientData] = useState([]);
  const [patientAddress, setPatientAddress] = useState([]);
  const patientId = localStorage.getItem("PId");
  // console.log("user iddd", patientId);

  //! main parent component for all patient related components
  // localStorage.setItem("p_key", id);
  const token = getAccessToken();
  const dispatch = useDispatch();
  useEffect(() => {
    // action dispatched
    dispatch(
      getPatientsDetails({
        payload: {
          patient_id: id,
        },
        token,
      })
    );
  }, [token]);

  useEffect(() => {
    const getPatientData = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/patient/nav-info/${patientId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token || null,
        },
      });
      const data = res?.data?.patient_info;
      setPatientData(data[0]);
      const addressData = {
        street: data[0]?.patient_main_address?.street,
        city: data[0]?.patient_main_address?.city,
        state: data[0]?.patient_main_address?.state,
        zip: data[0]?.patient_main_address?.zip,
      };
      setPatientAddress(addressData);
      //setStuffs(data);
    };
    getPatientData();
  }, [token]);
  //console.log('patientData',patientData.patient_main_address.street);
  //console.log('patientAddress',patientAddress);
  //! links
  const patientSidebar = [
    {
      icon: <BiUserCircle />,
      link_name: "Patient Info",
      link: `/provider/patients/patient-info/${patientId}`,
    },
    {
      icon: <BsClipboard2Data />,
      link_name: "Clinical Data",
      link: `/provider/patients/clinical-data/${patientId}`,
    },
    {
      icon: <RiMiniProgramLine />,
      link_name: "programs",
      link: `/provider/patients/programs/${patientId}`,
    },
    {
      icon: <AiOutlineFileAdd />,
      link_name: "Patient Vob",
      link: `/provider/patients/patient-vob/${patientId}`,
    },
    {
      icon: <BiSolidUserRectangle />,
      link_name: "Patient Authorization",
      link: `/provider/patients/patient-authorization/${patientId}`,
    },
    {
      icon: <IoDocumentTextOutline />,
      link_name: "Documents",
      link: `/provider/patients/patient-documents/${patientId}`,
    },
    /*{
      icon: <FaBusinessTime />,
      link_name: "Patient Ledger",
      link: `/provider/patients/patient-ledger/${patientId}`,
    },
    {
      icon: <BiTimer />,
      link_name: "Patient Portal",
      link: `/provider/patients/patient-portal/${patientId}`,
    },
    {
      icon: <IoCloudUploadOutline />,
      link_name: "Patient Intake",
      link: `/provider/patients/patient-intake/${patientId}`,
    },*/
    {
      icon: <IoCall />,
      link_name: "Call Log",
      link: `/provider/patients/patient-callLog/${patientId}`,
    },
    /*{
      icon: <FaUsers />,
      link_name: "Sibling",
      link: `/provider/patients/patient-sibling/${patientId}`,
    },
    {
      icon: <BiLogoPaypal />,
      link_name: "Patient Payment",
      link: `/provider/patients/patient-payment-info/${patientId}`,
    },*/
    {
      icon: <BsClipboard2Data />,
      link_name: "Session Notes",
      link: `/provider/patients/patient-session-notes/${patientId}`,
    },
    /*{
      icon: <AiOutlineFileText />,
      link_name: "Clinicians Team",
      link: `/provider/patients/patient-clinicians/${patientId}`,
    },*/
  ];

  //! Theme system done
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Link href={"/patients"} className="text-primary text-lg">
          <IoCaretBackCircleOutline />
        </Link>
        <div className="text-xs font-normal">
          <span className="text-sm font-semibold text-primary">
            {patientData.patient_last_name}, {patientData.patient_first_name} |
          </span>
          <span className="text-orange-400 font-semibold">DOB :</span>
          {patientData.patient_dob} |
          <span className="text-orange-400 font-semibold">Phone : </span>
          {patientData.patient_first_name} |
          <span className="text-orange-400 font-semibold">Address : </span>
          {patientAddress.street}, {patientAddress.city}, {patientAddress.state}
          , {patientAddress.zip}
        </div>
      </div>
      <div className="grid sm:grid-cols-12 grid-cols-1">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-2 my-2 border-[1px] lg:col-span-2 shadow-md rounded-md min-h-[20vh] ${
            theme === "dark"
              ? "bg-dark-background border-dark-background"
              : "secondary"
          }`}
        >
          <div className="">
            <div className="">
              <Image
                src={doctor}
                className=" m-auto rounded-full border border-gray-100"
                alt="doctor"
                height={120}
                width={"auto"}
              />
            </div>
          </div>
          {patientSidebar.map((s, i) => (
            <SettingSidebar key={i} data={s}></SettingSidebar>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`sm:m-2 sm:p-4 lg:col-span-10 md:col-span-11 border-[1px] shadow-md rounded-lg min-h-screen ${
            theme === "dark"
              ? "bg-dark-background border-dark-background"
              : "secondary"
          }`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PatientLayout;

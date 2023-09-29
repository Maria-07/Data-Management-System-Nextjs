import { motion } from "framer-motion";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import {
  BiData,
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
import { AiOutlineFileAdd } from "react-icons/ai";
import { getPatientsDetails } from "@/Redux/features/patient/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { FaBusinessTime } from "react-icons/fa";

const PatientLayout = ({ id, children }) => {
  //! Theme system
  const { theme } = useTheme();
  // const [patientId, setPatientId] = useState(id);

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
  }, [id, dispatch, token]);

  //! links
  const patientSidebar = [
    {
      icon: <BiUserCircle />,
      link_name: "Patient Info",
      link: `/admin/patients/patient-info/${patientId}`,
    },
    {
      icon: <AiOutlineFileAdd />,
      link_name: "Patient Vob",
      link: `/admin/patients/patient-vob/${patientId}`,
    },
    {
      icon: <BiSolidUserRectangle />,
      link_name: "Patient Authorization",
      link: `/admin/patients/patient-authorization/${patientId}`,
    },
    {
      icon: <IoDocumentTextOutline />,
      link_name: "Documents",
      link: `/admin/patients/patient-documents/${patientId}`,
    },
    {
      icon: <FaBusinessTime />,
      link_name: "Patient Ledger",
      link: `/admin/patients/patient-ledger/${patientId}`,
    },
    {
      icon: <BiTimer />,
      link_name: "Patient Portal",
      link: `/admin/patients/patient-portal/${patientId}`,
    },
    {
      icon: <IoCloudUploadOutline />,
      link_name: "Patient Intake",
      link: `/admin/patients/patient-intake/${patientId}`,
    },
    {
      icon: <IoCall />,
      link_name: "Call Log",
      link: `/admin/patients/patient-callLog/${patientId}`,
    },
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
            Full Name |
          </span>
          <span className="text-orange-400 font-semibold">DOB :</span>
          Dob |<span className="text-orange-400 font-semibold">Phone : </span>
          1231212312 |
          <span className="text-orange-400 font-semibold">Address : </span>
          street, city, state zip
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

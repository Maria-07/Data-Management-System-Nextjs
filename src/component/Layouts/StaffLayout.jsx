import { motion } from "framer-motion";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import {
  BiBuilding,
  BiData,
  BiLogoPaypal,
  BiSolidContact,
  BiSolidUserDetail,
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
import {
  AiOutlineFileAdd,
  AiOutlineFileText,
  AiOutlineIdcard,
} from "react-icons/ai";
import { getPatientsDetails } from "@/Redux/features/patient/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { FaBusinessTime, FaUsers } from "react-icons/fa";
import {
  BsCardText,
  BsClipboard2Data,
  BsHddNetwork,
  BsInboxFill,
  BsJournalRichtext,
  BsPersonBadge,
  BsPersonCircle,
  BsPersonVcard,
  BsReceiptCutoff,
} from "react-icons/bs";

const StaffLayout = ({ children }) => {
  //! Theme system
  const { theme } = useTheme();
  // const [staffId, setstaffId] = useState(id);

  const staffId = localStorage.getItem("SId");
  // console.log("user iddd", staffId);

  //! links
  const staffSidebar = [
    {
      icon: <BiUserCircle />,
      link_name: "Staff Bio",
      link: `/admin/staffs/staff-bio/${staffId}`,
    },
    {
      icon: <BiSolidContact />,
      link_name: "Contact Info",
      link: `/admin/staffs/contact-info/${staffId}`,
    },
    {
      icon: <BsPersonCircle />,
      link_name: "Credential",
      link: `/admin/staffs/credential/${staffId}`,
    },
    {
      icon: <BiBuilding />,
      link_name: "Department Supervisor",
      link: `/admin/staffs/department-supervisor/${staffId}`,
    },
    {
      icon: <BsCardText />,
      link_name: "Payroll Setup",
      link: `/admin/staffs/payroll-setup/${staffId}`,
    },
    {
      icon: <BsHddNetwork />,
      link_name: "Other SetUp",
      link: `/admin/staffs/other-setUp/${staffId}`,
    },
    {
      icon: <BsJournalRichtext />,
      link_name: "Leave Tracking",
      link: `/admin/staffs/leave-tracking/${staffId}`,
    },
    {
      icon: <AiOutlineIdcard />,
      link_name: "Insurance Exclusion",
      link: `/admin/staffs/insurance-exclusion/${staffId}`,
    },
    {
      icon: <BsInboxFill />,
      link_name: "Service Sub Type Exclusion",
      link: `/admin/staffs/service-sub-type-exclusion/${staffId}`,
    },
    {
      icon: <BsPersonBadge />,
      link_name: "Patient Exclusion",
      link: `/admin/staffs/patient-exclusion/${staffId}`,
    },
    {
      icon: <BsPersonVcard />,
      link_name: "Staff Portal",
      link: `/admin/staffs/staff-portal/${staffId}`,
    },

    {
      icon: <BsReceiptCutoff />,
      link_name: "Work Schedule",
      link: `/admin/staffs/work-schedule/${staffId}`,
    },

    {
      icon: <BiSolidUserDetail />,
      link_name: "Assigned Patient",
      link: `/admin/staffs/assigned-patient/${staffId}`,
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
          {staffSidebar.map((s, i) => (
            <SettingSidebar key={i} data={s}></SettingSidebar>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`sm:m-2 sm:p-2 lg:col-span-10 md:col-span-11 border-[1px] shadow-md rounded-lg min-h-screen p-4 ${
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

export default StaffLayout;

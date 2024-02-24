import { motion } from "framer-motion";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
import { useTheme } from "next-themes";
import {
  BiData,
  BiLogoPaypal,
  BiSolidContact,
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
import {
  BsClipboard2Data,
  BsJournalRichtext,
  BsPersonCircle,
  BsReceiptCutoff,
} from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

const BiographyLayout = ({ children }) => {
  //! Theme system
  const { theme } = useTheme();
  // const [patientId, setPatientId] = useState(id);

  //! links
  const staffSidebar = [
    {
      icon: <BiUserCircle />,
      link_name: "Bio's",
      link: `/provider/biographic/info`,
    },

    {
      icon: <BiSolidContact />,
      link_name: "Contact Info",
      link: `/provider/biographic/contact-info`,
    },
    {
      icon: <BsPersonCircle />,
      link_name: "Credential",
      link: `/provider/biographic/credential`,
    },
    // {
    //   icon: <BiBuilding />,
    //   link_name: "Department Supervisor",
    //   link: `/provider/staffs/department-supervisor/${staffId}`,
    // },
    // {
    //   icon: <BsCardText />,
    //   link_name: "Payroll Setup",
    //   link: `/provider/staffs/payroll-setup/${staffId}`,
    // },
    // {
    //   icon: <BsHddNetwork />,
    //   link_name: "Other SetUp",
    //   link: `/provider/staffs/other-setUp/${staffId}`,
    // },
    {
      icon: <BsJournalRichtext />,
      link_name: "Leave Tracking",
      link: `/provider/biographic/leave-tracking`,
    },
    // {
    //   icon: <AiOutlineIdcard />,
    //   link_name: "Insurance Exclusion",
    //   link: `/provider/staffs/insurance-exclusion/${staffId}`,
    // },
    // {
    //   icon: <BsInboxFill />,
    //   link_name: "Service Sub Type Exclusion",
    //   link: `/provider/staffs/service-sub-type-exclusion/${staffId}`,
    // },
    // {
    //   icon: <BsPersonBadge />,
    //   link_name: "Patient Exclusion",
    //   link: `/provider/staffs/patient-exclusion/${staffId}`,
    // },
    // {
    //   icon: <BsPersonVcard />,
    //   link_name: "Staff Portal",
    //   link: `/provider/staffs/staff-portal/${staffId}`,
    // },
    {
      icon: <BsReceiptCutoff />,
      link_name: "Work Schedule",
      link: `/provider/biographic/work-schedule`,
    },
    {
      icon: <IoMdNotificationsOutline />,
      link_name: "Notification Settings",
      link: `/provider/biographic/notification-setting`,
    },
    // {
    //   icon: <BiSolidUserDetail />,
    //   link_name: "Assigned Patient",
    //   link: `/provider/staffs/assigned-patient/${staffId}`,
    // },
  ];

  //! Theme system done
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Link href={"/patients"} className="text-primary text-lg">
          <IoCaretBackCircleOutline />
        </Link>
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

export default BiographyLayout;

import { motion } from "framer-motion";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { BiData, BiUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IoCaretBackCircleOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import Image from "next/image";
import doctor from "../../assets/img/doctor.png";
import { AiOutlineFileAdd } from "react-icons/ai";

const PatientLayout = ({ id, children }) => {
  //! Theme system
  const { theme } = useTheme();

  const [patientId, setPatientId] = useState(id);

  const patientSidebar = [
    {
      icon: <BiUserCircle />,
      link_name: "Patient Info",
      link: `/patients/patient-info/${patientId}`,
    },
    {
      icon: <AiOutlineFileAdd />,
      link_name: "Patient Vob",
      link: `/patients/patient-vob/${patientId}`,
    },
    {
      icon: <IoDocumentTextOutline />,
      link_name: "Patient Documents",
      link: `/patients/patient-documents/${patientId}`,
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

/* eslint-disable react-hooks/rules-of-hooks */
import {
  FaUser,
  FaUserFriends,
  FaBoxOpen,
  FaWpforms,
  FaRegAddressCard,
} from "react-icons/fa";
import { TbBuildingHospital, TbFileTime } from "react-icons/tb";
import { BiRename, BiLinkAlt, BiFolderOpen } from "react-icons/bi";
import {
  BsHouseDoor,
  BsFileEarmarkMedical,
  BsFileEarmark,
  BsFolder2Open,
  BsBox,
} from "react-icons/bs";
import { MdOutlinePayment, MdTrackChanges } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { TbArrowsRightLeft } from "react-icons/tb";
import {
  AiOutlineUserAdd,
  AiOutlineUser,
  AiOutlineFile,
  AiOutlineMail,
  AiOutlineCloud,
} from "react-icons/ai";
import {
  RiSettingsFill,
  RiHospitalLine,
  RiSendPlaneLine,
  RiFolderUserLine,
} from "react-icons/ri";
import { FiLayers, FiAnchor } from "react-icons/fi";
import {
  dashboardCount,
  task,
  patient,
  staffs,
  billing,
  scheduler,
  reports,
} from "@/component/Data/Data";
import RootLayout from "@/component/Layouts/RootLayout";
import BarChart from "@/component/UI/Dashboard/BarChart";
import DashboardNumbers from "@/component/UI/Dashboard/DashboardNumbers";
import LineChart from "@/component/UI/Dashboard/LineChart";
import Tables from "@/component/UI/Dashboard/Tables";
import TreatmentBarChart from "@/component/UI/Dashboard/TreatmentBarChart";
import { motion } from "framer-motion";
import {
  useGetDashboardCountQuery,
  useGetPatientInfoQuery,
  useGetSchedularInfoQuery,
} from "@/Redux/features/dashboard/dashboardApi";
import { getAccessToken } from "@/Redux/api/apiSlice";

const dashboardPage = () => {
  const token = getAccessToken();
  const { data: dataCount, isLoading: dataCountLoading } =
    useGetDashboardCountQuery({
      token,
    });
  // console.log("dataCount : ", dataCount);
  let clientCount = 0;
  let sessionRendered = 0;
  let sessionUnrendered = 0;
  let unbilledSessions = 0;
  if (dataCount !== undefined) {
    clientCount = dataCount?.clients;
    sessionRendered = dataCount?.sessions_rendered;
    sessionUnrendered = dataCount?.sessoins_unrendered;
    unbilledSessions = dataCount?.unbilled_sessions;
  }

  const dashboardCountList = [
    {
      icon: <FaUser />,
      number: `${clientCount}`,
      info: "Total No. of Patients",
      bgClass: "bg-gradient-to-b from-cyan-400 to-violet-900",
      iColor: "bg-blue-600",
    },
    {
      icon: <FaUser />,
      number: `${sessionRendered}`,
      info: "Sessions Rendered",
      bgClass: "bg-gradient-to-b from-orange-300 to-red-700",
      iColor: "bg-red-700",
    },
    {
      icon: <ImUsers />,
      number: `${sessionUnrendered}`,
      info: "Sessions Unrendered",
      bgClass: "bg-gradient-to-b from-teal-400 to-blue-900",
      iColor: "bg-blue-600",
    },
    {
      icon: <TbBuildingHospital />,
      number: `${unbilledSessions}`,
      info: "Unbilled Sessions",
      bgClass: "bg-gradient-to-b from-emerald-300 to-emerald-900 ",
      iColor: "bg-green-800",
    },
  ];

  const { data: patientCount, isLoading: patientCountLoading } =
    useGetPatientInfoQuery({
      token,
    });
  // console.log("patientCount : ", patientCount);
  let expired_auths = 0;
  let expiring_auths = 0;
  let expiring_docs = 0;
  let guarantor_paid = 0;
  let missing_auths = 0;
  let placeholders = 0;
  if (dataCount !== undefined) {
    expired_auths = patientCount?.expired_auths;
    expiring_auths = patientCount?.expiring_auths;
    expiring_docs = patientCount?.expiring_docs;
    guarantor_paid = patientCount?.guarantor_paid;
    missing_auths = patientCount?.missing_auths;
    placeholders = patientCount?.placeholders;
  }
  const patient = [
    {
      report: "Expiring Documents in 30 Days",
      count: expiring_docs,
      link: "javascript:void(0)",
    },
    {
      report: "Authorization Missing",
      count: missing_auths,
      link: "javascript:void(0)",
    },
    {
      report: "Expired Authorizations",
      count: expired_auths,
      link: "javascript:void(0)",
    },
    {
      report: "Expiring Authorization in 60 Days",
      count: expiring_auths,
      link: "javascript:void(0)",
    },
    {
      report: "Authorization Place Holders",
      count: placeholders,
      link: "javascript:void(0)",
    },
    {
      report: "Patient/Guarantor pay Clients",
      count: guarantor_paid,
      link: "javascript:void(0)",
    },
  ];

  const { data: schedularCount, isLoading: schedularCountLoading } =
    useGetSchedularInfoQuery({
      token,
    });
  // console.log("patientCount : ", patientCount);
  let scheduled_not_rendered = 0;
  let sessions_not_attended_last = 0;
  let missing_signature = 0;
  let note_missing = 0;
  if (schedularCount !== undefined) {
    scheduled_not_rendered = schedularCount?.scheduled_not_rendered;
    sessions_not_attended_last =
      schedularCount?.sessions_not_attended_last_week;
    missing_signature = schedularCount?.missing_signature;
    note_missing = schedularCount?.note_missing;
  }
  const scheduler = [
    {
      report: "Scheduled Not Rendered",
      count: scheduled_not_rendered,
      link: "javascript:void(0)",
    },
    {
      report: "Sessions Not Attended Last Week",
      count: sessions_not_attended_last,
      link: "javascript:void(0)",
    },
    {
      report: "Provider Signature Missing In Session",
      count: missing_signature,
      link: "javascript:void(0)",
    },
    {
      report: "Session Note Missing",
      count: note_missing,
      link: "javascript:void(0)",
    },
  ];
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className=" text-orange-500 text-sm"
      >
        Dashboard
      </motion.h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-3 gap-5">
        {dashboardCountList.map((data, i) => (
          <DashboardNumbers key={i} data={data}></DashboardNumbers>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-5"
      >
        <TreatmentBarChart token={token}></TreatmentBarChart>
        <LineChart token={token}></LineChart>
        <BarChart token={token}></BarChart>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-5"
      >
        {/* <Tables
          tableType={task}
          tableName={<span className=" text-sm px-2">Today&apos;s Task</span>}
        ></Tables> */}
        <Tables
          tableType={patient}
          tableName={<span className=" text-sm px-2">Patient</span>}
        ></Tables>
        {/* <Tables
          tableType={staffs}
          tableName={<span className=" text-sm px-2">Staffs</span>}
        ></Tables> */}
        {/* <Tables
          tableType={billing}
          tableName={<span className=" text-sm px-2">Billing</span>}
        ></Tables> */}
        <Tables
          tableType={scheduler}
          tableName={<span className=" text-sm px-2">Scheduler</span>}
        ></Tables>
        {/* <Tables
          tableType={reports}
          tableName={<span className=" text-sm px-2">Trending Reports</span>}
        ></Tables> */}
      </motion.div>
    </div>
  );
};

export default dashboardPage;

dashboardPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

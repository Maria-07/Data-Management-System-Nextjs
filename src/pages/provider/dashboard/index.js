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
import { useGetDashboardCountQuery } from "@/Redux/features/dashboard/dashboardApi";
import { getAccessToken } from "@/Redux/api/apiSlice";

const dashboardPage = () => {
  const token = getAccessToken();
  const { data: dataCount, isLoading: dataCountLoading } =
  useGetDashboardCountQuery({
      token,
    });
  console.log('dataCount : ',dataCount);
  let clientCount = 0;
  let sessionRendered = 0;
  let sessionUnrendered = 0;
  let unbilledSessions = 0;
  if(dataCount !== undefined)
  {
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
        <LineChart></LineChart>
        <BarChart></BarChart>
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

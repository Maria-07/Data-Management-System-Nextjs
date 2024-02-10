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
import { VscServerProcess } from "react-icons/vsc";

// ***********************************************************************
// ******************************DashBoard Data Table Related***************************
// ***********************************************************************

export const dashboardCount = [
  {
    icon: <FaUser />,
    number: "77",
    info: "Total No. of Patients",
    bgClass: "bg-gradient-to-b from-cyan-400 to-violet-900",
    iColor: "bg-blue-600",
  },
  {
    icon: <FaUser />,
    number: "1303",
    info: "Sessions Rendered",
    bgClass: "bg-gradient-to-b from-orange-300 to-red-700",
    iColor: "bg-red-700",
  },
  {
    icon: <ImUsers />,
    number: "269",
    info: "Sessions Unrendered",
    bgClass: "bg-gradient-to-b from-teal-400 to-blue-900",
    iColor: "bg-blue-600",
  },
  {
    icon: <TbBuildingHospital />,
    number: "127",
    info: "Unbilled Sessions",
    bgClass: "bg-gradient-to-b from-emerald-300 to-emerald-900 ",
    iColor: "bg-green-800",
  },
];

//Table Data
export const task = [
  {
    report: "AR Follow Up Bucket",
    count: "57",
    link: "/admin/billing/ar-followup-bucket",
  },
  {
    report: "Provider Escalation",
    count: "0",
    link: "/admin/billing/ar-followup-bucket-filter-types/1",
  },
  {
    report: "Payor Escalation",
    count: "0",
    link: "/admin/billing/ar-followup-bucket-filter-types/2",
  },
  {
    report: "MG Escalation",
    count: "0",
    link: "/admin/billing/ar-followup-bucket-filter-types/3",
  },
  {
    report: "Medical Records",
    count: "0",
    link: "/admin/billing/ar-followup-bucket-filter-types/4",
  },
];
export const patient = [
  {
    report: "Expiring Authorization",
    count: "2",
    link: "/admin/auth-to-expire",
  },
  {
    report: "Patient/Guarantor",
    count: "0",
    link: "/admin/non-payor-tag",
  },
  {
    report: "No Authorization",
    count: "10",
    link: "/admin/no-authorization",
  },
  {
    report: "Co-Pay For Today",
    count: "0",
    link: "/admin/todays-copay",
  },
  {
    report: "Auth Place Holders",
    count: "0",
    link: "/admin/auth-place-holder",
  },
];
export const staffs = [
  {
    report: "Vacation(s) Pending Approval",
    count: "0",
    link: "/admin/vacation-pending",
  },
  {
    report: "Missing Credentials",
    count: "11",
    link: "/admin/missing-credentials",
  },
  {
    report: "Credentials To Expire",
    count: "0",
    link: "/admin/credentials-expire",
  },
  {
    report: "Signature Not Loaded",
    count: "0",
    link: "/admin/signature-not-update",
  },
  {
    report: " ",
    count: " ",
    link: "/admin/",
  },
];
export const billing = [
  {
    report: "Sessions Rendered - Not Billed",
    count: "321",
    link: "/admin/session-not-bulled",
  },
  {
    report: "Last Weeks Deposits",
    count: "0",
    link: "/admin/last-week-deposit",
  },
  {
    report: "Last Month Statements",
    count: "0",
    link: "/admin/last-five-statement",
  },
  {
    report: "Last Month Billed Dates ",
    count: "0",
    link: "/admin/last-month-billed-dated",
  },
  {
    report: "Pending Secondary Claims",
    count: "0",
    link: "/admin/pending-secondary",
  },
];
export const scheduler = [
  {
    report: "Scheduled Not Rendered",
    count: "71",
    link: "/admin/scheduler-not-render",
  },
  {
    report: "Sessions Not Attended Last Week",
    count: "0",
    link: "/admin/schedule-not-attend-last-week",
  },
  {
    report: "Provider Signature Missing In Session",
    count: "0",
    link: "/admin/provider-signature-missing-session",
  },
  {
    report: "Session Note Missing",
    count: "779",
    link: "/admin/session-note-missing",
  },
  {
    report: "Cancelled Session This Month",
    count: "23",
    link: "/admin/cancelled-session",
  },
];
export const reports = [
  {
    report: "Schedule Billable",
    count: "0",
    link: "/admin/session-manage",
  },
  {
    report: "Payment Deposits",
    count: "0",
    link: "/admin/m-remittance",
  },
  {
    report: "KPI Report by Month",
    count: "0",
    link: "/admin/kpi-reported-by-months-view",
  },
  {
    report: "KPI Report by Patient",
    count: "0",
    link: "/admin/kpi-reported-by-patient-view",
  },
  {
    report: "KPI Report by Insurance",
    count: "0",
    link: "/admin/kpi-reported-by-insurance-view",
  },
];

// ***********************************************************************
// ******************************Settings Data***************************
// ***********************************************************************

export const setting = [
  {
    link: "/admin/settings",
    name: "Name & Location",
    icon: <BiRename />,
  },
  {
    link: "add-insurance",
    name: "Add Insurance",
    icon: <AiOutlineUserAdd />,
  },
  {
    link: "insurance-setup",
    name: "Insurance Setup",
    icon: <RiSettingsFill />,
  },
  {
    link: "add-treatment",
    name: "Add Treatment",
    icon: <RiHospitalLine />,
  },
  {
    link: "services",
    name: "Add Services",
    icon: <FiLayers />,
  },
  {
    link: "cpt-code",
    name: "Add Cpt Code",
    icon: <FiLayers />,
  },
  {
    link: "cpt-code-exclusion",
    name: "CPT Code Exclusion(S)",
    icon: <FiLayers />,
  },
  {
    link: "sub-activity-setup/SubTypeTab",
    name: "Add Service Sub-Type",
    icon: <RiSendPlaneLine />,
  },
  {
    link: "add-staff-type",
    name: "Add Staff Type",
    icon: <AiOutlineUserAdd />,
  },
  {
    link: "rendering-provider",
    name: "Referring Provider",
    icon: <AiOutlineUser />,
  },
  {
    link: "pos",
    name: "Place of Service",
    icon: <BsHouseDoor />,
  },
  {
    link: "vendor-number",
    name: "Vendor Number Setup",
    icon: <FaBoxOpen />,
  },
  {
    link: "holiday-setup",
    name: "Holiday Setup",
    icon: <FiAnchor />,
  },
  {
    link: "pay-period",
    name: "Pay Period",
    icon: <MdOutlinePayment />,
  },
  {
    link: "logo",
    name: "Logo",
    icon: <BiLinkAlt />,
  },
  {
    link: "unbillable-activity",
    name: "Unbillable Activity",
    icon: <BiFolderOpen />,
  },
  {
    link: "unbillable-time-sheet",
    name: "Unbillable TimeSheet ",
    icon: <TbFileTime />,
  },
  {
    link: "session-rule",
    name: "Create Service Rules",
    icon: <AiOutlineFile />,
  },
  {
    link: "file-manager",
    name: "OA File",
    icon: <BsFolder2Open />,
  },
  {
    link: "froms-builder",
    name: "Forms Builder",
    icon: <BsFileEarmarkMedical />,
  },
  {
    link: "notes-forms",
    name: "Forms & Library",
    icon: <BsFileEarmarkMedical />,
  },
  {
    link: "business-documents",
    name: "Business Files",
    icon: <BsFileEarmark />,
  },
  {
    link: "data-export",
    name: "Data Import",
    icon: <AiOutlineCloud />,
  },
  {
    link: "meet-lists",
    name: "TPMS Meet",
    icon: <RiFolderUserLine />,
  },
  {
    link: "sms-email-setting/email-setting",
    name: "SMS/Email Setting",
    icon: <AiOutlineMail />,
  },
  {
    link: "intake-form",
    name: "Intake Form",
    icon: <FaWpforms />,
  },
  {
    link: "structure-of-process",
    name: "Structure of process",
    icon: <BsFileEarmark />,
  },
  {
    link: "app-id-tracking",
    name: "App id tracking",
    icon: <FaRegAddressCard />,
  },
  {
    link: "program",
    name: "Program",
    icon: <BsBox />,
  },
];
export const SuperAdminRoute = [
  {
    link: "provider-access",
    name: "Provider Access",
    icon: <BiRename />,
  },
  {
    link: "admin-access",
    name: "Admin Access",
    icon: <AiOutlineUserAdd />,
  },
  {
    link: "payor",
    name: "Payor",
    icon: <RiSettingsFill />,
  },
  {
    link: "Companies-and-facilities",
    name: "Companies And Facilities",
    icon: <RiHospitalLine />,
  },
  {
    link: "company-level-CSV-Report",
    name: "Company Level CSV Report",
    icon: <FiLayers />,
  },
  {
    link: "user-page-permission",
    name: "User Page Permission",
    icon: <FiLayers />,
  },
  {
    link: "Add-views-to-the-facility",
    name: "Add Views to the facility",
    icon: <FiLayers />,
  },
  {
    link: "manage-credential",
    name: "Manage Credential",
    icon: <RiSendPlaneLine />,
  },
  {
    link: "bulk-upload",
    name: "Bulk Upload",
    icon: <AiOutlineUserAdd />,
  },
  {
    link: "billerlog-user",
    name: "Biller log User",
    icon: <AiOutlineUser />,
  },
  {
    link: "All-accounts-report-execution",
    name: "All Accounts Report Execution",
    icon: <BsHouseDoor />,
  },
  {
    link: "duplicate-manage-claims-report",
    name: "Duplicate Manage Claims Report",
    icon: <FaBoxOpen />,
  },
  {
    link: "missing-billed-sessions-under-appointment",
    name: "Missing Billed Sessions Under Appointment",
    icon: <FiAnchor />,
  },
  {
    link: "create-deposit-apply-with-no-check",
    name: "Create Deposit Apply With NoCheck",
    icon: <MdOutlinePayment />,
  },
  {
    link: "insurance-details",
    name: "Insurance Details",
    icon: <BiLinkAlt />,
  },
  {
    link: "sms-email-settings",
    name: "SMS Email Settings",
    icon: <BiFolderOpen />,
  },
  {
    link: "blocked-admins-settings",
    name: "Block Unblock Admins",
    icon: <TbFileTime />,
  },
];

export const patient_info = [
  {
    link: "/patient-info",
    name: "Patient Info",
  },
  {
    link: "patient-authorization",
    name: "Authorization",
  },
  {
    link: "patient-document",
    name: "Documents",
  },
  {
    link: "patient-portal",
    name: "Patient Portal",
  },
  {
    link: "patient-ledger",
    name: "patient Ledger",
  },
];

export const demoData = [
  {
    id: 1,
    first_name: "Ettie",
    last_name: "Benardeau",
    email: "ebenardeau0@hp.com",
    gender: "Female",
    ip_address: "128.17.86.50",
  },
  {
    id: 2,
    first_name: "Arni",
    last_name: "Matthews",
    email: "amatthews1@answers.com",
    gender: "Male",
    ip_address: "16.60.6.195",
  },
  {
    id: 3,
    first_name: "Fowler",
    last_name: "Madders",
    email: "fmadders2@hubpages.com",
    gender: "Male",
    ip_address: "222.37.89.92",
  },
  {
    id: 4,
    first_name: "Ives",
    last_name: "Forestel",
    email: "iforestel3@mac.com",
    gender: "Male",
    ip_address: "133.47.49.180",
  },
  {
    id: 5,
    first_name: "Monique",
    last_name: "Kernoghan",
    email: "mkernoghan4@intel.com",
    gender: "Female",
    ip_address: "203.114.25.148",
  },
  {
    id: 6,
    first_name: "Lola",
    last_name: "Shanks",
    email: "lshanks5@jalbum.net",
    gender: "Female",
    ip_address: "7.114.218.106",
  },
  {
    id: 7,
    first_name: "Angeline",
    last_name: "Hurleston",
    email: "ahurleston6@usda.gov",
    gender: "Female",
    ip_address: "88.85.20.146",
  },
  {
    id: 8,
    first_name: "Antons",
    last_name: "Garbutt",
    email: "agarbutt7@paginegialle.it",
    gender: "Male",
    ip_address: "193.0.169.235",
  },
  {
    id: 9,
    first_name: "Berte",
    last_name: "Reville",
    email: "breville8@eepurl.com",
    gender: "Polygender",
    ip_address: "208.101.217.210",
  },
  {
    id: 10,
    first_name: "Joete",
    last_name: "Chotty",
    email: "jchotty9@creativecommons.org",
    gender: "Female",
    ip_address: "172.228.248.236",
  },
];

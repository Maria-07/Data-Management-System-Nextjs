/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import BehaviorAnalyst from "@/component/UI/Settings/Organization/BehaviorAnalyst/BehaviorAnalyst";
import BehaviorTechnician from "@/component/UI/Settings/Organization/BehaviorTechnician/BehaviorTechnician";
import Manager from "@/component/UI/Settings/Organization/Manager/Manager";
import BulkInviteStaff from "@/component/UI/Settings/Organization/OrganizationInvite/BulkInviteStaff";
import InviteOrganization from "@/component/UI/Settings/Organization/OrganizationInvite/InviteOrganization";
import Parent from "@/component/UI/Settings/Organization/Parent/Parent";
import Supervisor from "@/component/UI/Settings/Organization/Supervisor/Supervisor";
import { Tabs } from "antd";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiMailSend, BiPlus } from "react-icons/bi";

const organizationPage = () => {
  //! Theme system
  const { theme } = useTheme();
  const tabItems = [
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Manager
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <Manager></Manager>
        </div>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Supervisor
        </h1>
      ),
      key: 2,
      children: <Supervisor></Supervisor>,
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Behavior Analyst
        </h1>
      ),
      key: 3,
      children: <BehaviorAnalyst></BehaviorAnalyst>,
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Behavior Technician
        </h1>
      ),
      key: 4,
      children: <BehaviorTechnician></BehaviorTechnician>,
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Parent
        </h1>
      ),
      key: 5,
      children: <Parent></Parent>,
    },
  ];

  const [inviteOrganization, setInviteOrganization] = useState(false);
  const handleInviteOrganization = () => {
    setInviteOrganization(!inviteOrganization);
  };

  const [bulkInviteOrganization, setBulkInviteOrganization] = useState(false);
  const handleBulkInviteOrganization = () => {
    setBulkInviteOrganization(!bulkInviteOrganization);
  };
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p
          className={`${
            theme === "dark"
              ? "text-dark-secondary font-semibold"
              : "dtm-title-head"
          }`}
        >
          Organization
        </p>
        <div className="flex items-center justify-start gap-3 ">
          <button
            onClick={handleInviteOrganization}
            className="dtm-button flex items-center gap-2 uppercase"
          >
            <AiOutlineMail className="text-xl " /> Invite Staffs
          </button>
          <button
            onClick={handleBulkInviteOrganization}
            className="dtm-button flex items-center gap-2 uppercase"
          >
            <BiMailSend className="text-xl" /> Bulk Invite Staffs
          </button>
        </div>
      </div>
      <div className="my-10">
        <Tabs tabBarGutter={6} type="card" items={tabItems} />
      </div>
      {inviteOrganization && (
        <InviteOrganization
          handleClose={handleInviteOrganization}
          clicked={inviteOrganization}
        ></InviteOrganization>
      )}
      {bulkInviteOrganization && (
        <BulkInviteStaff
          handleClose={handleBulkInviteOrganization}
          clicked={bulkInviteOrganization}
        ></BulkInviteStaff>
      )}
    </div>
  );
};

export default organizationPage;

organizationPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

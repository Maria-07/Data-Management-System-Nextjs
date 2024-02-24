import BiographyLayout from "@/component/Layouts/BiographyLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import Appointment from "@/component/UI/Biography/NotificationSettings/Appointment";
import ExpiringAuth from "@/component/UI/Biography/NotificationSettings/ExpiringAuth";
import ExpiringUnit from "@/component/UI/Biography/NotificationSettings/ExpiringUnit";
import StaffCredentialExpiring from "@/component/UI/Biography/NotificationSettings/StaffCredentialExpiring";
import { Collapse } from "antd";
import React from "react";

const NotificationSettings = () => {
  const items = [
    {
      key: "1",
      label: (
        <h1 className="bg-secondary text-sm font-normal ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Appointment
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <Appointment></Appointment>
        </div>
      ),
      showArrow: false,
    },
    {
      key: "2",
      label: (
        <h1 className="bg-secondary text-sm font-normal ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Expiring Auth
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <ExpiringAuth></ExpiringAuth>
        </div>
      ),
      showArrow: false,
    },
    {
      key: "3",
      label: (
        <h1 className="bg-secondary text-sm font-normal ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Expiring Unit (Activity)
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <ExpiringUnit></ExpiringUnit>
        </div>
      ),
      showArrow: false,
    },
    {
      key: "4",
      label: (
        <h1 className="bg-secondary text-sm font-normal ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Staff Credential Expiring
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <StaffCredentialExpiring></StaffCredentialExpiring>
        </div>
      ),
      showArrow: false,
    },
  ];
  return (
    <div>
      {" "}
      <div>
        <Collapse
          accordion
          size="small"
          ghost
          defaultActiveKey={["1"]}
          items={items}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;

NotificationSettings.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <BiographyLayout>{page}</BiographyLayout>
    </RootLayout>
  );
};

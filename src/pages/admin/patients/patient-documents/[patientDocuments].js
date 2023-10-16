import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import React from "react";
import { Tabs } from "antd";
import Aba from "@/component/UI/Patients/Patients/Documents/ABA/aba";
import { useTheme } from "next-themes";

const Documents = () => {
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
          Aba{" "}
          <span className="text-[10px] shadow-md ml-2 bg-primary text-white py-1 px-2 rounded-lg">
            Type-1
          </span>
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <Aba></Aba>
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
          Therapy
          <span className="text-[10px] shadow-md ml-2 bg-primary text-white py-1 px-2 rounded-lg">
            Type-2
          </span>
        </h1>
      ),
      key: 2,
      children: <></>,
    },
  ];

  return (
    <div>
      <div className="my-10">
        <Tabs type="card" items={tabItems} />
      </div>
    </div>
  );
};

export default Documents;

Documents.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

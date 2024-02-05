import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import React from "react";
import { Tabs } from "antd";
// import Aba from "@/component/UI/Patients/Patients/Documents/ABA/aba";
import { useTheme } from "next-themes";
import Aba from "@/component/UI/Patients/Patients/Documents/ABA/Aba";
import Therapy from "@/component/UI/Patients/Patients/Documents/Therapy/Therapy";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useState } from "react";
import { useGetDocumentTypeQuery } from "@/Redux/features/patient/patient-documents/patientDocumentApi";

const Documents = () => {
  const token = getAccessToken();
  const patientId = localStorage.getItem("PId");
  const { theme } = useTheme();
  const [tabData, setTabData] = useState({});

  const { data: documentData, isLoading: calllogloading } =
    useGetDocumentTypeQuery({
      token,
      patientId,
    });

  const documentTypeData = documentData?.document_types;
  // console.log('documentTypeData - ',documentTypeData);
  /*for(let x of documentTypeData)
  {
    setTabData((prevState) => {

    })
  }*/
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
      //test
      // test
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <Aba token={token} patientId={patientId} />
        </div>
      ),
    },
    /*{
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
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <Therapy />
        </div>
      ),
    },*/
  ];

  return (
    <div>
      <div className="my-10">
        <Tabs type="card" defaultActiveKey="1">
          {documentTypeData?.map((docType) => {
            return (
              <Tabs.TabPane
                tab={
                  <h1
                    className={`${
                      theme === "dark"
                        ? "text-dark-secondary"
                        : "text-fontC hover:text-secondary"
                    } sm:px-10 text-base  transition-all`}
                  >
                    {docType.name}
                  </h1>
                }
                key={docType.id}
              >
                <Aba
                  token={token}
                  patientId={patientId}
                  documentId={docType.id}
                  documentName={docType.name}
                />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
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

import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import React from "react";

const patientTest = () => {
  return <div></div>;
};

export default patientTest;

PatientVob.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

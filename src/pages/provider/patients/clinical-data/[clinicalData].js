import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import SessionCard from "@/component/UI/Patients/Patients/CinicalData/SessionsCard";

const ClinicalData = () => {
  return (
    <div className="h-[40%]">
      <div className=" overflow-y-scroll">
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
        <SessionCard> </SessionCard>
      </div>
    </div>
  );
};

export default ClinicalData;

ClinicalData.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

import RootLayout from "@/component/Layouts/RootLayout";
import SessionCard from "@/component/UI/Patients/Patients/CinicalData/SessionsCard";

const appointmentPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default appointmentPage;

appointmentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

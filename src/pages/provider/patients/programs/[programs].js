import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import Session from "@/component/UI/Patients/Patients/Programs/Sessions/Session";

const Programs = () => {
  return (
    <div>
      <Session></Session>
    </div>
  );
};

export default Programs;

Programs.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

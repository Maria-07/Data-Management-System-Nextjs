import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";

const PatientVob = () => {
  return <div>PatientVob</div>;
};

export default PatientVob;

PatientVob.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

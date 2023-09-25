/* eslint-disable react-hooks/rules-of-hooks */
import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import { useRouter } from "next/router";

const PatientVob = () => {
  const router = useRouter();
  const { query } = router;
  const id = query.patientVob;
  console.log(id, "vob");
  return <div>PatientVob erterter</div>;
};

export default PatientVob;

PatientVob.getLayout = function getLayout(page) {
  const router = useRouter();
  const { query } = router;
  const id = query.PatientVob;
  return (
    <RootLayout>
      <PatientLayout id={id}>{page}</PatientLayout>
    </RootLayout>
  );
};

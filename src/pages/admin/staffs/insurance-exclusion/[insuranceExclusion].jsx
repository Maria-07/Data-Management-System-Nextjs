import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";

const InsuranceExclusion = () => {
  return <div>InsuranceExclusion</div>;
};

export default InsuranceExclusion;

InsuranceExclusion.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

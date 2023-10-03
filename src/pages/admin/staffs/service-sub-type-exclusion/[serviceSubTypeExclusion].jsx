import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";

const ServiceSubTypeExclusion = () => {
  return <div>ServiceSubTypeExclusion</div>;
};

export default ServiceSubTypeExclusion;

ServiceSubTypeExclusion.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";

const DepartmentSupervisor = () => {
  return <div>DepartmentSupervisor</div>;
};

export default DepartmentSupervisor;

DepartmentSupervisor.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

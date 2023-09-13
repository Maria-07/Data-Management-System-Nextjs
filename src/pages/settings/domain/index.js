import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";

const DomainPage = () => {
  return <div>Domain</div>;
};

export default DomainPage;

DomainPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

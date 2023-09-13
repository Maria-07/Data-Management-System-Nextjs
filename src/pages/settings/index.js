import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import React from "react";

const settingPage = () => {
  return (
    <div>
      still on developing .......... testing git hub push again test issue
    </div>
  );
};

export default settingPage;

settingPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

import RootLayout from "@/component/Layouts/RootLayout";
import React from "react";

const settingPage = () => {
  return <div>still on developing .......... testing git hub push</div>;
};

export default settingPage;

settingPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

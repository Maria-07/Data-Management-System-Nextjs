import RootLayout from "@/component/Layouts/RootLayout";
import React from "react";

const Help = () => {
  return <div></div>;
};

export default Help;

Help.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

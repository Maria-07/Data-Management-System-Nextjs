import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import React, { useState } from "react";

const LibraryDetails = () => {
  return (
    <>
      {" "}
      <div className="">
        {/* <Tabs tabPosition="left" items={tabItems} /> */}
        this is
      </div>
    </>
  );
};

export default LibraryDetails;

LibraryDetails.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <LibraryLayout>{page}</LibraryLayout>
    </RootLayout>
  );
};

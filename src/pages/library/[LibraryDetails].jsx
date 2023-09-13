import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import DataRecording from "@/component/UI/Library/Program/DataRecording/DataRecording";
import Instruction from "@/component/UI/Library/Program/Instruction/Instruction";
import Target from "@/component/UI/Library/Program/Target/Target";
import Treatment from "@/component/UI/Library/Program/Treatment/Treatment";
import { Select, Tabs } from "antd";
import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";

const LibraryDetails = () => {
  const tabItems = [
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary my-2">
          TREATMENT
        </h1>
      ),
      key: 1,
      children: (
        <>
          <Treatment></Treatment>
        </>
      ),
    },
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary my-2">
          INSTRUCTION
        </h1>
      ),
      key: 2,
      children: (
        <>
          <Instruction></Instruction>
        </>
      ),
    },
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary my-2">TARGET</h1>
      ),
      key: 3,
      children: (
        <>
          <Target></Target>
        </>
      ),
    },
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary my-2">
          DATA RECORDING
        </h1>
      ),
      key: 4,
      children: <DataRecording></DataRecording>,
    },
  ];
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

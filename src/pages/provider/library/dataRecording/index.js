/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";

import { Select } from "antd";
import { useTheme } from "next-themes";
import React, { useState } from "react";

const dataRecordingPage = () => {
  const items = [
    "waiting",
    "working-on",
    "mastered",
    "closed",
    "hold",
    "disconnected",
  ];
  const [value, setValue] = useState("waiting");

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  //! Theme change
  const { theme } = useTheme();

  return (
    <div className="m-5 ">
      <div
        className={`${
          theme === "dark"
            ? "bg-dark-primary border-dark-background"
            : "secondary"
        } min-h-[80vh] lg:p-5 p-2 w-full border rounded-lg shadow-md `}
      >
        {" "}
        <div className="grid grid-cols-1 gap-5">
          {" "}
          <div>
            <h1
              className={`${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }text-sm  mb-2 font-semibold`}
            >
              Mastering Workflow
            </h1>
            <>
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Mastering Workflow"
                size="large"
                // defaultValue={value}
                bordered={true}
                onChange={onChange}
                options={items.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </>
          </div>
          <div>
            <h1
              className={`${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }text-sm  mb-2 font-semibold`}
            >
              Prompt level template
            </h1>
            <>
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Prompt level template"
                size="large"
                // defaultValue={value}
                bordered={true}
                onChange={onChange}
                options={items.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </>
          </div>
        </div>
        <div className="my-10">
          <div className="flex gap-3 items-end justify-start mb-2 mt-4">
            <button
              type="submit"
              className="shadow-md font-semibold text-base bg-primary  text-white hover:bg-secondary transition-all px-2 py-1 border border-primary rounded-md"
            >
              Save
            </button>
            <button className="shadow-md font-semibold text-base bg-gray-100  text-black hover:bg-gray-200 transition-all px-2 py-1 border border-gray-300 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dataRecordingPage;

dataRecordingPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <LibraryLayout>{page}</LibraryLayout>
    </RootLayout>
  );
};

/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";

import { Select } from "antd";
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

  return (
    <div className="m-5 ">
      <div className="bg-white min-h-[80vh] p-10 w-full border rounded-lg shadow-md ">
        {" "}
        <div className="grid grid-cols-3 gap-3">
          {" "}
          <div>
            <h1 className="text-sm text-secondary mb-2 font-medium">
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
            <h1 className="text-sm text-secondary mb-2 font-medium">
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
              className="font-medium text-sm  bg-primary text-white hover:bg-secondary transition-all px-2 py-1 border border-primary rounded-md"
            >
              Save
            </button>
            <button className="font-medium text-sm text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md">
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

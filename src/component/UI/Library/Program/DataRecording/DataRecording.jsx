import { Select } from "antd";
import React, { useState } from "react";

const DataRecording = () => {
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
    <div className="py-5 min-h-[80vh]">
      <div className="grid grid-cols-3 gap-3">
        {" "}
        <div>
          <h1 className="text-sm font-medium mb-3">Mastering Workflow</h1>
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
          <h1 className="text-sm font-medium mb-3">Prompt level template</h1>
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
            className="font-medium  bg-primary text-white hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-md"
          >
            Save
          </button>
          <button className="font-medium text-rose-600 hover:bg-rose-50 transition-all px-2 py-1 border border-rose-500 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataRecording;

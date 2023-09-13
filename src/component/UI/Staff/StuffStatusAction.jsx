import React, { useEffect, useState } from "react";
import { Switch } from "antd";

const StuffStatusAction = ({ status }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Switch
        size="small"
        defaultChecked={status}
        // onClick={() => handleStatusChange()}
      />
      <div className="w-[100px]">
        {" "}
        {status ? (
          <h1 className="ml-1">In-Active</h1>
        ) : (
          <h1 className="ml-1">Active</h1>
        )}
      </div>
    </div>
  );
};

export default StuffStatusAction;

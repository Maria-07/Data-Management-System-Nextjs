import React, { useState } from "react";

const ReviewStatus = ({ s }) => {
  const [status, setStatus] = useState("");
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="">
      <select
        onChange={(e) => handleStatus(e)}
        className="border bg-gray-50 w-full rounded-md lg:px-5 py-[4px]"
      >
        <option value="Pending">Pending</option>
        <option value="In-Active">In-Active</option>
        <option value="Wait-List">Wait-List</option>
      </select>
    </div>
  );
};

export default ReviewStatus;

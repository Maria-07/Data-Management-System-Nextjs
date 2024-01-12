import { useState } from "react";

const PatientStatusAction = ({ s }) => {
  const [status, setStatus] = useState("");
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="">
      <select
        defaultValue={s}
        onChange={(e) => handleStatus(e)}
        className="border w-full rounded-md lg:px-5 py-[4px]"
      >
        <option value="active">Active</option>
        <option value="in_active">In-Active</option>
      </select>
    </div>
  );
};

export default PatientStatusAction;

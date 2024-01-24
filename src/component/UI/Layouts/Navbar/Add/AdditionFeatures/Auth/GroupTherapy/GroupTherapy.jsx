import React, { useState } from "react";
import PrimaryService from "./PrimaryService";
import DynamicService from "./DynamicService";
import { useFieldArray } from "react-hook-form";

const GroupTherapy = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "service",
  });
  const [data, setData] = useState([]);
  // const append = () => {
  //   setData([...data, { id: id(), result: "" }]);
  // };

  // const remove = (index) => {
  //   setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // };

  // console.log(append);
  return (
    <div>
      <PrimaryService append={append} register={register} />

      <DynamicService register={register} remove={remove} fields={fields} />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-3 mr-2 gap-1 md:gap-2">
        <label className="label">
          <span className="modal-label-name">Provider Name</span>
        </label>
        <select
          className="col-span-2 modal-input-field ml-1 w-full"
          {...register("provider")}
        >
          <option value="0"></option>
        </select>
      </div>
    </div>
  );
};

export default GroupTherapy;

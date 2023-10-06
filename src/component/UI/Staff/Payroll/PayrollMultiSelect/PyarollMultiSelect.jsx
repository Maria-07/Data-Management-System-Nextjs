import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const PyarollMultiSelect = ({ Alldata, setServiceId }) => {
  const [selected, setSelected] = useState([]);

  const PayrollDataProcess = () => {
    let processedData = [];
    if (Alldata) {
      for (let x of Alldata) {
        processedData.push({
          label: `${x?.service} (${x?.service_treatment?.treatment_name})`,
          value: x?.id,
        });
      }
    }
    return processedData;
  };

  const dataoptions = PayrollDataProcess();

  const customValueRenderer = (selected, _options) => {
    if (selected.length) {
      if (selected.length > 3) return `All Selected ${selected.length}`;

      return selected.map(({ label }) => label + "," + " ");
    }
    return "None selected";
  };
  // console.log("Multi Select data", selected);

  useEffect(() => {
    const getServicesId = async () => {
      const getId = selected.map((item) => item.value);
      setServiceId(getId);
    };
    getServicesId();
  }, [selected, setServiceId]);

  console.log(selected);
  return (
    <div>
      <MultiSelect
        className="AppoinmentGlobal ml-1"
        // main data source
        // options={options}
        options={dataoptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        valueRenderer={customValueRenderer}
      />
    </div>
  );
};

export default PyarollMultiSelect;

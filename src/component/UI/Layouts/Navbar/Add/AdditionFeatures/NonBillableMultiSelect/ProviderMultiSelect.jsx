import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import "../../../../CustomComponents/AppointmentMultiselection.css";

const ProviderMultiSelect = ({
  providers,
  seletedProvider,
  setSelectedProvider,
}) => {
  // console.log("all the providers", providers);
  const [selected, setSelected] = useState([]);

  //Making Multiselect Options for Selection
  let options = [];
  const makingOption = () => {
    for (let provider of providers) {
      options.push({ label: provider?.full_name, value: provider?.id });
    }
  };
  if (providers?.length > 0) {
    makingOption();
  }

  const customValueRenderer = (selected, _options) => {
    // console.log("hi")
    if (selected.length) {
      if (selected.length > 3) return `All Selected ${selected.length}`;
      return selected.map(({ label }) => label);
    }

    return <h1 className="text-black">None selected</h1>;
  };

  const handleNewField = (hasSelectAll, value) => {
    setSelected(options);
  };
  // console.log("Appoinment Multi select data", selected);

  useEffect(() => {
    if (selected?.length > 0) {
      const providersArray = selected?.map((each) => each?.value);
      setSelectedProvider(providersArray);
    }
  }, [selected, setSelectedProvider]);

  return (
    <>
      <div className="parentSelection">
        <div>
          <MultiSelect
            className="AppoinmentGlobal"
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            valueRenderer={customValueRenderer}
          />
        </div>
        <div>
          <button
            className="pms-button"
            // Have to define type="button" to differentiate from form submit
            type="button"
            onClick={() => handleNewField()}
          >
            Select All
          </button>
        </div>
      </div>
    </>
  );
};

export default ProviderMultiSelect;

import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MultiSelectGlobal = ({ allData, setId }) => {
  const [selected, setSelected] = useState([]);
  const patientDataProcess = () => {
    let processedData = [];
    if (allData) {
      for (let x of allData) {
        if (x?.id !== null) {
          processedData.push({
            label: x?.name,
            value: x?.name,
            id: x?.id,
          });
        }
      }
    }
    return processedData;
  };

  const patientSelectionOptions = patientDataProcess();

  const customValueRenderer = (selected, _options) => {
    if (selected.length) {
      if (selected.length > 3) return `All Selected (${selected.length})`;
      return selected.map(({ label }) => label + "," + " ");
    }
    return <h1 className="text-[#4b5563]">None selected</h1>;
  };

  useEffect(() => {
    const getSelectedClients = async () => {
      const getId = selected.map((item) => item.id);
      setId(getId);
      // setSortBy1("");
    };
    getSelectedClients();
  }, [selected, setId]);

  return (
    <MultiSelect
      //   disabled={patientsLoading && true}
      className="Global"
      options={patientSelectionOptions}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
      valueRenderer={customValueRenderer}
    />
  );
};

export default MultiSelectGlobal;

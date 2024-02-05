import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const InsuranceMultiSelect = ({
  selected,
  setSelected,
  payorData,
  setInsuranceSelect,
  setSortBy1,
  payorLoading,
  setRunClick,
  setHasMore,
  setPage,
  setSelectedSortOptionOne,
}) => {
  // console.log("payorData", payorData);
  const insuranceDataProcess = () => {
    let processedData = [];
    if (payorData) {
      for (let x of payorData) {
        if (x?.payor_name !== null) {
          processedData.push({
            label: x?.payor_name,
            value: x?.payor_name,
            id: x?.payor_id,
          });
        }
      }
    }
    return processedData;
  };

  const insuranceOptions = insuranceDataProcess();

  const customValueRenderer = (selected, _options) => {
    if (selected.length) {
      if (selected.length > 3) return `All Selected (${selected.length})`;
      return selected.map(({ label }) => label + ",");
    }
    return <h1 className="text-black">None selected</h1>;
  };

  useEffect(() => {
    const getSelectedInsurance = async () => {
      const getId = selected.map((item) => item?.id);
      setInsuranceSelect(getId);
      setRunClick(false);
      setSelectedSortOptionOne("");
    };
    getSelectedInsurance();
  }, [selected, setInsuranceSelect]);

  // console.log("selected", selected);
  return (
    <MultiSelect
      disabled={payorLoading && true}
      className="Global"
      options={insuranceOptions}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
      valueRenderer={customValueRenderer}
    />
  );
};

export default InsuranceMultiSelect;

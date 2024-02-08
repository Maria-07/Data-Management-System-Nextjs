import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Providers = ({ stuffs, setStuffsId, setFetchQuery, theme }) => {
  const [selected, setSelected] = useState([]);

  const stuffDataProcess = () => {
    let processedData = [];
    if (stuffs) {
      for (let x of stuffs) {
        /*processedData.push({
          label: x?.full_name,
          value: x?.full_name,
          id: x?.id,
        });*/
        processedData.push({
          label: x?.name,
          value: x?.name,
          id: x?.id,
        });
      }
    }
    return processedData;
  };

  const dataOptionsStuff = stuffDataProcess();
  //console.log(dataOptionsStuff);

  const customValueRenderer = (selected, _options) => {
    if (selected.length) {
      if (selected.length > 3) return `All Selected ${selected.length}`;
      return selected.map(({ label }) => label + "," + " ");
    }
    return "None selected";
  };

  // const getId = selected.map((item) => item.id);
  // console.log("selected Providers", getId);

  useEffect(() => {
    const getProvidersId = async () => {
      const getId = selected.map((item) => item.id);
      // setStuffsId(getId);
      // setFetchQuery(false); //for recurring session purpose only
    };
    getProvidersId();
  }, [selected, setStuffsId]);

  return (
    <>
      {theme ? (
        <MultiSelect
          className="listview"
          options={dataOptionsStuff}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          valueRenderer={customValueRenderer}
        />
      ) : (
        <MultiSelect
          className="Global"
          options={dataOptionsStuff}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          valueRenderer={customValueRenderer}
        />
      )}
    </>
  );
};

export default Providers;

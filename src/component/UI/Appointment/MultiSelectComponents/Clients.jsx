/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Clients = ({ patients, setPatientId, setFetchQuery }) => {
  const [selected, setSelected] = useState([]);

  const patientDataProcess = () => {
    let processedData = [];
    if (patients) {
      for (let x of patients) {
        processedData.push({
          label: x?.client_full_name,
          value: x?.client_full_name,
          id: x?.id,
        });
      }
    }
    return processedData;
  };

  const dataoptions = patientDataProcess();

  const customValueRenderer = (selected, _options) => {
    if (selected.length) {
      if (selected.length > 3) return `All Selected ${selected.length}`;
      return selected.map(({ label }) => label + "," + " ");
    }
    return "None selected";
  };

  // const getId = selected.map((item) => item.id);
  // console.log("selected clients", getId);

  useEffect(() => {
    const getClientsId = async () => {
      const getId = selected.map((item) => item.id);
      setPatientId(getId);
      // setFetchQuery(false);
    };
    getClientsId();
  }, [selected, setPatientId]);

  //console.log(selected);

  // useEffect(() => {
  //   const getClientsId = async () => {
  //     const getId = selected.map((item) => item.id);
  //     if (getId) {
  //       receivedData(getId);
  //     }
  //   };
  //   getClientsId();
  // }, [selected, receivedData]);

  return (
    <MultiSelect
      // ClearSelectedIcon={<FaTimes />}
      // ArrowRenderer={() => <BiChevronDown />}
      className="listview"
      options={dataoptions}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
      valueRenderer={customValueRenderer}
    />
  );
};

export default Clients;

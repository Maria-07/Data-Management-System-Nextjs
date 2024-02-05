import { Select } from "antd";
import { useState } from "react";

const Billable = ({ register, setClientId, billable }) => {
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mt-5 mr-2 gap-1 md:gap-2">
        <label className="label">
          <span className="modal-label-name">Patient Name</span>
        </label>
        <select
          // disabled={patientsNameLoading || !billable ? true : false}
          className="col-span-2 modal-input-field ml-1 w-full"
          {...register("client_id")}
          onChange={(e) => setClientId(e.target.value)}
        >
          {!billable ? (
            <option disabled value={1}>
              Non-Billable Client
            </option>
          ) : (
            <>
              <option value="0"></option>
              {/* {patientsName?.claims?.map((patient) => {
                      return (
                        <option key={patient?.id} value={patient?.id}>
                          {patient?.client_full_name}
                        </option>
                      );
                    })} */}
            </>
          )}
        </select>
        <label className="label">
          <span className="modal-label-name">Active Auth(s)</span>
        </label>
        <select
          // disabled={patientsNameLoading || !billable ? true : false}
          className="col-span-2 modal-input-field ml-1 w-full"
          {...register("active_auth")}
        >
          <option value="0"></option>
        </select>
        <label className="label">
          <span className="modal-label-name">Service</span>
        </label>
        <Select
          className="w-full col-span-2 ml-1"
          maxTagCount={3}
          mode="multiple"
          placeholder="Please select"
          value={selectedItems}
          onChange={setSelectedItems}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </div>
    </div>
  );
};

export default Billable;

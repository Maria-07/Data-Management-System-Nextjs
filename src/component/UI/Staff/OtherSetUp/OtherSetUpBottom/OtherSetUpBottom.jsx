import React from "react";

const OtherSetUpBottom = ({ propdata }) => {
  // if (!propdata) {
  //   return <Loading />;
  // }
  const { register, txTypedata } = propdata;
  return (
    <div>
      {txTypedata &&
        txTypedata.length > 0 &&
        txTypedata.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <h3 className="text-[14px]  font-semibold w-[480px]">
                {field?.treatment_name}
              </h3>

              <input
                type="text"
                defaultValue={field.box_24j == null ? "" : field.box_24j}
                placeholder="Box 24J(BT)"
                // name={`${tx_type}.${box_24j}`}
                className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                {...register(`box_24j.${index}`)}
              />

              <select
                className="input-border-bottom input-font w-full focus:outline-none py-[1px]"
                // defaultValue={}
                {...register(`id_qualifire.${index}`)}
              >
                <option value={field.id_qualifire}>
                  {field.id_qualifire || "ID Qualifier(BT)"}
                </option>
                <option value="0B">0B</option>
                <option value="1B">1B</option>
                <option value="1C">1C</option>
                <option value="1D">1D</option>
                <option value="1G">1G</option>
                <option value="1H">1H</option>
                <option value="EI">EI</option>
                <option value="G2">G2</option>
                <option value="LU">LU</option>
                <option value="N5">N5</option>
                <option value="SY">SY</option>
                <option value="X5">X5</option>
                <option value="ZZ">ZZ</option>
              </select>
            </div>
          );
        })}
    </div>
  );
};

export default OtherSetUpBottom;

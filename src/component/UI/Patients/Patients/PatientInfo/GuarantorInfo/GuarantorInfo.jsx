import React from "react";

const GuarantorInfo = ({ register, checkLocation, SameasPatientBtn, hook }) => {
  // console.log(checkLocation);
  // console.log("hook city", hook);
  return (
    <div className="my-2">
      <h1 className="text-sm font-semibold my-1 ">Guarantor Info</h1>
      {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 my-1 mr-2 gap-x-6 gap-y-1"> */}
      <div className="flex flex-wrap gap-x-4 gap-y-4 items-center">
        <div>
          <label className="label">
            <span className=" label-font">First Name</span>
          </label>
          <input
            type="text"
            name="guarantor_first_name"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("guarantor_first_name")}
          />
        </div>

        <div>
          <label className="label">
            <span className=" label-font">Last Name</span>
          </label>
          <input
            type="text"
            name="guarantor_last_name"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("guarantor_last_name")}
          />
        </div>
        {/* DOB */}
        <div>
          {" "}
          <label className="label">
            <span className=" label-font">Check Date</span>
          </label>
          <input
            className="input-border-bottom input-font  w-full focus:outline-none"
            type="date"
            {...register("guarantor_check_Date")}
          />
        </div>

        {/* </div> */}

        {/* ---------------------------------*/}
        {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 my-1 mr-2 gap-x-6 gap-y-1"> */}

        <div>
          <label className="label">
            <span className=" label-font">Address</span>
          </label>

          <input
            type="text"
            placeholder="Street"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...register("GuaratorStreet")}
            // {...register(checkLocation ? "GuaratorStreet" : "null")}
          />
        </div>

        {/* <div className="my-auto text-xs bg-secondary text-white ml-1 py-1 mb-2 text-center w-full rounded-md"> */}
        <div className="dtm-button mt-[17px]">
          <button
            type="button"
            onClick={() => {
              SameasPatientBtn();
            }}
          >
            Same as patient address
          </button>
        </div>
      </div>

      {/* --------------------------- */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 my-1 mr-2 gap-x-6 gap-y-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="City"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            // defaultValue={hook?.City}
            // {...register(checkLocation ? "GuaratorCity" : "null")}
            {...register("GuaratorCity")}
          />
        </div>
        <div>
          <select
            className="input-border-bottom input-font mt-[3px] w-full focus:outline-none"
            // {...register(checkLocation ? "GuratorCountry" : "null")}
            {...register("GuratorCountry")}
          >
            <optgroup label="-US">
              <option></option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="DC">DC</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="PR">PR</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
              <option value="AA">AA</option>
              <option value="AE">AE</option>
              <option value="AP">AP</option>
              <option value="GU">GU</option>
              <option value="VI">VI</option>
            </optgroup>
            <optgroup label="-CA-">
              <option value="AB">AB</option>
              <option value="BC">BC</option>
              <option value="MB">MB</option>
              <option value="NB">NB</option>
              <option value="NL">NL</option>
              <option value="NT">NT</option>
              <option value="NS">NS</option>
              <option value="NU">NU</option>
              <option value="ON">ON</option>
              <option value="PE">PE</option>
              <option value="QC">QC</option>
              <option value="SK">SK</option>
              <option value="YT">YT</option>
            </optgroup>
            <optgroup label="-Other-">
              <option value="">N/A</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Zip"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            // {...register(checkLocation ? "GuratorZip" : "null")}
            {...register("GuratorZip")}
          />
        </div>
      </div>
    </div>
  );
};

export default GuarantorInfo;

import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaPlus, FaPlusSquare } from "react-icons/fa";

const PrimaryAddress = ({ btnclick, rg, append }) => {
  //   //console.log(rg);
  //   const { register } = useForm({
  //     defaultValues: {
  //       test: [{ firstName: "", lastName: "" }],
  //       address: [{ street: "", city: "", country: "" }],
  //     },
  //   });

  return (
    <>
      <label className="label">
        <span className=" flex items-center label-font">
          Address
          <AiOutlineQuestionCircle className="text-sm" />
          <span className="text-red-500">*</span>
        </span>
      </label>
      <div className="mb-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Street"
          id="streetval"
          // defaultValue={"America"}
          className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
          {...rg("client_street")}
        />
        <FaPlusSquare onClick={() => append()} size={30}/>
        {/*<button // onClick={() => setOpen(true)}
          // onClick={btnclick}
          onClick={() => append()}
          className="bg-secondary text-white p-[4px]"
        >
          <FaPlus />
  </button>*/}
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="City"
          className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
          //   defaultValue={"Buffalo"}
          {...rg("client_city")}
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-1  gap-x-4 gap-y-2">
        <div>
          <select
            className="input-border-bottom input-font  w-full focus:outline-none"
            // defaultValue={"NY"}
            {...rg("client_state")}
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
        <div>
          <input
            type="text"
            placeholder="Zip"
            className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
            {...rg("client_zip")}
          />
        </div>
      </div>
    </>
  );
};

export default PrimaryAddress;

import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useEffect } from "react";
import { useDeletePhoneMutation } from "@/Redux/features/patient/patient-info/patientInfoApi";
import { toast } from "react-toastify";

const DynamicPhone = ({ adData, patientId }) => {
  const { phoneFields, phoneRemove, register } = adData;
  const token = getAccessToken();
  const setCountry = () => {};
  const [updatePhone, { isSuccess: updateSuccess, isError: updateError }] =
    useDeletePhoneMutation();
  const deletePhone = (id, index) => {
    phoneRemove(index);
    updatePhone({
      token,
      payload: { patient_id: patientId, phone_id: id },
    });
  };
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Phone deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (updateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [updateSuccess, updateError]);

  return (
    <div>
      {phoneFields.map((field, index) => {
        return (
          <div key={field.id}>
            <label className="label">
              <span className=" label-font">Phone</span>
            </label>
            <div className="flex  gap-1 items-center gap-x-2 gap-y-2">
              <div className=" ml-1 flex items-center">
                <input
                  type="hidden"
                  {...register(`number.${index}.id`)}
                  defaultValue={field.id}
                />
                {/*<PhoneInput
                  flags={flags}
                  international
                  initialValueFormat="national"
                  placeholder="Phone"
                  defaultCountry="US"
                  className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                  {...register(`number.${index}.phone_number`, {
                    // required: true
                  })}
                  onChange={setCountry}
                  value={field.phone_number} // Use the `value` prop instead of `defaultValue`
                />*/}
                <input
                  type="text"
                  className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                  {...register(`number.${index}.phone_number`, {
                    // required: true
                  })}
                  defaultValue={field.phone_number}
                />
              </div>
              <div>
                <select
                  className="input-border-bottom mt-[2px] pb-1 input-font w-16 focus:outline-none"
                  {...register(`number.${index}.phone_type`)}
                >
                  <option value="Work">Work</option>
                  <option value="Home">Home</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              <button
                onClick={() => deletePhone(field.id, index)}
                className="bg-red-500 text-white p-[4px]"
              >
                <RiDeleteBin6Line />
              </button>
            </div>

            <div className="flex ml-1 mt-2 items-center">
              {/* custom toggle  */}
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={field.checked}
                  {...register(`number.${index}.is_send_sms`, {
                    // required: true
                  })}
                  className="sr-only peer"
                />
                <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>

              <span className="text-xs ml-1 text-gray-700 font-medium">
                SMS Appointment Reminders
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicPhone;

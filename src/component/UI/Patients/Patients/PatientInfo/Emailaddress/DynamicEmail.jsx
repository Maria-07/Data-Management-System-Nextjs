import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useEffect } from "react";
import { useDeleteEmailMutation } from "@/Redux/features/patient/patient-info/patientInfoApi";
import { toast } from "react-toastify";

const DynamicEmail = ({ adData, patientId }) => {
  const { register, emailFields, emailRemove } = adData;
  const token = getAccessToken();
  const [
   updateEmail,
    { isSuccess: updateSuccess, isError: updateError },
  ] = useDeleteEmailMutation();
  const deleteEmail = (id, index) => {
    emailRemove(index);
    updateEmail({
      token,
      payload:{patient_id:patientId,email_id:id},
    });

  }
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Email deleted successfully", {
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
      {emailFields.map((field, index) => {
        return (
          <div key={field.id}>
            <label className="label">
              <span className=" label-font">Email</span>
            </label>
            <div className="flex items-center gap-x-3 gap-y-2">
              <div>
              <input type="hidden" {...register(`Email.${index}.id`)} defaultValue={field.id}/>
                <input
                  type="text"
                  name="email"
                  className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                  {...register(`Email.${index}.email`)}
                  defaultValue={field.email}
                />
              </div>
              <div>
                <select
                  className="input-border-bottom input-font pb-1 mt-[2px] w-16 focus:outline-none"
                  {...register(`Email.${index}.email_type`)}
                >
                  <option value="Work">Work</option>
                  <option value="Home">Home</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              <button
                onClick={() => deleteEmail(field.id,index)}
                className="bg-red-500 text-white p-[4px] "
              >
                <RiDeleteBin6Line />
              </button>
            </div>
            <div className="flex ml-1 mt-2 items-center gap-1 flex-wrap ">
              <div className="">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`Email.${index}.is_email_ok`, {
                      // valueAsNumber: true,
                    })}
                    defaultChecked={field.checked}
                    className="sr-only peer"
                  />
                  <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
                {/* <Switch
           size="small"
           checked={active ? true : false}
           onClick={() => setActive(!active)}
         /> */}
                <span className="text-xs ml-1 text-gray-700 font-normal">
                  Email OK
                </span>
              </div>
            </div>

            <div className="flex ml-1 mt-1 items-center">
              {/* <Switch
         size="small"
         checked={active ? true : false}
         onClick={() => setActive(!active)}
       /> */}
              {/* custom tooggel */}
              <label className="inline-flex relative items-center  cursor-pointer">
                <input
                  type="checkbox"
                  {...register(`Email.${index}.email_reminder`)}
                  defaultChecked={field.sendMail}
                  className="sr-only peer"
                />
                <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <span className="text-xs ml-1 text-gray-700 font-normal">
                Send email appointment reminders
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicEmail;

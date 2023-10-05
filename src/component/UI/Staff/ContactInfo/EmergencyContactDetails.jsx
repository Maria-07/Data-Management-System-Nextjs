import {
  useAddContactInfoMutation,
  useAddEmergencyContactInfoMutation,
} from "@/Redux/features/staff/contactInfo/contactInfoApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EmergencyContactDetails = ({ token, emergencyApiData }) => {
  const { register, handleSubmit } = useForm();
  const [addEmergencyContactInfo, { data: emResData, isLoading, isError }] =
    useAddEmergencyContactInfoMutation();

  console.log("emergencyApiData em", emergencyApiData);

  const onSubmit = (data) => {
    console.log(emergencyApiData);
    const payload = {
      employee_contact_edit: emergencyApiData?.employee_id,
      em_address_one: data?.address_one,
      em_address_two: data?.address_two,
      em_contact_name: data?.contact_name,
      em_city: data?.city,
      em_state: data?.state,
      em_zip: data?.zip,
      em_mobile: data?.mobile,
      em_fax: data?.fax,
      em_main_phone: data?.main_phone,
      em_address_note: data?.address_note,
    };
    console.log("payload", payload);
    const res = addEmergencyContactInfo({ token, payload });
    console.log("res -------------->", res);
    console.log("emResData -------------->", emResData);
  };

  // validation
  useEffect(() => {
    if (emResData?.status === "success") {
      toast.success(emResData?.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (isError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [emResData, emResData?.message, emResData?.status, isError]);

  return (
    <div className="">
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 my-3 mr-2 gap-x-4 gap-y-5">
          {/* name  */}
          <div>
            <label className="label">
              <span className="label-font">Address1</span>
            </label>
            <input
              defaultValue={emergencyApiData?.address_one}
              type="text"
              name="address1"
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("address_one")}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-font">Address2</span>
            </label>
            <input
              type="text"
              name="address2"
              defaultValue={emergencyApiData?.address_two}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("address_two")}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-font">City</span>
            </label>
            <input
              type="text"
              name="city"
              defaultValue={emergencyApiData?.city}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("city")}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-font">State</span>
            </label>
            <select
              defaultValue={emergencyApiData?.state}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("state")}
            >
              <option value="Speech Therapist">Speech Therapist</option>
              <option value="female">Female</option>
              <option value="AK">Alaska</option>

              <option value="AL">Alabama</option>
              <option value="jm">jamaica</option>
              <option value="AS">American Samoa</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FM">Federated States of Micronesia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-font">Zip</span>
            </label>
            <input
              type="text"
              name="zip"
              defaultValue={emergencyApiData?.zip}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("zip")}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-font">Mobile</span>
            </label>
            <input
              type="text"
              name="mobile"
              defaultValue={emergencyApiData?.mobile}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("mobile")}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-font">Fax</span>
            </label>
            <input
              type="text"
              name="fax"
              defaultValue={emergencyApiData?.fax}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("fax")}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-font">Main Phone</span>
            </label>
            <input
              type="text"
              name="main_phone"
              defaultValue={emergencyApiData?.main_phone}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("main_phone")}
            />
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-1">
          <div>
            <label className="label">
              <span className="label-font">Notes</span>
            </label>
            <textarea
              rows={4}
              size="middle"
              defaultValue={emergencyApiData?.address_note}
              className="w-full border bottom-2 ml-1 p-1"
              {...register("address_note")}
              // onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="my-3 ">
          <button disabled={isLoading} className="dtm-button" type="submit">
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyContactDetails;

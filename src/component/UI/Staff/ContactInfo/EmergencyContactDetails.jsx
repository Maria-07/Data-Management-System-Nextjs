import {
  useAddContactInfoMutation,
  useAddEmergencyContactInfoMutation,
} from "@/Redux/features/staff/contactInfo/contactInfoApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateInfoQuery } from "@/Redux/features/staff/contactInfo/contactInfoApi";

const EmergencyContactDetails = ({ token, emergencyApiData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [addEmergencyContactInfo, { data: emResData, isLoading, isError }] =
    useAddEmergencyContactInfoMutation();
    const cdata = {
      address_one: emergencyApiData?.employee_emergency_address_one,
      address_two: emergencyApiData?.employee_emergency_address_two,
      city: emergencyApiData?.employee_emergency_contact_city,
      state: emergencyApiData?.employee_emergency_contact_state,
      zip: emergencyApiData?.employee_emergency_contact_zip,
      mobile: emergencyApiData?.employee_emergency_contact_mobile,
      fax: emergencyApiData?.employee_emergency_contact_fax,
      main_phone: emergencyApiData?.employee_emergency_contact_main_phone,
      address_note: emergencyApiData?.employee_emergency_contact_note,
      contact_name: emergencyApiData?.employee_emergency_contact_name,
  }

const { address_one, address_two, city, state, zip, mobile, fax, main_phone, address_note, contact_name } = cdata || {};
useEffect(() => {
  // you can do async server request and fill up form
  setTimeout(() => {
    reset({
      address_one:address_one, 
      address_two:address_two, 
      city:city, 
      state:state, 
      zip:zip, 
      mobile:mobile,
      fax:fax, 
      main_phone:main_phone, 
      address_note:address_note,
      contact_name:contact_name
    });
  }, 0);
}, [
  reset,
  address_one, address_two, city, state, zip, mobile, fax, main_phone, address_note
]);
  console.log("emergencyApiData em", emergencyApiData);
  const { data: stateData, isSuccess: stateDetailsSucess } =
  useStateInfoQuery({ token });
  const stateList = {...stateData?.states};
  const onSubmit = (data) => {
    console.log(emergencyApiData);
    const payloadData = {
      //employee_contact_edit: emergencyApiData?.employee_id,
      employee_emergency_address_one: data?.address_one,
      employee_emergency_address_two: data?.address_two,
      employee_emergency_contact_name: data?.contact_name,
      employee_emergency_contact_city: data?.city,
      employee_emergency_contact_state: data?.state,
      employee_emergency_contact_zip: data?.zip,
      employee_emergency_contact_mobile: data?.mobile,
      employee_emergency_contact_fax: data?.fax,
      employee_emergency_contact_main_phone: data?.main_phone,
      employee_emergency_contact_note: data?.address_note,
    };
    const payload = {emergency_contact_details:payloadData}
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
              <span className="label-font">Contact Name</span>
            </label>
            <input
              type="text"
              name="address2"
              defaultValue={emergencyApiData?.contact_name}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("contact_name")}
            />
          </div>
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
            {Object.entries(stateList).map((v,k) => {
              return (
                <option
                  className="text-black"
                  key={v[0]}
                  value={v[0]}
                >
                  {v[1]}
                </option>
              );
            } )}
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

import { useAddContactInfoMutation } from "@/Redux/features/staff/contactInfo/contactInfoApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useStateInfoQuery } from "@/Redux/features/staff/contactInfo/contactInfoApi";

const ContactDetails = ({ token, contactApiData}) => {
  const { register, handleSubmit, reset } = useForm();
  const [addContactInfo, { isSuccess, isLoading, isError }] =
    useAddContactInfoMutation();
    const cdata = {
      address_one: contactApiData?.employee_address_one,
      address_two: contactApiData?.employee_address_two,
      city: contactApiData?.employee_city,
      state: contactApiData?.employee_state,
      zip: contactApiData?.employee_zip,
      mobile: contactApiData?.employee_mobile,
      fax: contactApiData?.employee_fax,
      main_phone: contactApiData?.employee_main_phone,
      address_note: contactApiData?.employee_address_note
  }

  const { data: stateData, isSuccess: stateDetailsSucess } =
  useStateInfoQuery({ token });
  const stateList = {...stateData?.states};


const { address_one, address_two, city, state, zip, mobile, fax, main_phone, address_note } = cdata || {};
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
      address_note:address_note
    });
  }, 0);
}, [
  reset,
  address_one, address_two, city, state, zip, mobile, fax, main_phone, address_note
]);

// console.log("contactApiData", contactApiData);

  const onSubmit = (data) => {
    console.log(data);
    const payloadData = {
      //employee_contact_edit: contactApiData?.employee_id,
      employee_address_one: data?.address_one,
      employee_address_two: data?.address_two,
      employee_city: data?.city,
      employee_state: data?.state,
      employee_zip: data?.zip,
      employee_mobile: data?.mobile,
      employee_fax: data?.fax,
      employee_main_phone: data?.main_phone,
      employee_address_note: data?.address_note,
    };
    const payload = {contact_details:payloadData}
    console.log("payload", payload);
    const res = addContactInfo({ token, payload });
    console.log("res", res);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Contact Details Updated", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (isError) {
      toast.error("Some Error Occurred", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [isError, isSuccess]);

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
              defaultValue={contactApiData?.address_two}
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
              defaultValue={contactApiData?.city}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              {...register("city")}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-font">State</span>
            </label>
            <select
              defaultValue={contactApiData?.state}
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
              defaultValue={contactApiData?.zip}
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
              defaultValue={contactApiData?.mobile}
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
              defaultValue={contactApiData?.fax}
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
              defaultValue={contactApiData?.main_phone}
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
              defaultValue={contactApiData?.address_note}
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

export default ContactDetails;

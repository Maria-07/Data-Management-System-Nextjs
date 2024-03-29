import { Modal, Switch } from "antd";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useGetInsuranceDataQuery,
  useCreatePatientMutation,
} from "@/Redux/features/patient/patientApi";

const CreatePatient = ({ handleClose, patientClicked }) => {
  const token = getAccessToken();
  const [active, setActive] = useState(false);
  const [phone, setPhone] = useState();
  const [addtionalInfoOpen, setAddtionalInfoOpen] = useState(false);
  // const [first, setfirst] = useState(second);

  const { data: insuranceStatusData, isLoading: insuranceStatusLoading } =
    useGetInsuranceDataQuery({ token });

  const [
    createPatient,
    { isSuccess: createSuccess, isError: createError, error: ApiError },
  ] = useCreatePatientMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const payload = {
      client_first_name: data?.client_first_name,
      client_last_name: data?.client_last_name,
      client_dob: data?.client_dob,
      client_gender: data?.client_gender,
      location: data?.pos,
      parent_first_name: data?.client_gender,
      parent_last_name: data?.pos,
      email: data?.email,
      email_type: data?.email_type,
      email_reminder: data?.email_reminder,
      phone_number: `+${data?.phone}`,
      phone_type: data?.phone_type,
      is_send_sms: data?.is_send_sms,
      active_status: data?.status,
      payor_id: data?.insurance,
      other_details: data?.additionalInfo,
      email_invaitation: data?.email_invaitation,
    };
    // console.log(payload);
    if (payload) {
      createPatient({
        token,
        payload,
      });
      //reset();
    }
  };
  useEffect(() => {
    if (createSuccess) {
      toast.success("Patient created successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      handleClose();
    } else if (ApiError) {
      let responseError = Object.values(ApiError?.data?.message);
      toast.error(responseError[0][0], {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (createError) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [createSuccess, createError, ApiError]);
  return (
    <div>
      <Modal
        open={patientClicked} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={600}
        closable={false}
        className="box rounded-xl "
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 py-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400">
                Create Patient
              </h1>
              <div className="flex item-center gap-2">
                <div className="flex items-center gap-2">
                  {/*<Switch
                  color="default"
                  defaultChecked
                  size="small"
                  name="email_invaitation"
                />*/}
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register(`email_invaitation`)}
                      defaultChecked={true}
                      className="sr-only peer"
                    />
                    <div className="w-[30px] h-[17px] bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[13px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                  <label
                    className="form-check-label inline-block mt-[2px] text-sm"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Portal invaitation
                  </label>
                </div>
                <IoCloseCircleOutline
                  onClick={handleClose}
                  className="text-gray-500 text-2xl hover:text-primary"
                />
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className="my-3">
              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mb-1 mr-2 gap-2">
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">
                      First Name<span className="text-red-500">*</span>
                    </h1>
                  </label>
                  <input
                    type="text"
                    name="client_first_name"
                    className="modal-input-field ml-1 w-full"
                    {...register("client_first_name", {
                      required: {
                        value: true,
                        message: "First name is required",
                      },
                    })}
                  />

                  <div className="label-text-alt m-1">
                    {errors.client_first_name?.type === "required" && (
                      <p className=" pl-1 text-red-500">
                        {errors.client_first_name.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* client_last_name */}
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">
                      Last Name<span className="text-red-500">*</span>
                    </h1>
                  </label>
                  <input
                    type="text"
                    name="client_last_name"
                    className=" modal-input-field ml-1 w-full"
                    {...register("client_last_name", {
                      required: {
                        value: true,
                        message: "Last Name is required",
                      },
                    })}
                  />
                  <div className="label-text-alt m-1">
                    {errors.client_last_name?.type === "required" && (
                      <p className=" pl-1 text-red-500">
                        {errors.client_last_name.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-1 mr-2 gap-2">
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">
                      DOB<span className="text-red-500">*</span>
                    </h1>
                  </label>

                  <input
                    className=" modal-input-field ml-1 w-full"
                    name="client_dob"
                    type="date"
                    {...register("client_dob", {
                      required: {
                        value: true,
                        message: "Date of Birth is required",
                      },
                    })}
                  />
                  <div className="label-text-alt m-1">
                    {errors.client_dob?.type === "required" && (
                      <p className=" pl-1 text-red-500">
                        {errors.client_dob.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">
                      Gender<span className="text-red-500">*</span>
                    </h1>
                  </label>
                  <select
                    className=" modal-input-field ml-1 w-full"
                    {...register("client_gender", {
                      required: {
                        value: true,
                        message: "Gender is required",
                      },
                    })}
                  >
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="label-text-alt m-1">
                    {errors.client_gender?.type === "required" && (
                      <p className=" pl-1 text-red-500">
                        {errors.client_gender.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">
                      POS<span className="text-red-500">*</span>
                    </h1>
                  </label>
                  <select
                    className="modal-input-field ml-1 w-full"
                    {...register("pos")}
                  >
                    <option value=""></option>
                    <option value="Main Office">Main Office</option>
                    <option value="Telehealth">Telehealth</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-1 mr-2  gap-2">
                <div>
                  <label className="label">
                    <span className="modal-label-name flex items-center gap-1">
                      email Address
                      <AiOutlineQuestionCircle className="text-sm" />
                    </span>
                  </label>
                  <div className="flex items-center">
                    <>
                      <input
                        type="text"
                        name="email"
                        className="modal-input-field ml-1 w-3/4"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                        })}
                      />
                    </>

                    <>
                      <div>
                        <select
                          className="modal-input-field ml-1 w-full"
                          {...register("email_type", {
                            required: {
                              value: true,
                              message: "Email type is required",
                            },
                          })}
                        >
                          <option value=""></option>
                          <option value="Work">Work</option>
                          <option value="Home">Home</option>
                        </select>
                      </div>
                      <div className="label-text-alt m-1">
                        {errors.email_type?.type === "required" && (
                          <p className=" pl-1 text-red-500">
                            {errors.email_type.message}
                          </p>
                        )}
                      </div>
                    </>
                  </div>
                  <div className="label-text-alt m-1">
                    {errors.email?.type === "required" && (
                      <p className=" pl-1 text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex ml-1 mt-2 items-center">
                    <input
                      type="checkbox"
                      name="patient"
                      {...register("email_reminder")}
                    />
                    <span className="text-xs ml-1 text-gray-600 font-medium">
                      Send me an email reminder
                    </span>
                  </div>
                </div>

                <div className="">
                  <label className="label">
                    <span className="modal-label-name flex items-center gap-1">
                      Phone Number
                      <AiOutlineQuestionCircle className="text-sm" />
                    </span>
                  </label>
                  <div className="flex items-center">
                    {/* <input
                    type="text"
                    name="phone_number"
                    className="modal-input-field ml-1 w-3/4"
                    {...register("phone_number")}
                  /> */}
                    <div className="customPhone ml-1">
                      <Controller
                        control={control}
                        name="phone"
                        rules={{ required: true }}
                        render={({ field: { ref, ...field } }) => (
                          <PhoneInput
                            {...field}
                            inputExtraProps={{
                              ref,
                              required: true,
                              autoFocus: true,
                            }}
                            country={"us"}
                            onlyCountries={["us"]}
                            countryCodeEditable={false}
                            specialLabel={"Player Mobile Number"}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <select
                        className="modal-input-field ml-1 w-full"
                        {...register("phone_type", {
                          required: {
                            value: true,
                            message: "Phone Type is required",
                          },
                        })}
                      >
                        <option value=""></option>
                        <option value="Work">Work</option>
                        <option value="Home">Home</option>
                      </select>
                    </div>
                  </div>
                  <div className="label-text-alt m-1">
                    {phone === "" && (
                      <p className=" pl-1 text-red-500">Phone is required</p>
                    )}
                  </div>
                  <div className="label-text-alt m-1">
                    {errors.phone_type?.type === "required" && (
                      <p className=" pl-1 text-red-500">
                        {errors.phone_type.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex ml-1 mt-2 items-center">
                      <input
                        type="checkbox"
                        name="patient"
                        {...register("is_send_sms")}
                      />{" "}
                      <span className="text-xs ml-1 text-gray-600 font-medium">
                        Send me a text message
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">Status</h1>
                  </label>
                  <select
                    className="modal-input-field ml-1 w-full"
                    {...register("status")}
                    defaultValue={1}
                  >
                    {insuranceStatusData?.statuses?.map((p) => {
                      return (
                        <option value={p.id} key={p.id}>
                          {p.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <h1 className="modal-label-name">Insurance</h1>
                  </label>
                  <select
                    className="modal-input-field ml-1 w-full"
                    {...register("insurance")}
                  >
                    <option value=""></option>
                    {insuranceStatusData?.all_payor?.map((p) => {
                      return (
                        <option value={p.payor_id} key={p.payor_id}>
                          {p.payor_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            {addtionalInfoOpen && (
              <div>
                <label className="label">
                  <h1 className="modal-label-name">Additional Information</h1>
                </label>
                <textarea
                  className="input-border input-font py-[1px] w-full focus:outline-none"
                  {...register("additionalInfo")}
                  rows={4}
                  cols={40}
                />
              </div>
            )}
            <div className=" flex justify-end mt-2" size={40}>
              {addtionalInfoOpen ? (
                <FaMinus
                  onClick={() => setAddtionalInfoOpen(false)}
                  className="text-red-500"
                />
              ) : (
                <FaPlus onClick={() => setAddtionalInfoOpen(true)} />
              )}
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>

            <div className=" flex items-end justify-end mt-2">
              <button className="dcm-button mr-2" type="submit">
                Create & Continue
              </button>

              <button className="dcm-close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <hr />
    </div>
  );
};

export default CreatePatient;

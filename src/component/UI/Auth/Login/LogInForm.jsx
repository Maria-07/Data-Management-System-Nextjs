import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../../../assets/img/LOGO.png";
// import Swal from "sweetalert2";
import { GoAlert } from "react-icons/go";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/Redux/features/auth/userApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const LogInForm = () => {
  const [value, setValue] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  // const { callbackUrl } = router.query;

  const [login, { isLoading }] = useLoginMutation(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await login(data);
      // console.log("response", response);

      if (response?.data?.status === "success") {
        toast.success(response?.data?.message);
        router.push("/provider/dashboard");
      } else {
        setMessage(response?.data?.message);
        toast.error(response?.error?.data?.message);
        reset();
      }

      const accessToken = response?.data?.access_token;
      const loginuserFullname = response?.data?.user?.full_name;
      const loginuserEmail = response?.data?.user?.login_email;

      // console.log("accessToken ", accessToken);

      if (accessToken) {
        Cookies.set("accessToken", accessToken); // Store the access token in a cookie
        Cookies.set("loginuserFullname", loginuserFullname);
        Cookies.set("loginuserEmail", loginuserEmail);
      }
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <div
      style={{
        // background: `url(${bg})`,
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "fixed",
      }}
    >
      <div className="z-10 px-7 sm:px-16 py-7 sm:py-11 bg-white m-4 sm:m-5 shadow-xl border-8 border-secondary rounded-[35px] absolute login-form">
        <div className="">
          <div div className="">
            <Image src={logo} width={220} alt="TPMS-logo" className="mx-auto" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {message ? (
                  <div className="text-red-500 red-box  border border-gray-300 rounded-md px-3 font-medium py-[10px] mx-1 text-xs w-full flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GoAlert className=" text-red-500" /> {message}
                    </div>
                    <button
                      onClick={() => {
                        setLoading(false);
                        setMessage(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : null}
                <label className="label">
                  <span className="modal-label-name font-medium text-xs text-gray-600 text-left">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className="border rounded-md px-3 py-[5px] mx-1 text-xs w-full"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Enter Email",
                    },
                    pattern: {
                      value: /@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "Provide a valid Email", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                />
              </div>

              <label>
                <span className="label-text-alt">
                  {errors.email?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.email.message}
                    </p>
                  )}
                </span>
              </label>
              {/* password  */}
              {/* Password */}
              <div className="my-5">
                <label className="label flex justify-between items-end">
                  <span className="modal-label-name text-xs font-medium text-gray-600 text-left">
                    Password
                  </span>
                  <Link href={"/forgot-password"}>
                    <span className="modal-label-name text-xs text-secondary font-medium cursor-pointer">
                      Forget Password ?
                    </span>
                  </Link>
                </label>

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="border rounded-md px-3 py-[5px] mx-1 text-xs w-full"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Enter Password",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters",
                    },
                  })}
                />
              </div>

              <label>
                <span className="label-text-alt">
                  {errors.password?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.password.message}
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.password.message}
                    </p>
                  )}
                </span>
              </label>

              {/* submit  */}
              <div className="flex items-center justify-between mt-2 mb-6">
                <div className="flex ml-1 mt-1 items-center">
                  <input
                    type="checkbox"
                    name="patient"
                    onClick={() => {
                      setValue(!value);
                    }}
                  />
                  <span className="text-xs ml-1 font-medium text-gray-600 ">
                    Remember Me
                  </span>
                </div>
                {!loading ? (
                  <button
                    className=" py-2 px-4  text-xs font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-sm"
                    type="submit"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="flex justify-center">
                    {/* <SmallLoader></SmallLoader> */}
                  </div>
                )}
              </div>
            </form>
            <p className="text-xs my-2 font-normal text-gray-400">
              Therapy PMS respects the privacy of our users and values their
              trust. Please read our{" "}
              <span className=" text-primary">privacy policy</span> carefully.
              If you do not agree with the terms of our privacy policy, then
              please do not access the site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;

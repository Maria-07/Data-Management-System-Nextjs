import RootLayout from "@/component/Layouts/RootLayout";
import { useForm } from "react-hook-form";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "@/Redux/features/staff/otherSetup/otherSetupApi";

const UpdatePassword = () => {
  const token = getAccessToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [
    updateUserPassword,
    { isSuccess: updateSuccess, isError: updateError },
  ] = useUpdatePasswordMutation();

  const onSubmit = (data) => {
    if (newPassword !== confirmPassword) {
      toast.error("Password Mismatch", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      const payload = {
        current_password: data?.current_password,
        new_password: data?.new_password,
        confirm_new_password: data?.confirm_password,
      };
      // console.log(payload);
      if (payload) {
        updateUserPassword({
          token,
          payload,
        });
      }
      reset();
    }
  };
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Password changed successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (updateError) {
      toast.error("Current Password is wrong", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [updateSuccess, updateError]);
  return (
    <div>
      <div className="flex items-center flex-wrap justify-between gap-2 mt-2 mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg text-orange-500 text-left font-semibold ">
            Change Password
          </h1>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-x-4 gap-y-4 items-center">
            <div>
              <label className="label">
                <span className=" label-font">
                  Current Password<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                {...register("current_password", {
                  required: {
                    value: true,
                    message: "Please enter the current password",
                  },
                })}
              />
              <span className="label-text-alt">
                {errors.current_password?.type === "required" && (
                  <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                    {errors.current_password.message}
                  </p>
                )}
              </span>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">
                  New Password<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                {...register("new_password", {
                  required: {
                    value: true,
                    message: "Please enter the new password",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span className="label-text-alt">
                {(errors.new_password?.type === "required" ||
                  errors.new_password?.type === "minLength") && (
                  <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                    {errors.new_password.message}
                  </p>
                )}
              </span>
            </div>
            <div>
              <label className="label">
                <span className=" label-font">
                  Confirm Password<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Please enter the confirm password",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="label-text-alt">
                {(errors.confirm_password?.type === "required" ||
                  errors.new_password?.type === "minLength") && (
                  <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                    {errors.confirm_password.message}
                  </p>
                )}
              </span>
            </div>
          </div>
          <div className="mt-5">
            <button className=" dtm-button" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;

UpdatePassword.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

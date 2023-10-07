import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useGetSupervisorListQuery,
  useUpdateDepartmentMutation,
} from "@/Redux/features/staff/staffDepartment/departmentApi";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DepartmentSupervisor = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.departmentSupervisor;
  console.log(id);
  const token = getAccessToken();

  const [sortBy, setSortBy] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: superVisors, isLoading: superVisorLoading } =
    useGetSupervisorListQuery({
      id,
      token,
    });

  useEffect(() => {
    setSortBy(superVisors?.exist_dep?.is_supervisor);
  }, [superVisors?.exist_dep?.is_supervisor]);

  const [updateDepartment, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateDepartmentMutation();

  let provider = null;
  if (superVisors?.clients?.length === 0) {
    provider = <div className="text-red-700">Select One</div>;
  } else if (superVisors?.clients?.length > 0) {
    provider = (
      <>
        {superVisors?.clients?.map((s) => {
          return (
            <option key={s?.id} value={s?.id}>
              {s?.full_name}
            </option>
          );
        })}
      </>
    );
  }

  //To show default data in the form
  useEffect(() => {
    setTimeout(() => {
      reset({
        supervisor_id: superVisors?.exist_dep?.supervisor_id,
      });
    }, 500);
  }, [reset, superVisors?.exist_dep?.supervisor_id]);

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      employee_id: id,
      is_supervisor: Number(sortBy),
      supervisor_id: Number(data?.supervisor_id),
    };
    if (payload) {
      updateDepartment({
        token,
        payload,
      });
    }
    console.log("payload", payload);
  };
  console.log("sort by value", sortBy);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("successfully provider dept. supervisor updated", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (updateError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [updateSuccess, updateError]);

  return (
    <div className="h-[100vh]">
      <h1 className="text-lg  text-left text-orange-400 mb-4">Supervisor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-wrap items-center gap-x-5 gap-y-4">
          <div>
            <label className="label">
              <span className="label-font">Is this provider a supervisor?</span>
            </label>
            <select
              defaultValue={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-border-bottom mt-1 input-font w-full focus:outline-none"
              // {...register("is_supervisor")}
            >
              <option value={1}>Yes</option>
              <option value={2}>No</option>
            </select>
          </div>
          {sortBy == 2 && (
            <div>
              <label className="label">
                <span className="label-font font-semibold">Supervisor</span>
              </label>
              <select
                className="input-border-bottom mt-1 input-font w-full focus:outline-none"
                {...register("supervisor_id")}
              >
                <option value="0"></option>
                {provider}
              </select>
            </div>
          )}
        </div>
        <button className="dcm-button  my-5" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default DepartmentSupervisor;

DepartmentSupervisor.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

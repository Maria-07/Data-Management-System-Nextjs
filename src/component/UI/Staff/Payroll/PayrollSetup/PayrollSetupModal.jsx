import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import PyarollMultiSelect from "../PayrollMultiSelect/PyarollMultiSelect";
import { useAddPayrollMutation } from "@/Redux/features/staff/payroleSetup/payrollSetupApi";

const PayrollSetupModal = ({ handleClose, open, services, token, id }) => {
  const [active, setActive] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState(false);
  const [serviceId, setServiceId] = useState([]);

  // console.log("seleted service ID", serviceId);
  // console.log("services data ", services);
  //add payroll api
  const [addPayroll, { isSuccess: addSuccess, isError: addError }] =
    useAddPayrollMutation();

  const onSubmit = (data) => {
    const payload = {
      hourly_rate: data?.hourly_rate,
      milage_rate: data?.milage_rate,
      ser_id: serviceId,
      employee_id: id,
    };
    if (serviceId?.length !== 0) {
      addPayroll({
        token,
        payload,
      });
    }
  };

  useEffect(() => {
    if (addSuccess) {
      toast.success("successfully payroll created", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      handleClose();
    } else if (addError) {
      toast.error("service already exist", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px", width: "70%" },
      });
    }
  }, [addSuccess, addError, handleClose]);
  return (
    <div>
      <div>
        <Modal
          open={true} //aikhaney true na likey ekta state ana lagbey tar value 'true'
          centered
          footer={null}
          bodyStyle={{ padding: "0" }}
          closable={false}
          className="box rounded-xl"
        >
          <div className="px-2 py-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-left text-orange-400 ">Payroll</h1>
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-600 mt-1">
                The staff rates need to be setup before they can be scheduled
                for plan of care.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-1">
                <div>
                  <label className="label">
                    <span className="modal-label-name">Service</span>
                  </label>
                  <PyarollMultiSelect
                    setServiceId={setServiceId}
                    Alldata={services}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="modal-label-name">Hourly Rate</span>
                  </label>
                  <input
                    type="text"
                    name="hourly_rate"
                    className="modal-input-field ml-1 w-full"
                    {...register("hourly_rate")}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="modal-label-name">
                      Milage Rate (cents/mile)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="milage_Rate"
                    className="modal-input-field ml-1 w-full"
                    {...register("milage_rate")}
                  />
                </div>

                {/*
                <div className="flex ml-1 mt-8 gap-2 items-center">
                  <input
                    type="checkbox"
                    name="service"
                    onClick={() => {
                      setValue(!value);
                    }} 
                  />
                  <span className="modal-label-name">Apply to All Service</span>
                </div>
                */}
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className=" flex items-end justify-end mt-2">
                <button className=" dcm-button mr-2" type="submit">
                  Save
                </button>

                <button className="dcm-close-button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PayrollSetupModal;

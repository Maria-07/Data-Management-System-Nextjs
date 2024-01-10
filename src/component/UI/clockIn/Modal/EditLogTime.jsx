import { Input, Modal } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useUpdatePunchListMutation } from "@/Redux/features/clockin/clockinApi";
import { getAccessToken } from "@/Redux/api/apiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const { TextArea } = Input;

const EditLogTime = ({ handleClose, open, selectedRecord, getRecords }) => {
  console.log('selectedRecord --', selectedRecord);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const token = getAccessToken();

  const convertTime12to24 = (time12h) => {  
    if(typeof time12h !== 'undefined') {
        let [hours, minutes, modifier] = time12h.split(':');  
        if (hours === '12') {
          hours = '00';
        }  
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }  
        return `${hours}:${minutes}:00`;    }
    return null;
  }

  useEffect(()=>{
    reset({ 
      punch_id : selectedRecord.id,
      punch_date: selectedRecord.punch_date,
      time_in: convertTime12to24(selectedRecord.time_in),
      time_out: convertTime12to24(selectedRecord.time_out),
      note: selectedRecord.note,
    });
  },[])
 
  const [
    updatePunchData,
    { isSuccess: updatePunchSuccess, isError: updatePunchError },
  ] = useUpdatePunchListMutation();

  useEffect(() => {
    if (updatePunchSuccess) {
      getRecords();
      handleClose();
      toast.success("Successfully updated", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } else if (updatePunchError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
    //handleClose dependency tey na dileo choley cuz aita change hoy na
  }, [updatePunchSuccess, updatePunchError, handleClose]);

  const onSubmit = (data) => {    
    const payload = {
      punch_id:data?.punch_id,
      punch_date:data?.punch_date,
      time_in:data?.time_in.substring(0,5),
      time_out:data?.time_out.substring(0,5),
      note:data?.note,
    }
    updatePunchData({
      token,
      payload
    })
  };

  return (
    <div>
      <Modal
        open={open}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              Edit Log Time
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
              <div className="sm:col-span-2">
                <label className="label">
                  <div className="modal-label-name">Date</div>
                </label>
                <input type="hidden" {...register("punch_id")}/>
                <input
                  type="date"
                  name="clear_type"
                  className="modal-input-field ml-1 w-full"
                  {...register("punch_date")}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <div className="modal-label-name">Clock in</div>
                </label>
                <input
                  type="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("time_in", {
                    required: {
                      value: true,
                      message: "Please select the clock in",
                    }
                  })}
                />
                <span className="label-text-alt">
                  {errors.time_in?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.time_in.message}
                    </p>
                  )}
                </span>
              </div>
              <div>
                {" "}
                <label className="label">
                  <div className="modal-label-name">Clock out</div>
                </label>
                <input
                  type="time"
                  className="modal-input-field ml-1 w-full"
                  {...register("time_out", {
                    required: {
                      value: true,
                      message: "Please select the clock out",
                    }
                  })}
                />
                <span className="label-text-alt">
                  {errors.time_out?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.time_out.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="sm:col-span-2">
                <label className="label">
                  <div className="modal-label-name">Write Note Here:</div>
                </label>
                <textarea
                  className="input-border input-font py-[1px] w-full focus:outline-none"
                  {...register("note", {
                    required: {
                      value: true,
                      message: "Please enter the note",
                    }
                  })}
                  rows={4}
                  cols={40}
                />
                <span className="label-text-alt">
                  {errors.note?.type === "required" && (
                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                      {errors.note.message}
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-10"></div>
            <div className=" flex items-end justify-end mt-2 gap-2">
              <button className="dcm-modal-submit-button" type="submit">
                Update Log Time
              </button>

              <button className="dcm-modal-close-button" onClick={handleClose}>
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditLogTime;

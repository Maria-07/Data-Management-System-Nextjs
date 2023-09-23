import { Modal, Select, Tabs } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";

const BulkInviteStaff = ({ handleClose, clicked }) => {
  const [value, setValue] = useState("");
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const items = ["Restricted to specific people", "Anyone with a link"];
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={700}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-semibold tracking-tight">
              Bulk Invite Staffs
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>
          <form>
            <div>
              <div className="px-2 my-5">
                <h1 className="text-sm mb-2 font-medium">Emails</h1>
                <Select
                  style={{
                    width: "100%",
                  }}
                  mode="tags"
                  showSearch
                  size="large"
                  bordered={true}
                  onChange={onChange}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>

              <div className="px-2 my-5">
                <h1 className="text-sm mb-2 font-medium">
                  Assigned Role <span className="text-rose-500">*</span>
                </h1>
                <Select
                  style={{
                    width: "100%",
                  }}
                  mode="multiple"
                  showSearch
                  size="large"
                  bordered={true}
                  onChange={onChange}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
              <div className="px-2 my-5">
                <h1 className="text-sm mb-2 font-medium">
                  Business Unit
                  <span className="text-gray-400 text-xs">(optional)</span>
                </h1>
                <Select
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  mode="tags"
                  size="large"
                  bordered={true}
                  onChange={onChange}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
                <span className="text-sm text-gray-600">
                  Invited users will have access to all clients assigned to the
                  selected business units
                </span>

                <div className="flex items-center gap-2 my-1">
                  <div>
                    <input
                      type="checkbox"
                      className="mt-2"
                      {...register("manually_change")}
                    />
                  </div>
                  <h1 className="text-base font-semibold">
                    Auto-link to TherapyPMS staff profile
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 pt-[1px] mt-3"></div>
            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                SEND INVITATION
              </button>
              <button onClick={handleClose} className="dcm-modal-close-button">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BulkInviteStaff;

import { Select } from "antd";
import React, { useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import EditStaffProfileModal from "./EditStaffProfileModal";

const InfoOrganization = ({ handleClose }) => {
  const [value, setValue] = useState("");
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  const [editStaffProfile, setEditStaffProfile] = useState(false);
  const handleEditStaffProfile = () => {
    setEditStaffProfile(!editStaffProfile);
  };

  const items = ["Restricted to specific people", "Anyone with a link"];
  return (
    <div className="">
      <form>
        <div className="flex items-center justify-center text-primary border border-primary transition-all hover:bg-secondary hover:text-white py-[2px] rounded-md mt-2 mx-2">
          <button
            type="button"
            onClick={handleEditStaffProfile}
            className="flex items-center justify-center gap-2 text-base uppercase font-semibold"
          >
            <BiLinkAlt className="text-xl" /> Edit TherapyPMS staff profile
            reference
          </button>
        </div>
        <div>
          <div className="px-2 my-5">
            <h1 className="text-sm mb-2 font-medium">
              Name <span className="text-rose-500">*</span>
            </h1>

            <div>
              <input type="text" className="modal-input-field w-[100%]  py-2" />
            </div>
          </div>
          <div className="px-2 my-5">
            <h1 className="text-sm mb-2 font-medium">
              E-mail <span className="text-rose-500">*</span>
            </h1>

            <div>
              <input
                type="email"
                className="modal-input-field w-[100%]  py-2"
              />
            </div>
          </div>
          <div className="px-2 my-5">
            <h1 className="text-sm mb-2 font-medium">
              User Role <span className="text-rose-500">*</span>
            </h1>
            <Select
              style={{
                width: "100%",
              }}
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
              Staff Profile{" "}
              <span className="text-gray-400 text-xs">(optional)</span>
            </h1>
            <Select
              style={{
                width: "100%",
              }}
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
        </div>
        <div className="bg-gray-200 pt-[1px] mt-3"></div>
        <div className="flex gap-3 items-end justify-end mb-2 mt-4">
          <button type="submit" className="dcm-modal-submit-button">
            Ok
          </button>
          <button onClick={handleClose} className="dcm-modal-close-button">
            Cancel
          </button>
        </div>
      </form>
      {editStaffProfile && (
        <EditStaffProfileModal
          handleClose={handleEditStaffProfile}
          clicked={editStaffProfile}
        ></EditStaffProfileModal>
      )}
    </div>
  );
};

export default InfoOrganization;

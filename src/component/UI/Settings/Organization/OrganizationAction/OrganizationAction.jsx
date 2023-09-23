import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt, BiWallet } from "react-icons/bi";
import EditOrganization from "./EditOrganization";
import DeleteOrganization from "./DeleteOrganization";
import StaffPrivileges from "./StaffPrivileges";

const OrganizationAction = ({ record }) => {
  const [editOrganization, setEditOrganization] = useState(false);
  const handleEditOrganization = () => {
    setEditOrganization(!editOrganization);
  };

  const [deleteOrganization, setDeleteOrganization] = useState(false);
  const handleDeleteOrganization = () => {
    setDeleteOrganization(!deleteOrganization);
  };

  const [privilegeOrganization, setPrivilegeOrganization] = useState(false);
  const handlePrivilegeOrganization = () => {
    setPrivilegeOrganization(!privilegeOrganization);
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-xl">
        <AiOutlineDelete
          onClick={handleDeleteOrganization}
          title="Delete"
          className="text-rose-500"
        />
        <BiEditAlt onClick={handleEditOrganization} title="Edit" />
        <BiWallet onClick={handlePrivilegeOrganization} title="Edit" />
      </div>
      {editOrganization && (
        <EditOrganization
          role={record?.role}
          handleClose={handleEditOrganization}
          clicked={editOrganization}
        ></EditOrganization>
      )}
      {deleteOrganization && (
        <DeleteOrganization
          name={record?.patient_name}
          handleClose={handleDeleteOrganization}
          clicked={deleteOrganization}
        ></DeleteOrganization>
      )}
      {privilegeOrganization && (
        <StaffPrivileges
          role={record?.role}
          handleClose={handlePrivilegeOrganization}
          clicked={privilegeOrganization}
        ></StaffPrivileges>
      )}
    </div>
  );
};

export default OrganizationAction;

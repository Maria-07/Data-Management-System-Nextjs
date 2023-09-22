import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import EditOrganization from "./EditOrganization";

const OrganizationAction = ({ role }) => {
  const [editOrganization, setEditOrganization] = useState(false);
  const handleEditOrganization = () => {
    setEditOrganization(!editOrganization);
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-xl">
        <AiOutlineDelete title="Delete" className="text-rose-500" />
        <BiEditAlt onClick={handleEditOrganization} title="Edit" />
      </div>
      {editOrganization && (
        <EditOrganization
          role={role}
          handleClose={handleEditOrganization}
          clicked={editOrganization}
        ></EditOrganization>
      )}
    </div>
  );
};

export default OrganizationAction;

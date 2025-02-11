import { Collapse } from "antd";
import SubDomain from "../SubDomain/SubDomain";
import { AiFillEdit } from "react-icons/ai";
import DomainEditModal from "./DomainEditModal";
import { useState } from "react";
import { useTheme } from "next-themes";

const { Panel } = Collapse;

const Domain = () => {
  const [editFolder, setEditFolder] = useState(false);
  const handleEditFolder = () => {
    setEditFolder(!editFolder);
  };
  const domains = [
    {
      id: 1,
      domain_title: "Expressive Skills",
      sub_domain: {
        sub_domain_title: "Sub-area",
        sub_Domains: [
          {
            sub_d1: "domain 1",
          },
        ],
      },
    },
    {
      id: 2,
      domain_title: "Receptive Skills",
      sub_domain: {
        sub_domain_title: "Sub-area",
        sub_Domains: [
          {
            sub_d1: "domain 1",
          },
        ],
      },
    },
    {
      id: 3,
      domain_title: "Listener Responding",
      sub_domain: {
        sub_domain_title: "Sub-area",
        sub_Domains: [
          {
            sub_d1: "domain 1",
          },
        ],
      },
    },
  ];
  //! Theme system
  const { theme } = useTheme();

  return (
    <div>
      <div
        className={`${
          theme === "dark" ? "bg-gray-50 my-5 rounded-md" : " my-5"
        }`}
      >
        <Collapse accordion>
          {domains.map((domain) => (
            <Panel
              header={
                <div className="flex items-center justify-between">
                  <div className="text-base">{domain.domain_title}</div>
                  <div className="my-auto flex items-end justify-end mr-3">
                    <AiFillEdit
                      onClick={handleEditFolder}
                      className="text-xl"
                    />
                  </div>
                </div>
              }
              key={domain.id}
            >
              <SubDomain domain={domain}></SubDomain>
            </Panel>
          ))}
        </Collapse>
      </div>
      {editFolder && (
        <DomainEditModal
          handleClose={handleEditFolder}
          clicked={editFolder}
        ></DomainEditModal>
      )}
    </div>
  );
};

export default Domain;

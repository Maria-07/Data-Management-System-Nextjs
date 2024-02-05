import Instructions from "@/component/UI/Patients/Patients/CinicalData/Tabs/Instructions";
import ProfessionalGuide from "@/component/UI/Patients/Patients/CinicalData/Tabs/ProfessionalGuide";
import { Modal, Tabs } from "antd";
import { useTheme } from "next-themes";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ProgramMods from "../Compliance/ProgramMods";

const ProgramInfoModal = ({ handleClose, clicked, title }) => {
  //! Theme system
  const { theme } = useTheme();
  const tabItems = [
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-primary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base transition-all w-[50%]`}
        >
          Instructions
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${theme === "dark" ? "text-dark-primary" : "text-fontC"}`}
        >
          <Instructions></Instructions>
        </div>
      ),
    },
    // {
    //   label: (
    //     <h1
    //       className={`${
    //         theme === "dark"
    //           ? "text-dark-primary"
    //           : "text-fontC hover:text-secondary"
    //       } sm:px-10 text-base  transition-all`}
    //     >
    //       Professional Guide
    //     </h1>
    //   ),
    //   key: 2,
    //   children: (
    //     <>
    //       <ProfessionalGuide></ProfessionalGuide>
    //     </>
    //   ),
    // },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-primary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Target
        </h1>
      ),
      key: 3,
      children: (
        <>
          <></>
        </>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-primary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          History
        </h1>
      ),
      key: 4,
      children: (
        <>
          <ProfessionalGuide></ProfessionalGuide>
        </>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-primary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Program Mods
        </h1>
      ),
      key: 5,
      children: (
        <>
          <ProgramMods></ProgramMods>
        </>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <div>
        <Modal
          open={clicked}
          centered
          footer={null}
          bodyStyle={{ padding: "0" }}
          width={800}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">{title}</h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <div className="mt-5">
              <Tabs tabBarGutter={2} type="card" items={tabItems} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProgramInfoModal;

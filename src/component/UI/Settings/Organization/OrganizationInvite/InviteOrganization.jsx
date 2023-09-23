import { Modal, Tabs } from "antd";
import { useTheme } from "next-themes";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InfoInviteStaff from "./InfoInviteStaff";
import ClientInvite from "./ClientInvite";
// import InfoOrganization from "./InfoOrganization";
// import ClientOrganization from "./ClientOrganization";

const InviteOrganization = ({ handleClose, clicked }) => {
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
          Info
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${theme === "dark" ? "text-dark-primary" : "text-fontC"}`}
        >
          <InfoInviteStaff handleClose={handleClose}></InfoInviteStaff>
        </div>
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
          Client
        </h1>
      ),
      key: 2,
      children: (
        <>
          <ClientInvite handleClose={handleClose}></ClientInvite>
        </>
      ),
    },
  ];
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
              Invite Staff
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>

          <div className="bg-gray-200 pt-[1px] mt-3"></div>

          <div className="mt-5">
            <Tabs tabBarGutter={6} type="card" items={tabItems} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InviteOrganization;

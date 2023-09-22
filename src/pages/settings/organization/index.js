/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import Manager from "@/component/UI/Settings/Organization/Manager/Manager";
import { Tabs } from "antd";
import { useTheme } from "next-themes";
import { BiPlus } from "react-icons/bi";

const organizationPage = () => {
  //! Theme system
  const { theme } = useTheme();
  const tabItems = [
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Manager
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <Manager></Manager>
        </div>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Supervisor
        </h1>
      ),
      key: 2,
      children: (
        <>
          <p className="px-2 text-base text-accent"> </p>
        </>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Behavior Analyst
        </h1>
      ),
      key: 3,
      children: (
        <>{/* <Reviews reviews={book?.reviews} id={book?.id}></Reviews> */}</>
      ),
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Behavior Technician
        </h1>
      ),
      key: 4,
      children: <>{/* <SimilarBooks></SimilarBooks> */}</>,
    },
    {
      label: (
        <h1
          className={`${
            theme === "dark"
              ? "text-dark-secondary"
              : "text-fontC hover:text-secondary"
          } sm:px-10 text-base  transition-all`}
        >
          Parent
        </h1>
      ),
      key: 5,
      children: <>{/* <SimilarBooks></SimilarBooks> */}</>,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p
          className={`${
            theme === "dark"
              ? "text-dark-secondary font-semibold"
              : "dtm-title-head"
          }`}
        >
          Organization
        </p>
        <div className="flex items-center justify-start gap-3 ">
          <button
            // onClick={handleAddDomain}
            className="dtm-button flex items-center gap-2 uppercase"
          >
            <BiPlus className="text-xl " /> Invite Staffs
          </button>
          <button
            // onClick={handleAddDomain}
            className="dtm-button flex items-center gap-2 uppercase"
          >
            <BiPlus className="text-xl" /> Bulk Invite Staffs
          </button>
        </div>
      </div>
      <div className="my-10">
        <Tabs tabBarGutter={6} type="card" items={tabItems} />
      </div>
    </div>
  );
};

export default organizationPage;

organizationPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

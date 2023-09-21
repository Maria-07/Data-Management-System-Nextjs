import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import AddDomainModal from "@/component/UI/Settings/Domains/Domain/AddDomainModal";
import Domain from "@/component/UI/Settings/Domains/Domain/Domain";
import { useTheme } from "next-themes";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const DomainPage = () => {
  const [addDomain, setAddDomain] = useState(false);
  const handleAddDomain = () => {
    setAddDomain(!addDomain);
  };
  //! Theme system
  const { theme } = useTheme();
  return (
    <div>
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p
            className={`${
              theme === "dark"
                ? "text-dark-secondary font-semibold"
                : "dtm-title-head"
            }`}
          >
            Domains
          </p>
          <div className="flex items-center justify-start gap-3 ">
            <button
              onClick={handleAddDomain}
              className="dtm-button flex items-center gap-2"
            >
              <BiPlus className="text-xl" /> ADD DOMAIN
            </button>
          </div>
        </div>
        <div>
          <Domain></Domain>
        </div>
      </div>
      {addDomain && (
        <AddDomainModal
          handleClose={handleAddDomain}
          clicked={addDomain}
        ></AddDomainModal>
      )}
    </div>
  );
};

export default DomainPage;

DomainPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import PaypalInformation from "@/component/UI/Patients/Patients/PatientPayment/PaypalInformation/PaypalInformation";
import StripeInformation from "@/component/UI/Patients/Patients/PatientPayment/StripeInformation/StripeInformation";
import { Tabs } from "antd";
import { useTheme } from "next-themes";

const PatientPayment = () => {
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
          Stripe Information{" "}
          <span className="text-[10px] shadow-md ml-2 bg-primary text-white py-1 px-2 rounded-lg">
            Method-1
          </span>
        </h1>
      ),
      key: 1,
      children: (
        <div
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-fontC"
          }`}
        >
          <StripeInformation></StripeInformation>
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
          Paypal Information
          <span className="text-[10px] shadow-md ml-2 bg-primary text-white py-1 px-2 rounded-lg">
            Method-2
          </span>
        </h1>
      ),
      key: 2,
      children: <PaypalInformation></PaypalInformation>,
    },
  ];
  return (
    <div>
      <div className="my-10">
        <Tabs type="card" items={tabItems} />
      </div>
    </div>
  );
};

export default PatientPayment;

PatientPayment.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

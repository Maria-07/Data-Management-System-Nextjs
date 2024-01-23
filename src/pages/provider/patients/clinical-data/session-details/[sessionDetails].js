import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import ClinicalSessionCards from "@/component/UI/Patients/Patients/CinicalData/sessions/ClinicalSessionCards";
import CustomSelectAntd from "@/shared/CustomSelectAntd";
import { Timeline } from "antd";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

const SessionDetails = () => {
  //! Theme system
  const { theme } = useTheme();

  const [treatment, setTreatment] = useState("");
  const [treatmentArray, setTreatmentArray] = useState([
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "JavaScript",
    "Python",
  ]);
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1
          className={`${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }text-sm mb-2 font-semibold`}
        >
          Programs
        </h1>
        <div className="flex items-center gap-2">
          {/* <button
            //  className="border rounded bg-blue-500 hover:bg-blue-600 transition-all text-white px-2 py-2 text-xs font-semibold"
            className="dcm-button"
          > 
            START VIDEO SESSION
          </button> */}
          <Link href={"/provider/data-recording"}>
            <button className="border rounded bg-green-300 hover:bg-green-600 hover:text-white transition-all  px-2 py-2 text-xs font-semibold">
              START SESSION
            </button>
          </Link>
        </div>
      </div>
      <div className="my-5">
        <div>
          {/* <CustomSelectAntd
            item={treatmentArray}
            setOption={setTreatment}
            sName={"Programs"}
          ></CustomSelectAntd> */}
        </div>
      </div>
      <div>
        <ClinicalSessionCards></ClinicalSessionCards>
      </div>
      <div>
        {/* <h1 className="my-5 text-sm font-semibold">
          LATEST PROGRAM MODIFICATIONS
        </h1>

        <div>
          {" "}
          <div className="my-5">
            <h1 className="text-xl text-primary font-semibold mb-7">
              Thursday, November 23, 2023
            </h1>
            <div>
              <Timeline
                items={[
                  {
                    children: "Create a services site 2015-09-01",
                  },
                  {
                    children: "Solve initial network problems 2015-09-01",
                  },
                  {
                    children: "Technical testing 2015-09-01",
                  },
                  {
                    children: "Network problems being solved 2015-09-01",
                  },
                ]}
              />
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-xl text-primary font-semibold mb-7">
              Thursday, November 23, 2023
            </h1>
            <div>
              <Timeline
                items={[
                  {
                    children: "Create a services site 2015-09-01",
                  },
                  {
                    children: "Solve initial network problems 2015-09-01",
                  },
                  {
                    children: "Technical testing 2015-09-01",
                  },
                  {
                    children: "Network problems being solved 2015-09-01",
                  },
                ]}
              />
            </div>
          </div>
          <div className="my-5">
            <h1 className="text-xl text-primary font-semibold mb-7">
              Thursday, November 23, 2023
            </h1>
            <div>
              <Timeline
                items={[
                  {
                    children: "Create a services site 2015-09-01",
                  },
                  {
                    children: "Solve initial network problems 2015-09-01",
                  },
                  {
                    children: "Technical testing 2015-09-01",
                  },
                  {
                    children: "Network problems being solved 2015-09-01",
                  },
                ]}
              />
            </div>
          </div>
        </div> */}

        <div className="flex items-center justify-between gap-2">
          <button className="dtm-button">CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;

SessionDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

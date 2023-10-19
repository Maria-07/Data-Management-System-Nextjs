import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";

import React, { useState } from "react";
import { Switch } from "antd";
import { useRouter } from "next/router";

const PatientPortal = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.PatientPortal;
  console.log(id);

  const [active, setActive] = useState(false);
  console.log("patient Portal", id);
  const [secure, setSecure] = useState(false);
  const [billing, setBilling] = useState(false);
  const [pay, setPay] = useState(false);
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState(true);
  console.log(email);
  const [share, setShare] = useState("");

  const handleDate = (e) => {
    setShare(e.target.value);
  };

  return (
    <div className="h-[100vh]">
      <div className="ml-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-1">
        <div>
          <div>
            <h1 className="text-xl text-gray-600 font-semibold mb-2">
              Patient Portal Features
            </h1>
            <p className="text-xs text-gray-400">
              Select which features are available for this Patient Portal.
            </p>
            <div className="my-3">
              <div className="flex items-center mb-1">
                {/* <input
                type="checkbox"
                name="patient"
                onClick={() => {
                  setSecure(!secure);
                }}
              /> */}
                <Switch
                  size="small"
                  // checked={active ? true : false}
                  onClick={() => setActive(!active)}
                />
                <span className="text-xs ml-1 text-gray-700 font-medium">
                  Text message ok
                </span>
              </div>
              <div className="flex items-center mb-1">
                {/* <input
                type="checkbox"
                name="patient"
                onClick={() => {
                  setBilling(!billing);
                }}
              /> */}
                <Switch
                  size="small"
                  // checked={active ? true : false}
                  onClick={() => setActive(!active)}
                />
                <span className="text-xs ml-1 text-gray-700 font-medium">
                  Access billing documents
                </span>
              </div>
              <div className="flex items-center mb-1">
                {/* <input
                type="checkbox"
                name="patient"
                onClick={() => {
                  setPay(!pay);
                }}
              /> */}
                <Switch
                  size="small"
                  // checked={active ? true : false}
                  onClick={() => setActive(!active)}
                />
                <span className="text-xs ml-1 text-gray-700 font-medium">
                  Pay a balance with credit card using Stripe
                </span>
              </div>
            </div>

            <button className="dcm-button my-3">Save Features</button>
          </div>
          <div className="my-2">
            <h1 className="text-lg text-orange-400 font-semibold mb-2">
              Share Password Change Link
            </h1>
            <p className="text-[12px] font-normal text-gray-500">
              Select an expiration date & generate the link to share it with
              user. Remember that anyone who has access to this link can change
              the password for relavent user.
            </p>
            <div className="my-3 flex item-center gap-2">
              <h1 className="text-sm my-1 text-red-500">
                Link Expiration Date
              </h1>
              <input
                onChange={handleDate}
                className="border rounded-sm px-2 mx-1 text-xs w-1/4"
                type="date"
              />
              <button className="py-[5px] px-3 text-xs font-normal bg-gradient-to-r from-secondary to-primary hover:to-secondary text-white ">
                Generate Link
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl text-gray-600 font-semibold mb-2">
            Patient Portal Features
          </h1>
          <p className="text-xs text-gray-400">
            Select which features are available for this Patient Portal.
          </p>
          <div className="my-3">
            <select
              className="border rounded-sm px-2 py-[4px]  text-xs w-full md:w-1/2"
              onChange={(e) => setEmail(e.target.value)}
            >
              <option value="mail">amro@aamm.com</option>
              <option value="rome">amrrrrrrrrro@aamm.com</option>
            </select>
          </div>
          {/* {display && (
            <div className="text-red-500 red-box  border border-gray-300 rounded-sm px-3 font-medium py-[10px]  text-xs w-full flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <GoAlert className="text-red-500" /> Patient portal access need
                to be initiated
              </span>
              <span
                onClick={() => {
                  setDisplay(false);
                }}              
              >
                <FcCancel />
              </span>                                            
            </div>
          )} */}
          <div className="text-green-500 green-box my-3 border border-gray-300 rounded-sm px-3 font-medium py-[10px]  text-xs w-full flex justify-between items-center gap-2">
            <span className="flex items-center gap-2">
              Patient has signed Up.
            </span>
          </div>
          {/* <button className=" pms-button my-2">Send Invitation</button> */}
          <div className="flex items-center mb-1">
            <Switch
              size="small"
              // checked={active ? true : false}
              onClick={() => setActive(!active)}
            />
            <span className="text-xs ml-1 text-gray-700 font-medium">
              Send Intake
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;

PatientPortal.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

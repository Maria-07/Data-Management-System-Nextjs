import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import { Switch } from "antd";
import { useState } from "react";

const StaffPortal = () => {
  const [active, setActive] = useState(false);
  const [secure, setSecure] = useState(false);
  const [billing, setBilling] = useState(false);
  const [pay, setPay] = useState(false);
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState(true);
  const [share, setShare] = useState("");

  const handleDate = (e) => {
    setShare(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="h-[100vh]">
          <div className="ml-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-1">
            <div>
              <div>
                <h1 className="text-lg text-orange-400 font-semibold mb-2">
                  Staff Portal Features
                </h1>
                <p className="text-[12px] text-gray-500">
                  Select which features are available for this Staff Portal.
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
                      // onClick={() => setActive(!active)}
                    />
                    <span className="text-xs ml-1 text-gray-700 font-medium">
                      Use secure messaging
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
                      // onClick={() => setActive(!active)}
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
                      // onClick={() => setActive(!active)}
                    />
                    <span className="text-xs ml-1 text-gray-700 font-medium">
                      Pay a balance with credit card using Stripe
                    </span>
                  </div>
                </div>

                <button className=" py-[5px] mt-2 px-3  text-xs font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-md">
                  Save Features
                </button>
              </div>
              <div className="my-2">
                <h1 className="text-lg text-orange-400 font-semibold mb-2">
                  Share Password Change Link
                </h1>
                <p className="text-[12px] font-normal text-gray-500">
                  Select an expiration date & generate the link to share it with
                  user. Remember that anyone who has access to this link can
                  change the password for relavent user.
                </p>
                <div className="my-3 flex flex-wrap item-center gap-2">
                  <h1 className="text-sm my-1 text-red-500">
                    Link Expiration Date
                  </h1>
                  <input
                    onChange={handleDate}
                    className="border rounded-sm px-2 sm:mx-1 text-xs sm:w-1/4"
                    type="date"
                  />
                  <button className="py-[5px] px-3 text-xs font-normal bg-gradient-to-r from-secondary to-primary hover:to-secondary text-white ">
                    Generate Link
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-lg text-orange-400 font-semibold mb-2">
                Staff Portal Access
              </h1>
              <p className="text-[12px] text-gray-500">
                Staff will create their own accounts to access your Staff
                Portal.
              </p>
              <div className="my-3 flex item-center gap-2">
                <h1 className="text-sm font-medium text-gray-500">Email :</h1>
                <select
                  className="border rounded-sm px-2 py-[4px]  text-xs w-full md:w-1/2"
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <option value="mail">amro@aamm.com</option>
                  <option value="rome">amrrrrrrrrro@aamm.com</option>
                </select>
              </div>
              {display && (
                <div className="text-green-500 green-box border border-gray-300 rounded-sm px-3 font-normal py-[10px]  text-xs w-full flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2">
                    Staff has signed Up!
                  </span>
                  <span
                    onClick={() => {
                      setDisplay(false);
                    }}
                  >
                    X
                  </span>
                </div>
              )}
              <button className=" py-[5px] mt-2 px-3  text-xs font-normal bg-gradient-to-r from-secondary to-primary  hover:to-secondary text-white rounded-md">
                Send Invitation
              </button>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
};

export default StaffPortal;

StaffPortal.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

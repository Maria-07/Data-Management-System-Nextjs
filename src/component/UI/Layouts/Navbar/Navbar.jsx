import { Dropdown, Image } from "antd";
import Link from "next/link";
import {
  BiExitFullscreen,
  BiFullscreen,
  BiLockOpen,
  BiPlusCircle,
  BiSolidUserRectangle,
} from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  IoChatboxEllipsesOutline,
  IoCloudDownloadOutline,
} from "react-icons/io5";
import ScheduleExport from "./ScheduleExport/ScheduleExport";
import Add from "./Add/Add";

const Navbar = ({ handle }) => {
  return (
    <div className="bg-white rounded-[30px] py-1  shadow-md border px-2">
      <div className="flex items-center justify-between pr-4">
        <div
          className="flex  items-center gap-2 md:gap-4  font-medium cursor-pointer font-[Poppins] 
      text-gray-800 ml-2"
        >
          <div className="w-9 mt-1">
            <Image
              src={
                "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1191"
              }
              width={"auto"}
              height={"auto"}
              alt="Picture of the author"
              className="rounded-full"
            />
          </div>

          <div>
            <p className="md:text-base font-semibold text-[12px] text-gray-800  bg-transparent ">
              ABC Data Therapy Centers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[25px] text-dark">
          <div>
            {!handle.active ? (
              <div>
                <BiFullscreen
                  onClick={handle.enter}
                  className="hover:text-primary"
                />
              </div>
            ) : (
              <div>
                <BiExitFullscreen
                  onClick={handle.exit}
                  className="hover:text-primary"
                />
              </div>
            )}
          </div>

          <div>
            <Dropdown
              dropdownRender={() => (
                <>
                  <Add></Add>
                </>
              )}
              placement="bottomRight"
              arrow
            >
              <BiPlusCircle className="hover:text-primary" />
            </Dropdown>
          </div>
          <div>
            <Dropdown
              dropdownRender={() => (
                <>
                  <div className="w-[400px] mt-2">
                    <div className="bg-gradient-to-r  from-primary to-secondary rounded-t-xl p-2 flex justify-between">
                      <h4 className="mx-auto text-white font-medium">
                        Latest Changes
                      </h4>
                    </div>
                    <div className="shadow-md bg-white p-3">
                      <span className="text-info text-sm text-justify">
                        <span className="bg-primary px-2 py-[2px] text-xs rounded-full text-white mr-2">
                          New
                        </span>
                        Latest changes NewTelehealth Video Session. Video
                        Session feature for Telehealth For Telehealth, video
                        session feature is added. You can...
                      </span>
                      <div className="card-actions">
                        <button className="rounded px-2 mx-auto bg-secondary text-white font-medium text-sm gap-2 shadow-md mb-3 mt-5 flex items-center justify-center py-1 hover:bg-primary">
                          View cart
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              placement="bottomRight"
              arrow
            >
              <IoMdNotificationsOutline className="hover:text-primary" />
            </Dropdown>
          </div>
          <div>
            <IoChatboxEllipsesOutline className="hover:text-primary" />
          </div>
          <div>
            <Dropdown
              dropdownRender={() => (
                <>
                  <ScheduleExport></ScheduleExport>
                </>
              )}
              placement="bottomRight"
              arrow
            >
              <IoCloudDownloadOutline className="hover:text-primary" />
            </Dropdown>
          </div>
          <div>
            <Dropdown
              dropdownRender={() => (
                <div className="w-full">
                  <div className="bg-gradient-to-r  from-primary to-secondary rounded-t-xl p-4 flex items-center justify-between">
                    <div className="w-8 mr-1 rounded-full">
                      <Image
                        src={
                          "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1191"
                        }
                        width={"auto"}
                        height={"auto"}
                        alt="Picture of the author"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h5 className=" text-sm text-white font-bold text-end">
                        Hello admin
                      </h5>
                      <p className="text-xs text-white">admin@admin.com</p>
                    </div>
                  </div>
                  <div className="shadow-md bg-white">
                    <div>
                      <Link
                        href={"/"}
                        className="flex gap-4 hover:bg-slate-100 bg-opacity-10 p-3"
                      >
                        <div className=" rounded-full p-3 bg-primary ">
                          <BiSolidUserRectangle className="text-white text-lg" />
                        </div>
                        <div>
                          <button className="font-bold text-sm">
                            My Profile
                          </button>
                          <p className="text-[#7c8186] text-xs">
                            View personal profile details
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={"/"}
                        className="flex gap-4 hover:bg-slate-100 bg-opacity-10 p-3"
                      >
                        <div className=" rounded-full p-3 bg-primary ">
                          <BiLockOpen className="text-white text-lg" />
                        </div>
                        <div>
                          <button className="font-bold text-sm ">
                            Change Password
                          </button>
                          <p className="text-[#7c8186] text-xs ">
                            Update your password
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="pb-2">
                      <button
                        type="button"
                        className="rounded px-2 mx-auto bg-secondary text-white font-medium text-sm gap-2 shadow-md mb-3 mt-5 flex items-center justify-center py-1 hover:bg-[#B91C1C] "
                        // onClick={handleSignOut}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
              placement="bottomRight"
              arrow
            >
              <label className="flex gap-2 items-center cursor-pointer ">
                <div className="w-8 mr-1 mt-3">
                  <Image
                    src={
                      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1191"
                    }
                    width={"auto"}
                    height={"auto"}
                    alt="Picture of the author"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Admin</h4>
                  <h5 className="text-secondary font-medium text-xs">
                    admin@admin.com
                  </h5>
                </div>
              </label>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import Link from "next/link";
import { useState } from "react";
import {
  BiCalendarWeek,
  BiLibrary,
  BiSolidDashboard,
  BiSolidReport,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "@/customeHooks/useWindowDimensions";
import { handleSidebarFixed } from "@/Redux/features/sideBar/sideBarSlice";
import { motion } from "framer-motion";
import Navbar from "../UI/Layouts/Navbar/Navbar";
import SidebarMenu from "../UI/Layouts/Sidebar/SidebarMenu";
import logo1 from "../../assets/img/LOGO.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SettingOutlined } from "@ant-design/icons";
import Head from "next/head";
import Footer from "../UI/Layouts/Footer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const menuItem = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    path: "/library",
    name: "Library",
    icon: <BiLibrary />,
  },
  {
    path: "/appointment",
    name: "Appointment",
    icon: <BiCalendarWeek />,
  },
  {
    path: "/patients",
    name: "Patients",
    icon: <BiUserCircle />,
  },
  {
    path: "/staffs",
    name: "Staffs",
    icon: <BiUser />,
  },
  {
    path: "/report",
    name: "Report",
    icon: <BiSolidReport />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <SettingOutlined />,
  },
];

const initialDropState = {};

const RootLayout = ({ children }) => {
  const currentRoute = usePathname();
  const isToggled = useSelector((state) => state.sideBarInfo);
  console.log("isToggled", isToggled);
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const [dropState, setDropState] = useState(initialDropState);

  const { height, width } = useWindowDimensions();
  console.log("height", height);
  console.log("width", width);

  const handleDropState = (dropName) => {
    if (dropName === "other") setDropState(initialDropState);
    else
      setDropState((prevState) => ({
        ...initialDropState,
        [dropName]: !prevState[dropName],
      }));
  };

  // const { open, setOpen } = StateUse();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // const [sideBar, setSideBar] = useState(false);
  // const handleSidebar = () => {
  //   setSideBar(!sideBar);
  //   // console.log("sidebar", sideBar);
  // };

  const handleFixed = () => {
    dispatch(handleSidebarFixed());
  };

  const handle = useFullScreenHandle();

  return (
    <>
      <Head>
        <title>DTM</title>
        <meta
          name="description"
          content="This is Data Management Therapy : DTM, a CMS project made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <>
        <FullScreen handle={handle}>
          <div className="relative bg-neutral pt-3 pb-2 bg-[#f3f8ff]">
            <>
              {/* If fixed part no available  */}
              <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className=" fixed bg-secondary left-0 top-0 z-30 "
              >
                <div
                  className={
                    isHovering
                      ? " w-[250px] sidebar-box h-[100vh] sidebar-transition"
                      : " w-[70px] sidebar-box h-[100vh] sidebar-transition"
                  }
                >
                  <div className="top-section mb-2">
                    {isHovering ? (
                      <>
                        <div className=" transition-all text-primary">
                          <Image
                            src={logo1}
                            width={"100%"}
                            height={"auto"}
                            alt="Picture of the author"
                          />
                        </div>
                        {/* <button onClick={handleFixed}>
                        <BiDotsHorizontal className="text-2xl text-primary ml-[10px] isFixed" />
                      </button> */}
                      </>
                    ) : (
                      <>
                        <div className="text-lg">DCM</div>
                      </>
                    )}
                  </div>
                  <div
                    className={
                      height <= 720 ? "sidebar-scrolling pb-10" : "pb-10"
                    }
                  >
                    {menuItem.map((items, index) => (
                      <div key={index}>
                        {items.subRoute ? (
                          <Link href={"#"} key={index} className="">
                            <SidebarMenu
                              setSideBar={setSideBar}
                              items={items}
                              isHovering={isHovering}
                              dropState={dropState[items.name]}
                              handleDropState={handleDropState}
                              // handleSidebar={handleSidebar}
                            ></SidebarMenu>
                          </Link>
                        ) : (
                          <Link
                            href={items.path}
                            key={index}
                            // className="link flex"
                            className={
                              currentRoute === items.path
                                ? "link-active link flex"
                                : "link flex"
                            }
                            onClick={(_) => {
                              handleDropState("other");
                            }}
                          >
                            <div className="flex items-center">
                              <div className=" text-xl px-2 py-1">
                                {items.icon}
                              </div>
                              <div
                                className={
                                  isHovering
                                    ? " transition duration-500 ease-in-out text-[16px]  font-semibold"
                                    : " transition duration-500 ease-in-out text-[16px] font-semibold hidden"
                                }
                              >
                                {items.name}
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="slide"
            >
              <div className="lg:ml-[98px] lg:mr-[22px] mx-2">
                <Navbar handle={handle}></Navbar>
              </div>

              <main className=" p-4 font-medium min-h-screen main bg-[#fff] border shadow-md rounded-2xl w-auto mt-4 mx-2 lg:ml-[98px] lg:mr-[22px]">
                {children}
              </main>

              <Footer></Footer>
            </motion.div>
          </div>
        </FullScreen>
      </>
    </>
  );
};

export default RootLayout;

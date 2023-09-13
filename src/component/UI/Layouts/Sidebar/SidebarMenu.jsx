// Sidebar Menu
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiUpArrow } from "react-icons/bi";

const SidebarMenu = ({
  items,
  isHovering,
  dropState,
  handleDropState,
  setSideBar,
  handleSidebar,
}) => {
  return (
    <div className="pl-4 py-3 hover:bg-primary text-white">
      <div
        onClick={(_) => {
          handleDropState(items.name);
          // setSideBar(false);
        }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className=" text-xl px-2">{items.icon}</div>
          <div
            className={
              isHovering
                ? "mr-2 opacity-1 duration-600 ease-in text-[18px] font-semibold "
                : "mr-2 opacity-0 duration-200 ease-out text-[18px] font-semibold hidden"
            }
          >
            {items.name}
          </div>
        </div>

        <div
          className={
            isHovering
              ? "mr-3 opacity-1 duration-600 ease-in text-[16px]"
              : "mr-3 opacity-0 duration-200 ease-out text-[16px]"
          }
        >
          <BiUpArrow
            style={{
              transition: "all .3s ease-out",
              transform: `rotate(${!dropState ? "180" : "0"}deg)`,
            }}
          />
        </div>
      </div>
      {dropState && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={isHovering ? "ml-5 mr-5" : " mr-[10px] ml-[-4px]"}
          style={{
            transition: "0.4s",
          }}
        >
          {items.subRoute.map((s, i) => (
            <Link
              href={s.path}
              key={i}
              style={{ display: "block" }}
              className="hover:bg-white rounded-md py-1 my-2 hover:text-primary text-white"
              activeclassname="active_sidebar"
            >
              <div className="flex items-center h-8">
                <div className="text-lg  px-3 py-1">{s.icon}</div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Ai particular part a change kora lagbey */}
                  <div
                    // onClick={handleSidebar}
                    className={
                      isHovering
                        ? "mr-2 opacity-0.5 ease-in text-[16px] w-[187px] font-medium py-1"
                        : "mr-2 opacity-0 ease-out text-[16px] font-medium hidden"
                    }
                  >
                    {s.name}
                  </div>
                </motion.div>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SidebarMenu;

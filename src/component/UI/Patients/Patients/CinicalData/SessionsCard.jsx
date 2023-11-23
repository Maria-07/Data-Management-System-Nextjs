import { DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  BiCopy,
  BiDotsHorizontal,
  BiEdit,
  BiSolidBullseye,
} from "react-icons/bi";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosNotificationsOff,
} from "react-icons/io";

const SessionCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateObject = new Date(currentDate);

  const getAlphabeticMonth = (monthNumber) => {
    const monthNames = [
      "January",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1]; // Adjust for zero-indexed months
  };

  // Extract components (day, month, year)
  const day = dateObject.getDate();
  const month = getAlphabeticMonth(dateObject.getMonth() + 1);
  const year = dateObject.getFullYear();

  return (
    <div>
      <Link href={"/admin/patients/clinical-data/session-details/1212"}>
        {" "}
        <div className="border shadow-md  z-0 card rounded-t-lg bg-white my-2">
          {/* patient details  */}

          <div>
            <h1 className="bg-secondary text-sm w-full py-2 px-5 rounded-t-lg text-white font-medium">
              1:1 ABA Session
            </h1>
            <div>
              <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
                <div className="col-span-2 px-5 py-4 my-auto">
                  <div className="flex justify-between ">
                    <div>
                      <div className="font-semibold">Kyle Scibelli</div>
                      <div className="text-primary text-sm">
                        8:00 PM to 11:00 PM
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoIosNotificationsOff className="text-lg" />
                      <Dropdown
                        dropdownRender={() => (
                          <div className="bg-white  w-[200px] border shadow-md rounded-sm">
                            <div>
                              <button className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold ">
                                <BiCopy className="text-xl" /> Copy to client
                              </button>
                              <hr />
                              <button className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3">
                                <BiSolidBullseye className="text-xl" /> Preview
                              </button>
                              <button
                                // onClick={handleShareFolder}
                                className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                              >
                                <BiEdit className="text-xl" /> Edit
                              </button>
                              <button className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3">
                                <DeleteOutlined className="text-xl" /> Delete
                              </button>
                              <hr className="mt-4" />
                            </div>
                          </div>
                        )}
                        placement="bottomRight"
                        arrow
                      >
                        <Tooltip placement="top" color={"#0C356A"} title="more">
                          <BiDotsHorizontal className="text-xl text-dark hover:text-primary" />
                        </Tooltip>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary py-1 w-full">
                  <div className="flex justify-center items-center">
                    <div className="text-white mb-5">
                      <div className="text-lg font-semibold text-center">
                        {day}
                      </div>
                      <div className="text-lg font-semibold text-center">
                        {month}
                      </div>
                    </div>
                  </div>
                  <div className="px-2 mb-2 hover:text-secondary text-white">
                    <button className="font-semibold text-sm rounded-md  border-primary bg-primary w-full  uppercase border py-[6px]">
                      Start Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SessionCard;

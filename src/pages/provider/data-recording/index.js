import RootLayout from "@/component/Layouts/RootLayout";
import { Badge } from "antd";
import { BiSolidShare } from "react-icons/bi";
import { FaPause } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import Records from "@/component/UI/Appointment/Schedule/DataRecording/Records";
import TimerCount from "@/shared/Timer/TimerCount";

const DataRecording = () => {
  return (
    <div>
      {/* heading part  */}
      <div>
        <div className="grid grid-cols-10 ">
          {/* left part  */}
          <div className="  border-gray-600  bg-gray-200 h-[100vh]">
            <div className="my-auto flex items-center justify-center gap-3 bg-gray-800 py-[13px]">
              <ImNotification className="text-white " />
              <BiSolidShare className="text-white " />
              <IoReorderThreeOutline className="text-white text-xl" />
            </div>
            <div className="">
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#4CB9E7">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Go
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge
                  count={"1 / 3"}
                  size="small"
                  color="#304D30"
                  offset={[-15, 0]}
                >
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Cracker
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#3887BE">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Block
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#B1C381">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Help
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge
                  count={"1 / 1"}
                  size="small"
                  color="#557C55"
                  offset={[-15, 0]}
                >
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Drink
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#557C55">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Book
                  </p>
                </Badge>
              </div>
            </div>
          </div>
          {/* programs  */}
          <div className="col-span-8">
            <div className="">
              <div className="bg-gray-800 flex justify-between pb-[2px]">
                <div className="text-sm p-1 text-white pl-2">
                  <p>Kyle Scibelli</p>
                  <h1 className="text-xs text-gray-200">8:00 PM to 11:00 PM</h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className=" text-white  p-3 text-xl">
                    <FaPerson />
                  </div>
                  <TimerCount></TimerCount>
                  {/* <div className="bg-sky-400 text-gray-700 text-sm w-full py-1 rounded-sm">
                    <p className="text-center text-sm text-white px-2 mx-1 mb-1">
                      0:09:36
                    </p>
                    <div>
                      {" "}
                      <FaPause className="mx-auto" />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="my-5 px-3">
              <h1 className="text-base font-semibold">1:1 ABA Session</h1>
              <Records></Records>
            </div>
          </div>
          {/* Right part  */}
          <div className="  border-gray-600  bg-gray-200 h-[100vh]">
            <div className="my-auto flex items-center justify-center gap-3 bg-gray-800 py-[13px]">
              <ImNotification className="text-white " />
              <BiSolidShare className="text-white " />
              <IoReorderThreeOutline className="text-white text-xl" />
            </div>
            <div className="">
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#4CB9E7">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Elopement
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#4CB9E7">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Aggression Others
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#3887BE">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Aggression Objects
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#B1C381">
                  <p className="px-2 py-3 bg-secondary text-white rounded-md min-w-[100px] max-w-[105px] text-center">
                    Self Injury
                  </p>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRecording;

DataRecording.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

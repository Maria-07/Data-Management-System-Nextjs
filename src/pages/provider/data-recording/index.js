import RootLayout from "@/component/Layouts/RootLayout";
import { Badge } from "antd";
import { BiSolidShare } from "react-icons/bi";
import { FaPause } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import Records from "@/component/UI/Appointment/Schedule/DataRecording/Records";

const DataRecording = () => {
  return (
    <div>
      {/* heading part  */}
      <div className="bg-primary rounded-t-md shadow-lg">
        <div className="flex  justify-between ">
          <div className=" flex gap-2 px-2 py-3">
            <div className="flex  border-gray-600 pr-2">
              <div className="bg-sky-400 text-gray-700 text-sm w-full py-1 rounded-sm">
                <p className="text-center text-sm text-white px-2 mx-1 mb-1">
                  0:09:36
                </p>

                <FaPause className="mx-auto" />
              </div>
              <div>
                <ImNotification className="text-white mx-1" />
              </div>
            </div>
            <div className="flex gap-2 items-center  border-gray-600 pr-2">
              <div className="my-auto">
                <ImNotification className="text-white mx-1 mb-3" />
                <BiSolidShare className="text-white mx-1" />
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <div>
                  <Badge count={5} size="small" color="#4CB9E7">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Go
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge
                    count={"1 / 3"}
                    size="small"
                    color="#304D30"
                    offset={[-15, 0]}
                  >
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Cracker
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={5} size="small" color="#3887BE">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Block
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={5} size="small" color="#B1C381">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Help
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge
                    count={"1 / 1"}
                    size="small"
                    color="#557C55"
                    offset={[-15, 0]}
                  >
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Drink
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={5} size="small" color="#557C55">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Book
                    </p>
                  </Badge>
                </div>
              </div>
              <div>
                <IoReorderThreeOutline className="text-white text-xl" />
              </div>
            </div>
            <div className="flex gap-2 items-center  border-gray-600 pr-2">
              <div className="my-auto">
                <ImNotification className="text-white mx-1 mb-3" />
                <BiSolidShare className="text-white mx-1" />
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <div>
                  <Badge count={5} size="small" color="#A6CF98">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Elopement
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={5} size="small" color="#A6CF98">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Aggression Others
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={5} size="small" color="#A6CF98">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Aggression Objects
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={5} size="small" color="#A6CF98">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Self Injury
                    </p>
                  </Badge>
                </div>
              </div>
              <div>
                <IoReorderThreeOutline className="text-white text-xl" />
              </div>
            </div>
            <div className="flex gap-2 items-center  border-gray-600 pr-2">
              <div className="my-auto">
                <ImNotification className="text-white mx-1 mb-3" />
                <BiSolidShare className="text-white mx-1" />
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <div>
                  <Badge
                    count={"00:12"}
                    size="small"
                    offset={[-15, 0]}
                    color="#A6CF98"
                  >
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Parallel Play
                      <p className="text-center">-</p>
                    </p>
                  </Badge>
                </div>
                <div>
                  <Badge count={""} size="small" color="#A6CF98">
                    <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                      Play
                      <p className="text-center">-</p>
                    </p>
                  </Badge>
                </div>
              </div>
              <div>
                <IoReorderThreeOutline className="text-white text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-secondary rounded-r-md">
            <div className=" text-white mt-[30%] p-3 text-xl">
              <FaPerson />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-10 gap-3">
          {/* left part  */}
          <div className="  border-gray-600  bg-primary h-[100vh]">
            <div className="my-auto flex items-center justify-center gap-3 bg-secondary py-3">
              <ImNotification className="text-white " />
              <BiSolidShare className="text-white " />
              <IoReorderThreeOutline className="text-white text-xl" />
            </div>
            <div className="">
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#4CB9E7">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
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
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Cracker
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#3887BE">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Block
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#B1C381">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
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
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Drink
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#557C55">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Book
                  </p>
                </Badge>
              </div>
            </div>
          </div>
          <div className="col-span-8">
            {/* programs  */}
            <div className="my-10">
              <Records></Records>
            </div>
          </div>
          <div className="  border-gray-600  bg-primary h-[100vh]">
            <div className="my-auto">
              <ImNotification className="text-white mx-1 mb-3" />
              <BiSolidShare className="text-white mx-1" />
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#4CB9E7">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
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
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Cracker
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#3887BE">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Block
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#B1C381">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
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
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Drink
                  </p>
                </Badge>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Badge count={5} size="small" color="#557C55">
                  <p className="px-2 py-3 bg-white text-secondary rounded-md min-w-[100px] text-center">
                    Book
                  </p>
                </Badge>
              </div>
            </div>
            <div>
              <IoReorderThreeOutline className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* programs  */}
      <div className="my-10">
        <Records></Records>
      </div>
    </div>
  );
};

export default DataRecording;

DataRecording.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

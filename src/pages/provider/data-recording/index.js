import RootLayout from "@/component/Layouts/RootLayout";
import { Badge } from "antd";
import { BiSolidShare } from "react-icons/bi";
import { FaPause } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import Records from "@/component/UI/Appointment/Schedule/DataRecording/Records";
import TimerCount from "@/shared/Timer/TimerCount";
import Status from "@/component/UI/Appointment/Schedule/DataRecording/Status/Status";
import Trial from "@/component/UI/Appointment/Schedule/DataRecording/Trials/Trial";
import TimeData from "@/component/UI/Appointment/Schedule/DataRecording/TimerData/TimeData";

const DataRecording = () => {
  const status = ["Go", "Cracker", "Block", "Help", "Drink", "Book"];
  const trials = [
    "Elopement",
    "Aggression Others",
    "Aggression Objects",
    "Self Injury",
  ];
  return (
    <div>
      {/* heading part  */}
      <div>
        <div className="grid grid-cols-8 ">
          <div className="col-span-8 ">
            <div className="bg-gray-800 flex justify-between p-2 rounded-t-lg">
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
          {/* left part  */}
          <div className="  border-gray-600  bg-gray-200 h-[100vh]">
            {status?.map((s, i) => (
              <Status key={i} s={s}></Status>
            ))}
          </div>
          {/* programs  */}
          <div className="col-span-6">
            <div className="my-5 px-3">
              <h1 className="text-base font-semibold">1:1 ABA Session</h1>
              <Records></Records>
            </div>
          </div>
          {/* Right part  */}
          <div className="  border-gray-600  bg-gray-200 h-[100vh]">
            {trials?.map((s, i) => (
              <Trial key={i} s={s}></Trial>
            ))}
            <div>
              <TimeData></TimeData>
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

import RootLayout from "@/component/Layouts/RootLayout";
import { FaPerson } from "react-icons/fa6";
import Records from "@/component/UI/Appointment/Schedule/DataRecording/Records";
import TimerCount from "@/shared/Timer/TimerCount";
import Status from "@/component/UI/Appointment/Schedule/DataRecording/Status/Status";
import Trial from "@/component/UI/Appointment/Schedule/DataRecording/Trials/Trial";
import TimeData from "@/component/UI/Appointment/Schedule/DataRecording/TimerData/TimeData";
import { MdSpeakerNotes, MdVideoCameraFront } from "react-icons/md";
import { FaCamera, FaVideo } from "react-icons/fa";
import { useState } from "react";
import SessionNoteModal from "@/component/UI/DataRecording/Modals/SessionNoteModal";
import { Input, Upload } from "antd";
import VideoSession from "@/component/UI/DataRecording/Modals/VideoSession";
import FinishingAddNote from "@/component/UI/DataRecording/Modals/FinishingAddNote";

const DataRecording = () => {
  const status = ["Go", "Cracker", "Block", "Help", "Drink", "Book"];
  const trials = [
    "Elopement",
    "Aggression Others",
    "Aggression Objects",
    "Self Injury",
  ];

  const [addSessionNote, setAddSessionNote] = useState(false);
  const handleAddSessionNote = () => {
    setAddSessionNote(!addSessionNote);
  };
  const [videoSession, setVideoSession] = useState(false);
  const handleVideoSession = () => {
    setVideoSession(!videoSession);
  };
  const [addNoteToFinishSession, setAddNoteToFinishSession] = useState(false);
  const handleAddNoteToFinishSession = () => {
    setAddNoteToFinishSession(!addNoteToFinishSession);
  };

  const props = {
    // name: "file",
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    // headers: {
    //   authorization: "authorization-text",
    // },
    // onChange(info) {
    //   if (info.file.status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };
  return (
    <div>
      {/* heading part  */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 ">
          <div className="sm:col-span-8 ">
            <div className="bg-gray-800 grid grid-cols-1 lg:grid-cols-7 p-2 rounded-t-lg">
              <div className="sm:col-span-1 md:col-span-5 lg:col-span-6 flex items-center flex-wrap gap-2 justify-between">
                <div className="text-sm p-1 text-white pl-2">
                  <p>Kyle Scibelli</p>
                  <h1 className="text-xs text-gray-200">8:00 PM to 11:00 PM</h1>
                </div>
                <div>
                  <button
                    onClick={handleAddNoteToFinishSession}
                    className="dcm-close-button"
                  >
                    Finished Session
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <div className="text-white  p-3 text-xl">
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
          <div className="  border-gray-600  bg-gray-200 sm:h-[100vh]">
            {status?.map((s, i) => (
              <Status key={i} s={s}></Status>
            ))}
          </div>
          {/* programs  */}
          <div className="md:col-span-3  lg:col-span-6">
            <div className=" px-3">
              <div className="flex items-center justify-between mt-5 mb-8">
                <h1 className="text-base font-semibold">1:1 ABA Session</h1>
                <div className="flex items-center gap-2 text-lg">
                  <MdSpeakerNotes
                    onClick={handleAddSessionNote}
                    title="Edit Session Note"
                    className="text-4xl p-[6px] bg-purple-600 rounded-full text-white "
                  />
                  <Upload {...props}>
                    <div
                      icon={
                        <FaCamera className="text-4xl p-[6px] bg-sky-600 rounded-full text-white " />
                      }
                    >
                      <FaCamera
                        title="Add Photo"
                        className="text-4xl mt-1 p-[6px] bg-sky-600 rounded-full text-white "
                      />
                    </div>
                  </Upload>
                  <Upload {...props}>
                    <div
                      icon={
                        <FaCamera className="text-4xl p-[6px] bg-sky-600 rounded-full text-white " />
                      }
                    >
                      <FaVideo
                        title="Record Video"
                        className="text-4xl p-[6px] mt-1 bg-blue-600 rounded-full text-white "
                      />
                    </div>
                  </Upload>

                  <MdVideoCameraFront
                    onClick={handleVideoSession}
                    title="Invite to video Session"
                    className="text-4xl p-[6px] bg-green-600 rounded-full text-white "
                  />
                </div>
              </div>
              <Records></Records>
            </div>
          </div>
          {/* Right part  */}
          <div className="  border-gray-600  bg-gray-200 sm:h-[100vh]">
            {trials?.map((s, i) => (
              <Trial key={i} s={s}></Trial>
            ))}
            <div>
              <TimeData></TimeData>
            </div>
          </div>
        </div>
      </div>
      {addSessionNote && (
        <SessionNoteModal
          handleClose={handleAddSessionNote}
          clicked={addSessionNote}
        ></SessionNoteModal>
      )}
      {videoSession && (
        <VideoSession
          handleClose={handleVideoSession}
          clicked={videoSession}
        ></VideoSession>
      )}
      {addNoteToFinishSession && (
        <FinishingAddNote
          handleClose={handleAddNoteToFinishSession}
          clicked={addNoteToFinishSession}
        ></FinishingAddNote>
      )}
    </div>
  );
};

export default DataRecording;

DataRecording.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

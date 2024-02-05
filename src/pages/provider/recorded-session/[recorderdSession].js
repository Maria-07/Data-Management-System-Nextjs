import RootLayout from "@/component/Layouts/RootLayout";
import ManageTableAction from "@/component/UI/Appointment/Schedule/DataRecording/Modals/ManageTableAction";
import ProgramInfoModal from "@/component/UI/Appointment/Schedule/DataRecording/Modals/ProgramInfoModal";
import ManualSessionEntryModal from "@/component/UI/Patients/Patients/CinicalData/Modal/ManualSessionEntryModal";
import ScheduleModal from "@/component/UI/Patients/Patients/CinicalData/Modal/ScheduleModal";
import DeleteActivity from "@/component/UI/RecordSession/Modal/DeleteActivity";
import DeleteSession from "@/component/UI/RecordSession/Modal/DeleteSession";
import Records from "@/component/UI/RecordSession/Records";
import LinkToAppointment from "@/component/UI/RecordSession/Tables/LinkToAppointment";
import { Editor } from "@tinymce/tinymce-react";
import {
  Collapse,
  Dropdown,
  Input,
  Select,
  Slider,
  Switch,
  Tooltip,
  Upload,
} from "antd";
import React, { useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GoFileSubmodule } from "react-icons/go";
import { IoIosNotificationsOff } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { LuFileSignature } from "react-icons/lu";
import {
  MdDeleteOutline,
  MdFace,
  MdMoreTime,
  MdNotificationsActive,
  MdOutlineEditCalendar,
} from "react-icons/md";
import { RiCalendarCheckLine } from "react-icons/ri";

const { TextArea } = Input;
const RecordedSession = () => {
  const [edit, setEdit] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessionVisibility, setSessionVisibility] = useState(false);
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const [editSessionData, setEditSessionData] = useState(false);
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  //* modals
  const [manualSessionEntry, setManualSessionEntry] = useState(false);
  const handleManualSessionEntry = () => {
    setManualSessionEntry(!manualSessionEntry);
  };

  const [schedule, setSchedule] = useState(false);
  const handleSchedule = () => {
    setSchedule(!schedule);
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const [linkToAppointment, setLinkToAppointment] = useState(false);
  const handleLinkToAppointment = () => {
    setLinkToAppointment(!linkToAppointment);
  };

  const genExtra = () => (
    <div className="flex items-center gap-2 text-lg">
      <div
        className=" flex items-center gap-2 text-lg"
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      >
        <div>
          <Dropdown
            dropdownRender={() => (
              <div className="bg-white  border shadow-md rounded-sm">
                <button
                  onClick={handleLinkToAppointment}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <MdOutlineEditCalendar /> Link to appointment
                </button>
                <button
                  disabled={true}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <RiCalendarCheckLine />
                  View audit trial
                </button>

                <button
                  onClick={handleManualSessionEntry}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <FiEdit />
                  Edit Activity
                </button>
                <button
                  onClick={handleDeleteModal}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <MdDeleteOutline />
                  Delete session
                </button>
              </div>
            )}
            placement="bottomRight"
            arrow
          >
            <BsThreeDotsVertical />
          </Dropdown>
        </div>
      </div>
    </div>
  );

  const handleSessionName = (e) => {
    setSessionName(e.target.value);
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
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

  //! Input editor
  const [content, setContent] = useState(""); // State to hold the content
  const handleEditorChange = (content, editor) => {
    setContent(content); // Update the state with the new content
    // console.log(content); // Log the content to the console
  };

  return (
    <div>
      <div className="flex justify-between gap-2 text-lg font-semibold">
        {edit ? (
          <div>
            <h1 className="label">
              <span className="">Session Name</span>
            </h1>

            <div className="flex gap-2 mt-1">
              <input
                onClick={(e) => {
                  handleSessionName(e);
                }}
                className="input-border-bottom w-full"
                type="text"
              />
              <button onClick={() => setEdit(!edit)} className="dtm-button">
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Daily Session <CiEdit onClick={() => setEdit(!edit)} />
          </div>
        )}

        <div>
          <Dropdown
            dropdownRender={() => (
              <div className="bg-white  border shadow-md rounded-sm">
                <button
                  onClick={handleManualSessionEntry}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <MdMoreTime /> Add activity
                </button>
                <button className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3">
                  <FaRegCopy />
                  Copy Data to Clipboard
                </button>
                {!editSessionData && (
                  <button
                    onClick={() => setEditSessionData(true)}
                    className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                  >
                    <FiEdit />
                    Edit Session Data
                  </button>
                )}

                <Dropdown
                  placement="bottomLeft"
                  dropdownRender={() => (
                    <div className="bg-white p-3 w-[240px] border shadow-md rounded-sm">
                      <div>
                        <div className="pb-2">
                          <Switch
                            size="small"
                            onClick={() => {
                              setSessionVisibility(!sessionVisibility);
                            }}
                          />
                          <label
                            className="modal-label-name ml-2"
                            htmlFor="flesmwitchCheckDefault"
                          >
                            imit session visibility
                          </label>
                        </div>
                        <hr />
                        {sessionVisibility && (
                          <div className="pt-2">
                            <div className="my-1">
                              <Switch size="small" />
                              <label
                                className="modal-label-name ml-2"
                                htmlFor="flesmwitchCheckDefault"
                              >
                                Behavior Analyst
                              </label>
                            </div>
                            <div className="my-1">
                              <Switch size="small" />
                              <label
                                className="modal-label-name ml-2"
                                htmlFor="flesmwitchCheckDefault"
                              >
                                Behavior Technician
                              </label>
                            </div>
                            <div className="my-1">
                              <Switch size="small" />
                              <label
                                className="modal-label-name ml-2"
                                htmlFor="flesmwitchCheckDefault"
                              >
                                Parent
                              </label>
                            </div>
                            <hr className="my-2" />

                            <div className="">
                              <Switch size="small" />
                              <label
                                className="modal-label-name ml-2"
                                htmlFor="flesmwitchCheckDefault"
                              >
                                Show in History to all
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                >
                  <button
                    // onClick={handleShareFolder}
                    className=" text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold my-3"
                  >
                    <IoEyeOutline className="text-xl" /> Visibility
                  </button>
                </Dropdown>
                <button
                  onClick={handleManualSessionEntry}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <LuFileSignature />
                  Modify session time and duration
                </button>
                <button
                  onClick={handleDeleteModal}
                  className="my-3 text-dark hover:text-primary text-base mx-4 font-semibold flex items-center gap-3"
                >
                  <MdDeleteOutline />
                  Delete session
                </button>
              </div>
            )}
            placement="bottomRight"
            arrow
          >
            <BsThreeDotsVertical />
          </Dropdown>
        </div>
      </div>
      <div>
        <Collapse
          // defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          className="my-5"
          items={[
            {
              key: "1",
              label: (
                <div className="flex items-center gap-4">
                  <div className="relative mt-3" title="Pending note (session)">
                    <MdFace className="text-xl" />
                    <AiOutlineFileDone className="absolute top-[-15px] left-3 bg-orange-500 text-lg p-[1px] rounded-sm text-white" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-primary text-base">
                      Riley Stanley
                    </h1>
                    <h4 className="text-xs font-base text-gray-400">
                      2/2/2024 10:53 AM - 10:53 AM
                    </h4>
                  </div>
                </div>
              ),
              children: (
                <div>
                  <div className="mb-3">
                    {" "}
                    <Select
                      placeholder="Select a session note template..."
                      style={{
                        width: "100%",
                      }}
                      allowClear
                      options={[
                        {
                          value: "RBT Session (97153)",
                          label: "RBT Session (97153)",
                        },
                      ]}
                    />
                  </div>
                  <Editor
                    apiKey="rnsfc4uabmazxlfrlftk1jjdxng6bfquy9aa31d71b2r1mmw"
                    // key={"rnsfc4uabmazxlfrlftk1jjdxng6bfquy9aa31d71b2r1mmw"}
                    initialValue={""}
                    init={{
                      branding: false,
                      height: 400,
                      menubar: true,
                      plugins:
                        "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                      toolbar:
                        "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                      image_advtab: true,
                      content_style: "@/styles/textEditor.css",
                    }}
                    onEditorChange={handleEditorChange} // Use onEditorChange to capture content changes
                  />
                  <div className="flex items-center gap-2 justify-end my-5 text-base">
                    <button className="text-rose-600">Cancel</button>
                    <button className="">Save Draft</button>
                    <button className="dcm-button">Save</button>
                  </div>
                </div>
              ),
              extra: genExtra(),
            },
          ]}
        />
      </div>

      {/* time slider  */}
      <div className="my-10">
        <Slider defaultValue={"60.00.0"} />
      </div>
      <div className="px-2">
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
        <Records
          editSessionData={editSessionData}
          setEditSessionData={setEditSessionData}
        ></Records>
      </div>
      {editSessionData && (
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={() => setEditSessionData(false)}
            className="dcm-close-button"
          >
            Cancel
          </button>
          <button
            onClick={() => setEditSessionData(false)}
            className="dtm-button"
          >
            Save Session Data
          </button>
        </div>
      )}

      <div className="my-10">
        <span className="text-xs text-gray-400 m-1">
          A notification will be sent to the person who ran the session and
          other commenters. You can mention other people with the &quot;@&quot;
          symbol.
        </span>
        <TextArea rows={4} placeholder="Comment" maxLength={6} />
        <div className="my-2 flex items-center justify-end gap-2">
          {" "}
          <Upload {...props}>
            <div icon={<></>}>
              <div className="bg-blue-600 text-white flex items-center gap-1 text-xs px-2 rounded-md py-[6px] shadow-md">
                <GoFileSubmodule title="Record Video" className="text-xl " />
                ATTACH VIDEOS OF FILES
              </div>
            </div>
          </Upload>
          <button className="dtm-button">Comment</button>
        </div>
      </div>
      {/* //* open modals */}
      {manualSessionEntry && (
        <ManualSessionEntryModal
          title={"Add activity"}
          handleClose={handleManualSessionEntry}
          clicked={manualSessionEntry}
        ></ManualSessionEntryModal>
      )}
      {schedule && (
        <ScheduleModal
          handleClose={handleSchedule}
          clicked={schedule}
        ></ScheduleModal>
      )}
      {deleteModal && (
        <DeleteSession
          handleClose={handleDeleteModal}
          open={deleteModal}
        ></DeleteSession>
      )}
      {deleteModal && (
        <DeleteActivity
          handleClose={handleDeleteModal}
          open={deleteModal}
        ></DeleteActivity>
      )}
      {linkToAppointment && (
        <LinkToAppointment
          handleClose={handleLinkToAppointment}
          open={linkToAppointment}
        ></LinkToAppointment>
      )}
    </div>
  );
};

export default RecordedSession;

RecordedSession.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

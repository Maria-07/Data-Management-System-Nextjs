import { DatePicker, Modal, Select, TimePicker } from "antd";
import React from "react";
import { FaCarSide, FaUserFriends, FaUserTie } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { CiCircleMore } from "react-icons/ci";

const ManualSessionEntryModal = ({ handleClose, clicked, title }) => {
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  return (
    <div>
      <div>
        <Modal
          open={clicked}
          centered
          footer={null}
          bodyStyle={{ padding: "0" }}
          width={600}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">{title}</h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <div className="my-5">
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 mb-5">
                <div>
                  <Select
                    style={{
                      width: 180,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "session",
                        label: (
                          <div className="flex items-center gap-3">
                            <FaUserTie /> Session
                          </div>
                        ),
                      },
                      {
                        value: "supervision",
                        label: (
                          <div className="flex items-center gap-3">
                            <FaUserFriends /> Supervision
                          </div>
                        ),
                      },
                      {
                        value: "break",
                        label: (
                          <div className="flex items-center gap-3">
                            <ImSpoonKnife /> Break
                          </div>
                        ),
                      },
                      {
                        value: "transportation",
                        label: (
                          <div className="flex items-center gap-3">
                            <FaCarSide />
                            Transportation
                          </div>
                        ),
                      },
                      {
                        value: "incident Report",
                        label: (
                          <div className="flex items-center gap-3">
                            <TbReportSearch />
                            Incident Report
                          </div>
                        ),
                      },
                      {
                        value: "others",
                        label: (
                          <div className="flex items-center gap-3">
                            <CiCircleMore className="text-lg" />
                            Others
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Select
                    style={{
                      width: "100%",
                    }}
                    // size="large"
                    bordered={true}
                    onChange={handleChange}
                    options={[
                      {
                        value: "session",
                        label: (
                          <div className="">
                            <div className="flex items-center justify-between mt-[2px]">
                              <h1 className="text-base ">Ronje James</h1>
                              <h3 className="text-xs ">Manager</h3>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "supervision",
                        label: (
                          <div className="flex items-center gap-3">
                            <FaUserFriends /> Supervision
                          </div>
                        ),
                      },
                      {
                        value: "break",
                        label: (
                          <div className="flex items-center gap-3">
                            <ImSpoonKnife /> Break
                          </div>
                        ),
                      },
                      {
                        value: "transportation",
                        label: (
                          <div className="flex items-center gap-3">
                            <FaCarSide />
                            Transportation
                          </div>
                        ),
                      },
                      {
                        value: "incident Report",
                        label: (
                          <div className="flex items-center gap-3">
                            <TbReportSearch />
                            Incident Report
                          </div>
                        ),
                      },
                      {
                        value: "others",
                        label: (
                          <div className="flex items-center gap-3">
                            <CiCircleMore className="text-lg" />
                            Others
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Start Date"
                    onChange={(date, dateString) => {
                      console.log(date, dateString);
                    }}
                  />
                </div>
                <div>
                  <TimePicker
                    use12Hours
                    format="h:mm a"
                    style={{ width: "100%" }}
                    placeholder="Start Time"
                    onChange={(time, timeString) => {
                      console.log(time, timeString);
                    }}
                  />
                </div>
                <div>
                  <TimePicker
                    use12Hours
                    format="h:mm a"
                    style={{ width: "100%" }}
                    placeholder="End Time"
                    onChange={(time, timeString) => {
                      console.log(time, timeString);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Ok
              </button>
              <button onClick={handleClose} className="dcm-modal-close-button">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManualSessionEntryModal;

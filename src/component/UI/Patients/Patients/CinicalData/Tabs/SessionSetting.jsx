import { Collapse, Input, Select, Switch } from "antd";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
const { TextArea } = Input;

const SessionSetting = () => {
  const [limitSessionVisibility, setLimitSessionVisibility] = useState(false);
  const [sessionType, setSessionType] = useState("");

  // console.log("sessionType", sessionType);

  const onChange = (e) => {
    // console.log(e);
  };

  const items = [
    "waiting",
    "working-on",
    "mastered",
    "closed",
    "hold",
    "disconnected",
  ];

  const sessions = ["Normal", "Parents Activity", "Staff Training"];

  return (
    <div className="p-3">
      <form>
        <div className="">
          <h1 className="text-sm mb-2 font-medium text-dark">Session Name</h1>

          <input
            placeholder="File Name"
            type="text"
            className="input-border w-[100%]"
          />
        </div>
        <div className="mt-4">
          <h1 className="text-sm mb-2 font-medium text-dark">
            Message to therapist
          </h1>

          <TextArea
            placeholder="textarea with clear icon"
            allowClear
            onChange={onChange}
          />
        </div>
        <div className="my-3">
          <Collapse
            // ghost
            items={[
              {
                key: 1,
                label: <h1 className="font-medium">More options ..... </h1>,
                children: (
                  <p>
                    <h1 className="text-sm mb-2 font-medium text-dark">
                      Session type
                    </h1>
                    <>
                      <Select
                        style={{
                          width: "100%",
                        }}
                        placeholder="Mastering Workflow"
                        size="large"
                        // defaultValue={value}
                        bordered={true}
                        onChange={(e) => {
                          setSessionType(e);
                        }}
                        options={sessions.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </>
                    <br />
                    {/* {sessionType === "Parents Activity" && (
                      <>
                        <ReactWeeklyDayPicker />
                      </>
                    )}
                    {sessionType === "Normal" && ( */}
                    <>
                      {" "}
                      <>
                        <h1 className="text-sm my-2 font-medium text-dark">
                          Session Note Template
                        </h1>
                        <>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            placeholder="Prompt level template"
                            size="large"
                            // defaultValue={value}
                            bordered={true}
                            onChange={onChange}
                            options={items.map((item) => ({
                              label: item,
                              value: item,
                            }))}
                          />
                        </>
                        <h1 className="text-sm my-2 font-medium text-dark">
                          Supervision Note Template
                        </h1>
                        <>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            placeholder="Prompt level template"
                            size="large"
                            // defaultValue={value}
                            bordered={true}
                            onChange={onChange}
                            options={items.map((item) => ({
                              label: item,
                              value: item,
                            }))}
                          />
                        </>
                        <div className="my-5">
                          <div className="flex items-center gap-1">
                            <Switch size="small" />
                            <label
                              className="modal-label-name mt-1"
                              htmlFor="flesmwitchCheckDefault"
                            >
                              Shuffle order of programs
                            </label>
                          </div>
                          <div className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-1">
                              <Switch
                                size="small"
                                onClick={() =>
                                  setLimitSessionVisibility(
                                    !limitSessionVisibility
                                  )
                                }
                              />
                              <label
                                className="modal-label-name mt-1"
                                htmlFor="flesmwitchCheckDefault"
                              >
                                Limit session visibility
                              </label>
                            </div>
                            {limitSessionVisibility && (
                              <>
                                <Select
                                  style={{
                                    width: "60%",
                                  }}
                                  placeholder="Mastering Workflow"
                                  size="large"
                                  // defaultValue={value}
                                  bordered={true}
                                  onChange={onChange}
                                  options={items.map((item) => ({
                                    label: item,
                                    value: item,
                                  }))}
                                />
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Switch size="small" />
                            <label
                              className="modal-label-name mt-1"
                              htmlFor="flesmwitchCheckDefault"
                            >
                              Show in History to all
                            </label>
                          </div>
                          <div className="flex items-center gap-1">
                            <Switch size="small" />
                            <label
                              className="modal-label-name mt-1 flex items-center gap-2"
                              htmlFor="flesmwitchCheckDefault"
                            >
                              Automatically accept video calls
                              <FaLock className="text-rose-600" />
                            </label>
                          </div>
                        </div>
                      </>
                    </>
                    {/* )} */}
                    {sessionType === "Staff Training" && <></>}
                  </p>
                ),
              },
            ]}
          />
        </div>
      </form>
    </div>
  );
};

export default SessionSetting;

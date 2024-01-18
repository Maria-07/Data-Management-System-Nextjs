import { Collapse, Modal, Select } from "antd";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

const WorkFlowModal = ({ handleClose, clicked }) => {
  const { register, handleSubmit, reset } = useForm();

  const onChange = (key) => {
    console.log(key);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
    {
      label: "USA",
      value: "usa",
      emoji: "🇺🇸",
      desc: "USA (美国)",
    },
    {
      label: "Japan",
      value: "japan",
      emoji: "🇯🇵",
      desc: "Japan (日本)",
    },
    {
      label: "Korea",
      value: "korea",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={900}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Add workflow
              <h2 className="text-sm font-normal text-gray-400">
                OBJECTIVE: IMPROVE ACCURACY
              </h2>
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] my-3"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <div className="bg-gray-100 rounded-t-md  border-[2px] border-gray-200  p-2 flex items-center gap-3">
                  <button className="flex items-center text-base gap-2 font-medium rounded-lg px-2  bg-orange-500 text-white">
                    <TbReportAnalytics /> Prob <MdEdit />
                  </button>
                  <FaArrowRightLong className="text-lg text-gray-400" />
                  <button className="flex items-center text-xs py-1 gap-2 font-semibold rounded-lg px-2  bg-green-500 text-white">
                    <MdOutlineDone className="text-base" /> Closed
                  </button>
                </div>
                <div className="border-[2px] p-3 border-t-0">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="label">
                        <span className=" label-font">Mastering Accuracy</span>
                      </label>
                      <div className="flex ">
                        <input
                          type="number"
                          name="first_name"
                          className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                          {...register("first_name")}
                        />
                        <span className="px-2 py-1 flex">across</span>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <input
                        type="number"
                        name="first_name"
                        className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                        {...register("first_name")}
                      />
                      <span>session(s)</span>
                    </div>
                    <div className="col-span-2">
                      <label className="label">
                        <span className=" label-font">
                          Minimum number of trials required ( per person )
                        </span>
                      </label>
                      <div className="flex ">
                        <input
                          type="number"
                          name="first_name"
                          className="input-border-bottom input-font text-end py-[1px] w-full focus:outline-none"
                          {...register("first_name")}
                        />
                        <span className="px-2 py-1 flex">trial(s)</span>
                      </div>
                    </div>
                  </div>
                  <Collapse
                    // defaultActiveKey={["1"]}
                    onChange={onChange}
                    className="my-5"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="font-medium text-sm uppercase">
                            Advanced Settings . . . .
                          </div>
                        ),
                        children: (
                          <div>
                            <div className=" ">
                              <label className="label">
                                <span className=" label-font">
                                  Status after probe (If not mastered)
                                </span>
                              </label>
                              <select
                                className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                                name="status"
                                {...register("status")}
                              >
                                <option value="waiting" className="">
                                  Waiting
                                </option>
                                <option value="acquisition">Acquisition</option>
                              </select>
                            </div>
                            <div className="mt-3">
                              <label className="label">
                                <span className=" label-font">
                                  Target status if mastered
                                </span>
                              </label>
                              <select
                                className="input-border-bottom input-font mt-2 w-full focus:outline-none"
                                name="status"
                                {...register("status")}
                              >
                                <option value="waiting" className="">
                                  Waiting
                                </option>
                                <option value="mastered">Mastered</option>
                                <option value="acquisition">Acquisition</option>
                              </select>
                            </div>
                          </div>
                        ),
                      },
                    ]}
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
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default WorkFlowModal;

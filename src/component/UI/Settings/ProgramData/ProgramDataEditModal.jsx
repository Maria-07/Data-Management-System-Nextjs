import { Modal, Select, Switch } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AddOptions from "./AddOptions";
import ProgramDataDeleteModal from "./ProgramDataDeleteModal";

const ProgramDataEditModal = ({ handleClose, clicked, type, item }) => {
  const [options, setOptions] = useState(["test 1", "test 2"]);
  const [value, setValue] = useState(type);
  const [allowMultiSelection, setAllowMultiSelection] = useState(false);
  const [allowUserDefine, setAllowUserDefine] = useState(false);
  const [allowMultiLineText, setAllowMultiLineText] = useState(false);

  const [deleteData, setDeleteData] = useState(false);
  const handleDeleteData = () => {
    setDeleteData(!deleteData);
  };

  const items = ["", "Text", "Date", "Selection", "Yes/No (Checkbox)", "User"];
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  console.log("options are", options);

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={500}
        closable={false}
        className="box"
      >
        <div className="px-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Edit Custom Data Field
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="my-3">
              <h1 className="text-sm mb-2 font-medium text-dark">
                Field Label
              </h1>

              <input
                defaultValue={item?.title}
                placeholder="File Name"
                type="text"
                className="input-border w-[100%]"
              />
            </div>
            <div className="my-5">
              <h1 className="text-sm mb-2 font-medium text-dark">Data Type</h1>
              <Select
                style={{
                  width: "100%",
                }}
                defaultValue={type}
                size="medium"
                bordered={true}
                onChange={onChange}
                options={items.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
            {value == "Text" && (
              <>
                {" "}
                <div className="flex gap-2 items-center my-3">
                  <Switch
                    size="small"
                    className="mt-[2px]"
                    checked={allowMultiLineText}
                    onClick={() => setAllowMultiLineText(!allowMultiLineText)}
                  />
                  <span className="text-[15px]  text-dark  font-semibold">
                    Allow multi-line text
                  </span>
                </div>
              </>
            )}
            {value == "Selection" && (
              <>
                {" "}
                <div className="my-3">
                  <h1 className="text-sm mb-2 font-medium  text-dark">
                    Options
                  </h1>

                  <div className="border border-[#cacaca] px-2 pb-2 rounded-md">
                    <AddOptions
                      tags={options}
                      setTags={setOptions}
                    ></AddOptions>
                  </div>
                </div>
                <div className="text-gray-400 text-xs text-end">
                  Please hit ENTER to add multiple options
                </div>
                <div className="flex gap-2 items-center my-3">
                  <Switch
                    size="small"
                    className="mt-[2px]"
                    checked={allowMultiSelection}
                    onClick={() => setAllowMultiSelection(!allowMultiSelection)}
                  />
                  <span className="text-[15px]  text-dark  font-semibold">
                    Allow multiple selections
                  </span>
                </div>
                {allowMultiSelection && (
                  <>
                    <div className="flex gap-2 items-center my-3">
                      <Switch
                        size="small"
                        className="mt-[2px]"
                        checked={allowUserDefine}
                        onClick={() => setAllowUserDefine(!allowUserDefine)}
                      />
                      <span className="text-[15px]  text-dark  font-semibold">
                        Allow user-defined options
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
            <div className="bg-gray-200 py-[1px] mt-3"></div>
            <div className="flex items-center justify-between">
              <div>
                <button
                  type="button"
                  onClick={handleDeleteData}
                  className="text-base font-semibold text-white  transition-all px-2 py-1 border bg-red-700 border-red-700 rounded-md"
                >
                  DeleteData
                </button>
              </div>
              <div className="flex gap-3 items-end justify-end mb-2 mt-4">
                <button type="submit" className="dcm-modal-submit-button">
                  Ok
                </button>
                <button
                  onClick={handleClose}
                  className="dcm-modal-close-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {deleteData && (
        <ProgramDataDeleteModal
          handleClose={handleDeleteData}
          clicked={deleteData}
        ></ProgramDataDeleteModal>
      )}
    </div>
  );
};

export default ProgramDataEditModal;

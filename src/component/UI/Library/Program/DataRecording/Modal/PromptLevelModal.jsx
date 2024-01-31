import { Collapse, Modal, Select } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGraduationCap, FaPlus } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCloseCircleOutline, IoMdTrophy } from "react-icons/io";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import AddNewPhaseModal from "./AddNewPhaseModal";
import EditPhaseModal from "./EditPhaseModal";
import { LuFileClock } from "react-icons/lu";

const PromptLevelModal = ({ handleClose, clicked }) => {
  const { register, handleSubmit, reset } = useForm();
  const [addPhase, setAddPhase] = useState(false);

  const [addNewPhase, setAddNewPhase] = useState(false);
  const handleAddNewPhase = () => {
    setAddNewPhase(!addNewPhase);
  };
  const [editPhase, setEditPhase] = useState(false);
  const handleEditPhase = () => {
    setEditPhase(!editPhase);
  };

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

  const OPTIONS = [
    "Daily",
    "Bi-weekly",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Semi-annually",
    "Annually",
  ];

  const [selectedItems, setSelectedItems] = useState(["Daily"]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  console.log(selectedItems);

  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={900}
        closable={false}
        className="box z-20"
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
            <div>Prompt</div>
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

        {addNewPhase && (
          <AddNewPhaseModal
            handleClose={handleAddNewPhase}
            clicked={addNewPhase}
          ></AddNewPhaseModal>
        )}
        {editPhase && (
          <EditPhaseModal
            handleClose={handleEditPhase}
            clicked={editPhase}
          ></EditPhaseModal>
        )}
      </Modal>
    </div>
  );
};

export default PromptLevelModal;

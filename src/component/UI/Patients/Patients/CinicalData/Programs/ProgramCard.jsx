import { Dropdown, Tag, Tooltip } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { TbPinnedFilled } from "react-icons/tb";
import { TfiPin2 } from "react-icons/tfi";

const ProgramCard = () => {
  return (
    <div className="border p-2  rounded-md">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-xs ">Program</h1>
        </div>
        <div className="flex items-center">
          <Dropdown
            dropdownRender={() => (
              <div className="bg-white  w-[240px] border shadow-md rounded-sm">
                <div>
                  <button className="my-3 text-dark hover:text-primary flex items-center gap-3 text-base mx-4 font-semibold">
                    <IoIosRemoveCircleOutline className="text-xl text-rose-600 " />
                    Remove from session
                  </button>
                </div>
              </div>
            )}
            placement="bottomRight"
            arrow
          >
            <BsThreeDotsVertical />
          </Dropdown>

          <TbPinnedFilled className="text-red-600 text-lg" />
        </div>
      </div>
      <div>
        <h1 className="text-sm font-semibold my-4">Behavior Reduction </h1>
      </div>
      <div className="flex">
        <Tag color="red" className="flex items-center gap-1">
          <FaCheck /> 0
        </Tag>
        <Tag color="green" className="flex items-center gap-1">
          <FaCheck /> 10
        </Tag>
        <Tag color="blue" className="flex items-center gap-1">
          <FaCheck /> 30
        </Tag>
      </div>
    </div>
  );
};

export default ProgramCard;

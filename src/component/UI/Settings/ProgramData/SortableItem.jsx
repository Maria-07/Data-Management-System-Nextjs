import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import {
  AiFillEdit,
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineMenu,
} from "react-icons/ai";
import { IoIosOptions } from "react-icons/io";
import ProgramDataEditModal from "./ProgramDataEditModal";

const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

const SortableItem = ({ id, item }) => {
  const [editFolder, setEditFolder] = useState(false);
  const handleEditFolder = () => {
    setEditFolder(!editFolder);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      animateLayoutChanges,
      id: id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // borderBottom: "1px solid #e3e3e3",
    // padding: "22px 10px",
    // height: `3px`,
    // cursor: "grab",
    // userSelect: "none",
    // margin: "0px",
  };
  return (
    <div>
      <div onClick={handleEditFolder} className="hover:bg-gray-100">
        <div
          ref={setNodeRef}
          className="grid grid-cols-3  md:grid-cols-6 cursor-grab border-t-[1px] py-1 px-2"
          style={style}
          {...attributes}
        >
          <div className="flex gap-5 hover:text-dark sm:col-span-4">
            <div
              className="my-auto p-2 text-gray-400 hover:text-dark  "
              {...listeners}
            >
              <AiOutlineMenu className=" text-xl" />
            </div>
            <div className="my-auto text-[13.5px] font-semibold text-dark">
              {item.title}
            </div>
          </div>
          <div className="my-auto ">
            {item?.field?.type === "Text" && (
              <>
                <div className="flex items-center gap-2">
                  <AiOutlineFileText className="text-lg text-purple-500 " />
                  <div className="text-sm text-dark font-semibold">Text</div>
                </div>
              </>
            )}
            {item?.field?.type === "Selection" && (
              <>
                <div className="flex items-center gap-2">
                  <IoIosOptions className="text-lg text-purple-500 " />
                  <div className="text-sm text-dark font-semibold">
                    Selection
                  </div>
                </div>
              </>
            )}
            {item?.field?.type === "Date" && (
              <>
                <div className="flex items-center gap-2">
                  <AiOutlineCalendar className="text-lg text-purple-500 " />
                  <div className="text-sm text-dark font-semibold">Date</div>
                </div>
              </>
            )}
          </div>
          <div className="my-auto flex items-end justify-end mr-3">
            <AiFillEdit className="text-xl text-dark" />
          </div>
        </div>
      </div>
      {editFolder && (
        <ProgramDataEditModal
          item={item}
          type={item?.field?.type}
          handleClose={handleEditFolder}
          clicked={editFolder}
        ></ProgramDataEditModal>
      )}
    </div>
  );
};

export default SortableItem;

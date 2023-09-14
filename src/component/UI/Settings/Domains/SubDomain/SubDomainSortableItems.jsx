import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { AiFillEdit, AiOutlineMenu } from "react-icons/ai";
import EditSubDomainModal from "./EditSubDomainModal";

const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

const SubDomainSortableItems = ({ id, item }) => {
  const [editSubDomain, setEditSubDomain] = useState(false);
  const handleEditSubDomain = () => {
    setEditSubDomain(!editSubDomain);
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
      <div onClick={handleEditSubDomain} className="hover:bg-gray-100">
        <div
          ref={setNodeRef}
          className="flex items-center justify-between gap-2 cursor-grab border-t-[1px] py-1 px-2"
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

          <div className="my-auto flex items-end justify-end mr-3">
            <AiFillEdit className="text-xl text-dark" />
          </div>
        </div>
      </div>
      {editSubDomain && (
        <EditSubDomainModal
          handleClose={handleEditSubDomain}
          clicked={editSubDomain}
        ></EditSubDomainModal>
      )}
    </div>
  );
};

export default SubDomainSortableItems;

import { DndContext } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SubDomainSortableItems from "./SubDomainSortableItems";
import AddSubDomainModal from "./AddSubDomainModal";
import { BiPencil, BiPlus } from "react-icons/bi";
import EditSubDomainLevelModal from "./EditSubDomainLevelModal";

const SubDomain = ({ domain }) => {
  const [addSubDomain, setAddSubDomain] = useState(false);
  const handleAddSubDomain = () => {
    setAddSubDomain(!addSubDomain);
  };

  const [editSubDomain, setEditSubDomain] = useState(false);
  const handleEditSubDomain = () => {
    setEditSubDomain(!editSubDomain);
  };

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Text",
      field: {
        type: "Text",
      },
    },
    {
      id: 2,
      title: "Date",
      field: {
        type: "Date",
      },
    },
    {
      id: 3,
      title: "Selection",
      field: {
        type: "Selection",
      },
    },
    {
      id: 4,
      title: "Date testing",
      field: {
        type: "Date",
      },
    },
    {
      id: 5,
      title: "Selection auto",
      field: {
        type: "Selection",
      },
    },
    {
      id: 6,
      title: "Text 2",
      field: {
        type: "Text",
      },
    },
    {
      id: 7,
      title: "test",
      field: {
        type: "Text",
      },
    },
  ]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((previousItems) => {
        const oldIndex = previousItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = previousItems.findIndex((item) => item.id === over.id);
        return arrayMove(previousItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <div>
        <div className="border-x-[1px] border-t-[1px] width-[100%] px-5 py-3 text-[15px] font-bold flex items-center justify-between flex-wrap gap-2">
          <div
            className="flex items-center gap-1"
            onClick={handleEditSubDomain}
          >
            Sub Domain Name <BiPencil className="text-white hover:text-dark" />
          </div>
          <div className="flex items-center justify-start gap-3 ">
            <button
              onClick={handleAddSubDomain}
              className="dtm-button flex items-center gap-2"
            >
              <BiPlus className="text-xl" /> ADD SUB DOMAIN
            </button>
          </div>
        </div>
        <div className="border-x-[1px] border-b-[1px]">
          <DndContext
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div>
                {items.map((item) => (
                  <SubDomainSortableItems
                    key={item.id}
                    id={item.id}
                    item={item}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      {addSubDomain && (
        <AddSubDomainModal
          handleClose={handleAddSubDomain}
          clicked={addSubDomain}
        ></AddSubDomainModal>
      )}
      {editSubDomain && (
        <EditSubDomainLevelModal
          handleClose={handleEditSubDomain}
          clicked={editSubDomain}
        ></EditSubDomainLevelModal>
      )}
    </div>
  );
};

export default SubDomain;

{
  /* <p>{domain.sub_domain.sub_domain_title}</p>
      <ul>
        {domain.sub_domain.sub_Domains.map((subDomain, index) => (
          <li key={index}>{subDomain.sub_d1}</li>
        ))}
      </ul> */
}

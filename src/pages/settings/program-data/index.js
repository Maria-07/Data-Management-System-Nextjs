import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import AddProgramDataModal from "@/component/UI/Settings/ProgramData/AddProgramDataModal";
import SortableItem from "@/component/UI/Settings/ProgramData/SortableItem";
import { DndContext, useSortable } from "@dnd-kit/core";
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
import { BiFolderPlus, BiPlus } from "react-icons/bi";

const ProgramData = () => {
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

  const [addFolder, setAddFolder] = useState(false);
  const handleAddFolder = () => {
    setAddFolder(!addFolder);
  };

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
      <p className="dtm-title-head">Program Data Fields</p>
      <p className="text-sm font-medium text-dark text-justify my-2">
        Manage custom data fields associated with programs. The custom data
        fields are added to the Treatment section of a program. You can pull the
        data into session note templates and progress reports.
      </p>

      <div className="flex items-center justify-start gap-3 my-10">
        <button
          onClick={handleAddFolder}
          className="dtm-button flex items-center gap-2"
        >
          <BiPlus className="text-xl" /> ADD DATA FIELD
        </button>
      </div>

      <div className="border-x-[1px] border-t-[1px] width-[100%] px-16 py-2 text-[15px] font-bold">
        Field
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
                <SortableItem key={item.id} id={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      {addFolder && (
        <AddProgramDataModal
          handleClose={handleAddFolder}
          clicked={addFolder}
        ></AddProgramDataModal>
      )}
    </div>
  );
};

export default ProgramData;

ProgramData.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};

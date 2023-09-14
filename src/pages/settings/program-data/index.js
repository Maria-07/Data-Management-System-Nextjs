import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import AddProgramDataModal from "@/component/UI/Settings/ProgramData/AddProgramDataModal";
import SortableItem from "@/component/UI/Settings/ProgramData/SortableItem";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { BiFolderPlus, BiPlus } from "react-icons/bi";

const ProgramData = () => {
  const [items, setItems] = useState(["1", "2", "3", "4", "5", "6", "7", "8"]);

  const [addFolder, setAddFolder] = useState(false);
  const handleAddFolder = () => {
    setAddFolder(!addFolder);
  };

  const handleDragEnd = (e) => {
    console.log(e);
    const { active, over } = e;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
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

      <div>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div>
              {items.map((id) => (
                <SortableItem key={id} id={id} />
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

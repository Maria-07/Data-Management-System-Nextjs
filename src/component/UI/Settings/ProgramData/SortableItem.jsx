import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

const SortableItem = ({ id, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      animateLayoutChanges,
      id: id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid grey",
    padding: "20px",
    height: `3px`,
    cursor: "grab",
    userSelect: "none",
    margin: "0px",
  };
  return (
    <div>
      <div ref={setNodeRef} style={style} {...attributes}>
        <div
          style={{
            border: "1px solid grey",
            background: "grey",
            color: "white",
            borderRadius: "10px",
            padding: "5px",
            cursor: "pointer",
          }}
          {...listeners}
        >
          ...
        </div>
        {id}
      </div>
    </div>
  );
};

export default SortableItem;

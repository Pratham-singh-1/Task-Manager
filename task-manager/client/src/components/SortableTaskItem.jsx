import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from "./TaskItem";

function SortableTaskItem({ task, onToggle, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem
        task={task}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default SortableTaskItem;

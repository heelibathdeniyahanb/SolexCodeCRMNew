// ColumnContainer.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import TaskCard from "./TaskCard";

function NewColumnContainer({ column, tasks, isReadOnly }) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable(
    {
      id: column.id,
      data: {
        type: "Column",
        column,
      },
      disabled: isReadOnly, // Disable drag and drop if isReadOnly is true
    }
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          bg-columnBackgroundColor
          opacity-40
          border-2
          border-gray-500
          w-350px
          h-200px
          max-h-[500px]
          rounded-md
          flex
          flex-col
        "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        bg-columnBackgroundColor
        w-[200px]
        h-[600px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="
          bg-cyan-900
          text-md
          h-[60px]
          rounded-lg
          rounded-b-none
          p-3
          font-bold
          border-cyan-700
          border-4
          flex
          items-center
          justify-center
          text-zinc-100
        "
      >
        {column.title}
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} isReadOnly={isReadOnly} />
        ))}
      </div>
    </div>
  );
}

export default NewColumnContainer;
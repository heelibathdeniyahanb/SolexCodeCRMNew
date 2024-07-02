
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React ,{ useMemo, useState } from "react";
import TaskCard from "./TaskCard";


function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor opacity-40 border-2 border-teal-700 w-[3500px] h-[300px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[214px] h-screen rounded-md flex flex-col overflow-y-hidden"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-teal-700 text-md h-[50px] cursor-grab rounded-lg rounded-b-none p-3 font-bold border-teal-700 border-4 flex items-center justify-center text-white"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-1 py-1 text-sm rounded-full"></div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-teal-900 focus:border-rose-100 border"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
      </div>

          {/* Column task container */}
          <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks in this column</p>
          )}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;

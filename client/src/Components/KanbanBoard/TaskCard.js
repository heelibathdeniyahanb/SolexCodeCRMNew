import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Avatar from 'react-avatar';
import axios from 'axios';





function TaskCard({ task, deleteTask, updateTask, taskData }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable(
    {
      id: task.id,
      data: {
        type: "Task",
        task,
      },
      disabled: editMode,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleDeleteTask = async () => {
    try {
      // Send a DELETE request to the backend to delete the lead
      await axios.delete(`http://localhost:5000/api/lead/${task.id}`);
      
      // If the request is successful, delete the task from the frontend
      deleteTask(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg- p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-zinc-300 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-400 cursor-grab relative"
      >
        <textarea
          className="
        h-[90%]
        w-full resize-none border-none rounded bg-transparent text-black focus:outline-none
        "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }



  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-slate-200 h-[300px] min-h-[200px] text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-zinc-400 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >

      <div className="card text-black bg-primary ml-1 mt-1" style={{ minWidth: '18rem', width: '300px', height: '200px' }}>
        <div className="card-header text-start ml-2">{task.leadName}</div>
        <div className="card-body">
          <h5 className="card-title text-cyan-600 text-start ml-2">{task.companyName}</h5>
          <p className="card-text">
          <span className="text-red-800 ml-1 text-xs text-start rounded-full bg-red-300  py-1 px-3 border">{task.leadStatus}</span>
          </p>
          <p className="card-text mt-2">
            <span className="ml-1 text-sm text-gray-600 text-justify">
              Start Date: {task.startDate.substring(0, 10)}
            </span>
          </p>
          <p className="card-text ">
            <span className="ml-1 text-sm text-gray-600 text-justify">
              End Date  : {task.endDate.substring(0, 10)}
            </span>
          </p>
          <p className="card-text mt-4">
          <span className="text-gray-500 ml-1 text-xs text-start"> <Avatar src={Avatar} size="32" round={true} /> {task.salesRep}</span>
          </p>

        </div>
      </div>


      {/* Trash icon */}
      {mouseIsOver && (
        <button onClick={handleDeleteTask} className="stroke-black absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100" >
          <FaTrash />
        </button>
      )}
    </div>
  );
}

export default TaskCard;

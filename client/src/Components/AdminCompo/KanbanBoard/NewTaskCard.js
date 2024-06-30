// TaskCard.jsx
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import Avatar from 'react-avatar';


function NewTaskCard({ task, isReadOnly }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isReadOnly, // Disable drag and drop if isReadOnly is true
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formattedStartDate = formatDate(task.startDate);
  const formattedEndDate = formatDate(task.endDate);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg- p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-slate-200 h-[300px] min-h-[200px] text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-zinc-400 cursor-grab relative task"
    >
      <div className="card text-black bg-primary ml-1 mt-1" style={{ minWidth: '18rem', width: '300px', height: '200px' }}>
        <div className="card-header text-start ml-2">{task.leadName}</div>
        <div className="card-body">
          <h5 className="card-title text-cyan-600 text-start ml-2">{task.companyName}</h5>
          <p className="card-text">
            <span className="text-red-800 ml-1 text-xs text-start rounded-full bg-red-300  py-1 px-3 border">{task.leadStatus}</span>
          </p>
          <p className="card-text mt-2">
            <span className="ml-1 text-sm text-gray-600 text-justify">Start Date: {formattedStartDate}</span>
          </p>
          <p className="card-text ">
            <span className="ml-1 text-sm text-gray-600 text-justify">End Date  : {formattedEndDate}</span>
          </p>
          <p className="card-text mt-4">
            <span className="text-gray-500 ml-1 text-xs text-start"> <Avatar src={Avatar} size="32" round={true} /> {task.salesRep}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewTaskCard;
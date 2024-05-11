import { useState } from "react";
import TrashIcon from '../Icons/TrashIcon';
import { MdEdit } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Avatar from 'react-avatar';
import axios from 'axios';
import UpdateTaskModal from './UpdateTaskModel';


function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState(task);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formattedStartDate = formatDate(task.startDate);
  const formattedEndDate = formatDate(task.endDate);

  const [formData, setFormData] = useState({
    leadName: task.leadName,
    companyName: task.companyName,
    leadStatus: task.leadStatus,
    startDate: formatDate(task.startDate),
    endDate: formatDate(task.endDate),
    salesRep: task.salesRep
    
  });

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
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




  const handleDeleteTask = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (confirmDelete) {
        await axios.delete(`https://localhost:7166/api/Lead/${task.id}`);
        deleteTask(task.id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { leadName, companyName, leadStatus, startDate, endDate, salesRep} = formData;
      
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      
      await updateTask(task.id, { leadName, companyName, leadStatus, startDate: formattedStartDate, endDate: formattedEndDate, salesRep });
      setEditMode(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = (updatedData) => {
    setTaskData((prevTask) => ({
      ...prevTask,
      ...updatedData
    }));
  };


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
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {editMode ? (
        <form onSubmit={handleSubmit} className="p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-zinc-400 cursor-grab relative flex-col">
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Lead Name</label>
            <input
              type="text"
              name="leadName"
              value={formData.leadName}
              onChange={handleChange}
              className="w-full border-none rounded bg-transparent text-black focus:outline-none"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border-none rounded bg-transparent text-black focus:outline-none"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Lead Status</label>
            <input
              type="text"
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleChange}
              className="w-full border-none rounded bg-transparent text-black focus:outline-none"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border-none rounded bg-transparent text-black focus:outline-none"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border-none rounded bg-transparent text-black focus:outline-none"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sales Rep</label>
            <input
              type="text"
              name="salesRep"
              value={formData.salesRep}
              onChange={handleChange}
              className="w-full border-none rounded bg-transparent text-black focus:outline-none"
            />
          </div>
          <button type="submit" className="bg-primary text-white py-1 px-4 rounded">Update</button>
        </form>
      ) : (
        <div className="card text-black bg-primary ml-1 mt-1" style={{ minWidth: '18rem', width: '300px', height: '200px' }}>
          <div className="card-header text-start ml-2">{taskData.leadName}</div>
          <div className="card-body">
            <h5 className="card-title text-cyan-600 text-start ml-2">{taskData.companyName}</h5>
            <p className="card-text">
              <span className="text-red-800 ml-1 text-xs text-start rounded-full bg-red-300  py-1 px-3 border">{taskData.leadStatus}</span>
            </p>
            <p className="card-text mt-2">
              <span className="ml-1 text-sm text-gray-600 text-justify">Start Date: {formattedStartDate}</span>
            </p>
            <p className="card-text ">
              <span className="ml-1 text-sm text-gray-600 text-justify">End Date  : {formattedEndDate}</span>
            </p>
            <p className="card-text mt-4">
              <span className="text-gray-500 ml-1 text-xs text-start"> <Avatar src={Avatar} size="32" round={true} /> {taskData.salesRep}</span>
            </p>
          </div>
        </div>
      )}

      {mouseIsOver && (
        <button onClick={handleDeleteTask} className="stroke-black absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100">
          <TrashIcon />
        </button>
      )}

      {!editMode && (
        <button onClick={handleOpenModal} className="absolute bottom-4 right-4 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100">
          <MdEdit />
        </button>
      )}

      {showModal && (
        <UpdateTaskModal
          task={task}
          onUpdate={handleUpdate} // Pass a function that handles the event object
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
}

export default TaskCard; 



import React, { useState } from "react";
import { FaCircleNotch, FaTrash ,FaEye} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Avatar from 'react-avatar';
import axios from 'axios';
import UpdateTaskModal from './UpdateTaskModel';
import LeadStatusModel from "./LeadStatusModel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonPopupModel from "./ButtonPopupModel";
import EventForm from "../../Events/EventForm";
import TaskForm from "../../Task/TaskForm";
import ViewEvents from "./ViewEvents";
import ViewTasks from "./ViewTasks";



const statusColors = {
  Mobile: 'bg-sky-500 text-blue-800',
  Web: 'bg-teal-600 text-green-800',
  High: 'bg-pink-500 text-red-800',
  Medium: 'bg-yellow-400 text-yellow-800',
  Low: 'bg-zinc-500 text-gray-800',
};


function TaskCard({ task, deleteTask, updateTask }) {
  console.log("Taskcard receive task:",task)
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskData, setTaskData] = useState(task);
  const [showTaskList, setShowTaskList] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);


  const handleCardClick = (e) => {
    // Only open the popup if the click wasn't on a button or the edit icon
    if (!e.target.closest('button') && !e.target.closest('.edit-icon') && !e.target.closest('.update-modal')) {
      
    }
  };

 

  const handleCloseModal = () => {
    setShowUpdateModal(false);

  };

  //Delete Card According it's id
  const handleDelete = async (taskId) => {
    const userConfirmed = window.confirm("Do you want to delete this lead?");
    if (!userConfirmed) {
      return;
    }

    try {
      await axios.delete(`https://localhost:7143/api/Lead/${taskId}`);
      if (typeof deleteTask === 'function') {
        deleteTask(taskId);
      } else {
        console.error("deleteTask is not a function");
      }
      toast.success("Lead deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete lead.");
    }
  };


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
    disabled: editMode || showTaskForm || showEventForm ||showUpdateTaskModal || showTaskList ||  showUpdateModal  ||showUpdateEventModal ||showEventList,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
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
      const { leadName, companyName, leadStatus, startDate, endDate, salesRep } = formData;

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      await updateTask(task.id, { leadName, companyName, leadStatus, startDate: formattedStartDate, endDate: formattedEndDate, salesRep });
      setEditMode(false);
      setShowUpdateModal(false);
      toast.success("Lead updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update lead.");
    }
  };


  const handleOpenModal = () => {
    setShowUpdateModal(true);
  };


  const handleUpdate = (updatedData) => {
    setTaskData((prevTask) => ({
      ...prevTask,
      ...updatedData
    }));
  };
 

  
  const handleTaskButtonClick = () => {
    setShowTaskForm(true);
  };

  const handleEventButtonClick = () => {
    setShowEventForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
  };

  const closeEventForm = () => {
    setShowEventForm(false);
  };

  const handleViewTasks = () => {
    setShowTaskList(true);
  };

  const handleViewEvents = () => {
    setShowEventList(true);
  };

  const handleUpdateTask = () => {
    setShowUpdateTaskModal(true);
  };

  const handleUpdateEvent = () => {
    setShowUpdateEventModal(true);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg- p-2.5 h-[200px] min-h-[200px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-300 h-[350px] min-h-[230px] text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-400 cursor-grab relative task "
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={handleCardClick}
    >
      {editMode ? (
        <form onSubmit={handleSubmit} className="p-2.5 h-[300px] min-h-[300px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-zinc-400 cursor-grab relative flex-col ">
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
        <div className="card text-black font-bold text-lg bg-primary ml-1 mt-1" style={{ minWidth: '24rem', width: '300px', height: '200px' }}>
          <div className="card-header text-start ml-2">{taskData.leadName}</div>
          <div className="card-body">
            <h5 className="card-title text-teal-700 font-semibold text-start ml-2">{taskData.companyName}</h5>

            <p className="card-text mt-2">
              {taskData.leadStatus.split(',').map((status, index) => (
                <span key={index} className={`ml-1 text-xs text-start rounded-full py-1 px-3 border ${statusColors[status.trim()]} `}>
                  {status.trim()}
                </span>
              ))}
            </p>
            <p className="card-text mt-1">
              <span className="ml-1 text-sm text-gray-600 text-justify">Start Date  : {formattedStartDate}</span>
            </p>
            <p className="card-text mt-1">
              <span className="ml-1 text-sm text-gray-600 text-justify">End Date  : {formattedEndDate}</span>
            </p>

            <p className="card-text mt-2">
              <span className="text-gray-500 ml-1 text-xs text-start"> <Avatar src="https://source.unsplash.com/random/100x100" size="32" round={true} /> {taskData.salesRep}</span>
            </p>

            <div className="flex  mt-4">
            <button onClick={handleTaskButtonClick} className="bg-blue-500 text-white py-2 px-4 rounded">Task</button>
            <button onClick={handleEventButtonClick} className="bg-green-500 text-white py-2 px-4 rounded">Event</button>
          </div>
          <div className="flex  mt-2">
            <button onClick={handleViewTasks} className="bg-blue-300 text-white py-2 px-2 rounded flex items-center">
              <FaEye className="mr-2" />  Tasks
            </button>
            <button onClick={handleViewEvents} className="bg-green-300 text-white py-2 px-2 rounded flex items-center">
              <FaEye className="mr-2" />  Events
            </button>
          </div>


          </div>
        </div>
      )}

      {mouseIsOver && (
        <div className="absolute top-2 right-2 mt-1 flex ">
          <button onClick={() => handleDelete(task.id)} className="stroke-black bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100">
            <FaTrash />
          </button>
        </div>
      )}



      {!editMode && (
       <button 
       onClick={(e) => {
         e.stopPropagation();
         handleOpenModal();
       }} 
       className="absolute bottom-4 right-2 bottom-2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
     >
       <MdEdit />
     </button>
      )}


      {showUpdateModal && (
        <div className="update-modal">
        <UpdateTaskModal
          task={task}
          onUpdate={handleUpdate}
          onClose={handleCloseModal}
        />
      </div>
      )}

{showModal && (
        <UpdateTaskModal
          task={task}
          onUpdate={handleUpdate}
          onClose={handleCloseModal}
        />
      )}

      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <TaskForm
              onClose={closeTaskForm}
              leadName={task.leadName}
              leadId={task.id}
            />
          </div>
        </div>
      )}

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <EventForm onClose={closeEventForm} leadId={task.id} />
          </div>
        </div>
      )}

      {showTaskList && (
        <ViewTasks leadId={task.id} onClose={() => setShowTaskList(false)} />
      )}

      {showEventList && (
        <ViewEvents leadId={task.id} onClose={() => setShowEventList(false)} />
      )}

      {showUpdateTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Update Task</h2>
            {/* Add your update task form component here */}
            <button onClick={() => setShowUpdateTaskModal(false)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}

      {showUpdateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Update Event</h2>
            {/* Add your update event form component here */}
            <button onClick={() => setShowUpdateEventModal(false)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default TaskCard;



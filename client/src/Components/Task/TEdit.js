import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TEdit({ visible, taskId, onClose }) {
  const [editId, setEditId] = useState('');
  const [editTaskName, setEditTaskName] = useState('');
  const [editRelatedTo, setEditRelatedTo] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editReminderDate, setEditReminderDate] = useState('');
  const [editReminderTime, setEditReminderTime] = useState('');
  const [editPriority, setEditPriority] = useState(false);
  const [editTaskStatus, setEditTaskStatus] = useState('');

  useEffect(() => {
    if (visible && taskId) {
      handleEdit(taskId);
    }
  }, [visible, taskId]);

  const handleEdit = (id) => {
    axios.get(`https://localhost:7143/api/Task/${id}`)
      .then((result) => {
        const { taskName, relatedTo, taskDescription, dueDate, reminderDate, reminderTime, priority, taskStatus } = result.data;
        setEditTaskName(taskName);
        setEditRelatedTo(relatedTo);
        setEditTaskDescription(taskDescription);
        setEditDueDate(dueDate);
        setEditReminderDate(reminderDate);
        setEditReminderTime(reminderTime);
        setEditPriority(priority);
        setEditTaskStatus(taskStatus);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUpdate = () => {
    const url = `https://localhost:7143/api/Task/${editId}`;
    const data = {
      "id": editId,
      "taskName": editTaskName,
      "relatedTo": editRelatedTo,
      "taskDescription": editTaskDescription,
      "dueDate": editDueDate,
      "reminderTime": editReminderTime,
      "reminderDate": editReminderDate,
      "priority": editPriority,
      "taskStatus": editTaskStatus
    };
  
    axios.put(url, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          onClose();
          clear();
          toast.success('Task has been updated successfully');
        } else {
          toast.error('An error occurred while updating the task.');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error occurred while updating the task.');
      });
  }
  

  const clear = () => {
    setEditTaskName('');
    setEditRelatedTo('');
    setEditTaskDescription('');
    setEditDueDate('');
    setEditReminderDate('');
    setEditReminderTime('');
    setEditPriority(false);
    setEditTaskStatus('');
    setEditId('');
  }

  return (
    <>
      {visible &&
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10'>
          <div className='border w-96 bg-white p-8 rounded-lg'>
            <h1 className='text-lg font-semibold mb-4'>Modify/Update Task</h1>
            <form>
              <div className='mb-4'>
                <label htmlFor='taskName' className='block text-sm font-medium mb-1'>Task Name</label>
                <input
                  type='text'
                  name='taskName'
                  placeholder='Enter task title'
                  className='border px-3 py-2 w-full rounded-md focus:outline-none focus:border-green-700'
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='relatedTo' className='block text-sm font-medium mb-1'>Related To</label>
                <input
                  type='text'
                  id='relatedTo'
                  placeholder='Lead Name'
                  className='border px-3 py-2 w-full rounded-md focus:outline-none focus:border-green-700'
                  value={editRelatedTo}
                  onChange={(e) => setEditRelatedTo(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='dueDate' className='block text-sm font-medium mb-1'>Due Date</label>
                <input
                  type='date'
                  id='dueDate'
                  className='border px-3 py-2 w-full rounded-md focus:outline-none focus:border-green-700'
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4 flex items-center'>
                <label htmlFor='reminder' className='block text-sm font-medium mr-4'>Reminder</label>
                <input
                  type='date'
                  id='reminderDate'
                  className='border px-3 py-2 w-48 rounded-md focus:outline-none focus:border-green-700'
                  value={editReminderDate}
                  onChange={(e) => setEditReminderDate(e.target.value)}
                  required
                />
                <input
                  type='time'
                  id='reminderTime'
                  className='border px-3 py-2 w-32 rounded-md ml-4 focus:outline-none focus:border-green-700'
                  value={editReminderTime}
                  onChange={(e) => setEditReminderTime(e.target.value)}
                  required
                />
               </div>
               <div className='status'> {/* Corrected className */}
                <label htmlFor="status">Status</label>
                <select
                  name='status'
                  id='status'
                  className='mx-12 border px-5 rounded-md h-10 border-green-700 w-300'
                  value={editTaskStatus}
                  onChange={(e) => setEditTaskStatus(e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="doing">In Progress</option>
                  <option value="done">Completed</option>
                  <option value="cancel">Canceled</option>
                </select>
              </div>
              <div className='mb-4'>
                <label htmlFor='taskDescription' className='block text-sm font-medium mb-1'>Description</label>
                <textarea
                  id='taskDescription'
                  rows='4'
                  placeholder='Enter text here...'
                  className='border px-3 py-2 w-full rounded-md focus:outline-none focus:border-green-700'
                  value={editTaskDescription}
                  onChange={(e) => setEditTaskDescription(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4'>
                <input
                  type='checkbox'
                  id='priority'
                  checked={editPriority}
                  onChange={(e) => setEditPriority(e.target.checked)}
                  className='mr-2'
                />
                <label htmlFor='priority' className='text-sm font-medium'>Mark as high priority</label>
              </div>
            </form>
            <div className='flex justify-between'>
              <button onClick={onClose} className='text-gray-600 hover:text-gray-800 font-medium focus:outline-none'>Close</button>
              <button onClick={handleUpdate} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none'>
                Update
               </button>
            </div>
          </div>
        </div>
      }
      <ToastContainer />
    </>
  );
}

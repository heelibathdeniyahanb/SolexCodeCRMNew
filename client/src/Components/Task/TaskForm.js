import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../login/UserContext';

function TaskForm({ onClose, leadName,leadId }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [relatedTo, setRelatedTo] = useState(leadName || '');
  const [taskStatus, setTaskStatus] = useState('To Do');  // Set a default value
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState(false);
  const { userData } = useUser();

  // Use effect to update leadName if leadName prop changes
  useEffect(() => {
    setRelatedTo(leadName || '');
  }, [leadName]);

  const handleSubmit = (task) => {
    task.preventDefault();

    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split('T')[0];

    if (new Date(dueDate) < new Date(currentDate)) {
      toast.error('Due date cannot be earlier than the current date.');
      return;
    }

    if (new Date(reminderDate) < new Date(currentDate)) {
      toast.error('Reminder date cannot be earlier than the current date.');
      return;
    }

    if (new Date(reminderDate) > new Date(dueDate)) {
      toast.error('Reminder date cannot be later than the due date.');
      return;
    }

    const reminder = `${reminderDate}T${reminderTime}`;

    axios.post('https://localhost:7143/api/Task', {
      taskName,
      dueDate,
      leadName:relatedTo,
      status: taskStatus,
      reminderDate,
      reminderTime,
      taskDescription,
      priority,
      createdByName: userData.fullName || "",
      createdByEmail: userData.email || "",
      createdById: userData.id || "",
      newLeadId: leadId // Include the validated lead ID
     
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        toast.success('Task added successfully');
      })
      .catch(error => {
        toast.error('An error occurred while adding the task.');
      });
  }

  return (
    <div className='form body border px-5 py-5 text-sm '>
      <ToastContainer />

      <div className='addtask'>
        <div className='text-2xl font-bold'>Add Task</div><br></br>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='taskname '>
          <label>Task Name</label>
          <input type='text' placeholder='enter task title' className='border px-5 mx-5 rounded-md w-[500px] h-10 border-green-700' value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </div><br></br>
        <div className='leadName'>
          <label>Lead Name</label>
          <input type='text' placeholder='Lead Name' className='border px-5 mx-6 rounded-md w-300 h-10 border-green-700' value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)} required readOnly />
        </div><br />
        <div className='due date'>
          <label>Due date</label>
          <input type='date' className=' border px-5 mx-8 rounded-md  h-10 border-green-700 ' value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div> <br></br>

        <div className='status'>
          <label htmlFor="status">Status</label>
          <select name='status' id='status' className='mx-12 border px-5 rounded-md h-10 border-green-700 w-300'
            value={taskStatus}  // Set the value of the select to the state variable
            onChange={(e) => setTaskStatus(e.target.value)} // Update the state when the value changes
          >
            <option value="To Do">To Do</option>
            <option value="Doing">In Progress</option>
            <option value="Done">Completed</option>
            <option value="Cancel">Canceled</option>
          </select>
        </div> <br></br>

        <div className='reminder'>
          <label htmlFor="reminder">Reminder</label>
          <input type='date' className='mx-8 border px-5 rounded-md w-300  h-10 border-green-700' value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} required />
          <input type='time' className='mx-8 border px-5 rounded-md w-300  h-10 border-green-700' value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} required />
        </div><br></br>

        <div className='description flex'>
          <label>Description</label>
          <textarea rows="4" cols="50" name="comment" form="usrform" className='border px-5 mx-4 rounded-md  h-10 border-green-700' placeholder='Enter text here...' value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required></textarea>
        </div><br></br>
        <div>
          <input type='checkbox' id="marked" name="high priority" checked={priority} onChange={(e) => setPriority(e.target.checked)}></input>
          <label className='mx-5'>Mark as high priority</label>
        </div> <br></br>
        <div className='button '>
          <button type='submit' className='border px-6 py-2 bg-gray-400 rounded-lg font-bold'>Save</button>
          <button type='button' onClick={onClose} className='border px-6 py-2 mx-20 bg-gray-400 rounded-lg font-bold'>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

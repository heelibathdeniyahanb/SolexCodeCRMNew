import React , {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskForm(){
    const[taskName,setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [RelatedTo,setRelatedTo] = useState('');
    const [taskStatus,setTaskStatus]=useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState(false);

    const handleSubmit = (task) => {
        task.preventDefault();

       // const datetime = `${date}T${time}`;
        const reminder = `${reminderDate}T${reminderTime}`;

        axios.post('https://localhost:7143/api/Task',{
            taskName,
            dueDate,
            RelatedTo,
            taskStatus,
            reminderDate,reminderTime,
            taskDescription,
            priority
        },{
            headers : {
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

    return(
        <div className='form body border px-5 py-5 text-sm '>
            <ToastContainer/>

            <div className='addtask'>
            <div className='text-2xl font-bold'>Add Task</div><br></br>
            
            </div>
            
            <form onSubmit={handleSubmit}  >
            <div className='taskname '>
                <label >Task Name</label>
                <input type='text' placeholder='enter task title' className='border px-5 mx-5 rounded-md w-[500px] h-10 border-green-700' value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
            </div><br></br>
            <div className='Related to'>
                <label >Related To</label>
                <input type='text' placeholder='Lead Name' className='border px-5 mx-6 rounded-md w-300  h-10 border-green-700' value={RelatedTo} onChange={(e) => setRelatedTo(e.target.value)} required/>
            </div><br></br>
            <div className='due date'>
                <label>Due date</label>
                <input type='date' className=' border px-5 mx-8 rounded-md  h-10 border-green-700 ' value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
            </div> <br></br>

            <div className='staus'>
                <label for="status">Status</label>
                <select name='status'id='status' className='mx-12 border px-5 rounded-md h-10 border-green-700 w-300'
                value={taskStatus}  // Set the value of the select to the state variable
                onChange={(e) => setTaskStatus(e.target.value)} // Update the state when the value changes
>
                    <option value="To Do">To Do</option>
                    <option value="doing">In Progress</option>
                    <option value="done">Completed</option>
                    <option value="cancel">Canceled</option>
                </select>
            </div> <br></br>
           
            <div className='reminder'>
                <label for="reminder">Reminder</label>
                <input type='date' className='mx-8 border px-5 rounded-md w-300  h-10 border-green-700'  value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} required  />
                <input type='time' className='mx-8 border px-5 rounded-md w-300  h-10 border-green-700'  value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} required/>
    </div><br></br>

            
            <div className='description flex'>
                <label >Description</label>
                <textarea rows="4" cols="50" name="comment" form="usrform" className='border px-5 mx-4 rounded-md  h-10 border-green-700' placeholder='Enter text here...'  value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required></textarea>

            </div><br></br>
            <div>
            <input type='checkbox' id="marked" name="high priority"   checked={priority} onChange={(e) => setPriority(e.target.checked)}></input>
            <label className='mx-5'>Mark as high priority</label>
            </div> <br></br>
            <div className='button '>
                <button type='submit' className='border px-6 py-2 bg-gray-400 rounded-lg font-bold'>Save</button>
                <button type='submit' className='border px-6 py-2 mx-20 bg-gray-400 rounded-lg font-bold'>Cancel </button>
            </div></form>
        </div>
    );
}
export default TaskForm;
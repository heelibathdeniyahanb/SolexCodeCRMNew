import React from 'react';

function TaskForm(){
    return(
        <div className='form body border px-5 py-5 text-sm '>

            <div className='addtask'>
            <div className='text-2xl font-bold'>Add Task</div><br></br>
            
            </div>
            

            <div className='taskname '>
                <label >Task Name</label>
                <input type='text' placeholder='enter task title' className='border px-5 mx-5 rounded-md w-[500px] h-10 border-green-700' ></input>
            </div><br></br>
            <div className='Related to'>
                <label >Related To</label>
                <input type='text' placeholder='Lead Name' className='border px-5 mx-6 rounded-md w-300  h-10 border-green-700'></input>
            </div><br></br>
            <div className='due date'>
                <label>Due date</label>
                <input type='date' className=' border px-5 mx-8 rounded-md  h-10 border-green-700 '></input>
            </div> <br></br>
           
            <div className='reminder'>
                <label for="reminder">Reminder</label>
                <select  name='reminder' id='reminder' className='mx-8 border px-5 rounded-md w-300  h-10 border-green-700'>
                    <option value="everyday">Never </option>
                    <option value="everyweek">On due date</option> 
                    <option value="everymonth">A day before due date </option> 
                    <option value="everyear">A week before </option>
                </select>
                <input type='time' className='mx-8 border px-5 rounded-md w-300  h-10 border-green-700'></input>
            </div><br></br>

            
            <div className='description flex'>
                <label >Description</label>
                <textarea rows="4" cols="50" name="comment" form="usrform" className='border px-5 mx-4 rounded-md  h-10 border-green-700' placeholder='Enter text here...'></textarea>

            </div><br></br>
            <div>
            <input type='checkbox' id="marked" name="high priority"></input>
            <label className='mx-5'>Mark as high priority</label>
            </div> <br></br>
            <div className='button '>
                <button type='submit' className='border px-6 py-2 bg-gray-400 rounded-lg font-bold'>Save</button>
                <button type='submit' className='border px-6 py-2 mx-20 bg-gray-400 rounded-lg font-bold'>Cancel </button>
            </div>
        </div>
    );
}
export default TaskForm;
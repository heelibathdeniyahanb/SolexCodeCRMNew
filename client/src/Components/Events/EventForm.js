import React from 'react';

const EventForm = () => {
    return (
        <div className='formbody border px-5 py-5 text-sm'>
             <div className='text-2xl font-bold'>Add Event</div><br></br>
            <div className='title'>
                <label>Title</label>
                <input type='text' placeholder='Add event title' className='border px-5 mx-12 rounded-md  h-10 border-green-700 w-[500px]'></input>
            </div><br></br>
            <div className='venue'>
                <label>Venue</label>
                <input type='text' placeholder='Add Venue' className='border px-5 mx-9 rounded-md  h-10 border-green-700 w-[500px]'></input>
            </div><br></br>
            <div className='time  flex px-20'>
                <label>From</label>
                <div className='from'>
                <input type='date' className='border px-5 mx-5 rounded-md  h-10 border-green-700 w-300' ></input>
                <input type='time'  className='border px-5 mx-5 rounded-md  h-10 border-green-700 w-300'></input>
                </div>
                
            </div><br></br>
            <div className='time  flex px-20'>
                <label>To</label>
                <div className='from'>
                <input type='date' className='border px-5 mx-10 rounded-md  h-10 border-green-700 w-300' ></input>
                <input type='time'  className='border px-5  rounded-md  h-10 border-green-700 w-300'></input>
                </div>
                
            </div><br></br>
            
            <div className='repeat'>
                <label for="repeat">Repeat</label>
                <select  name='repeat' id='repeat' className='mx-12 border px-5 rounded-md  h-10 border-green-700 w-300'>
                    <option value="everyday">Never </option>
                    <option value="everyday">Everyday </option>
                    <option value="everyweek">Every Week </option> 
                    <option value="everymonth">Every Month </option> 
                    <option value="everyear">Every Year </option>
                </select>
                <label>Until</label>
                <input type='date' placeholder='until' className='mx-8 border px-5 rounded-md  h-10 border-green-700 w-300'></input>
            </div> <br></br>

            <div className='reminder'>
                <label for="reminder">Reminder</label>
                <select  name='reminder' id='reminder' className='mx-11 border px-5 rounded-md  h-10 border-green-700 w-300'>
                    <option value="everyday">Never </option>
                    <option value="everyweek">On due date</option> 
                    <option value="everymonth">A day before due date </option> 
                    <option value="everyear">Two days before due date </option>
                </select>
                <input type='time' className=' border px-5 rounded-md  h-10 border-green-700 w-300'></input>
            </div><br></br>

            <div className='host'>
                <label>Host</label>
                <input type='text' placeholder='host name' className='border px-5 mx-20 rounded-md  h-10 border-green-700 w-[500px]'></input>
            </div><br></br>

            <div className='participants'>
                <label>Participants</label>
                <input type='text' placeholder='Add participants' className='border px-5 mx-8 rounded-md  h-10 border-green-700 w-[500px]'></input>
            </div><br></br>

            <div className='email'>
                <label>Invite by Email</label>
                <input type='email' placeholder='joedew@gmail.com' className='border px-5 mx-4 rounded-md  h-10 border-green-700 w-[500px]'></input>
            </div><br></br>
            
            <div className='description  flex'>
               <div> <label >Description</label></div> 
                <textarea rows="4" cols="52" name="comment" form="usrform" className='border px-5 mx-9 rounded-md  h-10 border-green-700' placeholder='Enter text here...'></textarea>

            </div><br></br>
            <div className='button  px-20 mx-12'>
                <button type='submit' className='border px-6 py-2 bg-gray-400 rounded-md  h-10 border-green-700 font-bold'>Create</button>
                <button type='submit' className='border px-6 py-2 mx-20 bg-gray-400 rounded-md  h-10 border-green-700 font-bold'>Cancel </button>
            </div>

            
            
        </div>
    );
};

export default EventForm;
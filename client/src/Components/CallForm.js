import React from 'react';

const CallForm = () => {
    return (
        <div className='formbody border px-5 py-5 text-sm'>
          <div className='text-2xl font-bold'>Add Call</div><br></br>
            <div className='contactname'>
                <label>Subject</label>
                <input type='text' className='border px-5 mx-12 rounded-md  h-10 border-green-700 w-300  w-[500px]' placeholder='Define for what'></input>
            </div><br></br>

            <div className='time flex'>
                <label>Date</label>
                <input type='date'className='border px-5 mx-20 rounded-md  h-10 border-green-700 w-300 w-[300px]' placeholder='contact name' ></input>

                <label>Call Start Time</label>
                 <input type='time' className='border px-5 mx-5 rounded-md  h-10 border-green-700 w-300 w-[300px]' ></input>
               
                <label>End Time</label> 
              <input type='time' className='border px-5 mx-5 rounded-md  h-10 border-green-700 w-300 w-[300px]'></input>  
            
              </div><br></br>

              <div className='calltype'>
                <label for="calltype">Call Type</label>
                <select  name='calltypet' id='calltype' className='mx-12 border px-8 rounded-md  h-10 border-green-700 w-300 '>
                    <option value="everyday">Everyday </option>
                    <option value="everyweek">Every Week </option> 
                    <option value="everymonth">Every Month </option> 
                    <option value="everyear">Every Year </option>
                </select> </div><br></br>

                <div className='realtedto'>
                <label>Related To</label>
                <input type='text' className='border px-5 mx-11 rounded-md  h-10 border-green-700 w-300 w-[500px]' ></input>
            </div><br></br>

            <div className='callagenda'>
                <label>Call Agenda</label>
                <input type='text' className='border px-5 mx-9 rounded-md  h-10 border-green-700 w-300 w-[500px]'></input>
            </div><br></br>

            <div className='description  flex'>
               <div> <label >Description</label></div> 
                <textarea rows="4" cols="50" name="comment" form="usrform" className='border px-5 mx-10 rounded-md  h-10 border-green-700 w-300' placeholder='Enter text here...'></textarea>
            </div><br></br>

            <div className='email'>
                <label>Invite by Email</label>
                <input type='email' placeholder='joedew@99x.io' className='border px-5 mx-5 rounded-md  h-10 border-green-700 w-[500px]'></input>
            </div><br></br>

            <div className='button mx-32 '>
                <button type='submit' className='border px-6 py-2 bg-gray-400 rounded-md  h-10 border-green-700 w-300 font-bold'>Create</button>
                <button type='submit' className='border px-6 py-2 mx-20 bg-gray-400 rounded-md  h-10 border-green-700 w-300 font-bold'>Cancel </button>
            </div>









                
        </div>





            
     
    );
};

export default CallForm;
import React from 'react';
import {Link} from 'react-router-dom';

const CalendarLogin = () => {
    return (
        <div className='flex py-4 border justify-start px-12 text-cyan-700 font-bold '>
            <div className='flex '>
                <div className='mx-3 '>
                    <Link to = '/admincalendar' className='hover:text-green-900 active:text-blue-600'>Calendar</Link>
                </div>
                <div className='mx-3'>
                    <Link to = '/task' className='hover:text-green-900 active:text-blue-600'>Task</Link>
                </div>
                <div className='mx-3'>
                    <Link to = '/event' className='hover:text-green-900 active:text-blue-600'>Event</Link>
                </div>
               
            </div>

            <div className='flex  ml-auto text-white'>
                <div className='mx-3'>
                    <button className='border bg-green-950 px-6 py-2 rounded-lg hover:bg-green-900 active:bg-blue-300 focus-outline'><Link to = '/addtask'>+Task</Link></button>
                </div>
                <div className='mx-3'>
                <button className='border bg-green-950 px-6 py-2 rounded-lg hover:bg-green-900 active:bg-blue-300 focus-outline'><Link to = '/addevent'>+Event</Link> </button>
                </div>
                
            </div>
        </div>
    );
};

export default CalendarLogin;
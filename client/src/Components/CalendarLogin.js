import React from 'react';
import {Link} from 'react-router-dom';

const CalendarLogin = () => {
    return (
        <div className='flex py-4 border justify-end px-12 text-cyan-700 font-bold '>
            <div className='flex '>
                <div className='mx-3 '>
                    <Link to = '/admincalendar' className='hover:text-green-900 active:text-blue-600'>Calendar</Link>
                </div>
                
                <div className='mx-3'>
                    <Link to = '/event' className='hover:text-green-900 active:text-blue-600'>Event</Link>
                </div>
               
            </div>

            
        </div>
    );
};

export default CalendarLogin;
import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import CalendarLogin from '../../Components/CalendarLogin';
import Header from '../../Components/Header/Header';
import AdminSideNavBar from './AdminSideNavBar';

const AdminCalendar = () => {
    return (
        <div className='width-full'>
            <div><Header/></div>
            <div><CalendarLogin/></div>
            <div className=''>
                <div className='flex justify-between'>

                    <div className='justify-left'><AdminSideNavBar/></div>

                    <div> <BigCalendarUi/></div>
                    
                    <div className=' h-fit '><MiniCalendarUi/></div>
                    
                    
                    
             
                </div>
            </div>
            
          
          
          
         
       
          
    
          
          
          
        </div>
    );
};

export default AdminCalendar;
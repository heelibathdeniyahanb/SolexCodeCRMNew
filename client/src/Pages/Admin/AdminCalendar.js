import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import CalendarLogin from '../../Components/CalendarLogin';
import Header from '../../Components/Header/Header';

const AdminCalendar = () => {
    return (
        <div className='width-full'>
             <Header/>
          <CalendarLogin/>
          <MiniCalendarUi/>
          <BigCalendarUi/>
       
          
    
          
          
          
        </div>
    );
};

export default AdminCalendar;
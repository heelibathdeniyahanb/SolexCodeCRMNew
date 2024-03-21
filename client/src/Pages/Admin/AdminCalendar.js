import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import CalendarLogin from '../../Components/CalendarLogin';

const AdminCalendar = () => {
    return (
        <div className='width-full'>
          <CalendarLogin/>
          <MiniCalendarUi/>
          <BigCalendarUi/>
          
    
          
          
          
        </div>
    );
};

export default AdminCalendar;
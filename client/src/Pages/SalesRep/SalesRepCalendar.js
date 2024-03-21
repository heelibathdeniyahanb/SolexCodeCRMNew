import React from 'react';
import CalendarLogin from '../../Components/CalendarLogin';
import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';

const SalesRepCalendar = () => {
    return (
        <div>
           <CalendarLogin/>
           <MiniCalendarUi/>
           <BigCalendarUi/>
        </div>
    );
};

export default SalesRepCalendar;
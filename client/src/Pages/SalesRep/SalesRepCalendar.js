import React from 'react';
import CalendarLogin from '../../Components/CalendarLogin';
import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import Header from '../../Components/Header/Header';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';

const SalesRepCalendar = () => {
    return (
        <div>
            <Header/>
           <CalendarLogin/>
           <div className='flex justify-between'>
            <div>
            <SalesRepNavBar/>
            </div>
            <div>
            <BigCalendarUi/>
            </div>
            <div className=''>
            <MiniCalendarUi/>
            </div>
           </div>
          
           
           
        </div>
    );
};

export default SalesRepCalendar;
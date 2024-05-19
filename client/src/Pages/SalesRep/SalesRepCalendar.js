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
            <div className='w-full lg:w-4/5 overflow-y-auto'>
            <BigCalendarUi/>
            </div>
           
           </div>
          
           
           
        </div>
    );
};

export default SalesRepCalendar;
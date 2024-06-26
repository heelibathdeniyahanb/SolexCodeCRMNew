import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import SalesRepCalendarLogin from '../../Components/CustomerSupporter/SalesRepCalendarLogin';
import SideNav from '../../Components/Client/Ticket/TicketSideNav';
import Header from '../../Components/Header/Header';


const CustomerSupporterCalendar = () => {
    return (
        <div className='width-full'>
          <Header/>
          <SalesRepCalendarLogin/>
          <div className='flex'><SideNav/>
         
          <div className='w-full lg:w-4/5 overflow-y-auto'>
                    <BigCalendarUi />
                </div></div>
          
          
    
          
          
          
        </div>
    );
};

export default CustomerSupporterCalendar;
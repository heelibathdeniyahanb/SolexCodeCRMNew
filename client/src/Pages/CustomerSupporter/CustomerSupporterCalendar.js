import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import SalesRepCalendarLogin from '../../Components/CustomerSupporter/SalesRepCalendarLogin';
import SideNav from '../../Components/Client/Ticket/TicketSideNav';
import Header from '../../Components/Header/Header';
import CustomerSupporterNavBar from '../../Components/CustomerSupporter/CustomerSupporterNavBar';


const CustomerSupporterCalendar = () => {
    return (
        <div className='width-full'>
          <Header/>
          <SalesRepCalendarLogin/>
          <div className='flex'><CustomerSupporterNavBar/>
         
          <div className='w-full lg:w-4/5 overflow-y-auto'>
                    <BigCalendarUi />
                </div></div>
          
          
    
          
          
          
        </div>
    );
};

export default CustomerSupporterCalendar;
import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import SalesRepCalendarLogin from '../../Components/CustomerSupporter/SalesRepCalendarLogin';
import SideNav from '../../Components/Sidebar/SideNav';
import Header from '../../Components/Header/Header';


const CustomerSupporterCalendar = () => {
    return (
        <div className='width-full'>
          <Header/>
          <SalesRepCalendarLogin/>
          <div className='flex'><SideNav/>
          <MiniCalendarUi/>
          <BigCalendarUi/></div>
          
          
    
          
          
          
        </div>
    );
};

export default CustomerSupporterCalendar;
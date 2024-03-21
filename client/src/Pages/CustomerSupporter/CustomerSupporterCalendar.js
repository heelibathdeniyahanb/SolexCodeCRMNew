import React from 'react';

import MiniCalendarUi from '../../Components/Calendar/MiniCalendarUi';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import SalesRepCalendarLogin from '../../Components/CustomerSupporter/SalesRepCalendarLogin';

const CustomerSupporterCalendar = () => {
    return (
        <div className='width-full'>
          <SalesRepCalendarLogin/>
          <MiniCalendarUi/>
          <BigCalendarUi/>
          
    
          
          
          
        </div>
    );
};

export default CustomerSupporterCalendar;
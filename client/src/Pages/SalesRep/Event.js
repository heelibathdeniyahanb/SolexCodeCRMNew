import React from 'react';
import Login from '../../Components/CalendarLogin';

import EventAdminSalesRepTable from '../../Components/Events/EventAdminSalesRepTable';

const Event = () => {
    return (
        <div>
          
            <Login/>
            
            <EventAdminSalesRepTable/>
        </div>
    );
};

export default Event;
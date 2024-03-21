import React from 'react';
import Login from '../../Components/CalendarLogin';
import EventAdminSalesRepSearchBar from '../../Components/Events/EventSearchBar';
import EventAdminSalesRepTable from '../../Components/Events/EventAdminSalesRepTable';

const Event = () => {
    return (
        <div>
          
            <Login/>
            <EventAdminSalesRepSearchBar/>
            <EventAdminSalesRepTable/>
        </div>
    );
};

export default Event;
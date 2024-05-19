import React from 'react';
import ClientCalendarLogin from '../../Components/Client/ClientCalendarLogin';


import EventSearchBar from '../../Components/Events/EventSearchBar';
import EventAdminSalesRepTable from '../../Components/Events/EventAdminSalesRepTable';

const ClientEvent = () => {
    return (
        <div>
         <ClientCalendarLogin/>
         <EventSearchBar/>
        <EventAdminSalesRepTable/>
        

        </div>
    );
};

export default ClientEvent;
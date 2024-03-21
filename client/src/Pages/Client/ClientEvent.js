import React from 'react';
import ClientCalendarLogin from '../../Components/Client/ClientCalendarLogin';
import ClientCustomerSupporterEventTable from '../../Components/Events/ClientCustomerSupporterEventTable';

import EventSearchBar from '../../Components/Events/EventSearchBar';

const ClientEvent = () => {
    return (
        <div>
         <ClientCalendarLogin/>
         <EventSearchBar/>
         <ClientCustomerSupporterEventTable/>
        

        </div>
    );
};

export default ClientEvent;
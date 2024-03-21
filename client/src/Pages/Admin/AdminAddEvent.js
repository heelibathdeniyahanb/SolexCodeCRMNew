import React from 'react';


import CalendarLogin from '../../Components/CalendarLogin';
import EventForm from '../../Components/Events/EventForm';


const AdminAddEvent = () => {
    return (
        <div>
           <CalendarLogin/>
           <EventForm/>
        </div>
    );
};

export default AdminAddEvent;
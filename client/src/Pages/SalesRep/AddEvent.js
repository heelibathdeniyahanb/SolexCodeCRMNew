import React from 'react';
import Login from '../../Components/CalendarLogin';
import EventForm from '../../Components/Events/EventForm';


const AddEvent = () => {
    return (
        <div>
            <Login/>
           <EventForm/>
        </div>
    );
};

export default AddEvent;
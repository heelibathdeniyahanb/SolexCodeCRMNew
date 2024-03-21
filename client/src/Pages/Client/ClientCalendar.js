import React from 'react';
import ClientCalendarLogin from '../../Components/Client/ClientCalendarLogin';
import ClientMiniCalendarUi from '../../Components/Client/ClientMiniCalendarUi';

const ClientCalendar = () => {
    return (
        <div>
            <ClientCalendarLogin/>
            <ClientMiniCalendarUi/>
        </div>
    );
};

export default ClientCalendar;
import React from 'react';
import ClientCalendarLogin from '../../Components/Client/ClientCalendarLogin';

import ClientSideNavBar from '../../Components/Client/ClientSideNavBar';

import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';
import ClientHeader from '../../Components/Header/ClientHeader';
const ClientCalendar = () => {
    return (
        <div>
            <div>
                <ClientHeader/>
            </div>
            <div>
            <ClientCalendarLogin/>
            </div>
            
            <div className='flex justify-between'>
                <div>
                    <ClientSideNavBar/>
                </div>
                <div className='w-full lg:w-4/5 overflow-y-auto'>
                    <BigCalendarUi />
                </div>
            </div>

            
            
            
            
            
            
        </div>
    );
};

export default ClientCalendar;
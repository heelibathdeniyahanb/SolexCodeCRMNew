import React from 'react';
import ClientCalendarLogin from '../../Components/Client/ClientCalendarLogin';
import ClientMiniCalendarUi from '../../Components/Client/ClientMiniCalendarUi';
import ClientSideNavBar from '../../Components/Client/ClientSideNavBar';
import Header from '../../Components/Header/Header';
const ClientCalendar = () => {
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
            <ClientCalendarLogin/>
            </div>
            
            <div className='flex justify-between'>
                <div>
                    <ClientSideNavBar/>
                </div>
                <div>
                    <ClientMiniCalendarUi/>
                </div>
            </div>

            
            
            
            
            
            
        </div>
    );
};

export default ClientCalendar;
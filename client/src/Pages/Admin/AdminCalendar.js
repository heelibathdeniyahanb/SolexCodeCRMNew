import React from 'react';
import Header from '../../Components/Header/Header';
import CalendarLogin from '../../Components/CalendarLogin';
import AdminSideNavBar from './AdminSideNavBar';
import BigCalendarUi from '../../Components/Calendar/BigCalendarUi';

const AdminCalendar = () => {
    return (
        <div className='w-full'>
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <CalendarLogin />
            <div className='flex flex-col lg:flex-row lg:justify-between'>
                <div className='sticky top-0 z-10 w-full lg:w-1/5 mb-4 lg:mb-0 lg:mr-10'>
                    <AdminSideNavBar />
                </div>
                <div className='w-full lg:w-4/5 overflow-y-auto'>
                    <BigCalendarUi />
                </div>
            </div>
        </div>
    );
};

export default AdminCalendar;

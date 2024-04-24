import React from 'react';


import CalendarLogin from '../../Components/CalendarLogin';
import TaskForm from '../../Components/Task/TaskForm';
import AdminSideNavBar from './AdminSideNavBar';

const AdminAddTask = () => {
    return (
        <div>
           <CalendarLogin/>
           <AdminSideNavBar></AdminSideNavBar>
            <TaskForm/>
        </div>
    );
};

export default AdminAddTask;
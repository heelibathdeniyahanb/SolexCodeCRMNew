import React from 'react';


import CalendarLogin from '../../Components/CalendarLogin';
import TaskForm from '../../Components/Task/TaskForm';

const AdminAddTask = () => {
    return (
        <div>
           <CalendarLogin/>
            <TaskForm/>
        </div>
    );
};

export default AdminAddTask;
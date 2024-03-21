import React from 'react';
import Login from '../../Components/CalendarLogin';
import TaskForm from '../../Components/Task/TaskForm';

const AddTask = () => {
    return (
        <div>
            <Login/>
            <TaskForm/>
        </div>
    );
};

export default AddTask;
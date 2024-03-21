import React from 'react';
import Login from '../../Components/CalendarLogin';
import SearchBar from '../../Components/Task/SearchBar';
import TaskTable from '../../Components/Task/TaskTable';

const Task = () => {
    return (
        <div >
            
          
            <Login/>
            <SearchBar/>
            <TaskTable/>
        </div>
    );
};

export default Task;
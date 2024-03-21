import React from 'react';



import CalendarLogin from '../../Components/CalendarLogin';
import SearchBar from '../../Components/Task/SearchBar';
import TaskTable from '../../Components/Task/TaskTable';

const AdminTask = () => {
    return (
        <div >
           <CalendarLogin/>
            <SearchBar/>
            <TaskTable/>
        </div>
    );
};

export default AdminTask;
import React from 'react';
import TaskDetailsSideBar from '../Components/Task/TaskDetailsSideBar';
import TaskDetailsView from '../Components/Task/TaskDetailsView';

const TaskDetailsPage = () => {
    return (
        <div>
            <TaskDetailsSideBar/>
            <TaskDetailsView/>
        </div>
    );
};

export default TaskDetailsPage;
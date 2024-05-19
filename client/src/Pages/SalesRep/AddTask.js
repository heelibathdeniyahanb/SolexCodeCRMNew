import React from 'react';
import Login from '../../Components/CalendarLogin';
import TaskForm from '../../Components/Task/TaskForm';
import AdminSideNavBar from '../Admin/AdminSideNavBar';
import Header from '../../Components/Header/Header';

const AddTask = () => {
    return (
        <div className='w-full'>
            {/* Header component */}
            <div className="sticky top-0 z-10">
                <Header />
            </div>

            {/* Calendar login */}
            <Login />

            {/* Main content */}
            <div className='flex flex-col lg:flex-row lg:justify-between'>
                {/* Admin side navbar */}
                <div className='w-full lg:w-1/5 mb-4 lg:mb-0 lg:mr-10 sticky top-0 h-screen bg-gray-200'>
                    <AdminSideNavBar />
                </div>

                {/* Task form */}
                <div className='w-full lg:w-4/5'>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
                        <TaskForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;

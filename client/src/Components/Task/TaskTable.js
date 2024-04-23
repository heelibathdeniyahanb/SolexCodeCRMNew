import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TEdit from "./TEdit";
import View from './View';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        fetchTasks(); // Fetch tasks on component mount
    }, []);

    const fetchTasks = () => {
        axios.get('https://localhost:7143/api/Task')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    const handleViewTask = (taskId) => {
        setSelectedTaskId(taskId);
        setShowModal1(true);
    }

    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        setShowModal(true);
    };

    const handleModelClose = () => {
        setShowModal(false);
        setShowModal1(false);
        fetchTasks(); // Fetch tasks after modal close
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this task?")) {
            const url = `https://localhost:7143/api/Task/${id}`;
            axios.delete(url)
                .then((response) => {
                    setTasks(tasks.filter(task => task.id !== id));
                    toast.success('Task has been deleted successfully');
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    fetchTasks(); // Fetch tasks after delete operation
                });
        }
    }

    return (
        <div>
            {editTaskId !== null && (
                <TEdit taskId={editTaskId} onClose={() => setEditTaskId(null)} />
            )}
            <div className="flex flex-col py-5 px-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Task Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Due Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Priority
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Related To
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created By
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">View</span>
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.map(task => {
                                        const datetimeParts = task.dueDate.split("T");
                                        const dueDate = datetimeParts[0];
                                        const priority = task.priority === true;

                                        return (
                                            <tr key={task.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{task.taskName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{dueDate}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {task.taskStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priority ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>
                                                        {priority ? 'High' : 'Normal'} Priority
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{task.relatedTo}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{task.createdBy}</div>
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleViewTask(task.id)} className="text-indigo-600 hover:text-indigo-900">
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleEditTask(task.id)} className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </button>
                                                </td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleDelete(task.id)} className="text-indigo-600 hover:text-indigo-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <TEdit
                                    visible={showModal}
                                    onClose={handleModelClose}
                                    taskId={editTaskId}
                                />
                            </div>
                            <div>
                                <View
                                    visible={showModal1}
                                    onClose={handleModelClose}
                                    taskId={selectedTaskId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;

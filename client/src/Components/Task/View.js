import React, { useState, useEffect } from 'react';
import axios from 'axios';

const View = ({ visible, onClose, taskId }) => {
    const [taskDetails, setTaskDetails] = useState(null);

    useEffect(() => {
        // Fetch task details when taskId changes
        if (taskId) {
            axios.get(`https://localhost:7143/api/Task/${taskId}`)
                .then(response => {
                    setTaskDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching task details:', error);
                });
        }
    }, [taskId]);

    return (
        <>
            {visible && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 '>
                    <div className='border-[2px] border-[#2a2a2a] w-96 bg-white p-8 rounded-lg  '>
                        {taskDetails ? (
                            <>
                                <h1 className="text-lg font-bold text-center ">{taskDetails.taskName}</h1>
                                <p><strong>Due Date:</strong> {taskDetails.dueDate}</p>
                                <p><strong>Status:</strong> {taskDetails.taskStatus}</p>
                                <p><strong>Priority:</strong> {taskDetails.priority ? 'High' : 'Normal'}</p>
                                <p><strong>Related To:</strong> {taskDetails.relatedTo}</p>
                                <p><strong>Created By:</strong> {taskDetails.createdBy}</p>
                                <p><strong>Date Created:</strong> {taskDetails.dateAdded}</p>
                                <p><strong>Date Modified:</strong> {taskDetails.dateModified}</p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div className='flex justify-center'>
                            <div>
                                <button onClick={onClose} className='mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium focus:outline-none'>
                                     Close
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default View;

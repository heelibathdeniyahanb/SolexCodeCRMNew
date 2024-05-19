import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ClientScheduledEventsTasks() {
  const [tasks, setTasks] = useState([]);

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
  const isDueSoonOrOverdue = (dueDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDateTime = new Date(dueDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = dueDateTime - currentTime;
    return timeDifference <= oneDay;
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Scheduled Events And Tasks</h5>
        <Link to="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.map(task => {
            const datetimeParts = task.dueDate.split("T");
            const dueDate = datetimeParts[0];
            const priority = task.priority === true;
            const isDueSoon = isDueSoonOrOverdue(task.dueDate);
            const textColorClass = isDueSoon ? 'text-red-500' : 'text-white';
            return (
              <li key={task.id} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-lg">{task.taskName.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className={`text-sm font-medium ${textColorClass}`}>{task.taskName}</p>
                    <p className={`text-sm ${textColorClass}`}>{task.CreatedBy}</p>
                    <p className={`text-sm ${textColorClass}`}>{task.email}</p>
                  </div>
                  <div className={`flex flex-col items-center justify-center text-base font-semibold ${priority ? 'text-red-500' : 'text-green-500'}`}>
                    <span className={`${textColorClass}`}>{dueDate}</span>
                    <span className={`${priority ? 'bg-red-200' : 'bg-green-200'} rounded-md px-2 py-1 mt-1`}>{priority ? 'High' : 'Normal'} Priority</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

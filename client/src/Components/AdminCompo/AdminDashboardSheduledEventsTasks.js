import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboardScheduledEventsTasks() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeSection, setActiveSection] = useState('all'); // State to track the active section

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
    fetchEvents(); // Fetch events on component mount
  }, []);

  const fetchTasks = () => {
    axios.get('https://localhost:7143/api/Task')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const fetchEvents = () => {
    axios.get('https://localhost:7143/api/Event')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const isDueSoonOrOverdue = (dueDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const dueDateTime = new Date(dueDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = dueDateTime - currentTime;
    return timeDifference <= oneDay;
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Scheduled Events And Tasks</h5>
       
      </div>
      <div className="flex justify-around mb-4">
        <button onClick={() => setActiveSection('all')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded hover:bg-gray-300">
          All
        </button>
        <button onClick={() => setActiveSection('tasks')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded hover:bg-gray-300">
          Tasks
        </button>
        <button onClick={() => setActiveSection('events')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded hover:bg-gray-300">
          Events
        </button>
      </div>
      <div className="flow-root">
        {activeSection === 'all' && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...tasks, ...events].map(item => {
              if ('taskName' in item) {
                const datetimeParts = item.dueDate.split("T");
                const dueDate = datetimeParts[0];
                const priority = item.priority === true;
                const isDueSoon = isDueSoonOrOverdue(item.dueDate);

                return (
                  <li key={item.id} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">{item.taskName.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.taskName}</p>
                        {/* Assuming task.createdBy and task.email are correct keys */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.createdBy}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.email}</p>
                      </div>
                      <div className={`flex flex-col items-center justify-center text-base font-semibold ${priority ? 'text-red-500' : 'text-green-500'}`}>
                        <span className={isDueSoon ? 'dark:text-red-500' : ''}>{dueDate}</span>
                        <span className={`rounded-md px-2 py-1 mt-1 ${priority ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>{priority ? 'High' : 'Normal'} Priority</span>
                      </div>
                    </div>
                  </li>
                );
              } else {
                const datetimeParts = item.date.split("T");
                const eventDate = datetimeParts[0];
                const eventTime = item.time;
                const priority = item.isImportant;

                return (
                  <li key={item.id} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">{item.eventName.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.eventName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.host}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.email}</p>
                      </div>
                      <div className={`flex flex-col items-center justify-center text-base font-semibold ${priority ? 'text-red-500' : 'text-green-500'}`}>
                        <span>{eventDate}</span>
                        <span>{eventTime}</span>
                        <span className={`rounded-md px-2 py-1 mt-1 ${priority ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>{priority ? 'High' : 'Normal'} Priority</span>
                      </div>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        )}
        {(activeSection === 'tasks') && (
          <div>
            <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks</h6>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-4">
              {tasks.map(task => {
                const datetimeParts = task.dueDate.split("T");
                const dueDate = datetimeParts[0];
                const priority = task.priority === true;
                const isDueSoon = isDueSoonOrOverdue(task.dueDate);

                return (
                  <li key={task.id} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">{task.taskName.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{task.taskName}</p>
                        {/* Assuming task.createdBy and task.email are correct keys */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.createdBy}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.email}</p>
                      </div>
                      <div className={`flex flex-col items-center justify-center text-base font-semibold ${priority ? 'text-red-500' : 'text-green-500'}`}>
                        <span className={isDueSoon ? 'dark:text-red-500' : ''}>{dueDate}</span>
                        <span className={`rounded-md px-2 py-1 mt-1 ${priority ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>{priority ? 'High' : 'Normal'} Priority</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {(activeSection === 'events') && (
          <div>
            <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Events</h6>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map(event => {
                const datetimeParts = event.date.split("T");
                const eventDate = datetimeParts[0];
                const eventTime = event.time;
                const priority = event.isImportant;

                return (
                  <li key={event.id} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">{event.eventName.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{event.eventName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.host}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.email}</p>
                      </div>
                      <div className={`flex flex-col items-center justify-center text-base font-semibold ${priority ? 'text-red-500' : 'text-green-500'}`}>
                        <span>{eventDate}</span>
                        <span>{eventTime}</span>
                        <span className={`rounded-md px-2 py-1 mt-1 ${priority ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>{priority ? 'High' : 'Normal'} Priority</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

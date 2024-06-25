import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../login/UserContext';

export default function AdminDashboardScheduledEventsTasks() {
  const [events, setEvents] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && userData.id) {
      fetchEvents(userData.id);
    }
  }, [userData]);

  const fetchEvents = (id) => {
    axios.get(`https://localhost:7143/api/Event/EventsByUserId/${id}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Scheduled Events</h5>
      </div>
      <div className="flow-root">
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map(event => {
              const datetimeParts = event.date ? event.date.split("T") : [];
              const eventDate = datetimeParts[0] || 'N/A';
              const eventTime = event.time || 'N/A';
              const priority = event.isImportant;
              return (
                <li key={event.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">{event.eventName ? event.eventName.charAt(0) : 'E'}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{event.eventName || 'Unnamed Event'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.createdByName || 'Unknown'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.createdByEmail || 'No email'}</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center text-base font-semibold ${priority ? 'text-red-500' : 'text-green-500'}`}>
                      <span>{eventDate}</span>
                      <span>{eventTime}</span>
                      <span className={`rounded-md px-2 py-1 mt-1 ${priority ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>
                        {priority ? 'High' : 'Normal'} Priority
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
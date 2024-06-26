import React, { useState } from 'react';

const LeadDetailsPopup = ({ lead, tasks, events, onClose }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  const toggleTasks = () => setShowTasks(!showTasks);
  const toggleEvents = () => setShowEvents(!showEvents);

  const getTaskStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'todo': return 'bg-gray-500';
      case 'inprogress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">{lead.leadName}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Company: {lead.companyName}<br/>
              Email: {lead.userEmail}<br/>
              Status: {lead.leadStatus}<br/>
              Sales Pipeline: {lead.salesPipeline}<br/>
              Sales Rep: {lead.salesRep}<br/>
              Manager Email: {lead.leadManagerEmail}<br/>
              Due Date: {lead.endDate.substring(0, 10)}
            </p>
          </div>

          {/* Tasks Section */}
          <div className="mt-4">
            <button 
              onClick={toggleTasks}
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            >
              <span>Tasks</span>
              <span>{showTasks ? '▲' : '▼'}</span>
            </button>
            {showTasks && (
              <div className="mt-2 px-4 py-2 bg-white rounded-lg">
                {tasks.length > 0 ? tasks.map((task, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className={`h-2 w-2 rounded-full mr-2 ${getTaskStatusColor(task.status)}`}></span>
                    <span>{task.taskName} - {task.status}</span>
                  </div>
                )) : <p>No tasks available</p>}
              </div>
            )}
          </div>

          {/* Events Section */}
          <div className="mt-4">
            <button 
              onClick={toggleEvents}
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
            >
              <span>Events</span>
              <span>{showEvents ? '▲' : '▼'}</span>
            </button>
            {showEvents && (
              <div className="mt-2 px-4 py-2 bg-white rounded-lg">
                {events.length > 0 ? events.map((event, index) => (
                  <div key={index} className="mb-2">
                    <span>{event.eventName}</span>
                  </div>
                )) : <p>No events available</p>}
              </div>
            )}
          </div>

          <div className="items-center px-4 py-3 mt-4">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPopup;
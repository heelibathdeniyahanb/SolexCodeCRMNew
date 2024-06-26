import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import LeadDetailsPopup from './LeadDetailsPopUp';

const areAllTasksCompleted = (tasks) => {
  return tasks.every(task => task.status.toLowerCase() === 'completed');
};

const ListTable = () => {
  const [leadsData, setLeadsData] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState({});
  const [expandedTasks, setExpandedTasks] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7143/api/Lead/Get/Leads/Tasks/Events`)
      .then((response) => {
        console.log(response.data);
        setLeadsData(response.data);
      })
      .catch((error) => console.log("Error occurred:", error));
  }, []);

  const toggleExpandEvents = (leadId) => {
    setExpandedEvents(prev => ({...prev, [leadId]: !prev[leadId]}));
  };

  const toggleExpandTasks = (leadId) => {
    setExpandedTasks(prev => ({...prev, [leadId]: !prev[leadId]}));
  };

  const getTaskStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'todo':
        return 'bg-gray-500';
      case 'inprogress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const handleViewClick = (lead,tasks,events) => {
    setSelectedLead(lead);
    setSelectedTasks(tasks);
    setSelectedEvents(events);
  };

  const handleClosePopup = () => {
    setSelectedLead(null);
    setSelectedTasks([]);
    setSelectedEvents([]);
  };

  return (
    <div className="h-screen flex flex-col py-5 px-5 overflow-y-auto">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-zinc-200">
                <tr>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Title
                  </th>
                  <th scope="col" className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Status
                  </th>
                  <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Events
                  </th>
                  <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasks
                  </th>
                  <th scope="col" className="relative px-12 py-3">
                    <span className="sr-only">View</span>
                  </th>
                  <th scope="col" className="relative px-12 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leadsData.map((leadData) => (
                  <React.Fragment key={leadData.newLead.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {leadData.newLead.salesPipeline === 'Closed-Won' && areAllTasksCompleted(leadData.tasks) && (
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <div className="text-sm text-gray-900">{leadData.newLead.leadName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{leadData.newLead.endDate.substring(0, 10)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {leadData.newLead.leadStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{leadData.newLead.companyName}</div>
                        <div className="text-xs text-gray-500">{leadData.newLead.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{leadData.newLead.salesPipeline}</div>
                      </td>
                      <td className="owner px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Avatar src={Avatar} size="32" round={true} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{leadData.newLead.salesRep}</div>
                            <div className="text-xs text-gray-500">{leadData.events.createdByEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {leadData.events.length > 0 ? (
                            <div>
                              {leadData.events[0].eventName}
                              {leadData.events.length > 1 && (
                                <button onClick={() => toggleExpandEvents(leadData.newLead.id)} className="ml-2 text-blue-500 hover:text-blue-700">
                                  {expandedEvents[leadData.newLead.id] ? '▲' : '▼'}
                                </button>
                              )}
                            </div>
                          ) : (
                            'No events'
                          )}
                        </div>
                        {expandedEvents[leadData.newLead.id] && (
                          <ul className="mt-2">
                            {leadData.events.slice(1).map((event, index) => (
                              <li key={index} className="text-sm text-gray-700">{event.eventName}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {leadData.tasks.length > 0 ? (
                            <div className="flex items-center">
                              <span className={`h-2 w-2 rounded-full mr-2 ${getTaskStatusColor(leadData.tasks[0].status)}`}></span>
                              {leadData.tasks[0].taskName}
                              {leadData.tasks.length > 1 && (
                                <button onClick={() => toggleExpandTasks(leadData.newLead.id)} className="ml-2 text-blue-500 hover:text-blue-700">
                                  {expandedTasks[leadData.newLead.id] ? '▲' : '▼'}
                                </button>
                              )}
                            </div>
                          ) : (
                            'No tasks'
                          )}
                        </div>
                        {expandedTasks[leadData.newLead.id] && (
                          <ul className="mt-2">
                            {leadData.tasks.slice(1).map((task, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-center">
                                <span className={`h-2 w-2 rounded-full mr-2 ${getTaskStatusColor(task.status)}`}></span>
                                {task.taskName}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleViewClick(leadData.newLead,leadData.tasks, leadData.events)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View
                </button>
              </td>
                     
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedLead && (
        <LeadDetailsPopup 
          lead={selectedLead}
          tasks={selectedTasks}
         events={selectedEvents}
         onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default ListTable;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

export default function AdminDashboardOngoingLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    axios.get('https://localhost:7143/api/Lead')
      .then(response => {
        setLeads(response.data);
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = dayjs(dateTimeString);
    return {
      endDate: dateTime.format('YYYY-MM-DD'),
      time: dateTime.format('hh:mm A')
    };
  };

  const isDueSoonOrOverdue = (endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDateTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = dueDateTime - currentTime;
    return timeDifference <= oneDay;
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Ongoing Leads</h5>
        <Link to="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {leads.map(lead => (
            <li key={lead.id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">{lead.leadName.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="dark:text-white">{lead.leadName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lead.companyName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                </div>
                <div className="flex flex-col items-center justify-center text-base font-semibold text-gray-900">
                  <span className={isDueSoonOrOverdue(lead.endDate) ? 'text-red-500 dark:text-red-500' : 'dark:text-white'}>
                    {formatDateTime(lead.endDate).endDate}
                  </span>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{lead.salesRep}</span>
                  <span className='dark:text-white'>{lead.salesPipeline}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardSheduledEventsTasks() {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Sheduled Events And Tasks</h5>
        <Link to="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-lg">M</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Meeting with SalesRep</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Saman Dissanayake</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">saman@gmail.com</p>
              </div>
              <div className="flex flex-col items-center justify-center text-base font-semibold text-gray-900 ">
                <span className='dark:text-red-500'>2024.04.20</span>
                
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-lg">T</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Tech Session for UOM Students</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nishan Wickramarathna</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">nishan@gmail.com</p>
              </div>
              <div className="flex flex-col items-center justify-center text-base font-semibold text-gray-900 ">
                <span className='dark:text-white'>2024.05.16</span>
                <span className='dark:text-red-500'>Compulsory</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

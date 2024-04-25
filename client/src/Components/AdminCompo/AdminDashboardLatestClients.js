import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardLatestClients() {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Clients</h5>
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
                  <span className="text-gray-600 text-lg">N</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Neil@gmail.com
                </p>
              </div>
              <div className="flex flex-col justify-center text-base font-semibold text-gray-900 dark:text-white">
                <span>2024.04.20</span>
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
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                 Tharindu Dilshan
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  tharindu@gmail.com
                </p>
              </div>
              <div className="flex flex-col justify-center text-base font-semibold text-gray-900 dark:text-white">
                <span>2024.04.15</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

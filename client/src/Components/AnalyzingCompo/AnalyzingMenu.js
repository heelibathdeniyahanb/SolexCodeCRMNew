import React from 'react';
import { Link } from 'react-router-dom';

export default function AnalyzingMenu() {
  return (
    <div className="mt-10">
      <div className="inline-flex rounded-md shadow-sm justify-between" role="group">
        <Link to='/report'>
          <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-[#294D61] border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Reports
          </button>
        </Link>
        <Link to='/charts'>
          <button type="button" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#294D61] border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Charts
          </button>
        </Link>
        <Link to='/kpi'>
          <button type="button" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#294D61] border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            KPI
          </button>
        </Link>
        <Link to='/comparator'>
          <button type="button" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#294D61] border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Comparator
          </button>
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function ReportMenu() {
    return (
        <div>
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Analyzing</h2>

            <div className='mt-10'>
                <div className="inline-flex rounded-md shadow-sm" style={{ justifyContent: 'space-between' }} role="group">
                    <Link to="/reports" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" style={{ marginRight: '10px', borderRadius: '10px' }}>
                        Reports
                    </Link>
                    <Link to="/charts" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" style={{ marginRight: '10px' }}>
                        Charts
                    </Link>
                    <Link to="/kpi" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" style={{ marginRight: '10px' }}>
                        KPI
                    </Link>
                    <Link to="/comparator" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" style={{ marginRight: '10px', borderRadius: '10px' }}>
                        Comparator
                    </Link>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react';


function Analyzing() {
  const [reports, setReports] = useState([
    {
      leadName: 'Social Media App',
      description: 'Summarizes the various stages of New and Existing',
      lastRunDate: '2 Jul',
    },
    {
      leadName: 'IOS App',
      description: '-',
      lastRunDate: '5 Feb',
    },
    {
      leadName: 'Calculator App',
      description: '-',
      lastRunDate: '20 May 2021',
    },
    {
      leadName: 'Tracker App',
      description: '-',
      lastRunDate: '16 May 2021',
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Analyzing</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Search Reports"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => {
              // Handle create report button click
            }}
          >
            Create Report
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => {
              // Handle print button click
            }}
          >
            Print
          </button>
        </div>
      </div>
      <table className="w-full border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left font-bold">
            <th className="px-4 py-2">Lead Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Last Run Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2">{report.leadName}</td>
              <td className="px-4 py-2">{report.description}</td>
              <td className="px-4 py-2">{report.lastRunDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analyzing;

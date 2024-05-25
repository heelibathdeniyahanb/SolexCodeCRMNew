import React from 'react';

const SLA = () => {
  const tickets = [
    { number: '202401WEBH01', status: 'Delayed', progress: 18, date: '01/02/2024', priority: 'Medium', statusColor: 'text-red-500' },
    { number: '202402MOBEDU01', status: 'On track', progress: 82, date: '01/02/2024', priority: 'Low', statusColor: 'text-green-500' },
    { number: '202401WEBH02', status: 'Pending', progress: 56, date: '01/02/2024', priority: 'High', statusColor: 'text-yellow-500' },
    { number: '202402MOBEDU01', status: 'On track', progress: 70, date: '01/02/2024', priority: 'Medium', statusColor: 'text-green-500' },
    { number: '202401WEBH02', status: 'On track', progress: 90, date: '01/02/2024', priority: 'Low', statusColor: 'text-green-500' },
    
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#294D61] underline">Service Level Agreement</h1>
      </header>

      {/* Priority Cases */}
      <section className="flex justify-center mb-8 space-x-4">
        <div className="flex items-center p-4 bg-[#325e759c] rounded-md shadow-md">
          <div className="mr-4 text-lg font-bold text-gray-800">High Priority cases</div>
          <div className="mr-4 text-2xl font-bold text-gray-800">01</div>
         
        </div>
        <div className="flex items-center p-4 bg-[#325e759c] rounded-md shadow-md">
          <div className="mr-4 text-lg font-bold text-gray-800">Average Priority</div>
          <div className="mr-4 text-2xl font-bold text-gray-800">02</div>
          
        </div>
        <div className="flex items-center p-4 bg-[#325e759c] rounded-md shadow-md">
          <div className="mr-4 text-lg font-bold text-gray-800">Low Priority</div>
          <div className="mr-4 text-2xl font-bold text-gray-800">01</div>
          
        </div>
      </section>

      {/* Tickets Table */}
      <section>
        <table className="w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-gray-700">Ticket Number</th>
              <th className="p-4 text-left text-gray-700">Status</th>
              <th className="p-4 text-left text-gray-700">Progress</th>
              <th className="p-4 text-left text-gray-700">Date</th>
              <th className="p-4 text-left text-gray-700">View</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-4 text-gray-700">{ticket.number}</td>
                <td className={`p-4 ${ticket.statusColor}`}>{ticket.status}</td>
                <td className="p-4">
                  <div className="relative w-full h-4 bg-gray-300 rounded-full">
                    <div
                      className={`absolute top-0 h-4 bg-[#294D61] rounded-full`}
                      style={{ width: `${ticket.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-right text-gray-700">{ticket.progress}%</div>
                </td>
                <td className="p-4 text-gray-700">{ticket.date}</td>
                <td className="p-4">
                  <button className="px-4 py-2 text-white bg-[#294D61] rounded">{ticket.priority}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SLA;

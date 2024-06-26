import React from 'react';

const BestPerformingLeads = ({ leads }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Top 10 Best Performing Leads</h2>
      <ul>
        {leads.map((lead, index) => (
          <li key={index} className="flex justify-between">
            <span>{lead.name}</span>
            <span>${lead.revenue.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestPerformingLeads;

import React from 'react';

const LeadOwners = ({ leadOwners }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Top 5 Lead Owners</h2>
      <ul>
        {leadOwners.map((owner, index) => (
          <li key={index} className="flex justify-between">
            <span>{owner.name}</span>
            <span>{owner.leads}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadOwners;

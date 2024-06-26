import React from 'react';

const LeastPerformingRegions = ({ regions }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Least Performing Region Wise</h2>
      <ul>
        {regions.map((region, index) => (
          <li key={index} className="flex justify-between">
            <span>{region.name}</span>
            <span>${region.revenue.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeastPerformingRegions;

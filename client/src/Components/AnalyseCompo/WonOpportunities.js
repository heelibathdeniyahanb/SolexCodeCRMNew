import React from 'react';

const WonOpportunities = ({ won }) => {
  return (
    <div className="p-4 bg-teal-700 text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Won Opportunities</h2>
      <p>Won: {won.count}</p>
      <p>Revenue in won opportunities: ${won.revenue}</p>
    </div>
  );
};

export default WonOpportunities;

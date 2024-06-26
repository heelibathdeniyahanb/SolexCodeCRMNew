import React from 'react';

const ClosedOpportunities = ({ closed }) => {
  return (
    <div className="p-4 bg-teal-700 text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Closed Opportunities</h2>
      <p>Unqualified: {closed.unqualified}</p>
      <p>Lost: {closed.lost}</p>
      <p>Potential revenue in closed opportunities: ${closed.revenue}</p>
    </div>
  );
};

export default ClosedOpportunities;

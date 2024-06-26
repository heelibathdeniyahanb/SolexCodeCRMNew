import React from 'react';

const OpportunitiesSummary = ({ summary }) => {
  return (
    <div className="p-4 bg-teal-700 text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Opportunities Summary</h2>
      <p>Total Opportunities: {summary.totalOpportunities}</p>
      <p>New opportunities create this month: {summary.newOpportunities}</p>
    </div>
  );
};

export default OpportunitiesSummary;

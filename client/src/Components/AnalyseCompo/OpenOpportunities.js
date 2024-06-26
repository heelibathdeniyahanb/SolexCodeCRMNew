import React from 'react';

const OpenOpportunities = ({ open }) => {
  return (
    <div className="p-4 bg-teal-700 text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Open Opportunities</h2>
      <p>Qualified: {open.qualified}</p>
      <p>Follow-up: {open.followUp}</p>
      <p>Negotiation: {open.negotiation}</p>
      <p>Demo: {open.demo}</p>
      <p>Potential revenue in open opportunities: ${open.revenue}</p>
    </div>
  );
};

export default OpenOpportunities;

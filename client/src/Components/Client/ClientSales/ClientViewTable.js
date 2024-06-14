import React from 'react';

const ClientViewTable = () => {
  const stages = [
    { stage: 'Planning', date: '08/20/2021', price: 250.00 },
    { stage: 'Qualification', date: '12/05/2021', price: 300.00 },
    { stage: 'Proposal', date: '01/10/2022', price: 500.00 },
    { stage: 'Negotiation', date: '03/20/2022', price: 100.00 },
  ];

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="bg-gray-200 px-4 py-5 rounded-t-md right-2">
        <div className="grid grid-cols-3 text-gray-700 font-semibold">
          <div>Stage</div>
          <div>Date</div>
          <div>Price</div>
        </div>
      </div>
      {stages.map((stage, index) => (
        <div
          key={index}
          className={`px-4 py-5 grid grid-cols-3 ${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <div>{stage.stage}</div>
          <div>{stage.date}</div>
          <div>${stage.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientViewTable;
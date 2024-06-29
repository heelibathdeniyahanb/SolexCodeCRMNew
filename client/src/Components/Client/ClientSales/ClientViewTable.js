import React from 'react';

const ClientViewTable = () => {
  const stages = [
    { stage: 'Qualification', date: '08/20/2021', doneTask: 'Planning task' },
    { stage: 'Planning', date: '12/05/2021', doneTask: 'proposal review'},
    { stage: 'Proposal', date: '01/10/2022',  doneTask:'get requirements'},
    { stage: 'Negotiation', date: '03/20/2022', doneTask: 'Final Project'},
  ];

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="bg-gray-200 px-4 py-5 rounded-t-md right-2">
        <div className="grid grid-cols-3 text-gray-700 font-semibold">
          <div>Pipeline Stage</div>
          <div>Date</div>
          <div>Done Tasks</div>
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
          <div>{stage.doneTask}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientViewTable;
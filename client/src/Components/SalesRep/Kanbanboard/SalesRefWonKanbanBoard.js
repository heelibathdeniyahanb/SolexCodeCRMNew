import React, { useEffect, useState } from 'react';
import ColumnContainer from '../../AdminCompo/KanbanBoard/ColumnContainer';

const SalesRefWonKanbanBoard = () => {
  const [wonLeads, setWonLeads] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7143/api/Lead/won/salesrep/2')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched won leads:', data);
        setWonLeads(data); 
      })
      .catch(error => console.error('Error fetching won leads:', error));
  }, []);

  const defaultCols = [
    {
      id: "Planning",
      title: "Planning",
    },
    {
      id: "Qualification",
      title: "Qualification",
    },
    {
      id: "Proposal",
      title: "Proposal",
    },
    {
      id: "Negotiation",
      title: "Negotiation",
    },
    {
      id: "Close-won",
      title: "Close-won",
    },
  ];

  return (
    <div className="-m-3 flex m-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] -mt-2">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {defaultCols.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              tasks={wonLeads.filter((lead) => lead.salesPipeline === col.id)} 
              isReadOnly={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesRefWonKanbanBoard;

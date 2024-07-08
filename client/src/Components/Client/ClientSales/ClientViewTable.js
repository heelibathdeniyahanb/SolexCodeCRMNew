// ClientViewTable component
import React from 'react';

const ClientViewTable = ({ selectedCard }) => {
    const stages = [
        { stage: 'Planning', date: selectedCard.startDate },  
        { stage: 'Qualification', date: selectedCard.qualificationDate || "N/A" },  
        { stage: 'Proposal', date: selectedCard.proposalDate || "N/A" },  
        { stage: 'Negotiation', date: selectedCard.negotiationDate || "N/A" },
        { stage: 'Close-won', date: selectedCard.endDate } 
    ];

    const getStagesForPipeline = (pipeline) => {
        const progress = getProgress(pipeline);
        return stages.slice(0, progress + 1);
    };

    const getProgress = (pipeline) => {
        switch (pipeline) {
            case 'Planning':
                return 0;
            case 'Qualification':
                return 1;
            case 'Proposal':
                return 2;
            case 'Negotiation':
                return 3;
            case 'Close-won':
                return 4;
            default:
                return 0;
        }
    };

    return (
        <div className="bg-white shadow-md rounded-md">
            <div className="bg-gray-200 px-4 py-5 rounded-t-md">
                <div className="grid grid-cols-3 text-gray-700 font-semibold">
                    <div>Stage</div>
                    <div>Date</div>
                    <div>Task</div>
                </div>
            </div>
            {selectedCard && getStagesForPipeline(selectedCard.salesPipeline).map((stage, index) => (
                <div
                    key={index}
                    className={`px-4 py-5 grid grid-cols-3 ${
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                >
                    <div>{stage.stage}</div>
                    <div>{stage.date}</div>
                    <div></div>
                </div>
            ))}
        </div>
    );
};

export default ClientViewTable;

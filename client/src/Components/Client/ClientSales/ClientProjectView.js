import React, { useState, useEffect } from 'react';
import { MdFilterListAlt } from 'react-icons/md';
import ClientViewCard from './ClientViewCard';
import StepLine from './StepLine';
import ClientViewTable from './ClientViewTable';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../login/UserContext';

const ClientProjectView = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [leads, setLeads] = useState([]);

    const steps = ['Planning', 'Qualification', 'Proposal', 'Negotiation', 'Close - won'];


    const { userData } = useUser(); // Assumed to provide user context including id

    useEffect(() => {
      if (userData && userData.id) {
        fetchLeads(userData.id); // Fetch leads when userData is available
      }
    }, [userData]);
    
    const fetchLeads = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7143/api/Lead/user/${id}`);
            console.log('Incoming data from backend:', response.data);
            setLeads(response.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    const handleCardClick = (lead) => {
        setSelectedCard(lead);
        setCurrentStep(getProgress(lead.salesPipeline));
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
        <div className="ml-3 flex flex-col h-screen">
            {/* First Row */}
            <div className="flex items-center justify-center bg-gray-100 h-16 border-t-2">
                <div className="w-full max-w-screen-xl text-left px-4 flex items-center">
                    <div className="ml-2 flex">
                        <span>All My Projects</span>
                        <div className="ml-36">
                            <MdFilterListAlt />
                        </div>
                    </div>
                    <button className="w-24 h-7 bg-teal-700 font-bold text-white m-2 rounded-lg text-cyan-200 absolute right-6">
                        <Link to="/clientForm">+Lead Form</Link>
                    </button>
                </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-row flex-grow border border-gray-300">
                {/* First Column */}
                <div className="bg-gray-200 flex-grow-0 flex-shrink-0 w-1/4 border-r border-gray-100 overflow-y-auto">
                    <ClientViewCard onClick={handleCardClick} />
                </div>

                {/* Second Column */}
                <div className="bg-gray-100 flex-grow border border-gray-200 p-8">
                    {selectedCard && (
                        <>
                            <StepLine steps={steps} currentStep={currentStep} />
                            <div className="mt-12">
                                <ClientViewTable selectedCard={selectedCard} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientProjectView;

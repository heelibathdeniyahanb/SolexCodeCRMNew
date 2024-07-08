import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '../../login/UserContext';

const ClientViewCard = ({ onClick }) => {
    const [leads, setLeads] = useState([]);

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

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
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

    const handleDeleteLead = async (leadId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this lead?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://localhost:7143/api/lead/${leadId}`);
                fetchLeads();
            } catch (error) {
                console.error('Error deleting lead:', error);
            }
        }
    };

    const handleClick = (lead) => {
        onClick(lead);
    };

    return (
        <div className="overflow-y-auto max-h-screen">
            {leads.map((lead) => (
                <div
                    key={lead.id}
                    onClick={() => handleClick(lead)}
                    className={`card text-black mb-3 border-2 ml-3 mt-4 bg-gray-400 rounded-md cursor-pointer`}
                    style={{ maxWidth: '18rem', cursor: 'pointer' }}
                >
                    <div className="card-header text-start ml-2 mt-1 font-bold flex justify-between">
                        <span>{lead.leadName}</span>
                        <FaTrash className="text-red-700 hover:text-red-500 m-2" onClick={() => handleDeleteLead(lead.id)} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-teal-900 font-bold text-start ml-2">{lead.companyName}</h5>
                        <div className="float-left ml-2 mt-1">
                            <Avatar src={lead.avatar} size="32" round={true} />
                        </div>
                        <p className="card-text">
                            <span className="ml-1 text-sm text-gray-800 font-bold text-justify">
                                {formatDate(new Date(lead.startDate))} - {formatDate(new Date(lead.endDate))}
                            </span>
                        </p>
                        <div className="w-3/4 bg-gray-300 rounded-full h-1.5 ml-2 mt-5">
                            <div
                                className="bg-teal-900 font-bold rounded-full h-1.5"
                                style={{ width: `${(getProgress(lead.salesPipeline) + 1) * 20}%` }}
                            >
                                <span className="text-gray-700 font-bold text-xs text-start">
                                    {(getProgress(lead.salesPipeline) + 1) * 20}%
                                </span>
                            </div>
                        </div>
                        <p className="card-text text-gray-700 font-bold ml-40 mt-4">
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ClientViewCard;

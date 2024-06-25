import React, { useState, useEffect } from 'react';
import { GrProjects } from "react-icons/gr";
import axios from 'axios';
import { useUser } from '../../login/UserContext';

export default function SalesRepCard2() {
  const [leadCount, setLeadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useUser(); // Assumed to provide user context including id

  useEffect(() => {
    if (userData && userData.id) {
      fetchLeads(userData.id); // Fetch leads when userData is available
    }
  }, [userData]);

  const fetchLeads = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://localhost:7143/api/Lead/manager/${id}`);
      setLeadCount(response.data.length); // Set the lead count to the length of the fetched data
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('Failed to fetch leads.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div>
        <GrProjects className='text-white text-4xl' />
      </div>
      <h5 className="mb-2 text-2xl ml-8 font-bold tracking-tight text-gray-900 dark:text-white">
        Leads
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-center text-3xl">
        {leadCount} {/* Display the lead count dynamically */}
      </p>
    </div>
  );
}

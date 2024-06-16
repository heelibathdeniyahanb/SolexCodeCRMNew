import React,{useState,useEffect} from 'react';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';

export default function AdminDashboardCard() {
 
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    fetchUsers(); // Fetch tasks on component mount
  }, []);

  const fetchUsers = () => {
    axios.get('https://localhost:7143/api/user/Get')
      .then(response => {
        // Filter users to only include those with the role of "client"
        const clients = response.data.filter(user => user.role === 'Client');
        setClientCount(clients.length);
      
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  return (
    <div className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div>
        <FaUsers className='text-white text-4xl' />
      </div>
      <h5 className="mb-2 text-2xl ml-8 font-bold tracking-tight text-gray-900 dark:text-white">
        Clients
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-center text-3xl">
        {clientCount}
      </p>
    </div>
  );
}

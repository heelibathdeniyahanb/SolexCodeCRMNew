import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function LeadClient() {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetchUsers(); // Fetch tasks on component mount
  }, []);

  const fetchUsers = () => {
    axios.get('https://localhost:7143/api/user/Get')
      .then(response => {
        // Filter users to only include those with the role of "client"
        const clients = response.data.filter(user => user.role === 'Client');
         // Sort clients by a relevant property (assuming 'registrationDate' here)
         clients.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
         // Take the latest 10 clients
         const latestClients = clients.slice(0, 10);
         setUsers(latestClients);
        
        setUsers(clients);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  return (
 
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
       
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Clients</h5>
       
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map(user => (
            <li key={user.id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">{user.fullName.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 ms-4">
                 
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                  <div className='flex'>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p> &nbsp;&nbsp;&nbsp;
                  <div className="flex flex-col items-center justify-center text-base font-semibold text-gray-900 ">
                <span className='text-sm font-medium text-gray-500 dark:text-white'>{user.industry}</span>
                
              </div>
                
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.companyName}</p>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

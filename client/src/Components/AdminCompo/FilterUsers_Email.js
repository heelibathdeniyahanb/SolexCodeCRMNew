import React, { useState } from 'react';
import axios from 'axios';

const FilterUsers = ({ setRecipients }) => {
  const [industry, setIndustry] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const industryOptions = [
    { value: '', label: 'Select a field' },
    { value: 'Information Technology(IT)', label: 'Information Technology(IT)' },
    { value: 'Education', label: 'Education' },
    { value: 'Textile', label: 'Textile' },
    // Add more options as needed
  ];

  const roleOptions = [
    { value: '', label: 'Select a role' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Client', label: 'Client' },
    { value: 'LeadManager', label: 'Sales Leader' },
    { value: 'CustomerSupporter', label: 'Customer Supporter' },
    // Add more options as needed
  ];

  const handleFilterUsers = async () => {
    setLoading(true);
    try {
      const queryParams = [];
      if (industry) queryParams.push(`industry=${encodeURIComponent(industry)}`);
      if (role) queryParams.push(`role=${encodeURIComponent(role)}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  
      const response = await axios.get(`https://localhost:7143/api/user/FilterUsers/filter${queryString}`);
      const fetchedUsers = response.data;
      setUsers(fetchedUsers);
      setRecipients(fetchedUsers.map(user => user.email));
    } catch (error) {
      console.error(error);
      alert('Failed to fetch users');
    }
    setLoading(false);
  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Select Recipients</h1>
      <select
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
      >
        {industryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
      >
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleFilterUsers}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        {loading ? 'Loading...' : 'Filter Users'}
      </button>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterUsers;

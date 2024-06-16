import React, { useState } from 'react';
import axios from 'axios';

const FilterUsers = ({ setRecipients }) => {
  const [field, setField] = useState('');
  const [roll, setRoll] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fieldOptions = [
    { value: '', label: 'Select a field' },
    { value: 'IT', label: 'IT' },
    { value: 'Education', label: 'Education' },
    { value: 'Textile', label: 'Textile' },
    // Add more options as needed
  ];

  const rollOptions = [
    { value: '', label: 'Select a roll' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Client', label: 'Client' },
    { value: 'Sales Leader', label: 'Sales Leader' },
    { value: 'Customer Supporter', label: 'Customer Supporter' },
    // Add more options as needed
  ];

  const handleFilterUsers = async () => {
    setLoading(true);
    try {
      const queryParams = [];
      if (field) queryParams.push(`field=${field}`);
      if (roll) queryParams.push(`roll=${roll}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

      const response = await axios.get(`https://localhost:7143/api/User/filter${queryString}`);
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
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
      >
        {fieldOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
      >
        {rollOptions.map((option) => (
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

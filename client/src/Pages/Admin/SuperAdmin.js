import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdmin = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/adduserpage'); 
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <header className="bg-white shadow-lg p-6 rounded-lg mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-300"
        >
          Logout
        </button>
      </header>
      <main>
        <div className="text-white text-xl">Welcome to the Super Admin Dashboard!</div>
        <button
          onClick={handleAddUser}
          className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-500 transition duration-300"
        >
          Add User
        </button>
      </main>
    </div>
  );
};

export default SuperAdmin;

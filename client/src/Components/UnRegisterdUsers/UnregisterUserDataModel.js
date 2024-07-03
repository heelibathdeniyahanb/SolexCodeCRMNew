import React from 'react';

const UnregisterUserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile No:</strong> {user.mobileNo}</p>
        <p><strong>Company Name:</strong> {user.companyName}</p>
        <p><strong>Continent:</strong> {user.continent}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>Industry:</strong> {user.industry}</p>
        <button 
          className="mt-4 bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UnregisterUserDetailModal;

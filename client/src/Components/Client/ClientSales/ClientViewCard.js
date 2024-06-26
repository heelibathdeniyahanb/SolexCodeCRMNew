// ProjectCard.jsx
import React from 'react';
import Avatar from 'react-avatar';

const ClientViewCard = ({ title, progress, startDate, endDate, amount, avatar }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="card text-black bg-primary mb-3 border-2 border-gray-400 ml-3 mt-3 shadow-xl rounded-md" style={{ maxWidth: '18rem' }}>
      <div className="card-header text-start ml-2">{title}</div>
      <div className="card-body">
        <h5 className="card-title text-cyan-600 text-start ml-2">Lost Cabin Ltd.</h5>
        <div className='float-left ml-2 mt-1'>
          <Avatar src={avatar} size="32" round={true} />
        </div>
        <p className="card-text">
          <span className="ml-1 text-sm text-gray-500 text-justify">
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </p>
        <div className="w-3/4 bg-gray-300 rounded-full h-1.5 ml-2 mt-5">
          <div className="bg-cyan-800 rounded-full h-1.5" style={{ width: `${progress}%` }}>
            <span className="text-gray-500 text-xs text-start">{progress}%</span>
          </div>
        </div>
        <p className="card-text text-gray-500 ml-40 mt-4">
          ${amount}
        </p>
      </div>
    </div>
  );
};

export default ClientViewCard;
import React from 'react';
import PropTypes from 'prop-types';


const Card = ({ title, value, lastMonth }) => {
        return (
          <div className="bg-white shadow-md rounded px-8 py-6 m-4">
            <div className="font-bold text-gray-800 text-lg mb-2">{title}</div>
            <div className="text-4xl font-bold text-teal-500">{value}</div>
            <div className="text-gray-600 text-sm">{`Last month: ${lastMonth}`}</div>
          </div>
        );
      };
      
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <Card title="Current Clients" value="100" lastMonth="2000" />
          <Card title="Current Leads" value="100" lastMonth="2000" />
          <Card title="Revenue Generated" value="100" lastMonth="2000" />
          <Card title="Leads On Progress" value="100" lastMonth="2000" />
          <Card title="New Clients" value="100" lastMonth="2000" />
          <Card title="Current Tickets" value="100" lastMonth="2000" />
        </div>
      </div>;

RectangularCard.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default RectangularCard;
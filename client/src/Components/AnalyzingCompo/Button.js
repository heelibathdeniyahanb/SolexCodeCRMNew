import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const Button = ({ label, to }) => {
  return (
    <Link to={to}>
      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {label}
      </button>
    </Link>
  );
};

const Analyzing = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Analyzing</h1>
      <div className="flex mb-4">
        <div className="mr-4">
          <Link to="/analyse/reports"><Button label="Reports" /></Link>
        </div>
        <div className="mr-4">
          <Link to="/analyse/charts"><Button label="Charts" /></Link>
        </div>
        <div className="mr-4">
          <Link to="/analyse/kpi"><Button label="KPI" /></Link>
        </div>
        <div>
          <Link to="/analyse/comparator"><Button label="Comparator" /></Link>
        </div>
      </div>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;

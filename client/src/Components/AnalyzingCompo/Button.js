import React from 'react';
import PropTypes from 'prop-types';

const HeaderButton = ({ text, onClick }) => {
  return (
    <button 
      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" style={{ marginRight: '10px', borderRadius: '10px' }}>"
      onClick={onClick}
      {text}
    </button>
  );
};

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default HeaderButton;

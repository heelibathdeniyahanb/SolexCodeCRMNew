import React from 'react';
//import {Link} from 'react-router-dom';

const Button = ({ text }) => {
    return (
        <button style={{ backgroundColor: '#294D61' }} className="bg-blue-500 text-white py-2 px-4 rounded mx-2 my-1">
            {text}
        </button>
    );
};

export default Button;

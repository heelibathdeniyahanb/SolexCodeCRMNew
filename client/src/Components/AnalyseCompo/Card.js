import React from 'react';


const Card = ({ title, value, lastMonth }) => {
    return (
        <div className="border rounded p-4 m-2 text-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-3xl my-2">{value}</p>
            <p>Last month: {lastMonth}</p>
        </div>
    );
};

export default Card;

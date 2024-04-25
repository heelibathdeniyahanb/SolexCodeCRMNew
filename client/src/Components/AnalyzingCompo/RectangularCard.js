import React from 'react';
import PropTypes from 'prop-types';

const RectangularCard = ({ title, subtitle, content}) => {
    return (
        <div className="block w-15% p-8 bg-white rounded-lg shadow border border-[#0C7075]">
            <h2 className="mb-2 text-2xl">{title}</h2>
            <p className="text-9xl text-center text-[#0C7075] mb-8">{subtitle}</p>
            <p className="text-2xl text-center text-gray-700 dark:text-gray-400">{content}</p>
        </div>

    );
};

RectangularCard.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default RectangularCard;
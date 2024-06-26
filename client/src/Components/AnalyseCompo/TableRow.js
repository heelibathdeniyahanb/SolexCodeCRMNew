import React from 'react';

const TableRow = ({ leadName, description, lastRunDate }) => {
    return (
        <tr className="border-b">
            
            <td className="p-4">{leadName}</td>
            <td className="p-4">{description}</td>
            <td className="p-4">{lastRunDate}</td>
        </tr>
    );
};

export default TableRow;

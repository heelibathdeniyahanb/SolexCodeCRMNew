import React, { useState, useEffect } from 'react';
import SalesInvoiceCard from './SalesInvoiceCard';
import SalesInvoice from './SalesInvoice';


const ParentComponent = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleInvoiceClick = (invoice) => {
        setSelectedInvoice(invoice);
    };

    return (
        <div className="flex">
            <SalesInvoiceCard onInvoiceClick={handleInvoiceClick} />
            <SalesInvoice selectedInvoice={selectedInvoice} />
        </div>
    );
};

export default ParentComponent;

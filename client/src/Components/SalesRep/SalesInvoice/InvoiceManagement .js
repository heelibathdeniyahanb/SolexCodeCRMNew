import React, { useState } from 'react';
import SalesInvoiceCard from './SalesInvoiceCard';
import SalesInvoiceForm from './SalesInvoiceForm';

const InvoiceManagement = () => {
    const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);

    const handleInvoiceClick = (invoiceId) => {
        const invoiceData = getInvoiceDataById(invoiceId);
        setSelectedInvoiceData(invoiceData);
    };

    const getInvoiceDataById = (invoiceId) => {
        
        return {
            id: invoiceId,
            clientName: 'John Doe',
            clientEmail: 'john.doe@example.com',
            clientCompany: 'ABC Company',
            pipeline: 'Proposal',
            description: 'Services rendered',
            price: 1000,
            quantity: 1,
            discount: 0,
        };
    };

    return (
        <div className="flex">
            <div className="w-1/2">
                <SalesInvoiceCard onInvoiceClick={handleInvoiceClick} />
            </div>
            <div className="w-1/2">
                <SalesInvoiceForm invoiceData={selectedInvoiceData} />
            </div>
        </div>
    );
};

export default InvoiceManagement;

import React, { useState, useEffect } from 'react';
import { MdFilterListAlt } from "react-icons/md";
import axios from 'axios';
import SalesInvoiceCard from './SalesInvoiceCard';
import SalesInvoice from './SalesInvoice';

const SalesCreateInvoice = ({ onInvoiceClick, selectedInvoice }) => {
    const [invoiceData, setInvoiceData] = useState([]);

    const fetchInvoiceData = async () => {
        try {
            const response = await axios.get('https://localhost:7143/api/Invoice');
            setInvoiceData(response.data);
        } catch (error) {
            console.error('Error fetching invoice data', error);
        }
    };

    const handleNewInvoiceSubmit = (newInvoiceData) => {
        setInvoiceData((prevData) => [...prevData, newInvoiceData]);
        fetchInvoiceData();
    };

    useEffect(() => {
        fetchInvoiceData();
    }, []);

    const selectedInvoiceData = invoiceData.find(invoice => invoice.id === selectedInvoice);

    return (
        <div className="ml-3 flex flex-col h-screen">
            {/* First Row */}
            <div className="flex items-center justify-center bg-gray-100 h-16 border-t-2">
                <div className="w-full max-w-screen-xl text-left px-4 py-4 flex items-center">
                    <div className='ml-2 flex '>
                        <span>All My Projects</span>
                        <div className='ml-36'>
                            <MdFilterListAlt />
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-row flex-grow border border-gray-300">
                {/* First Column */}
                <div className="bg-gray-200 flex-grow-0 flex-shrink-0 w-1/4 border-r border-gray-100">
                    <div>
                        <SalesInvoiceCard invoiceData={invoiceData} onInvoiceClick={onInvoiceClick} />
                    </div>
                </div>

                {/* Second Column */}
                <div className="bg-gray-100 flex-grow border border-gray-200 p-8">
                    <SalesInvoice invoiceData={selectedInvoiceData} fetchInvoiceData={fetchInvoiceData} onNewInvoiceSubmit={handleNewInvoiceSubmit} />
                </div>
            </div>
        </div>
    );
};

export default SalesCreateInvoice;

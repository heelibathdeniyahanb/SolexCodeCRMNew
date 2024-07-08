import React, { useState } from 'react';
import SalesCreateInvoice from '../../Components/SalesRep/SalesInvoice/SalesCreateInvoice';
import SalesRefHeader from '../../Components/Header/SalesRepHeader2';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';

const SalesInvoiceView = () => {

    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleInvoiceClick = (invoiceId) => {
        setSelectedInvoice(invoiceId);
    };

    return (
        <div className='relative'>

            {/* <SalesRefHeader /> */}


            <div className='absolute top-0 z-20 bg-fixed h-screen'>
                <SalesRepNavBar />
            </div>
            <div className='ml-72 h-screen fixed right-0 left-0'>
                <SalesCreateInvoice onInvoiceClick={handleInvoiceClick} selectedInvoice={selectedInvoice} />
            </div>


        </div>
    );
};

export default SalesInvoiceView;
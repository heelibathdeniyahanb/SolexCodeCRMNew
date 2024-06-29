import React from 'react';
import Header from '../../Components/Header/Header';
import Sidebar from './AdminSideNavBar';
import CreateInvoice from '../../Components/AdminCompo/AdminInvoice/AdminCreateInvoice';

const SalesRefInvoice = () => {
    return (
        <div className='relative'>

            <Header />


            <div className='absolute top-0 z-20 bg-fixed h-screen'>
                <Sidebar />
            </div>
            <div className='ml-72 h-screen fixed right-0 left-0'>
                < CreateInvoice />
            </div>


        </div>
    );
};

export default SalesRefInvoice;
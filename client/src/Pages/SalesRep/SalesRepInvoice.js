import React from 'react';
import Sidebar from '../Admin/AdminSideNavBar';
import Header from '../../Components/Header/Header';

const SalesRepInvoice = () => {
    return (
        <div className='relative'>
           
            <Header/>
           
          
            <div className='absolute top-0 z-20 bg-fixed h-screen'>
                <Sidebar/>
            </div>

                 
        </div>
    );
};

export default SalesRepInvoice;
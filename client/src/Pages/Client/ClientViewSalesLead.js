import React from 'react';
import Header from '../../Components/Header/Header';
import ClientSidebar from '../../Components/Client/ClientSideNavBar';
import ClientProjectView from '../../Components/Client/ClientSales/ClientProjectView';

const ClientViewSalesLead = () => {
    return (
        <div>
            <div className='relative'>
                <Header/>
                <div className="flex flex-col">
                  <div className='absolute top-0 h-screen overflow-hidden'>
                    <ClientSidebar />                    
                  </div>
                  <div className='ml-72 h-screen fixed right-0 left-0'> 
                  <ClientProjectView />
                  </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ClientViewSalesLead;
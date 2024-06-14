import React from 'react';
import Header from '../../Components/Header/Header';
import ClientSidebar from '../../Components/Client/ClientSideNavBar';
import ClientForm from '../../Components/Client/ClientSales/ClientForm';



const ClientLeadForm = () => {
    return (
        <div className='relative'>
          
             
             <Header/>
             
           
             <div className='absolute top-0 z-20 h-screen'>
                 <ClientSidebar/>
             </div>
  
             <ClientForm/>
                  
        </div>
      );
  };

export default ClientLeadForm;
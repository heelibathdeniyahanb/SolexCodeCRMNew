import React from 'react';
import SideNav from '../../Components/Client/Ticket/TicketSideNav';
//import Ticketpage1 from '../../Components/Client/TicketPage';
import Header from '../../Components/Header/Header';
import ViewTicket from '../../Components/Client/Ticket/ViewTicket';
import CustomerSupporterNavBar from '../../Components/CustomerSupporter/CustomerSupporterNavBar';

const ViewTicketPage = () => {
  return (
    <div className='flex h-screen'>
     
      <div className='flex-shrink-0 h-full '>
        <CustomerSupporterNavBar/>
      </div>
      
     
      <div className='flex flex-col flex-1 border'>
        {/* Header */}
        <div><Header/></div>
        
        {/* Ticket Page */}
        <div className='flex-1 overflow-y-auto'>
            <ViewTicket />
        </div>
      </div>
    </div>
  );
};

export default ViewTicketPage;

import React from 'react';
import SideNav from '../../Components/Client/Ticket/TicketSideNav';
//import Ticketpage1 from '../../Components/Client/TicketPage';
import Header from '../../Components/Header/Header';
import TicketClient from '../../Components/Client/Ticket/TicketClient';

const TicketingSystem = () => {
  return (
    <div className='flex h-screen'>
     
      <div className='flex-shrink-0 h-full '>
         <SideNav/>
      </div>
      
     
      <div className='flex flex-col flex-1 border'>
        {/* Header */}
        <div><Header/></div>
        
        {/* Ticket Page */}
        <div className='flex-1 overflow-y-auto'>
            <TicketClient/>
        </div>
      </div>
    </div>
  );
};

export default TicketingSystem;

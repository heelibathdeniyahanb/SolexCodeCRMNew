import React from 'react';
import SideNav from '../../Components/Client/Ticket/TicketSideNav';
import Ticketpage1 from '../../Components/Client/Ticket/TicketPage';
import Header from '../../Components/Header/Header';

export default function QuickGuide() {
    return (
        <div className='flex h-screen'>
          {/* SideNav Container */}
          <div className='flex-shrink-0 h-full '>
            <SideNav />
          </div>
          
          {/* Main Content Container */}
          <div className='flex flex-col flex-1 '>
            {/* Header */}
            <div><Header/></div>
            
            {/* Ticket Page */}
            <div className='flex-1 overflow-y-auto'>
              <Ticketpage1/>
            </div>
          </div>
        </div>
      );
    };
import React from 'react';
import SideNav from '../../Components/Sidebar/SideNav';
import Header from '../../Components/Header/Header';
import EditTicket from '../../Components/Client/EditTicket';

export default function EditTicketPage() {
  return (
    <div>
      <div className='flex h-screen'>
        {/* SideNav Container */}
        <div className='flex-shrink-0 h-full'>
          <SideNav />
        </div>
        
        {/* Main Content Container */}
        <div className='flex flex-col flex-1'>
          {/* Header */}
          <div><Header /></div>
          
          {/* Ticket Page */}
          <div className='flex-1 overflow-y-auto'>
            <h1 className='text-4xl'>Edit Ticket</h1>
            <EditTicket />
          </div>
        </div>
      </div>
    </div>
  );
}

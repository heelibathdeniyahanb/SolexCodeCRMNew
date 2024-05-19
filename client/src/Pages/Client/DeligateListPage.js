import React from 'react';
import SideNav from '../../Components/Client/Ticket/TicketSideNav';
import Header from '../../Components/Header/Header';
import DeligateList from '../../Components/Client/Ticket/DeligateList';

export default function DeligateListPage() {
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
            <h1 className='text-4xl'>DeligateList</h1>
            <DeligateList />
          </div>
        </div>
      </div>
    </div>
  );
}

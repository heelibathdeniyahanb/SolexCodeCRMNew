import React from 'react'
import ClientSideNavBar from '../../Components/Client/ClientSideNavBar'

import Card1 from '../../Components/Client/ClientDashboardComponents/Card1'
import Card2 from '../../Components/Client/ClientDashboardComponents/Card2'
import Card3 from '../../Components/Client/ClientDashboardComponents/Card3'
import ClientDashboardOngoingLeads from '../../Components/Client/ClientDashboardComponents/ClientDashboardOngoingLeads'
import ClientScheduledEventsTasks from '../../Components/Client/ClientDashboardComponents/ClientSheduledEventsTasks'
import ClientHeader from '../../Components/Header/ClientHeader'

export default function ClientDashboard() {
  return (
    <div>
        <ClientHeader/>
        <div className='flex'>
        <ClientSideNavBar/>
        <div className="flex flex-col w-full md:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card1 />
            <Card2/>
            <Card3/>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            
            <ClientDashboardOngoingLeads />
            <ClientScheduledEventsTasks/>
          </div></div></div>
    </div>
  )
}

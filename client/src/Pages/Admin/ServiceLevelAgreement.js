import React from 'react'
import SideNav from '../../Components/Client/Ticket/TicketSideNav'
import Header from '../../Components/Header/Header'
import ServiceLevelAgreement from '../../Components/CustomerSupporter/ServiceLevelAgreements'

export default function ServicelevelAgreement() {
  return (
    <div>
        <div className='flex h-screen w'>
          {/* SideNav Container */}
          <div className='flex-shrink-0 h-full '>
            <SideNav/>
          </div>
          
          {/* Main Content Container */}
          <div className='flex flex-col flex-1 '>
            {/* Header */}
            <div><Header/></div>
            
            {/* ServiceLevelAgreement */}
            <div className='flex-1 overflow-y-auto'>
              
              <ServiceLevelAgreement/>
            </div>
          </div>
        </div>
    </div>
  )
}

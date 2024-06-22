import React from 'react'

import EventAdminSalesRepTable from '../../Components/Events/EventAdminSalesRepTable'
import CalendarLogin from '../../Components/CalendarLogin'
import EventSearchBar from '../../Components/Events/EventSearchBar'

export default function AdminEvent() {
  return (
    <div>
       <CalendarLogin/>
       <EventSearchBar/>
       <EventAdminSalesRepTable/>
       
    </div>
  )
}

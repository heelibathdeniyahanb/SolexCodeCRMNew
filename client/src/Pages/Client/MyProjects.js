import React from 'react'
import ClientHeader from '../../Components/Header/ClientHeader'
import ClientSideNavBar from '../../Components/Client/ClientSideNavBar'
import ClientProjects from '../../Components/Client/ClientProjects'
import ClientCalendarLogin from '../../Components/Client/ClientCalendarLogin'

export default function MyProjects() {
  return (
    <div className='flex h-screen w'>
        
          <div className='flex-shrink-0 h-full '>
            <ClientSideNavBar/>
          </div>
          
         
          <div className='flex flex-col flex-1 '>
         
            <div><ClientHeader/></div>
            <div><ClientCalendarLogin/></div>
            
        
            <div className='flex-1 overflow-y-auto'>
             
              <ClientProjects/>
            </div>

          </div>
        </div>

    
    
    
    
    
    

  )
}

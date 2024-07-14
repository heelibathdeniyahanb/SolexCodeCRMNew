import React,{useState} from 'react'
import ClientSideNavBar from '../../Components/Client/ClientSideNavBar'

import Card1 from '../../Components/Client/ClientDashboardComponents/Card1'
import Card2 from '../../Components/Client/ClientDashboardComponents/Card2'
import Card3 from '../../Components/Client/ClientDashboardComponents/Card3'
import ClientDashboardOngoingLeads from '../../Components/Client/ClientDashboardComponents/ClientDashboardOngoingLeads'
import ClientScheduledEventsTasks from '../../Components/Client/ClientDashboardComponents/ClientSheduledEventsTasks'
import ClientHeader from '../../Components/Header/ClientHeader'
import Chat from '../../Components/Chat/Chat'
import { useUser } from '../../Components/login/UserContext'
import { IoIosChatboxes } from "react-icons/io";
import { chatConnection, notificationConnection } from '../../Components/Chat/Connection';

export default function ClientDashboard() {

  const [showChat, setShowChat] = useState(false); 
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { userData } = useUser();

  // Function to toggle chat popup
  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setUnreadMessages(0); // Reset unread messages count when chat is opened
    }
  };

  const closeChat = () => {
    setShowChat(false);
  };
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

          <div className="fixed bottom-0 right-0 m-4">
        <IoIosChatboxes className="text-4xl text-blue-600 cursor-pointer" onClick={toggleChat} />
        {unreadMessages > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
            {unreadMessages}
          </span>
        )}
      </div>
      {/* Chat popup */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <Chat onClose={closeChat} />
          </div>
        </div>
      )}
    </div>
  )
}

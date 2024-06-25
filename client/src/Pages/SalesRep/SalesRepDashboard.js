import React, { useEffect, useState,useCallback } from 'react';
import Header from '../../Components/Header/Header';
 


import AdminDashboardCard2 from '../../Components/AdminCompo/AdminDashboardCard2';
import AdminDashboardCard3 from '../../Components/AdminCompo/AdminDashboardCard3';
import AdminDashboardLatestClients from '../../Components/AdminCompo/AdminDashboardLatestClients';
import AdminDashboardOngoingLeads from '../../Components/AdminCompo/AdninDashboardOngoingLeads';
import AdminDashboardSheduledEventsTasks from '../../Components/AdminCompo/AdminDashboardSheduledEventsTasks';
import AdminDashboardRevenue from '../../Components/AdminCompo/AdminDashboardRevenue';
import { IoIosChatboxes } from "react-icons/io";
import { chatConnection, notificationConnection } from '../../Components/Chat/Connection';
import axios from 'axios';
import Chat from '../../Components/Chat/Chat';
import { useUser } from '../../Components/login/UserContext';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';
import SalesRepCard1 from '../../Components/SalesRep/SalesRepDashboard/SalesRepCard1';
import SalesRepCard2 from '../../Components/SalesRep/SalesRepDashboard/SalesRepCard2';
import SalesRepOngoingLeads from '../../Components/SalesRep/SalesRepDashboard/SalesRepOngoingLeads';
import LeadClient from '../../Components/SalesRep/SalesRepDashboard/LeadClient';
import SalesRepScheduledEventsTasks from '../../Components/SalesRep/SalesRepDashboard/SalesRepSheduledEvents';


export default function SalesRepDashboard() {

  const [showChat, setShowChat] = useState(false); 
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { userData } = useUser();

  const incrementUnreadMessages = useCallback(() => {
    setUnreadMessages(prevCount => prevCount + 1);
  }, []);

  useEffect(() => {
    
    setupSignalRListeners();
  }, []);

  const setupSignalRListeners = () => {
    chatConnection.on("ReceiveChatMessage", (user, message) => {
      console.log("Chat message received from:", user, "Message:", message);
      // Increment the unread messages count when a new message is received
      incrementUnreadMessages();
    });
    notificationConnection.on("ReceiveNotification", (message) => {
      console.log("Notification received:", message);
      // Handle any notification-specific logic here
    });
  };

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
       {userData && <h1>{userData.fullName},{userData.email}</h1>}
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="sticky top-0 h-screen">
         <SalesRepNavBar/>
        </div>
        <div className="flex flex-col w-full md:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <SalesRepCard1/>
           <SalesRepCard2/>
           
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            <LeadClient/>
            <SalesRepOngoingLeads/>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
           <SalesRepScheduledEventsTasks/>
            
          </div>
        </div>
      </div>
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
  );
}
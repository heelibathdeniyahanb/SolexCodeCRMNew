import React, { useState, useEffect } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from 'react-icons/bs';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useUser } from '../login/UserContext';
import axios from 'axios';
import Image from '../Image';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [hubConnection, setHubConnection] = useState(null);
   
    const [error, setError] = useState(null);
   

   
       

    useEffect(() => {
        // Create the SignalR connection when the component mounts
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7143/notificationHub")
            .withAutomaticReconnect()
            .build();

        setHubConnection(newConnection);

        // Start the connection
        newConnection.start()
            .then(() => console.log("Connected to SignalR"))
            .catch(err => console.log("Error connecting to SignalR: ", err));

        // Subscribe to ReceiveNotification event
        newConnection.on("ReceiveNotification", (message) => {
            setNotifications(prevNotifications => [...prevNotifications, message]);
            setUnreadNotificationCount(prevCount => prevCount + 1);
        });

        return () => {
            // Clean up the connection on component unmount
            if (newConnection) {
                newConnection.off("ReceiveNotification");
                newConnection.stop();
            }
        };
    }, []);

    const toggleNotificationDropdown = () => {
        setShowNotificationDropdown(!showNotificationDropdown);
        if (showNotificationDropdown) {
            // Mark all notifications as read when the dropdown is closed
            setUnreadNotificationCount(0);
            // You may want to add logic here to clear notifications array
        }
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    return (
        <header className='bg-gray-100 h-16 flex justify-end items-center px-6 drop-shadow-lg'>
            {error && <div>Error loading image: {error}</div>}
            <div className='header-left flex gap-4'>
                <button className='text-gray-600 relative' onClick={toggleNotificationDropdown}>
                    <BsFillBellFill />
                    {unreadNotificationCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadNotificationCount}</span>}
                </button>
                <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer"> {/* Open Gmail inbox in a new tab */}
                    <button className='text-gray-600'>
                        <BsFillEnvelopeFill />
                    </button>
                </a>
                <div className="relative">
                    <button className='text-gray-600' onClick={toggleProfileDropdown}>
                      <BsPersonCircle/>
                    </button>
                    {showProfileDropdown && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                            <li className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <Link to='/my-profile'>My Profile</Link>
                                
                            </li>
                            <li className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <a href="/">Log Out</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            {showNotificationDropdown && (
                <div className="absolute top-16 right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                {notification}
                            </li>
                        ))}
                        {notifications.length === 0 && <li className="block px-4 py-2 text-gray-700">No notifications</li>}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;

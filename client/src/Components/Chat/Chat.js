import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../login/UserContext';

const Chat = ({ onClose }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const { userData } = useUser();

    useEffect(() => {
        if (userData && selectedUser) {
            fetchMessages();
        }
    }, [userData, selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            const interval = setInterval(() => {
                fetchMessages();
            }, 5000); // Refresh messages every 5 seconds

            return () => clearInterval(interval); // Clear interval on component unmount
        }
    }, [selectedUser]);

    const fetchUsersFromBackend = async () => {
        try {
            const response = await fetch('https://localhost:7143/api/user/Get');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid response format');
            }
            const filteredUsers = data.filter(user => user.id !== userData.id);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
        }
    };

    const fetchMessages = async () => {
        try {
            if (!selectedUser || !userData) return;

            const senderId = userData.id;
            const receiverId = selectedUser.id;

            const response = await fetch(`https://localhost:7143/api/Chat/messages?senderId=${senderId}&receiverId=${receiverId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();

            if (!data) {
                setMessages([]);
                return;
            }

            if (!Array.isArray(data)) {
                throw new Error('Invalid response format');
            }

            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to fetch messages');
        }
    };

    const sendMessage = async () => {
        if (!selectedUser || !message.trim()) {
            return;
        }

        try {
            const url = `https://localhost:7143/api/Chat/send`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: userData.id,
                    receiverId: selectedUser.id,
                    content: message,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const newMessage = {
                senderId: userData.id,
                receiverId: selectedUser.id,
                content: message,
                timestamp: new Date().toISOString(),
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
            toast.success('Message sent successfully');

            setMessage("");
        } catch (error) {
            console.error(`Error sending message to user ${selectedUser.id}:`, error);
            setError('Failed to send message');
            toast.error('Failed to send message');
        }
    };

    const handleUserSelection = (event) => {
        const userId = event.target.value;
        const user = users.find(user => user.id.toString() === userId);
        setSelectedUser(user);
        setMessages([]);
        setError(null);
    };

    useEffect(() => {
        if (userData) {
            fetchUsersFromBackend();
        }
    }, [userData]);

    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-md shadow-lg w-96 h-3/4">
            <div className="flex flex-col h-full">
                <div className="w-full border-b border-gray-300 p-4">
                    <h2 className="text-xl font-bold">Select User</h2>

                    <select
                        onChange={handleUserSelection}
                        className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select a user...</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-3/4 p-2 rounded-lg ${msg.senderId === userData.id ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}
                        >
                            <p>{msg.content}</p>
                            <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                        </div>
                    ))}
                </div>
                {selectedUser && (
                    <div className="p-4 border-t border-gray-300">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2"
                        >
                            Send
                        </button>

                        <button onClick={onClose} className="absolute top-0 right-0 m-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none">
                            &times;
                        </button>
                    </div>
                )}
                {error && <div className="text-red-500">{error}</div>}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Chat;
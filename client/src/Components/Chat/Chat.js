import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../login/UserContext';

const Sidebar = ({ users, selectedUser, onSelectUser, onSearch, currentUserId }) => (
    <div className="w-1/3 border-r border-gray-300 p-4">
        <input
            type="text"
            placeholder="Search users..."
            className="border border-gray-300 rounded-md py-2 px-4 w-full mb-4 focus:outline-none focus:border-blue-500"
            onChange={(e) => onSearch(e.target.value)}
        />
        <h2 className="text-xl font-bold mb-4">Recent Chats</h2>
        {users.map(user => (
            <div
                key={user.id}
                className={`p-2 cursor-pointer flex items-center ${selectedUser && selectedUser.id === user.id ? 'bg-gray-200' : ''}`}
                onClick={() => onSelectUser(user)}
            >
                <div className="flex items-center w-full">
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <span className={user.hasNewMessages ? 'font-bold' : ''}>{user.fullName}</span>
                            {user.hasNewMessages && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 ml-2">New</span>
                            )}
                        </div>
                        {user.latestMessage && (
                            <div className={`text-sm text-gray-500 ${user.hasNewMessages ? 'font-bold' : ''}`}>
                                {user.latestMessage.content.substring(0, 20)}...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const ChatWindow = React.memo(({ messages, userData, selectedUser, message, setMessage, sendMessage }) => (
    <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
            <h2 className="text-xl font-bold">{selectedUser.fullName}</h2>
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
        </div>
    </div>
));

const Chat = ({ onClose }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const { userData } = useUser();

    const fetchUsersFromBackend = useCallback(async () => {
        try {
            const response = await fetch('https://localhost:7143/api/user/Get');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid response format');
            }
            const usersWithLastReadTimestamp = data.filter(user => user.id !== userData.id).map(user => ({
                ...user,
                lastReadTimestamp: new Date().toISOString(),
                hasNewMessages: false,
                latestMessage: null,
            }));
            
            return usersWithLastReadTimestamp;
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
            return [];
        }
    }, [userData.id]);

    const fetchLatestMessagesForUsers = useCallback(async (users) => {
        try {
            const updatedUsers = await Promise.all(users.map(async (user) => {
                try {
                    const response = await fetch(`https://localhost:7143/api/Chat/latestMessage?senderId=${userData.id}&receiverId=${user.id}`);
                    if (!response.ok) {
                        return user;
                    }
                    const latestMessage = await response.json();
                    const latestMessageTimestamp = latestMessage ? new Date(latestMessage.timestamp) : null;
                    const hasNewMessages = latestMessageTimestamp && latestMessageTimestamp > new Date(user.lastReadTimestamp);

                    return {
                        ...user,
                        hasNewMessages: hasNewMessages && latestMessage.senderId !== userData.id,
                        latestMessage: latestMessage
                    };
                } catch (error) {
                    console.error(`Error fetching latest message for user ${user.id}:`, error);
                    return user;
                }
            }));
            return updatedUsers;
        } catch (error) {
            console.error('Error fetching latest messages:', error);
            return users;
        }
    }, [userData.id]);

    const updateUsers = useCallback(async () => {
        const fetchedUsers = await fetchUsersFromBackend();
        const updatedUsers = await fetchLatestMessagesForUsers(fetchedUsers);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    }, [fetchUsersFromBackend, fetchLatestMessagesForUsers]);

    const checkForNewMessages = useCallback(async () => {
        const updatedUsers = await fetchLatestMessagesForUsers(users);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    }, [fetchLatestMessagesForUsers, users]);

    useEffect(() => {
        if (userData) {
            updateUsers();
        }
    }, [userData, updateUsers]);

    useEffect(() => {
        if (userData) {
            const interval = setInterval(() => {
                checkForNewMessages();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [userData, checkForNewMessages]);

    const fetchMessages = useCallback(async (userId) => {
        try {
            if (!userId || !userData) return;

            const senderId = userData.id;
            const receiverId = userId;

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

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, lastReadTimestamp: new Date().toISOString(), hasNewMessages: false } : user
                )
            );
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to fetch messages');
        }
    }, [userData]);

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

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === selectedUser.id
                        ? { ...user, latestMessage: newMessage, hasNewMessages: false }
                        : user
                )
            );

            setMessage("");
            toast.success('Message sent successfully');

        } catch (error) {
            console.error(`Error sending message to user ${selectedUser.id}:`, error);
            setError('Failed to send message');
            toast.error('Failed to send message');
        }
    };

    const handleUserSelection = useCallback((user) => {
        setSelectedUser(user);
        setMessages([]);
        setError(null);
        fetchMessages(user.id);

        setUsers(prevUsers =>
            prevUsers.map(u =>
                u.id === user.id ? { ...u, hasNewMessages: false } : u
            )
        );
    }, [fetchMessages]);

    const handleSearch = useCallback((query) => {
        const filtered = users.filter(user => user.fullName.toLowerCase().includes(query.toLowerCase()));
        setFilteredUsers(filtered);
    }, [users]);

    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-md shadow-lg w-2/3 h-3/4 flex">
            <Sidebar
                users={filteredUsers}
                selectedUser={selectedUser}
                onSelectUser={handleUserSelection}
                onSearch={handleSearch}
                currentUserId={userData.id}
            />
            {selectedUser && (
                <ChatWindow
                    messages={messages}
                    userData={userData}
                    selectedUser={selectedUser}
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            )}
            <button onClick={onClose} className="absolute top-0 right-0 m-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none">
                &times;
            </button>
            <ToastContainer />
        </div>
    );
};

export default Chat;
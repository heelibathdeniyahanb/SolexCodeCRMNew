import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnregisterUserDetailModal from '../UnRegisterdUsers/UnregisterUserDataModel';
import person from '../../Images/person.jpg';

export default function AdminDashboardNewUsers() {
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = () => {
axios.get('https://localhost:7143/api/UnRegisteredUsers')
.then(response => {
setUsers(response.data);
})
.catch(error => {
console.error('Error fetching users:', error);
toast.error('Failed to fetch users.');
});
};

const handleViewClick = (user) => {
setSelectedUser(user);
};

const handleCloseModal = () => {
setSelectedUser(null);
};

const registerUser = (user) => {
const formData = new FormData();
formData.append('FullName', user.fullName);
formData.append('Email', user.email);
formData.append('MobileNumber', user.mobileNo || '');
formData.append('CompanyName', user.companyName);
formData.append('Continent', user.continent || '');
formData.append('Country', user.country || '');
formData.append('Industry', user.industry);
formData.append('Role', 'Client');
formData.append('ChangePassword', false);

// Add the default image file to the form data
fetch(person)
.then(res => res.blob())
.then(blob => {
formData.append('UserImage', blob, 'person.jpg');

axios.post('https://localhost:7143/api/user/UserRegister', formData, {
headers: {
'Content-Type': 'multipart/form-data'
}
})
.then(response => {
if (response.status === 200 || response.status === 201) {
toast.success('User successfully registered!');
setUsers(users.filter(u => u.id !== user.id));
} else {
toast.error('Failed to register user.');
}
})
.catch(error => {
console.error('Error registering user:', error);
if (error.response) {
console.error('Response data:', error.response.data);
toast.error(`Error: ${error.response.data.title || 'An error occurred while registering user.'}`);
if (error.response.data.errors) {
Object.entries(error.response.data.errors).forEach(([field, messages]) => {
messages.forEach(message => toast.error(`${field}: ${message}`));
});
}
} else {
toast.error('An error occurred while registering user.');
}
});
});
};

return (
<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
<ToastContainer />
<div className="flex items-center justify-between mb-4">
<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">New Users</h5>
</div>
<div className="flow-root">
<ul className="divide-y divide-gray-200 dark:divide-gray-700">
{users.map(user => (
<li key={user.id} className="py-3 sm:py-4">
<div className="flex items-center">
<div className="flex-shrink-0">
<div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
<span className="text-gray-600 text-lg">{user.fullName.charAt(0)}</span>
</div>
</div>
<div className="flex-1 min-w-0 ms-4">
<p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
<p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
<div className="flex items-center mt-1">
<span className="text-sm font-medium text-gray-500 dark:text-white">{user.industry}</span>
</div>
<p className="text-sm text-gray-500 dark:text-gray-400">{user.companyName}</p>
</div>
<div className='flex flex-col items-center justify-center text-base text-gray-600'>
<span>
<button
className=""
onClick={() => handleViewClick(user)}
>
View
</button>
</span>
<span>
<button
className=""
onClick={() => registerUser(user)}
>
Register
</button>
</span>
</div>
</div>
</li>
))}
</ul>
</div>
{selectedUser && <UnregisterUserDetailModal user={selectedUser} onClose={handleCloseModal} />}
</div>
);
}
import React, { useState } from 'react';
import NavbarMenu from './navbar/NavbarMenu';
import { LuHelpCircle } from 'react-icons/lu';
import SideBar from './sidebar/SideBar';
import axios from 'axios';

const AddUsers = () => {
    const [forcePasswordChange, setForcePasswordChange] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        userImage:'',
        role: '',
    });
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        mobile: false,
        username: false,
        password: false,
        userImage:false,
        role: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addUser = async () => {
        try {
            const requestBody = {
                ...formData,
                ChangePassword: forcePasswordChange, // Include the forcePasswordChange value in the request
            };

            const response = await axios.post('https://localhost:7031/api/user/UserRegister', requestBody);
            if (response.status === 200) {
                alert('User added successfully.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    username: '',
                    password: '',
                    userImage:'',
                    role: '',
                });
            } else {
                alert('Failed to add user.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred while adding user.');
        }
    };

    const handleAddClick = () => {
        const errors = {
            firstName: !formData.firstName,
            lastName: !formData.lastName,
            email: !formData.email,
            mobile: !formData.mobile,
            username: !formData.username,
            password: !formData.password,
            userImage:!formData.userImage,
            role: !formData.role,
        };
        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            alert('Please fill in all required fields.');
            return;
        }

        addUser();
    };

    return (
        <div>
            <SideBar />
            <div className='w-full'>
                <NavbarMenu />
                <div className='flex justify-end mr-24 '>
                    <div className='mt-1 ml-96'>
                        <span className='text-xl'>
                            Enter the basic user details. The username will get auto-filled based on the Preferred Email
                            Format set. If you prefer any other username from the given suggestions, you can edit the
                            Username field.
                        </span>
                    </div>
                </div>
                <div className='flex justify-center mt-2'>
                    <div className='flex flex-col -mr-6'>
                        <div className='flex flex-row'>
                            <input
                                type='text'
                                className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                    formErrors.firstName ? 'border-red-500' : ''
                                }`}
                                placeholder='First Name *'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type='text'
                                className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                    formErrors.lastName ? 'border-red-500' : ''
                                }`}
                                placeholder='Last Name *'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-192 h-12 px-3 ${
                                formErrors.username ? 'border-red-500' : ''
                            }`}
                            placeholder='Username *'
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type='password'
                            className={`border border-black rounded mr-3 mt-5 w-192 h-12 px-3 ${
                                formErrors.password ? 'border-red-500' : ''
                            }`}
                            placeholder='Password *'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.email ? 'border-red-500' : ''
                            }`}
                            placeholder='Email *'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.mobile ? 'border-red-500' : ''
                            }`}
                            placeholder='Mobile Number *'
                            name='mobile'
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.userImage ? 'border-red-500' : ''
                            }`}
                            placeholder='User Image *'
                            name='userImage'
                            value={formData.userImage}
                            onChange={handleInputChange}
                        
                        />
                        <select
                            name='role'
                            value={formData.role}
                            onChange={handleInputChange}
                            className={`border border-black rounded mr-3 mt-5 w-192 h-12 px-3 ${
                                formErrors.role ? 'border-red-500' : ''
                            }`}
                            required
                        >
                            <option value=''>Select Role</option>
                            <option value='Admin'>Admin</option>
                            <option value='client'>client</option>
                            <option value='customer supporter'>customer supporter</option>
                            <option value='lead manager'>lead manager</option>
                        </select>

                        <div className='flex items-center mt-8'>
                            <input
                                type='checkbox'
                                className='form-checkbox h-5 w-5 text-teal-500'
                                onChange={(e) => setForcePasswordChange(e.target.checked)}
                                checked={forcePasswordChange} /* Ensure the checkbox state is controlled */
                            />
                            <span className='ml-2'>Force user to change password on first log in</span>
                            <div className='ml-3 text-teal-500 cursor-pointer'>
                                <LuHelpCircle className='w-6 h-6' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-blue-200 px-6 py-8 mt-24 flex items-center justify-start ml-72 '>
                    <button
                        className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded mr-4 ml-2'
                        onClick={handleAddClick}
                    >
                        Add
                    </button>

                    <button className='bg-gray-200 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddUsers;

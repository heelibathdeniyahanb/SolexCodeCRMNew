import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordWindow2 = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    // Retrieve userId from session storage
    const userId = sessionStorage.getItem('UserId');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleResetPassword = async () => {
        try {
            
            if (!userId) {
                console.error('User ID not found in session storage');
                navigate('/');
                return;
            }
    
            if (newPassword.length < 10 || !/[A-Z]/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
                setPasswordError('Password must be at least 10 characters long, contain at least one uppercase letter, and one special character.');
            } else if (newPassword !== confirmNewPassword) {
                setPasswordError('Passwords do not match.');
            } else {
                // Call the backend API to change the password
                const response = await axios.post(`https://localhost:7031/api/user/ChangePassword/${userId}/ChangePassword`, `"${newPassword}"`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    setNewPassword('');
                    setConfirmNewPassword('');
                    toast.success('Password Reset successful!');
                    setTimeout(() => {
                        navigate('/reset-password-window-3');
                      }, 6000);
                }
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred while resetting password.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex bg-gray-200 bg-opacity-20 h-screen">
            <div>
               
            </div>
            <div className="w-5/12 h-5/6 ml-auto mr-60 mt-20 rounded-lg bg-white p-8 shadow-md border border-black">  
            <h1 className="text-center text-4xl mb-8 font-bold text-teal-700">Reset Password</h1>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
                            required
                        />
                        {showPassword ? (
                            <FaEye
                                className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <FaEyeSlash
                                className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>
                    <p className='text-xs'>Cannot be a previously used password</p>
                    {passwordError && <p className='text-xs text-red-500'>{passwordError}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                            className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
                            required
                        />
                        {showPassword ? (
                            <FaEye
                                className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <FaEyeSlash
                                className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className="mt-12 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600" onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </div>
                <div className='mt-20 ml-4'>
                    <h2 className="text-sm font-bold">Password must contain :</h2>
                    <ul className="list-disc list-inside">
                        <li className="text-sm">Minimum of 10 characters</li>
                        <li className="text-sm">At least one uppercase letter</li>
                        <li className="text-sm">At least one special character</li>
                    </ul>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ResetPasswordWindow2;

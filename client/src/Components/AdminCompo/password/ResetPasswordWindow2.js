import React, { useState, useEffect } from 'react';
import SideBar from '../sidebar/SideBar';
import { useNavigate } from 'react-router-dom';

const ResetPasswordWindow2 = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleResetPassword = () => {
        
        if (newPassword.length < 10 || !/[A-Z]/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            setPasswordError('Password must be at least 10 characters long, contain at least one uppercase letter, and one special character.');
        } else if (newPassword !== confirmNewPassword) {
            setPasswordError('Passwords do not match.');
        } else {
            setShowAlert(true); 
            setNewPassword('');
            setConfirmNewPassword('');
        }
    };

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
                navigate('/reset-password-window-3');
            }, 2000); 
        }
    }, [showAlert, navigate]);

 
    return (
        <div className="flex bg-gray-200 bg-opacity-20 h-screen">
            <div>
                <SideBar />
            </div>
            <div className="w-5/12 h-5/6 ml-auto mr-60 mt-20 rounded-lg bg-white p-8 shadow-md border border-black">
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
                        required
                    />
                    <p className='text-xs'>Cannot be a previously used password</p>
                    {passwordError && <p className='text-xs text-red-500'>{passwordError}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                        className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className='flex justify-center'>
                    <button className="mt-12 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600" onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </div>
                {showAlert && (
                    <div className='mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded '>
                        Password Reset successfully.
                    </div>
                )}
                <div className='mt-20 ml-4'>
                    <h2 className="text-sm font-bold">Password must contain :</h2>
                    <ul className="list-disc list-inside">
                        <li className="text-sm">Minimum of 10 characters</li>
                        <li className="text-sm">At least one uppercase letter</li>
                        <li className="text-sm">At least one special character</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordWindow2;

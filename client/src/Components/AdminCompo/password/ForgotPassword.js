import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7143/api/user/GenerateOtp/GenerateOtp', { email });
            console.log(response.data);
            toast.success('Password reset link sent successfully!', {
                onClose: () => navigate('/verify-reset-code', { state: { email } }) // Pass email to VerifyResetCode
            });
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Backend Error:', error.response.data);
                toast.error('Failed to reset password. Please try again.');
            } else {
                console.error('Error:', error);
                toast.error('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-teal-700">Forgot Password</h2>
                <p className="text-center text-teal-700">Enter your email address to reset your password.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full px-3 py-2 mt-1 border border-teal-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-700 focus:border-teal-700"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-teal-700 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;

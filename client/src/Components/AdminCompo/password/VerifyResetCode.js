import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyResetCode = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState(location.state?.email || '');
    const [otpCode, setOtpCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Sending request to verify OTP:', { email, otpCode });

            const response = await axios.post('https://localhost:7143/api/user/VerifyOtp/VerifyOtp', {
                email,
                otpCode,
            });

            console.log('Response received:', response.data);

            const userId = response.data.userId; // Assuming your response has userId

            toast.success(response.data.message, {
                onClose: () => {
                    navigate('/reset-password-window-2', { state: { userId } }); // Pass userId as state
                }
            });
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else {
                console.error('An error occurred');
            }
            toast.error("Error verifying OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-700">Verify Reset OTP</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            readOnly
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-teal-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-700 focus:border-teal-700 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700">
                            OTP Code
                        </label>
                        <input
                            id="otpCode"
                            name="otpCode"
                            type="text"
                            autoComplete="otpCode"
                            required
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-teal-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-700 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default VerifyResetCode;

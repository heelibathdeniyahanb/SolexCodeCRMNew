import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const userId = sessionStorage.getItem('UserId');
  const { userData } = useUser();

  const handleGenerateOtp = async () => {
    try {
      const response = await axios.post(`https://localhost:7143/api/user/GenerateOtp/${userId}/GenerateOtp`);
      if (response.status === 200) {
        toast.success('OTP generated! Please check your email.');
      } else {
        throw new Error('OTP generation failed');
      }
    } catch (error) {
      toast.error('Failed to generate OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7143/api/user/VerifyOtp/${userId}/VerifyOtp`, { otpCode: otp });
      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        setTimeout(() => {
          switch (userData.role) {
            case 'Admin':
              navigate('/admin-reset-password-window-1');
              break;
            case 'Client':
              navigate('/client-reset-password-window-1');
              break;
            case 'Sales Leader':
              navigate('/salesrep-reset-password-window-1');
              break;
            case 'Customer Supporter':
              navigate('/customersupporter-reset-password-window-1');
              break;
            default:
              navigate('/user-dashboard');
          }
        }, 3000);
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (error) {
      toast.error('Invalid or expired OTP');
    }
  };

  return (
    <div>
      <button onClick={handleGenerateOtp}>Generate OTP</button>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify OTP</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default VerifyOtp;

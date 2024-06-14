import React from 'react';
import Header from '../../Components/Header/Header';
import AdminSideNavBar from './AdminSideNavBar';
import VerifyOtp from '../../Components/login/VerifyOtp';
import { useUser } from '../../Components/login/UserContext';
export default function VerifyOtpAdmin() {
  const { userData } = useUser(); // Destructure userData from useUser()

  return (
    <div>
      <Header />
      <p>{userData && userData.fullName}</p> {/* Display fullName if userData is defined */}
      <div className='flex'>
      <AdminSideNavBar />
      <VerifyOtp /></div>
    </div>
  );
}

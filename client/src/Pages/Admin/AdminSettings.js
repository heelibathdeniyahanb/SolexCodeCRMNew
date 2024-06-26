import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Header from '../../Components/Header/Header';
import AdminSideNavBar from './AdminSideNavBar';

export default function AdminSettings() {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/admin-verify-otp');
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideNavBar />
        <div className="ml-4 flex items-center cursor-pointer" onClick={handleArrowClick}>
          <FaArrowRight className="mr-2" />
          Change Password
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';


import ClientSideNavBar from '../../Components/Client/ClientSideNavBar';
import ClientHeader from '../../Components/Header/ClientHeader';

export default function ClientSettings() {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/client-verify-otp');
  };

  return (
    <div>
      <ClientHeader />
      <div className="flex">
        <ClientSideNavBar />
        <div className="ml-4 flex items-center cursor-pointer" onClick={handleArrowClick}>
          <FaArrowRight className="mr-2" />
          Change Password
        </div>
      </div>
    </div>
  );
}

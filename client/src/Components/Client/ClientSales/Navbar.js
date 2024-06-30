import React from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';

const NavbarMenu = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">SkillSyncer</h1>
      </div>
      <div className="flex items-center space-x-4">
        <FaEnvelope className="text-gray-600 text-xl" />
        <FaBell className="text-gray-600 text-xl" />
        <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default NavbarMenu;

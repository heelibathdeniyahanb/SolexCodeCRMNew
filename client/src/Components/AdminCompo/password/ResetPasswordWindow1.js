import React from 'react'
import SideBar from '../sidebar/SideBar'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const ResetPasswordWindow1 = () => {
  const location = useLocation();
    const { firstName } = location.state || {};
  
  const navigate = useNavigate();
  
  const handleResetPasswordClick = () => {
      navigate('/reset-password-window-2');
    };

  return (
<div className="flex bg-gray-200 bg-opacity-20 h-screen">
    <div>
    <SideBar />
    </div>
    <div className="flex justify-center ml-96 mt-60">
      <div className="bg-white w-96 h-40 pl-5 pr-5 p-4 ml-80 flex flex-col rounded-lg shadow-md border border-black">
      <div className="text-center">
        <spam className="font-bold">Hello,{firstName}<br />We got a Request to Reset your password</spam>
       </div>
          <button className="mt-8 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600" onClick={handleResetPasswordClick} >
              Reset Password
          </button>
      </div>
    </div>
</div>
  )
}

export default ResetPasswordWindow1
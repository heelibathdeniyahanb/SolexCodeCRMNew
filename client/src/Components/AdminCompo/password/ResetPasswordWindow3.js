import React from 'react'
import SideBar from '../sidebar/SideBar'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordWindow3 = () => {

const navigate = useNavigate();
  
const handleResetPasswordClick = () => {
  toast.success('Password Reset successful! Back to Login');
  setTimeout(() => {
      navigate('/');
    }, 6000);
    };
  return (
    <div className="flex bg-gray-200 bg-opacity-20 h-screen">
    <div>
    <SideBar />
    </div>
    <div className="flex w-full h-80 justify-center  mt-40">
      <div className="bg-white pl-5 pr-5 p-4 ml-80 flex flex-col rounded-lg shadow-md border border-black">
      <div className="text-center">
        <spam className="font-bold text-xl">Password Changed</spam>
       </div>
       <div>
        <p className='text-sm mt-8'>Your password has been successfully changed</p>
       </div>
          <button className="mt-36 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600" onClick={handleResetPasswordClick} >
              Reset Password
          </button>
      </div>
    </div>
    <ToastContainer/>
</div>
  )
}

export default ResetPasswordWindow3
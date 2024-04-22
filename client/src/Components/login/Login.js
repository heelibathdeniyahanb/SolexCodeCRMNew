import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from './2.png';
import img3 from './3.png';
import img1 from './1.png';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';


const Login = () => {
  
    

     
    

  return (
    <div className="flex">
      {/* Background images */}
      <div className="relative h-screen">
        <img src={img2} alt="" className="absolute z-30 w-full h-full" />
        <img src={img3} alt="" className="relative z-40 w-full h-full -ml-8" />
      </div>

      {/* Login form */}
      <div className="flex flex-col items-center justify-center p-4 ml-80">
        <img className="w-40 h-32" src={img1} alt="" />
        <h1 className='text-3xl text-blue-950'>LOGIN</h1>

        <form className="w-full mt-16 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="block w-full h-16 p-2 pl-10 mb-8 text-xl font-bold placeholder-black placeholder-opacity-50 border-none rounded-xl bg-gradient-to-r from-teal-400 to-gray-200"
              
            />
            <FaUser className="absolute mt-2 text-gray-400 left-3 top-4" />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="block w-full h-16 p-2 pl-10 mb-8 text-xl font-bold placeholder-black placeholder-opacity-50 border-none rounded-xl bg-gradient-to-r from-teal-400 to-gray-200"
              
            />
            <RiLockPasswordFill className="absolute mt-2 text-gray-400 left-3 top-4" />
          </div>

          {/* Error message */}
        

          {/* Log in button */}
          <div className="flex items-center justify-center">
            <button type="submit"  className="p-2 mt-4 bg-teal-800 border border-gray-300 hover:bg-teal-600 hover:text-black w-36 h-14 rounded-xl">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

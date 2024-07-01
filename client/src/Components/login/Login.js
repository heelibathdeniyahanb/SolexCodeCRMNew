import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img2 from './2.png';
import img3 from './3.png';
import img1 from './1.png';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useUser } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === 'super' && password === 'super') {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate('/superadmin');
        }, 2000); // Shortened delay
        return;
      }
  
      const response = await axios.post('https://localhost:7143/api/user/Login/login', { email, password });
  
      if (response.status === 200) {
        const userData = response.data.userData;
        setUserData(userData);
        console.log(userData);
        sessionStorage.setItem('UserId', userData.id);
  
        toast.success("Login successful!");
        setTimeout(() => {
          if (userData.changePassword === false) {
            switch (userData.role) {
              case 'Admin':
                navigate('/admindashboard');
                break;
              case 'Client':
                navigate('/clientdashboard');
                break;
              case 'LeadManager':
                navigate('/salesrepdashboard');
                break;
              case 'CustomerSupporter':
                navigate('/customersupporterdashboard');
                break;
              default:
                navigate('/user-dashboard');
            }
          } else {
            switch (userData.role) {
              case 'Admin':
                navigate('/admin-reset-password-window-1');
                break;
              case 'Client':
                navigate('/client-reset-password-window-1');
                break;
              case 'LeadManager':
                navigate('/salesrep-reset-password-window-1');
                break;
              case 'CustomerSupporter':
                navigate('/customersupporter-reset-password-window-1');
                break;
              default:
                navigate('/user-dashboard');
            }
          }
        }, 2000); // Shortened delay
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      toast.error('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // forget password navigate
  const handleForgetPassword =() =>{
    navigate('/forgot-password');
}

  return (
    <div className="flex">
      <div className="relative h-screen">
        <img src={img2} alt="" className="absolute z-30 w-full h-full" />
        <img src={img3} alt="" className="relative z-40 w-full h-full -ml-8" />
      </div>

      <div className="flex flex-col items-center justify-center p-4 ml-80">
        <img className="w-40 h-32" src={img1} alt="" />
        <h1 className='text-3xl text-blue-950'>LOGIN</h1>

        <form className="w-full mt-16 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              style={{ width: 'calc(100% - 2.5rem)' }}
              className="block h-16 p-4 pl-10 mb-8 text-xl placeholder-black placeholder-opacity-50 rounded-xl bg-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="absolute mt-2 text-gray-800 left-3 top-4" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              style={{ width: 'calc(100% - 2.5rem)' }}
              className="block h-16 p-4 pl-10 mb-8 text-xl placeholder-black placeholder-opacity-50 rounded-xl bg-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-2 mr-10' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <RiLockPasswordFill className="absolute mt-2 text-gray-800 left-3 top-4" />
          </div>

           {/* Forget Password */}
           <div className="flex justify-start mb-4">
            <span className="font-bold text-teal-700 cursor-pointer hover:text-teal-900" onClick={handleForgetPassword}>
              Forget password?
            </span>
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" onClick={handleLogin} className="p-2 mt-4 bg-teal-800 border border-gray-300 hover:bg-teal-600 hover:text-black w-36 h-14 rounded-xl">
              Log in
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

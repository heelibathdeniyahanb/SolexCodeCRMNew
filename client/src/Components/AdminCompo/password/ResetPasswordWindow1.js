import SideBar from '../sidebar/SideBar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../login/UserContext';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordWindow1 = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [formattedFirstName, setFormattedFirstName] = useState('');

  useEffect(() => {
    console.log('userData:', userData);
    if (userData && userData.firstName) {
      const formattedName = userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1).toLowerCase();
      setFormattedFirstName(formattedName);
    }
  }, [userData]);

  const handleResetPasswordClick = () => {
    toast.success("Reset Password Window successful!");
    setTimeout(() => {
      navigate('/reset-password-window-2');
    }, 6000);
  };

  console.log('formattedFirstName:', formattedFirstName);

  return (
    <div className="flex bg-gray-200 bg-opacity-20 h-screen">
      <div>
        <SideBar />
      </div>
      <div className="flex justify-center ml-96 mt-60">
        <div className="bg-white w-96 h-40 pl-5 pr-5 p-4 ml-80 flex flex-col rounded-lg shadow-md border border-black">
          <div className="text-center">
            <span className="font-bold">Hello, {formattedFirstName}! <br />We got a Request to Reset your password</span>
          </div>
          <button className="mt-8 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600" onClick={handleResetPasswordClick}>
            Reset Password
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ResetPasswordWindow1;

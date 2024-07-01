import React, { useState, useEffect,useRef } from 'react';
import { useUser } from './login/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header/Header';
import AdminSideNavBar from '../Pages/Admin/AdminSideNavBar';
import SalesRepNavBar from './SalesRep/SalesRepNavBar';
import CustomerSupporterNavBar from './CustomerSupporter/CustomerSupporterNavBar';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { userData, setUserData } = useUser();
  const [imageSrc, setImageSrc] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  // Save user data to local storage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  // Ensure that user data is set before rendering
  useEffect(() => {
    if (userData && userData.activeTab) {
      setActiveTab(userData.activeTab);
    }
  }, [userData]);

  // User Image Get
  useEffect(() => {
    const fetchImage = async () => {
      if (!userData || !userData.id) return;
      try {
        const response = await axios.get(`https://localhost:7143/api/user/GetUserImage/${userData.id}/GetUserImage`, {
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (err) {
        console.error("Error fetching image", err);
      }
    };

    fetchImage();
  }, [userData]);

  // Handle Image Update Function
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const confirmed = window.confirm('Are you sure you want to change your profile picture?');
    if (!confirmed) {
      event.target.value = ''; // Reset file input
      return;
    }
  
    const formData = new FormData();
    formData.append('UserImage', file);
  
    try {
      const response = await axios.post(
        `https://localhost:7031/api/user/UpdateUserImage/UpdateUserImage/${userData.id}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      if (response.status === 200) {
        setImageSrc(URL.createObjectURL(file));
        toast.success('Profile picture updated successfully');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error("Error updating the image", error);
      toast.error('Failed to update profile picture. Please try again.');
      event.target.value = ''; // Reset file input
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const renderSidebar = () => {
    switch (userData?.role) {
      case 'Admin':
        return <AdminSideNavBar/>;
      case 'SalesRep':
        return <SalesRepNavBar/>;
      case 'CustomerSupport':
        return <CustomerSupporterNavBar/>;
      default:
        return null; // Or a default sidebar for other roles
    }
  };
  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <div className='flex'>
      {renderSidebar()}
        <div className='flex flex-col items-center justify-center mt-12 mx-auto'>
          <nav className='w-1/2 bg-white border border-gray-400'>
            <div
              className={`p-2 cursor-pointer ${activeTab === 'personal' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <p className='font-medium'>Personal Settings</p>
            </div>
          </nav>
          <div className='relative mt-8'>
            <div
              className='relative w-28 h-28 rounded-full overflow-hidden'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={imageSrc || '/default-profile-image.jpg'} // Use a default image if imageSrc is null
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M16 3a1.5 1.5 0 112.121 2.121l-9 9a1.5 1.5 0 01-.707.293l-4 1a1.5 1.5 0 01-1.854-1.854l1-4a1.5 1.5 0 01.293-.707l9-9z"></path>
                  </svg>
                    </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className='mt-4 text-center'>
              <input
                className='font-bold text-lg mb-2 bg-transparent border-none outline-none text-gray-800'
                id='fullName'
                type='text'
                placeholder='Name'
                value={userData ? userData.fullName : ''}
                readOnly
              />
             
            </div>
            <div className='mt-8'>
              <div className='ml-12'>
                <h2 className='font-bold text-lg mb-2'>User Information</h2>
                <div className='flex items-center mt-2'>
                  <label htmlFor='email' className='w-24 text-sm'>Email</label>
                  <input
                    type='text'
                    id='email'
                    className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                    value={userData ? userData.email : ''}
                    readOnly
                  />
                </div>
                <div className='flex items-center mt-2'>
                  <label htmlFor='role' className='w-24 text-sm'>Role</label>
                  <input
                    type='text'
                    id='role'
                    className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                    value={userData ? userData.role : ''}
                    readOnly
                  />
                </div>
                <div className='flex items-center mt-2'>
                  <label htmlFor='mobileNumber' className='w-24 text-sm'>Mobile</label>
                  <input
                    type='text'
                    id='mobileNumber'
                    className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                    value={userData ? userData.mobileNumber : ''}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {userData && userData.role === 'Client' && (
              <div className='mt-8'>
                <div className='ml-12'>
                  <h2 className='font-bold text-lg'>Company Details</h2>
                  <div className='flex flex-col mt-2'>
                    <div className='flex items-center mt-2'>
                      <label htmlFor='companyName' className='w-24 text-sm'>Company Name</label>
                      <input
                        type='text'
                        id='companyName'
                        className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                        value={userData ? userData.companyName : ''}
                        readOnly
                      />
                    </div>
                    <div className='flex items-center mt-2'>
                      <label htmlFor='continent' className='w-24 text-sm'>Continent</label>
                      <input
                        type='text'
                        id='continent'
                        className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                        value={userData ? userData.continent : ''}
                        readOnly
                      />
                    </div>
                    <div className='flex items-center mt-2'>
                      <label htmlFor='country' className='w-24 text-sm'>Country</label>
                      <input
                        type='text'
                        id='country'
                        className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                        value={userData ? userData.country : ''}
                        readOnly
                      />
                    </div>
                    <div className='flex items-center mt-2'>
                      <label htmlFor='industry' className='w-24 text-sm'>Industry</label>
                      <input
                        type='text'
                        id='industry'
                        className='border-b-2 border-gray-400 py-1 pl-2 bg-transparent outline-none text-gray-800'
                        value={userData ? userData.industry : ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

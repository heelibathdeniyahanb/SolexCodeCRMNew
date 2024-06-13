import React, { useState, useEffect, useCallback } from 'react';

import { LuHelpCircle } from 'react-icons/lu';

import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUsers = () => {
    const [forcePasswordChange, setForcePasswordChange] = useState(false);
    const [countries, setCountries] = useState([]);
    const [continents, setContinents] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        companyName: '',
        continent: '',
        country: '',
        industry: '',
        userName: '',
        password: '',
        userImage: null,
        role: '',
        changePassword: false,
    });
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        mobileNumber: false,
        companyName: false,
        continent: false,
        country: false,
        industry: false,
        userName: false,
        password: false,
        userImage: false,
        role: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    // Input Change Handle
    const handleInputChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        let val;
    
        if (type === 'file') {
            val = files[0]; 
        } else if (type === 'checkbox') {
            val = checked;
            if (name === 'forcePasswordChange') {
                setForcePasswordChange(checked);
                return; 
            }
        } else if (name === 'mobileNumber') {
            val = value.replace(/\D/g, '').slice(0, 10);
        } else {
            val = value;
        }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: val,
            changePassword: forcePasswordChange,
        }));
    };
    
    
    
    // Password Visible handle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Password Validation
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return passwordRegex.test(password);
    };
    

    //Add User
    const addUser = async (formData, changePasswordValue) => {
        try {
            const data = new FormData();
            
            data.append('FirstName', formData.firstName);
            data.append('LastName', formData.lastName);
            data.append('Email', formData.email); 
            data.append('MobileNumber', formData.mobileNumber);
            data.append('CompanyName', formData.companyName);
            data.append('Continent', formData.continent);
            data.append('Country', formData.country);
            data.append('Industry', formData.industry);
            data.append('UserName', formData.userName);
            data.append('Password', formData.password);
            data.append('Role', formData.role);
            data.append('ChangePassword', changePasswordValue);
    
            if (formData.userImage) {
                data.append('userImage', formData.userImage);
            }
    
            // Log FormData entries
            for (let pair of data.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
    
            const response = await axios.post('https://localhost:7031/api/user/UserRegister', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                toast.success('User added successfully.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobileNumber: '',
                    companyName: '',
                    continent: '',
                    country: '',
                    industry: '',
                    userName: '',
                    password: '',
                    userImage: null,
                    role: '',
                    changePassword: false,
                });
            } else {
                toast.error('Failed to add user.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('An error occurred while adding user.');
        }
    };
    
       
  
    // Handle Add Button Function
    const handleAddClick = () => {
        const errors = {
            firstName: !formData.firstName,
            lastName: !formData.lastName,
            email: !formData.email,
            mobileNumber: !formData.mobileNumber || formData.mobileNumber.length !== 10,
            companyName: !formData.companyName,
            continent: !formData.continent,
            country: !formData.country,
            industry: !formData.industry,
            userName: !formData.userName,
            password: !formData.password || !isPasswordValid(formData.password),
            userImage: !formData.userImage,
            role: !formData.role,
        };
        setFormErrors(errors);
    
        if (Object.values(errors).some((error) => error)) {
            toast.error('Please fill in all required fields or correct errors.');
            return;
        }
        const changePasswordValue = forcePasswordChange;
        addUser(formData, changePasswordValue); 
    };
    
   
    
    const fetchCountries = useCallback(async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryNames = response.data.map((country) => country.name.common);
            console.log('Fetched countries:', countryNames);
            setCountries(countryNames);
        } catch (error) {
            console.error('Error fetching countries:', error);
            handleFetchError('countries');
        }
    }, []);

    const fetchContinents = useCallback(async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const allContinents = response.data.map((country) => country.region).filter(Boolean);
            const uniqueContinents = [...new Set(allContinents)];
            console.log('Fetched continents:', uniqueContinents);
            setContinents(uniqueContinents);
        } catch (error) {
            console.error('Error fetching continents:', error);
            handleFetchError('continents');
        }
    }, []);

    const handleFetchError = (dataType) => {
        toast.error(`Error fetching ${dataType}. Please check your internet connection and try again.`);
    };

    useEffect(() => {
        const maxRetries = 3;
        let retries = 0;
    
        const fetchData = async () => {
            while (retries < maxRetries) {
                try {
                    await fetchCountries();
                    await fetchContinents();
                    break; 
                } catch (error) {
                    retries++;
                    console.error('Fetch attempt failed:', error);
                }
            }
    
            if (retries === maxRetries) {
                toast.error('Failed to fetch data. Please try again later.');
            }
        };
    
        fetchData();
    }, [fetchCountries, fetchContinents]); 
    


    // Industries
    const industries = [
        'Information Technology(IT)', 'Healthcare', 'Finance and Banking', 'Retail', 'Automotive', 'Tourism and Hospitality',
        'Energy', 'Agriculture', 'Media and Entertainment', 'Construction', 'Other'
    ];
    
    return (
        <div>
            
            <div className='w-full'>
                
                <div className='flex justify-end mr-24 mt-2 '>
                    <div className='mt-1 ml-96'>
                        <span className='text-xl'>
                            Enter the basic user details. The username will get auto-filled based on the Preferred Email
                            Format set. If you prefer any other username from the given suggestions, you can edit the
                            Username field.
                        </span>
                    </div>
                </div>
                <div className='flex justify-center '>
                    <div className='flex flex-col -mr-6'>
                        <div className='flex flex-row'>
                            <input
                                type='text'
                                className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                    formErrors.firstName ? 'border-red-500' : ''
                                }`}
                                placeholder='First Name *'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type='text'
                                className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                    formErrors.lastName ? 'border-red-500' : ''
                                }`}
                                placeholder='Last Name *'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='flex flex-row'>
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.userName ? 'border-red-500' : ''
                            }`}
                            placeholder='Username *'
                            name='userName'
                            value={formData.userName}
                            onChange={handleInputChange}
                            required
                        />
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'} 
                                className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                    formErrors.password ? 'border-red-500' : ''
                                }`}
                                placeholder='Password *'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                           <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-4 mr-4' onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>

                        </div>
                        </div>

                        <div className='flex flex-row'>
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.email ? 'border-red-500' : ''
                            }`}
                            placeholder='Email *'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.mobileNumber ? 'border-red-500' : ''
                            }`}
                            placeholder='Mobile Number *'
                            name='mobileNumber'
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div className='flex flex-row'>
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.email ? 'border-red-500' : ''
                            }`}
                            placeholder='Company Name *'
                            name='companyName'
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                        />
                         <select
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.continent ? 'border-red-500' : ''
                            }`}
                            name='continent'
                            value={formData.continent}
                            onChange={handleInputChange}
                            required
                        >
                            <option value='' disabled>Continent *</option>
                            {continents.map((continent) => (
                                <option key={continent} value={continent}>
                                    {continent}
                                </option>
                            ))}
                        </select>
                        </div>

                        <div className='flex flex-row'>
                        <select
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.country ? 'border-red-500' : ''
                            }`}
                            name='country'
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        >
                            <option value='' disabled>Country *</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <select
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.industry ? 'border-red-500' : ''
                            }`}
                            name='industry'
                            value={formData.industry}
                            onChange={handleInputChange}
                            required
                        >
                            <option value='' disabled>Industry *</option>
                            {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                    {industry}
                                </option>
                            ))}
                        </select>
                        </div>
                        
                        <div className='flex flex-row'>
                        <input
                            type='file'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.userImage ? 'border-red-500' : ''
                            }`}
                            placeholder='User Image *'
                            name='userImage'
                            onChange={handleInputChange} 
                            required
                        />
                        <select
                            name='role'
                            value={formData.role}
                            onChange={handleInputChange}
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.role ? 'border-red-500' : ''
                            }`}
                            required
                        >
                            <option value=''>Select Role</option>
                            <option value='Admin'>Admin</option>
                            <option value='User'>User</option>
                            <option value='Customer Supporter'>Customer Supporter</option>
                            <option value='Sales Leader'>Sales Leader</option>
                        </select>
                        </div>

                        <div className='flex items-center mt-4'>
                            <input
                                type='checkbox'
                                className='form-checkbox h-5 w-5 text-teal-500'
                                onChange={(e) => setForcePasswordChange(e.target.checked)}
                                checked={forcePasswordChange} 
                            />
                            <span className='ml-2'>Force user to change password on first log in</span>
                            <div className='ml-3 text-teal-500 cursor-pointer'>
                                <LuHelpCircle className='w-6 h-6' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 flex items-center justify-center'>
                    <button
                        className='bg-teal-700 hover:bg-teal-400 text-white px-4 py-2 rounded mr-8 ml-2'
                        onClick={handleAddClick}
                    >
                        Add
                    </button>

                    <button className='bg-teal-700 hover:bg-teal-400 text-white px-4 py-2 rounded'>Cancel</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default AddUsers;

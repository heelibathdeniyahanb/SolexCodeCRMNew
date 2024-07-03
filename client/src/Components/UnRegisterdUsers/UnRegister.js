import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UnRegister = ({ onClose }) => {
    const [countries, setCountries] = useState([]);
    const [continents, setContinents] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNo: '',
        companyName: '',
        continent: '',
        country: '',
        industry: '',
    });
    const [formErrors, setFormErrors] = useState({
        fullName: false,
        email: false,
        mobileNo: false,
        companyName: false,
        continent: false,
        country: false,
        industry: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Resetting form errors when user starts typing
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const addUser = async (formData) => {
        try {
            const response = await axios.post('https://localhost:7143/api/UnRegisteredUsers', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Your registration data was sent successfully.');
                setFormData({
                    fullName: '',
                    email: '',
                    mobileNo: '',
                    companyName: '',
                    continent: '',
                    country: '',
                    industry: '',
                });
                if (onClose) onClose(); // Close the popup after successful submission
            } else {
                toast.error('Failed to create account creation request.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                toast.error(`Error: ${error.response.data.title || 'An error occurred while adding user.'}`);
                if (error.response.data.errors) {
                    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                        messages.forEach(message => toast.error(`${field}: ${message}`));
                    });
                }
            } else {
                toast.error('An error occurred while creating your account.');
            }
        }
    };

    const handleAddClick = async () => {
        const errors = {
            fullName: !formData.fullName,
            email: !formData.email || !validateEmail(formData.email),
            mobileNo: !formData.mobileNo || formData.mobileNo.length !== 10,
            companyName: !formData.companyName,
            continent: !formData.continent,
            country: !formData.country,
            industry: !formData.industry,
        };
        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            toast.error('Please fill in all required fields or correct errors.');
            return;
        }

        try {
            await addUser(formData);
        } catch (error) {
            // Error handling for addUser function is already handled inside addUser function
        }
    };

    const fetchCountries = useCallback(async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryNames = response.data.map((country) => country.name.common);
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
        const fetchData = async () => {
            await Promise.all([
                fetchCountries(),
                fetchContinents()
            ]);
        };

        fetchData();
    }, [fetchCountries, fetchContinents]);

    const industries = [
        'Information Technology(IT)', 'Healthcare', 'Finance and Banking', 'Retail', 'Automotive', 'Tourism and Hospitality',
        'Energy', 'Agriculture', 'Media and Entertainment', 'Construction','Education', 'Other'
    ];

    return (
        <div className='w-full'>
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Account</h2>
            <div className='flex justify-center'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.fullName ? 'border-red-500' : ''
                            }`}
                            placeholder='Full Name *'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
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
                    </div>

                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.mobileNo ? 'border-red-500' : ''
                            }`}
                            placeholder='Mobile Number *'
                            name='mobileNo'
                            value={formData.mobileNo}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type='text'
                            className={`border border-black rounded mr-3 mt-5 w-96 h-12 px-3 ${
                                formErrors.companyName ? 'border-red-500' : ''
                            }`}
                            placeholder='Company Name *'
                            name='companyName'
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                        />
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
                </div>
            </div>
            <div className='mt-4 flex items-center justify-center'>
                <button
                    className='bg-teal-700 hover:bg-teal-400 text-white px-4 py-2 rounded mr-8 ml-2'
                    onClick={handleAddClick}
                >
                    Create
                </button>
                <button
                    className='bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded'
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UnRegister;

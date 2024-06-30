import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import logo from '../../../Components/login/1.png';

const ClientForm = () => {
    const [company, setCompany] = useState("");
    const [website, setWebsite] = useState("");
    const [numberOfEmployees, setNumberOfEmployees] = useState("");
    const [annualRevenue, setAnnualRevenue] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [industry, setIndustry] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [additionalNote, setAdditionalNote] = useState("");
    const [source, setSource] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // You can add any side effects here if needed
    }, []);

    const validateForm = () => {
        let formErrors = {};

        if (!company) formErrors.company = "Company is required";
        if (!website) formErrors.website = "Website is required";
        if (!numberOfEmployees) formErrors.numberOfEmployees = "Number of Employees is required";
        if (!annualRevenue) formErrors.annualRevenue = "Annual Revenue is required";
        if (!name) formErrors.name = "Name is required";
        if (!email) formErrors.email = "Email is required";
        if (email && !/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";
        if (!companyPhone) formErrors.companyPhone = "Company Phone is required";
        if (!industry) formErrors.industry = "Industry is required";
        if (!department) formErrors.department = "Department is required";
        if (!title) formErrors.title = "Title is required";
        if (!additionalNote) formErrors.additionalNote = "Additional Note is required";
        if (!source) formErrors.source = "Source is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const clientData = {
            companyName: company,
            website,
            numberOfEmployees,
            annualRevenue,
            clientName: name,
            email,
            companyPhone,
            industry,
            department,
            title,
            additionalNote,
            source
        };

        try {
            const response = await axios.post('https://localhost:7143/api/Company', clientData);
            console.log("Data Submitted successfully", response.data);
            window.alert("Success!");
            clearForm();
        } catch (error) {
            console.error("Data submitting failed", error);
            window.alert("Error submitting data: " + error.message);
        }
    };

    const clearForm = () => {
        setCompany("");
        setWebsite("");
        setNumberOfEmployees("");
        setAnnualRevenue("");
        setName("");
        setEmail("");
        setCompanyPhone("");
        setIndustry("");
        setDepartment("");
        setTitle("");
        setAdditionalNote("");
        setSource("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center mr-8'>
                    <div className='w-20 ml-96 mt-4'>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='mt-10 px-3 text-lg text-cyan-700 font-serif font-semibold'>
                        Sales Lead Form
                    </div>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    <div className="col-start-5 ml-80">
                        {/* Company */}
                        <div className="mt-5">
                            <label htmlFor="company" className="flex text-sm font-medium text-gray-600 mr-80">Company:</label>
                            <div className="mt-2">
                                <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" name="company" id="company" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                            </div>
                        </div>

                        {/* Website */}
                        <div className="mt-5">
                            <label htmlFor="website" className="flex text-sm font-medium text-gray-600 mr-80">Website:</label>
                            <div className="mt-2">
                                <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" name="website" id="website" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
                            </div>
                        </div>

                        {/* Number of Employees */}
                        <div className="mt-5">
                            <label htmlFor="numberOfEmployees" className="flex text-sm font-medium text-gray-600 mr-80">Number Of Employees:</label>
                            <div className="mt-2">
                                <select value={numberOfEmployees} onChange={(e) => setNumberOfEmployees(e.target.value)} id="numberOfEmployees" name="numberOfEmployees" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="" disabled>Choose One</option>
                                    <option>Less than 50</option>
                                    <option>51-100</option>
                                    <option>101-500</option>
                                    <option>More than 500</option>
                                </select>
                                {errors.numberOfEmployees && <p className="text-red-500 text-xs mt-1">{errors.numberOfEmployees}</p>}
                            </div>
                        </div>

                        {/* Annual Revenue */}
                        <div className="mt-5">
                            <label htmlFor="annualRevenue" className="flex text-sm font-medium text-gray-600 mr-80">Annual Revenue:</label>
                            <div className="mt-2">
                                <select value={annualRevenue} onChange={(e) => setAnnualRevenue(e.target.value)} id="annualRevenue" name="annualRevenue" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="" disabled>Choose One</option>
                                    <option>Less than 1 million</option>
                                    <option>1 million - 5 million</option>
                                    <option>5 million - 10 million</option>
                                    <option>More than 10 million</option>
                                </select>
                                {errors.annualRevenue && <p className="text-red-500 text-xs mt-1">{errors.annualRevenue}</p>}
                            </div>
                        </div>

                        {/* Name */}
                        <div className="mt-5">
                            <label htmlFor="name" className="flex text-sm font-medium text-gray-600 mr-80">Name:</label>
                            <div className="mt-2">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mt-5">
                            <label htmlFor="email" className="flex text-sm font-medium text-gray-600 mr-80">Email:</label>
                            <div className="mt-2">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Company Phone */}
                        <div className="mt-5">
                            <label htmlFor="companyPhone" className="flex text-sm font-medium text-gray-600 mr-80">Company Phone:</label>
                            <div className="mt-2">
                                <div className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <PhoneInput
                                        value={companyPhone}
                                        onChange={(phone) => setCompanyPhone(phone)}
                                        id="companyPhone"
                                        name="companyPhone"
                                        placeholder="Enter phone number"
                                        defaultCountry="us"
                                        inputClass="w-full h-full outline-none placeholder-gray-400 text-gray-900 text-sm leading-6"
                                    />
                                </div>
                                {errors.companyPhone && <p className="text-red-500 text-xs mt-1">{errors.companyPhone}</p>}
                            </div>
                        </div>

                        {/* Industry */}
                        <div className="mt-5">
                            <label htmlFor="industry" className="flex text-sm font-medium text-gray-600 mr-80">Industry:</label>
                            <div className="mt-2">
                                <select value={industry} onChange={(e) => setIndustry(e.target.value)} id="industry" name="industry" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="" disabled>Choose One</option>
                                    <option>Architecture/Planning</option>
                                    <option>Biotechnology/Greentech</option>
                                    <option>Consumer Goods</option>
                                    <option>Education Management</option>
                                    <option>Marketing/Advertising/Sales</option>
                                    <option>Manufacturing</option>
                                    <option>Retail Industry</option>
                                    <option>Real Estate/Mortgage</option>
                                    <option>Hospitality</option>
                                    <option>Transportation</option>
                                    <option>Entertainment/Movie Production</option>
                                    <option>Food/Beverages</option>
                                    <option>Pharmaceuticals</option>
                                    <option>Telecommunications</option>
                                    <option>Renewable Energy/Environment</option>
                                </select>
                                {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                            </div>
                        </div>

                        {/* Department */}
                        <div className="mt-5">
                            <label htmlFor="department" className="flex text-sm font-medium text-gray-600 mr-80">Department:</label>
                            <div className="mt-2">
                                <select value={department} onChange={(e) => setDepartment(e.target.value)} id="department" name="department" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="" disabled>Choose One</option>
                                    <option>Production</option>
                                    <option>Research and Development Purchasing</option>
                                    <option>Marketing</option>
                                    <option>Human Resources</option>
                                    <option>Accounting and Finance</option>
                                    <option>Customer Service</option>
                                    <option>Information Technology/IT</option>
                                    <option>Operations</option>
                                    <option>Sales</option>
                                    <option>Quality Assurance</option>
                                    <option>Legal</option>
                                    <option>Supply Chain Management</option>
                                    <option>Product Management</option>
                                    <option>Business Development</option>
                                    <option>Public Relations/PR</option>
                                </select>
                                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mt-5">
                            <label htmlFor="title" className="flex text-sm font-medium text-gray-600 mr-80">Title:</label>
                            <div className="mt-2">
                                <select value={title} onChange={(e) => setTitle(e.target.value)} id="title" name="title" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="" disabled>Choose One</option>
                                    <option>CEO/President</option>
                                    <option>Owner/Operator</option>
                                    <option>VP or C-level</option>
                                    <option>Director</option>
                                    <option>Manager or Snr. Manager</option>
                                    <option>Director</option>
                                    <option>Manager or Snr. Manager</option>
                                    <option>Independent Contributor</option>
                                    <option>Designer/Developer</option>
                                    <option>Other</option>

                                </select>
                            </div>
                        </div>

                            {/*Additional Note */}
                        <div className="mt-5">
                            <label htmlFor="additionalNote" className="flex text-sm font-medium text-gray-600 mr-80">Additional Notes and Comments :</label>
                            <div className="mt-2">
                                <textarea
                                    value={additionalNote} onChange={(e) => setAdditionalNote(e.target.value)}
                                    id="additionalNote"
                                    name="additionalNote"
                                    rows="4"
                                    className="block w-4/5 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Type your answer here"
                                ></textarea>
                            </div>
                        </div>

                          {/*Sourse */}
                        <div className="mt-5">
                        <label htmlFor="title" className="flex text-sm font-medium text-gray-600 mr-80">Source:</label>
                            <div className="mt-2">
                                <select value={source} onChange={(e) => setSource(e.target.value)} id="title" name="title" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="" disabled>Choose One</option>
                                    <option>Internet search</option>
                                    <option>Another customer</option>
                                    <option>Used at a previous job</option>
                                    <option>TV/radio/magazine ad</option>
                                    <option>Social Media</option>
                                    <option>Other</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-80 ml-96 py-10">
                    <button type="button" onClick={clearForm} className="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Clear</button>
                    <button type="submit" className="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
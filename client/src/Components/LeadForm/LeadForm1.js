import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from 'dayjs';

const LeadForm1 = () => {
    const [leadStatus, setLeadStatus] = useState([]);
    const [leadName, setLeadName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [salesPipeline, setPipelineStage] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('https://localhost:7143/api/Company');
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    useEffect(() => {
        setLeadStatus(prevStatus => {
            let newStatus = prevStatus.filter(status => status === 'Web' || status === 'Mobile');
            newStatus.push(calculatePriorityStatus(startDate, endDate));
            return newStatus;
        });
    }, [startDate, endDate]);

    const validateForm = () => {
        let formErrors = {};
        const today = dayjs().startOf('day');

        if (!leadName) formErrors.leadName = "Lead Name is required";
        if (!companyName) formErrors.companyName = "Company Name is required";
        if (!startDate) formErrors.startDate = "Start Date is required";
        if (startDate && startDate.isBefore(today)) formErrors.startDate = "Start Date cannot be in the past";
        if (!endDate) formErrors.endDate = "End Date is required";
        if (!salesPipeline) formErrors.salesPipeline = "Pipeline Stage is required";
        if (!leadStatus === 0) formErrors.leadStatus = "Lead Status is required";
        if (!userFullName) formErrors.userFullName = "User Full Name is required";
        if (!userEmail) formErrors.userEmail = "User Email is required";
        if (userEmail && !/\S+@\S+\.\S+/.test(userEmail)) formErrors.userEmail = "Email is invalid";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const startDateString = startDate.format('YYYY-MM-DD');
        const endDateString = endDate.format('YYYY-MM-DD');

        const leadData = {
            leadName,
            companyName,
            startDate: startDateString,
            endDate: endDateString,
            salesPipeline,
            leadStatus: leadStatus.join(', '),
            userFullName,
            userEmail,

        };

        console.log('Sending data:', JSON.stringify(leadData, null, 2));


        try {
            const response = await axios.post('https://localhost:7143/api/Lead', leadData);
            console.log('Data Submitted successfully', response.data);
            window.alert('Success!');
            // Clear form or redirect as needed
        } catch (error) {
            console.error('Data submitting failed', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            window.alert('Error submitting data');
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(dayjs(e.target.value));
    };

    const handleEndDateChange = (e) => {
        setEndDate(dayjs(e.target.value));
    };

    const handleLeadStatusChange = (status) => {
        setLeadStatus(prevStatus => {
            let newStatus = [...prevStatus];
            if (newStatus.includes(status)) {
                newStatus = newStatus.filter(s => s !== status);
            } else {
                newStatus.push(status);
            }
            // Always keep only one of Low, Medium, or High
            newStatus = newStatus.filter(s => s !== 'Low' && s !== 'Medium' && s !== 'High');
            newStatus.push(calculatePriorityStatus(startDate, endDate));
            return newStatus;
        });
    };

    const calculatePriorityStatus = (start, end) => {
        const monthsDiff = end.diff(start, 'month');
        if (monthsDiff >= 12) {
            return 'Low';
        } else if (monthsDiff >= 6) {
            return 'Medium';
        } else {
            return 'High';
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='addtask'>
                    <div className='text-xl font-bold mt-12 text-left ml-80'>Add Lead</div><br></br>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    <div className="col-start-5 ml-80 ">
                        <label htmlFor="lead_name" className="flex text-sm font-medium text-gray-600 mr-80">Lead Name :</label>
                        <div className="mt-2">
                            <input value={leadName} onChange={(e) => setLeadName(e.target.value)} type="text" name="lead-name" id="lead-name" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            {errors.leadName && <p className="text-red-500 text-xs mt-1">{errors.leadName}</p>}
                        </div>

                        <div className="mt-5">
                            <label htmlFor="company" className="flex text-sm font-medium text-gray-600 mr-80">Company:</label>
                            <div className="mt-2">
                                <select
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">Select a company</option>
                                    {companies.map((company) => (
                                        <option key={company.id} value={company.companyName}>
                                            {company.companyName}
                                        </option>
                                    ))}
                                </select>
                                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                            </div>
                        </div>



                        <div className="mt-5">
                            <label htmlFor="start-date" className="flex text-sm font-medium text-gray-600 mr-80">
                                Start Date :
                            </label>
                            <div className="mt-2">
                                <input
                                    value={startDate.format('YYYY-MM-DD')}
                                    onChange={handleStartDateChange}
                                    type="date"
                                    name="start-date"
                                    id="start-date"
                                    min={dayjs().format('YYYY-MM-DD')}
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="end-date" className="flex text-sm font-medium text-gray-600 mr-80">
                                End Date :
                            </label>
                            <div className="mt-2">
                                <input
                                    value={endDate.format('YYYY-MM-DD')}
                                    onChange={handleEndDateChange}
                                    type="date"
                                    name="end-date"
                                    id="end-date"
                                    min={startDate.format('YYYY-MM-DD')}
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="pipeline-stages" className="flex text-sm font-medium text-gray-600 mr-80">Pipeline Stages:</label>
                            <div className="mt-2">
                                <select value={salesPipeline}
                                    onChange={(e) => setPipelineStage(e.target.value)}
                                    id="pipeline-stages"
                                    name="pipeline-stages"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">Choose One</option>
                                    <option value="Planning">Planning</option>
                                    <option value="Qualification">Qualification</option>
                                    <option value="Proposal">Proposal</option>
                                    <option value="Negotiation">Negotiation</option>
                                    <option value="Close-won">Close-won</option>
                                </select>
                                {errors.salesPipeline && <p className="text-red-500 text-xs mt-1">{errors.salesPipeline}</p>}
                            </div>
                        </div>



                        <div className="mt-5">
                            <label className="flex text-sm font-medium text-gray-600 mr-80">Lead Status:</label>
                            <div className="mt-2">
                                {['Low', 'Medium', 'High'].map((status) => (
                                    <label key={status} className="inline-flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            value={status}
                                            checked={leadStatus.includes(status)}
                                            disabled={true}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">{status}</span>
                                    </label>
                                ))}
                                {['Web', 'Mobile'].map((status) => (
                                    <label key={status} className="inline-flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            value={status}
                                            checked={leadStatus.includes(status)}
                                            onChange={() => handleLeadStatusChange(status)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">{status}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.leadStatus && <p className="text-red-500 text-xs mt-1">{errors.leadStatus}</p>}
                        </div>


                        <div className="mt-5">
                            <label htmlFor="full-name" className="flex text-sm font-medium text-gray-600 mr-80">Full Name :</label>
                            <div className="mt-2">
                                <input value={userFullName} onChange={(e) => setUserFullName(e.target.value)} type="text" name="full-name" id="full-name" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {errors.userFullName && <p className="text-red-500 text-xs mt-1">{errors.userFullName}</p>}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="email-address" className="flex text-sm font-medium text-gray-600 mr-80">Email Address :</label>
                            <div className="mt-2">
                                <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" name="email-address" id="email-address" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail}</p>}
                            </div>
                        </div>


                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-80 ml-96 py-10">
                    <button type="button" className="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</button>
                    <button type="submit" className="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                </div>
            </form>
        </div>
    );
};

export default LeadForm1;





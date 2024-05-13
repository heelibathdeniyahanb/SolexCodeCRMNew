import React, { useState } from 'react';
import axios from "axios";
import dayjs from 'dayjs';

const LeadForm1 = () => {
    const [leadStatus, setSelectedLeadStatus] = useState("");
    const [leadName, setLeadName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [salesPipeline, setPipelineStage] = useState("");
    const [salesRep, setSalesRep] = useState("");
    const [clicked,setClicked] = useState(true);
    const [click,setClick] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDateString = startDate.format('YYYY-MM-DD');
        const endDateString = endDate.format('YYYY-MM-DD');

        if (!leadName || !companyName || !startDateString || !endDateString || !salesRep || !salesPipeline || !leadStatus) {
            window.alert('Fill all the fields');
            return;
        }

        const leadData = {
            leadName,
            companyName,
            startDate: startDateString,
            endDate: endDateString,
            salesRep,
            salesPipeline,
            leadStatus
        };

        try {
            console.log('Request payload:', leadData);
            const response = await axios.post('https://localhost:7143/api/Lead', leadData);
            console.log('Data Submitted successfully', response.data);
            window.alert('Success!');
        } catch (error) {
            console.error('Data submitting failed', error);
            window.alert('Error submitting data');
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(dayjs(e.target.value));
    };

    const handleEndDateChange = (e) => {
        setEndDate(dayjs(e.target.value));
    };



    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className='addtask'>
                    <div className='text-xl font-bold mt-12 text-left ml-80'>Add Lead</div><br></br>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <div class="col-start-5 ml-80 ">
                    <label for="lead_name" class="flex text-sm font-medium text-gray-600 mr-80 ">Lead Name :</label>
                    <div class="mt-2">
                        <input  value={leadName} onChange={ (e) => setLeadName(e.target.value)} type="text" name="lead-name" id="lead-name" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div class="mt-5">
                        <label for="company_name" class="flex text-sm font-medium text-gray-600 mr-80">Company Name :</label>
                        <div class="mt-2">
                            <input value={companyName} onChange={ (e) => setCompanyName(e.target.value)} type="text" name="company-name" id="company-name" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="mt-5">
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
                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>

                    <div class="mt-5">
                        <label for="pipeline-stages" class="flex text-sm font-medium text-gray-600 mr-80">Pipeline Stages:</label>
                        <div class="mt-2">
                            <select value={salesPipeline} 
                            onChange={ (e) => {
                                setClicked(false);
                                setPipelineStage(e.target.value);}} id="pipeline-stages" name="pipeline-stages" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {clicked && <option>Choose One</option>}
                                <option value="Planning">Planning</option>
                                <option value="Qualification">Qualification</option>
                                <option value="Proposal">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Close-won">Close-won</option>

                            </select>
                        </div>
                    </div>

                    <div class="mt-5">
                        <label for="sales-ref" class="flex text-sm font-medium text-gray-600 mr-80 ">Sales Ref :</label>
                        <div class="mt-2">
                            <input value={salesRep} onChange={ (e) => setSalesRep(e.target.value)} type="text" name="sales-ref" id="sales-ref" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="flex text-sm font-medium text-gray-600 mr-80">Lead Status:</label>
                        <div class="mt-2">
                            <select value={leadStatus} 
                            onChange={ (e) => 
                            {   setClick(false);
                                setSelectedLeadStatus(e.target.value);}} id="pipeline-stages" name="pipeline-stages" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose</option>}
                                <option value="Mobile">Mobile</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
                <div class="mt-6 flex items-center justify-center gap-x-80 ml-96 py-10">
                    <button type="button" class="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</button>
                    <button type="submit" class="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                </div>
            </form>
        </div>

    );
};

export default LeadForm1;


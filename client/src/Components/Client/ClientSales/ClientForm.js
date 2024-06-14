import React, { useState } from 'react';
import logo from '../../../Components/login/1.png';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';

const ClientForm = () => {
    const [value, setValue] = useState()
    const [] = useState([]);
    const [click,setClicked] = useState(true);

    const [company, setCompany] = useState("");
    const [website, setWebsite] = useState("");
    const [numberOfEmployees, setNumberOfEmployee] = useState("");
    const [annualRevenue, setAnnualRevenue] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState(""); // Initialize with an empty string
    const [personalPhone, setPersonalPhone] = useState(""); // Initialize with an empty string
    const [address, setAddress] = useState("");
    const [industry, setIndustry] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [additionalNote, setAdditionalNote] = useState("");
    const [source, setSource] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !company ||
            !website ||
            !numberOfEmployees ||
            !annualRevenue ||
            !name ||
            !email ||
            !companyPhone ||
            !personalPhone ||
            !address ||
            !industry ||
            !department ||
            !title ||
            !additionalNote ||
            !source
        ) {
            window.alert("Please fill all the required fields");
            return;
        }

        const leadData = {
            company,
            website,
            numberOfEmployees,
            annualRevenue,
            name,
            email,
            companyPhone,
            personalPhone,
            address,
            industry,
            department,
            title,
            additionalNote,
            source
        };


        try {
            const response = await axios.post('https://localhost:7143/api/ClientLead', leadData);
            console.log("Data Submitted successfully", leadData, response.data);
            window.alert("Success!");
        } catch (error) {
            console.error("Data submitting failed", error);
            window.alert("Error submitting data");
        }
    };


    // Handle Lead Status change
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center mr-8'>
                    <div className=' w-20 ml-96 mt-4 '>
                        <img src={logo} alt='logo'></img>
                    </div>

                    <div className=' mt-10 px-3 text-lg text-cyan-700 font-serif font-semibold '>
                        Sales Lead Form
                    </div>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    <div className="col-start-5 ml-80 ">
                        <label htmlFor="companyName" className="flex text-sm font-medium text-gray-600 mr-80 ">Company :</label>
                        <div className="mt-2">
                            <input value={company} onChange={ (e) => setCompany(e.target.value)} type="text" name="companyName" id="companyName" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="website" className="flex text-sm font-medium text-gray-600 mr-80">Website :</label>
                            <div className="mt-2">
                                <input value={website} onChange={ (e) => setWebsite(e.target.value)} type="text" name="website" id="website" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="numberOfEmployees" className="flex text-sm font-medium text-gray-600 mr-80">Number Of Employees :</label>
                            <div className="mt-2">
                            <select value={numberOfEmployees} 
                            onChange={ (e) => {
                                setClicked(false);
                                setNumberOfEmployee(e.target.value);}} id="numberOfEmployees" name="numberOfEmployees" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose One</option>}
                                    <option>Less than 50</option>
                                    <option>51-100</option>
                                    <option>101-500</option>
                                    <option>More than 500</option>

                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="annualRevenue" className="flex text-sm font-medium text-gray-600 mr-80">Annual Revenue :</label>
                            <div className="mt-2">
                                
                            <select value={annualRevenue} 
                            onChange={ (e) => {
                                setClicked(false);
                                setAnnualRevenue(e.target.value);}} id="numberOfEmployees" name="numberOfEmployees" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose One</option>}
                                    <option>Less than 1 million</option>
                                    <option>1 million - 5 million</option>
                                    <option>5 million - 10 million</option>
                                    <option>More than 10 million </option>

                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="name" className="flex text-sm font-medium text-gray-600 mr-80">Name :</label>
                            <div className="mt-2 flex ">
                                <input value={name} onChange={ (e) => setName(e.target.value)} type="text" name="name" id="name" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " />
                                
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="email" className="flex text-sm font-medium text-gray-600 mr-80">Email :</label>
                            <div className="mt-2">
                                <input value={email} onChange={ (e) => setEmail(e.target.value)} type="text" name="email" id="email" className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="companyPhone" className="flex text-sm font-medium text-gray-600 mr-80">Company Phone :</label>
                            <div className="mt-2"></div>
                            <div className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <PhoneInput
                                      phone={companyPhone}
                                      onChange={(phone) => setCompanyPhone(phone)}
                                    id ="companyPhone"
                                    name="companyPhone"
                                    placeholder="Enter phone number"                                 
                                    defaultCountry="usa"
                                    inputClass="w-full h-full outline-none placeholder-gray-400 text-gray-900 text-sm leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="personalPhone" className="flex text-sm font-medium text-gray-600 mr-80">Personal Phone :</label>
                            <div className="mt-2"></div>
                            <div className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <PhoneInput
                                     phone={personalPhone}
                                     onChange={(phone) => setPersonalPhone(phone)}
                                    id="personalPhone"
                                    name="personalPhone"
                                    placeholder="Enter phone number"
                                    defaultCountry="usa"
                                    inputClass="w-full h-full outline-none placeholder-gray-400 text-gray-900 text-sm leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="address" className="flex text-sm font-medium text-gray-600 mr-80">Address:</label>
                            <div className="mt-2">
                                <textarea
                                value={address} onChange={ (e) => setAddress(e.target.value)}
                                    id="address"
                                    name="address"
                                    rows="4"
                                    className="block w-4/5 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Type your answer here"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="industry" className="flex text-sm font-medium text-gray-600 mr-80">Industry :</label>
                            <div className="mt-2">
                            <select value={industry} 
                            onChange={ (e) => {
                                setClicked(false);
                                setIndustry(e.target.value);}} id="industry" name="industry" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose One</option>}
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
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="department" className="flex text-sm font-medium text-gray-600 mr-80">Department :</label>
                            <div className="mt-2">
                            <select value={department} 
                            onChange={ (e) => {
                                setClicked(false);
                                setDepartment(e.target.value);}} id="department" name="department" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose One</option>}
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
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="title" className="flex text-sm font-medium text-gray-600 mr-80">Title :</label>
                            <div className="mt-2">
                            <select value={title} 
                            onChange={ (e) => {
                                setClicked(false);
                                setTitle(e.target.value);}} id="title" name="title" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose One</option>}   
                                    <option>CEO/President</option>
                                    <option>Owner/Operator</option>
                                    <option>VP or C-level</option>
                                    <option>Director</option>
                                    <option>Manager or Snr. Manager</option>
                                    <option>Independent Contributor</option>
                                    <option>Designer/Developer</option>
                                    <option>Other</option>

                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="additionalNote" className="flex text-sm font-medium text-gray-600 mr-80">Additional Notes and Comments :</label>
                            <div className="mt-2">
                                <textarea
                                    value={additionalNote} onChange={ (e) => setAdditionalNote(e.target.value)}
                                    id="additionalNote"
                                    name="additionalNote"
                                    rows="4"
                                    className="block w-4/5 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Type your answer here"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="source" className="flex text-sm font-medium text-gray-600 mr-80">How did you discover SkillSyncer :</label>
                            <div className="mt-2">
                            <select value={source} 
                            onChange={ (e) => {
                                setClicked(false);
                                setSource(e.target.value);}} id="source" name="source" class="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {click && <option>Choose One</option>}
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
                    <button type="button" className="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Clear</button>
                    <button type="submit" className="rounded-md bg-slate-400 px-10 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
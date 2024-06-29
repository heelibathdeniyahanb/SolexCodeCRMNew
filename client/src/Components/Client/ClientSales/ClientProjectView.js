import React, { useState } from 'react';
import { MdFilterListAlt } from "react-icons/md";
// import avatar from '../Images/avatar1.png';
// import avatar2 from '../Images/avatar2.jpg';
import ClientCard from './ClientViewCard';
import StepLine from './StepLine';
import ClientViewTable from './ClientViewTable';
import {Link} from 'react-router-dom';

const ClientProjectView = () => {

    const [currentStep, setCurrentStep] = useState(2);
    const steps = ['Planning', 'Qualification', 'Proposal', 'Negotiation', 'Close - won'];

    const startDate = new Date('2023-01-05');
    const endDate = new Date('2024-05-12');

    return (
        <div className="ml-3 flex flex-col h-screen">
            {/* First Row */}
            <div className="flex items-center justify-center bg-gray-100 h-16 border-t-2">
                {/* Set a fixed width for the first row */}
                <div className="w-full max-w-screen-xl text-left px-4 flex items-center">

                    <div className='ml-2 flex '>
                        <span>All My Projects</span>
                        <div className='ml-36'>
                        <MdFilterListAlt />
                            {/* <img src={filter2} alt='filter' style={{ width: '18px', height: '25px' }} /> */}
                        </div>

                    </div>
                    <button className='w-24 h-7 bg-teal-700 bg-opacity-70 rounded-lg text-cyan-200 absolute right-6'><Link to='/clientform'>+Lead Form</Link></button>
                </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-row flex-grow border border-gray-300">
                {/* First Column */}
                <div className="bg-gray-200 flex-grow-0 flex-shrink-0 w-1/4 border-r border-gray-100">
                    <ClientCard
                        title="Social Media App"
                        progress={75}
                        startDate={startDate}
                        endDate={endDate}
                        amount={5000}
                        // avatar={}
                    />
                    <ClientCard
                        title="Mobile Development"
                        progress={25}
                        startDate={startDate}
                        endDate={endDate}
                        amount={5000}
                        // avatar={}
                    />
                </div>

                {/* Second Column */}
                <div className="bg-gray-100 flex-grow border border-gray-200 p-8">
                    <StepLine steps={steps} currentStep={currentStep} />
                    <div className='mt-12'>
                    <ClientViewTable />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ClientProjectView;




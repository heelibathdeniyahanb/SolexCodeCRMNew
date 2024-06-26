import React from 'react';
import LeadForm1 from '../../Components/LeadForm/LeadForm1';
import Header from '../../Components/Header/Header';
import Sidebar from './AdminSideNavBar';


const AdminAddLeadForm = () => {
    return (
        <div className="flex min-h-screen">
            <div className="h-screen fixed z-20">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1">
                <Header />
                <div className="overflow-y-auto flex-1 p-6">
                    <LeadForm1 />
                </div>
            </div>
        </div>
    );
};

export default AdminAddLeadForm;
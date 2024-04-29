import React from 'react';
import Header from '../../Components/Header/Header';
import Header2 from '../../Components/Header/Header2';
import Sidebar from './AdminSideNavBar';
import ListTable from '../../Components/AdminCompo/ListTable';


const SalesAdminListView = () => {
    return (
        <div className="flex">
            {/* Fixed sidebar */}
            <div className="fixed h-screen z-20">
                <Sidebar />
            </div>
            {/* Main content */}
            <div className="ml-72 flex flex-col flex-1">
                {/* Headers */}
                <Header />
                <div className='mr-20'>
                <Header2 />
                </div>
                
                {/* Scrollable table */}
                <div className="overflow-y-auto flex-1">
                    <ListTable />
                </div>
            </div>
        </div>
    );
};

export default SalesAdminListView;
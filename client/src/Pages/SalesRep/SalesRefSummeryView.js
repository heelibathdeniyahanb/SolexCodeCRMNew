import React from 'react';
import Header from '../Components/Header/Header';
import Sidebar from './Admin/AdminSideNavBar';
import Header2 from '../Components/Header/Header2'
import SummeryTables from '../Components/AdminCompo/SummeryTables';

const SalesRefSummeryView = () => {
    return (
        <div>

            <div className='relative'>

                <Header />
                <Header2 />

                <div className='absolute top-0 z-20 bg-fixed h-screen '>
                    <Sidebar />
                </div>

                <SummeryTables/>
            </div>

            
        </div>
    );
};

export default SalesRefSummeryView;
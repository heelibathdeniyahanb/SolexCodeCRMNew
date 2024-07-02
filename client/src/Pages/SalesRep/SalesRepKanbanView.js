import React from 'react';
import Sidebar from '../../Components/SalesRep/SalesRepNavBar';
import Header from '../../Components/Header/Header';
import Header2 from '../../Components/Header/SalesRepHeader2';
import SalesRepKanbanBoard from '../../Components/SalesRep/Kanbanboard/SaleRepKanbanBoard';

const SalesRepKanbanView = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <Header2 />

            <div className='flex flex-1 overflow-hidden'>
                <div className='fixed top-0 left-0 h-full z-20'>
                    <Sidebar />
                </div>

                <div className='flex-1 ml-72 overflow-auto'>
                    <SalesRepKanbanBoard />
                </div>
            </div>
        </div>

    );
};

export default SalesRepKanbanView;
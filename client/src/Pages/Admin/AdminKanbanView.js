import React from 'react';
import Header from '../../Components/Header/Header';
import Header2 from '../../Components/Header/Header2';
import Sidebar from './AdminSideNavBar';
import KanbanBoard from '../../Components/AdminCompo/KanbanBoard/KanbanBoard';

const AdminKanbanView = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header/>
            <Header2/>
            
            <div className='flex flex-1 overflow-hidden'>
                <div className='fixed top-0 left-0 h-full z-20'>
                    <Sidebar/>
                </div>
                
                <div className='flex-1 ml-72 overflow-auto'>
                    <KanbanBoard />
                </div>
            </div>
        </div>
    );
};

export default AdminKanbanView;
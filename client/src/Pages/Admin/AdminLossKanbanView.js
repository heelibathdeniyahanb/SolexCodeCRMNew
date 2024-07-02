import React from 'react';
import Header from '../../Components/Header/Header';
import Header2 from '../../Components/Header/Header2';
import Sidebar from './AdminSideNavBar';
import LossKanbanBoard from '../../Components/AdminCompo/KanbanBoard/LossKanbanBoard';


const AdminLossKanbanView = () => {
    return (
        <div className='relative'>
           
            <Header/>
            <Header2/>
          
            <div className='absolute top-0 z-20 bg-fixed h-screen'>
                <Sidebar/>
            </div>

             <div className='ml-72 flex  mr-2 h-full'>
            <LossKanbanBoard />
                 </div>  
                 
        </div>
    );
};

export default AdminLossKanbanView;


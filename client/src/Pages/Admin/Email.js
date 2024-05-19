import React,{useState} from 'react';
import Header from '../../Components/Header/Header';
import AdminSideNavBar from './AdminSideNavBar';
import SendEmail from '../../Components/AdminCompo/SendEmail';
import FilterUsers from '../../Components/AdminCompo/FilterUsers_Email';

export default function Email() {
  const [recipients, setRecipients] = useState([]);
  return (
    <div>
    <div className="sticky top-0 z-10">
                <Header />
            </div>
      <div className='flex'>
      <div className='sticky top-0 z-10 w-full lg:w-1/5 mb-4 lg:mb-0 lg:mr-10'>
                    <AdminSideNavBar />
                </div>
        <div className='flex-grow'>
          <div className='bg-white shadow-md p-6 rounded-lg'>
          <FilterUsers setRecipients={setRecipients} />
            <SendEmail recipients={recipients} />
          </div>
        </div>
      </div>
    </div>
  );
}

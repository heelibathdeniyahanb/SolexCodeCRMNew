import React from 'react';
//import RecruiterImg from '../Image/RecruiterImg';
import { BiSolidDashboard } from "react-icons/bi";
import { GrTicket } from "react-icons/gr";


import { FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import { IoDocumentSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Image1 from '../../Components/login/1.png'

import { Link } from 'react-router-dom';


export default function CustomerSupporterNavBar() {
  return (
    <div className='bg-[#294D61] text-[#ffff] w-[300px]  h-full   '>

     
        <div className='h-[200px] flex justify-center'>
            <img src={Image1} alt='' className='h-[150px]'></img>
    
            
        </div>
    
        <nav>
            <ul className='text-left '>

            <Link to='/customersupporter-dashboard'>
                <li className=''>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300'>
                        <div className='mr-8'>< BiSolidDashboard  size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Dashboard</label></div>
                    </div>
                </li>
               </Link>
               
                <Link to='/'>
                <li className=''>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300'>
                        <div className='mr-8'><GrTicket size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Tickets</label></div>
                    </div>
                </li>
               </Link>
                

                

                <li><Link to='/customersupportercalendar'>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><FaCalendarAlt  size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Calendar</label></div>
                    </div></Link>
                </li>

                <li><Link to='/customer-supporter-email'>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><MdEmail  size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Email</label></div>
                    </div>  </Link>
                </li>

                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><IoDocumentSharp size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Documents</label></div>
                    </div>
                </li>

                
                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><IoIosSettings size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                        <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Settings</label></div>
                    </div>
                </li>

                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><CiLogout  size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                        <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Logout</label></div>
                    </div>
                </li>
                
               
            </ul>

            <div className='flex items-center justify-center '>



</div>  
                
        </nav>
        
    
      
     
        </div>      
  
  )
}
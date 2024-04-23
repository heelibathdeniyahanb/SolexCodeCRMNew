import React from 'react';
//import RecruiterImg from '../Image/RecruiterImg';

import { FaTicket } from "react-icons/fa6";
import { GiSatelliteCommunication } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { MdAnalytics } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";

import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';


export default function SideNav() {
  return (
    <div className='bg-[#294D61] text-[#ffff] w-[300px]  h-screen   '>

        <div className='h-[200px]'>
            
        </div>
    
        <nav>
            <ul className='text-left '>

            <Link to='/quickguid'>
                <li className=''>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300'>
                        <div className='mr-8'>< FaBookReader size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Quick Guidelines</label></div>
                    </div>
                </li>
               </Link>
               
                <Link to='/ticketingsystem'>
                <li className=''>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300'>
                        <div className='mr-8'><FaTicket size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Ticketing System</label></div>
                    </div>
                </li>
               </Link>
                

                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><TbMessageChatbot size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Smart Hub</label></div>
                    </div>
                </li>

                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><GiSatelliteCommunication size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>SLAs</label></div>
                    </div>
                </li>

                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><BiBook size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Customer Survey</label></div>
                    </div>  
                </li>

                <li>
                    <div className='flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10'>
                        <div className='mr-8'><MdAnalytics size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                        <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Servise Analytics</label></div>
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
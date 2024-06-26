import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsQuestionCircle, BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ClientHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className='bg-gray-100 h-16 flex justify-end items-center px-6 drop-shadow-lg'>
            
            <div className='header-left flex gap-4 float-end'>
                <button className='text-gray-600' onClick={() => {}}>
                    <BsFillBellFill />
                </button>
                <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer"> {/* Open Gmail inbox in a new tab */}
                    <button className='text-gray-600'>
                        <BsFillEnvelopeFill />
                    </button>
                </a>
                <Link to='/quickguide'>
                <button className='text-gray-600' onClick={() => {}}>
                    <BsQuestionCircle />
                </button></Link>
                <div className="relative">
                    <button className='text-gray-600' onClick={toggleDropdown}>
                        <BsPersonCircle />
                    </button>
                    {showDropdown && (
                        <ul className="absolute top-10 right-0 bg-white border border-gray-200 p-2">
                           <li className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <Link to='/my-profile'>My Profile</Link>
                                
                            </li>
                            <li className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <a href="/">Log Out</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

export default ClientHeader;

import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsQuestionCircle, BsPersonCircle } from 'react-icons/bs';

const Header = () => {
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
                <button className='text-gray-600' onClick={() => {}}>
                    <BsFillEnvelopeFill />
                </button>
                <button className='text-gray-600' onClick={() => {}}>
                    <BsQuestionCircle />
                </button>
                <div className="relative">
                    <button className='text-gray-600' onClick={toggleDropdown}>
                        <BsPersonCircle />
                    </button>
                    {showDropdown && (
                        <ul className="absolute top-10 right-0 bg-white border border-gray-200 p-2">
                            <li>Profile</li>
                            <li>LogOut</li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsQuestionCircle, BsPersonCircle } from 'react-icons/bs';
const Header = ({ }) => {
    return (
        <header className='bg-gray-100 h-16 flex justify-end items-center px-6 drop-shadow-lg'>

          <div className='header-left flex gap-4 float-end '>
          <a href="#" className='text-gray-600'>
                    <BsFillBellFill />
                </a>
                <a href="#" className='text-gray-600'>
                    <BsFillEnvelopeFill />
                </a>
                <a href="#" className='text-gray-600'>
                    <BsQuestionCircle />
                </a>
                <a href="#" className='text-gray-600'>
                    <BsPersonCircle />
                </a>
          </div>
        </header>
      );
    }

export default Header;


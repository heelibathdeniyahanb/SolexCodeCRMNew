import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import analysis from '../../Images/analysis.png';
import won from '../../Images/won.png';
import list from '../../Images/list.png';
import lost from '../../Images/lost.png';
import overall from '../../Images/overall.png';

const SalesRepHeader2 = () => {
  return (
    <header className="bg-white xl:ml-72 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-8">
      <div className="header2-left flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
        <form className="relative">
          <input
            type="search"
            placeholder="        Search leads"
            className="w-full sm:w-72 h-8 p-4 rounded-lg bg-gray-300 placeholder-cyan-600"
          />
          <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-cyan-600">
            <IoIosSearch />
          </button>
        </form>
      </div>

      <div className="header2-right flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
        <button className="w-8 h-8 bg-gray-300 rounded-md">
          <img src={analysis} alt="analysis" />
        </button>
        <Link to='/salesrefwonkanbanview'>
        <button className="w-8 h-8 bg-gray-300 rounded-md">
          <img src={won} alt="won" />
        </button>
        </Link>

        <button className="w-8 h-8 bg-gray-300 rounded-md">
          <Link to="/listTable">
            <img src={list} alt="list" />
          </Link>
        </button>

        <Link to='/salesreflosskanbanview'>
        <button className="w-8 h-8 bg-gray-300 rounded-md">
          <img src={lost} alt="lost" />
        </button>
        </Link>

        <button className="w-8 h-8 bg-gray-300 rounded-md">
          <Link to="/Pages/Pages/salesRefSummeryView">
            <img src={overall} alt="overall" />
          </Link>
        </button>
      </div>
    </header>
  );
};

export default SalesRepHeader2;
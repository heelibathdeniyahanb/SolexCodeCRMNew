// App.js

import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const TicketClient= () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="pb-2 mb-4 text-2xl font-bold border-b-2 underline-offset-4">Support Request</h1>

      <table className="w-full space-y-reverse border ">
        <thead>
          <div></div>
          <tr className="bg-neutral-400">
            <th className="p-2 font-bold border-b"># Ticket no.</th>
            <th className="p-2 font-bold border-b">Topic</th>
            <th className="p-2 font-bold border-b">Helpdesk contact</th>
            <th className="p-2 font-bold border-b">View</th>
            <th className="p-2 font-bold border-b">Edit</th>
            <th className="p-2 font-bold border-b">Delete</th>
          </tr>
        </thead>
        <tbody>

        <tr className="bg-neutral-300">
            <td className="p-2 border">#2345</td>
            <td className="p-2 border">How can I invite my friend</td>
            <td className="p-2 border">Mr. Malith</td>
            <td className="p-2 border">
                 <Link to='/ViewTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">View</button>
              </Link> 
              </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link></td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          
          <tr className="bg-neutral-300">
            <td className="p-2 border">#2344</td>
            <td className="p-2 border">sent money. but they dissappeared.</td>
            <td className="p-2 border">Miss.Sandani</td>
            <td className="p-2 border">
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">View</button>
            </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link>
            </td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          
          <tr className="bg-neutral-300">
            <td className="p-2 border">#2343</td>
            <td className="p-2 border">Balance Error</td>
            <td className="p-2 border">Mr.Wijesekara</td>
            <td className="p-2 border">
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">View</button>
            </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link>
            </td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          
          <tr className="bg-neutral-300">
            <td className="p-2 border">#2342</td>
            <td className="p-2 border">How can I contact contractor</td>
            <td className="p-2 border">Mr.Aravinth</td>
            <td className="p-2 border">
              <button className="px-4 py-2 text-sky-500 bg-slate-100">View</button>
            </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link></td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2 border">#2341</td>
            <td className="p-2 border">why i can't decline my order</td>
            <td className="p-2 border">Miss.Neha</td>
            <td className="p-2 border">
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">View</button>
            </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link>
            </td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          
          <tr className="bg-neutral-300">
            <td className="p-2 border">#2340</td>
            <td className="p-2 border">How can I decline order</td>
            <td className="p-2 border">Mr. Nehan</td>
            <td className="p-2 border">
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">View</button>
            </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link>
            </td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          
          <tr className="bg-neutral-300">
            <td className="p-2 border">#2339</td>
            <td className="p-2 border">Some problems</td>
            <td className="p-2 border">Mrs.Delrin</td>
            <td className="p-2 border">
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">View</button>
            </td>
            <td className="p-2 border">
            <Link to='/EditTicketPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Edit</button>
            </Link></td>
            <td className="p-2 border">
            <div class="flex items-center justify-center px-4 py-2 rounded">
    <div class='mr-8'><MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
            </div>
            </td>
          </tr>
          
          <Link to='/createtickets'>
          <button className="absolute px-4 py-2 text-black bg-blue-500 rounded bottom-4 right-4">
        Create New Ticket
      </button>
          </Link>
          
          
        </tbody>
      </table>
    </div>
  );
};

export default TicketClient

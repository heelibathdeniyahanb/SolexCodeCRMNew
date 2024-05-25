// App.js


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";



const TicketClient = () => {
  
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = () => {
    setMessage('Successfully deleted');
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setMessage('');
  };
  
  return (
    <div className="container px-4 mx-auto mt-8">
      <h1 className="pb-2 mb-4 text-2xl text-[#294D61] font-bold underline border-b-2">Support Request</h1>

      {showDialog && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <div className="text-lg font-semibold">{message}</div>
            <button
              className="px-4 py-2 mt-4 text-white bg-[#294D61] rounded-md"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    
      

      <table className="w-full space-y-reverse border ">
        <thead>
          <div></div>
          <tr className="bg-[#294d61a9]">
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
              <div className="flex items-center justify-center px-4 py-2 rounded">
                <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
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
    <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
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
            <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
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
            <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
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
            <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
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
            <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
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
            <button className="mr-8" onClick={handleDelete}>
                  <MdDelete size={20} className="opacity-25 sm:w-6 sm:h-6" />
                </button>
            </div>
            </td>
          </tr>
          
          <Link to='/createtickets'>
          <button className="absolute px-4 py-2 text-white bg-[#294D61] rounded bottom-4 right-4">
        Create New Ticket
      </button>
          </Link>
          
          
        </tbody>
      </table>
    </div>
  );
};

export default TicketClient;

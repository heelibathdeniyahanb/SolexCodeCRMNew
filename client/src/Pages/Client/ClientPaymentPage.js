import SideBar from '../../Components/Client/ClientSideNavBar';
import NavbarMenu from '../../Components/Client/ClientSales/Navbar';
import React, { useState } from 'react';

  const columns = [
    {
      title: 'Planning',
      cards: [
        { 
          title: 'Social Media App', 
          client: 'Client A', 
          start: '01/01/2023', 
          end: '01/31/2023', 
          amount: '1500$', 
          imgSrc: 'path/to/social_media_app_img.jpg'
        },
        { 
          title: 'Mobile Development', 
          client: 'Client B', 
          start: '02/01/2023', 
          end: '02/28/2023', 
          amount: '1500$', 
          imgSrc: 'path/to/mobile_development_img.jpg'
        },
      ],
    }
  ];

  const KanbanCard = ({ card }) => (
    <div className="bg-white rounded shadow p-4 ">
      <div className="flex items-center space-x-2">
        <div>
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p className="text-sm text-teal-700 font-semibold">{card.client}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 flex items-center space-x-2 space-y-4">
        <img src={card.imgSrc} alt={card.title} className="w-10 h-10 rounded-full mr-2" />
        <p className="flex items-center">Start: {card.start}</p>
        <p className="flex items-center">End: {card.end}</p>
      </div>
      <div className="text-sm flex items-center justify-between space-x-2 p-2 rounded-md ">
        <p className="font-bold text-sm">{card.amount}</p>
        {card.title === 'Social Media App' ? (
          <button className="px-4 py-2 bg-transparent text-red-500 border border-red-500 font-semibold rounded-md shadow hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            Paid
          </button>
        ) : (
          <button className="px-4 py-2 bg-transparent text-blue-500 border border-blue-500 font-semibold hover:bg-blue-500 hover:text-white rounded-md shadow cursor-pointer">
            Not Paid
          </button>
        )}
      </div>
    </div>
  );

  const KanbanColumn = ({ title, cards }) => (
    <div className="w-full md:w-72 bg-white rounded  flex flex-col space-y-4 border border-gray-200">
      {cards.map((card, index) => (
        <KanbanCard key={index} card={card} />
      ))}
    </div>
  );

  const PaymentDetails = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-200 rounded shadow p-6 space-y-4 border border-gray-400">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-start text-black py-2 rounded">Payment Details</h2>
            <button onClick={toggleDetails} className="focus:outline-none">
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  showDetails ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <label className="block text-black font-semibold w-32">Project</label>
            <select className="w-full border border-gray-300 rounded focus:outline-none focus:border-teal-700">
              <option value="">Select Project</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
              <option value="project3">Project 3</option>
            </select>
          </div>
          
        {showDetails && (
          <div className="rounded-md">
            <div className="flex items-center mb-2">
              <label className="block text-black font-semibold w-32">Total Fee</label>
              <p>$500</p>
            </div>
            <div className="flex items-center mb-2">
              <label className="block text-black font-semibold w-32">Installments</label>
              <p>5</p>
            </div>
            <div className="flex items-center mb-2">
              <label className="block text-black font-semibold w-32">Payable Amount</label>
              <p>$500</p>
            </div>
            <div className="flex items-center mb-2">
              <label className="block text-black font-semibold w-32">Next Installment</label>
              <p>3/7 of $100</p>
            </div>
            <div className="flex items-center mb-2">
              <label className="block text-black font-semibold w-32">Due Date</label>
              <p>10/05/2023</p>
            </div>
            <div className="flex items-center mb-2">
              <label className="block text-black font-semibold w-32">Last Payment</label>
              <p>$250 on 10/02/2022</p>
            </div>
            <div className="flex justify-end">
              <button className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
                Edit
              </button>
            </div>
          </div>
        )}
      </div>


      <div className="bg-gray-200 rounded shadow p-4 space-y-4 border border-gray-400">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-start text-black py-2 rounded">Make Payment</h2>
            <button onClick={toggleVisibility} className="focus:outline-none">
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  isVisible ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          {isVisible && (
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="block text-black font-semibold w-1/3">Card Number</label>
                <input
                  type="text"
                  className="w-2/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-700"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-black font-semibold w-1/3">CVC</label>
                <input
                  type="text"
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-700"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-black font-semibold w-1/3">Expiration Date</label>
                <div className="flex space-x-2 ml-6">
                  <input
                    type="text"
                    placeholder="Month"
                    className="w-1/6 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-teal-700"
                  />
                  <span className="self-center">/</span>
                  <input
                    type="text"
                    placeholder="Year"
                    className="w-1/6 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button className="px-4 py-1 bg-gray-700 text-white font-semibold rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                  Clear
                </button>
                <button className="px-4 py-1 bg-gray-700 text-white font-semibold rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700">
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PaymentView1 = () => (
    <div className="flex p-4 space-x-4 overflow-x-auto flex-wrap md:flex-nowrap">
      <div className="flex flex-col space-y-4 w-full md:w-1/4">
        {columns[0].cards.map((card, index) => (
          <KanbanColumn key={index} title={columns[0].title} cards={[card]} />
        ))}
      </div>
    
      <div className="flex-1 md:w-1/2 space-y-4"> 
        <PaymentDetails />
      </div>
    
      <div className="flex flex-col space-y-4 w-full md:w-1/4 bg-gray-400">
        <div className="flex items-center space-x-4 mb-4">
          <input type="text" placeholder="Search..." className="px-4 py-2 m-4 border border-gray-300 rounded-lg w-full" />
        </div>
        <div className="flex items-center space-x-4 m-4">
          <label className="flex items-center space-x-2 font-semibold">
            <input type="checkbox" className="form-checkbox" />
            <span>Project</span>
          </label>
          <label className="flex items-center space-x-2 font-semibold">
            <input type="checkbox" className="form-checkbox" />
            <span>Date</span>
          </label>
        </div>
        <div className="m-4">
        <div className="bg-gray-200 border border-gray-300 rounded-lg p-6 mb-4">
      <h2>Mobile Development</h2>
          <div className="flex justify-between">
                  <div>
                      <p>Amount: $500</p>
                  </div>
                  <div>
                      <p>Date</p>
                  </div>
              </div>
              <div className="flex justify-between">
                  <div>
                      <p>Amount: $500</p>
                  </div>
                  <div>
                      <p>Date</p>
                  </div>
              </div> 
          </div>

          <div className="bg-gray-200 border border-gray-300 rounded-lg p-6 mb-4">
            Card 2
          </div>
          <div className="bg-gray-200 border border-gray-300 rounded-lg p-6 mb-4">
            Card 3
          </div>
        </div>
      </div>
    </div>
  );

  const ClientPaymentView1 = () => {
    return (
      <div className="bg-opacity-20 h-screen flex">
        <SideBar className="hidden md:block h-full md:h-screen" />
        <div className="flex-1 flex flex-col">
          <NavbarMenu className="md:hidden" />
          <div className="p-4 -mt-4 flex-1 overflow-auto">
            <PaymentView1 />
          </div>
        </div>
      </div>
    );
  };

  export default ClientPaymentView1;

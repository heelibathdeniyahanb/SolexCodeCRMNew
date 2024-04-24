import React from 'react';

const EventAdminSalesRepTable = () => {
    const event = [
        {
          eventName:'X Project IOS Version launch',
          name: 'Jane Cooper',
          date:'2024.02.05',
          time: '09.00 AM',
          type:'Onsite',
          venue:'UoM',
          priority: 'high',
          participants : '',
         
        } ];
    
    
    return (
        
        <div>
            <div className="flex flex-col py-5 px-5">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Event Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                   Time
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                   Venue
                    </th>
                    
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                   Priority
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Type
                    </th>


                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                  </th>
                   
                   <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                      </th>
                  </tr>
                </thead>

                {/*table body*/}
                <tbody className="bg-white divide-y divide-gray-200">
                  {event.map(event => (
                    <tr key={event.id}>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.eventName}</div>
                      </td>

                      

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.date}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.time}</div>
                        
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.venue}</div>
                        
                      </td>


                     
                      <td className=" px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-500 ">
                         {event.priority}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.type}</div>
                        
                      </td>

                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <a href="#" className="text-indigo-600 hover:text-indigo-900">
                         View
                        </a>
                       </td>


                      
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                  </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default EventAdminSalesRepTable;
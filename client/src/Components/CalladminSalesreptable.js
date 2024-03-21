import React from 'react';

const CalladminSalesreptable = () => {
    const call =[
        {
        subject: 'Regarding ABC project',
        date : '2023/12/28',
        startTime : '9.00 AM ',
        endtime :'', 
        host : 'Nimasha Heelibathdeniya',
        participants : "",
        priorityLevel : "normal",
        hostImage : ""

        }
    ];
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
                Subject
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
              Host
                </th>
                
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
               Priority
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
              {call.map(call => (
                <tr key={call.id}>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{call.subject}</div>
                  </td>

                  

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{call.date}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{call.startTime}</div>
                    
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{call.host}</div>
                    
                  </td>


                 
                  <td className=" px-6 py-4 whitespace-nowrap  ">
                    {call.priorityLevel}
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

export default CalladminSalesreptable;
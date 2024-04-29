import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';


const ListTable = () => {
  const [taskData,setTaskData] = useState([]);


    useEffect(() => {
      axios
        .get(`https://localhost:7166/api/Lead`)
        .then((response) => {
          const taskcData = response.data;
          console.log(taskcData);
          setTaskData(taskcData);

          // const formatDAta = taskcData.map((data) => ({...data, columnId: data.salesPipeline}));
          // console.log("DATA", formatDAta);

          // setTasks(formatDAta);
        })
        .catch(() => console.log("error has occured"));
  }, []);

 return(

    <div className="h-screen flex flex-col py-5 px-5 overflow-y-auto">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
        <div className="shadow  border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-zinc-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                   Lead Title
                </th>
                <th
                  scope="col"
                  className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Due Date
                </th>
                <th
                  scope="col"
                  className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lead Status
                </th>
                
                <th
                  scope="col"
                  className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
               Company
                </th>

                <th
                  scope="col"
                  className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
              Stage
                </th>
               
                <th
                  scope="col"
                  className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
              Assignee
                </th>
               
               <th scope="col" className="relative px-12 py-3">
              <span className="sr-only">View</span>
              </th>
               
                <th scope="col" className="relative px-12 py-3">
                  <span className="sr-only">Edit</span>
                  </th>
              </tr>
            </thead>

            {/*table body*/}
            <tbody className="bg-white divide-y divide-gray-200">
              {taskData.map(taskData => (
                <tr key={taskData.id}>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{taskData.leadName}</div>
                  </td>

                  

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{taskData.endDate.substring(0, 10)}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {taskData.leadStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {taskData.companyName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{taskData.salesPipeline}</div>
                    
                  </td>

                  <td className=" owner px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                      <Avatar src={Avatar} size="32" round={true} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{taskData.salesRep}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="./Pages/AdminlistDetails" className="text-indigo-600 hover:text-indigo-900">
                    View
                    </a></td>
                  

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

 );
}

export default ListTable;

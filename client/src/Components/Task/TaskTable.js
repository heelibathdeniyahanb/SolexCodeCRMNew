import React from "react";

function TaskTable(){

    const task = [
        {
          taskName:'Create Login Page',
          name: 'Jane Cooper',
          dateAdded:'2024.01.15',
          dueDate:'2024.02.05',
          lastModified:'2021.01.25',
          RelatedTo: 'CRM System',
          priority: 'normal',
          status:"Completed",
          company:'Mass',
          email: 'jane.cooper@gmail.com',
          image: 'https://bit.ly/33HnjK0',
        } ];

     return(
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
                      Task Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
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
                  Related To
                    </th>
                   
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                  Owner
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
                  {task.map(task => (
                    <tr key={task.id}>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.taskName}</div>
                      </td>

                      

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.dueDate}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.priority}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.company}</div>
                        
                      </td>

                      <td className=" owner px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={task.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{task.name}</div>
                            <div className="text-sm text-gray-500">{task.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="./Pages/TaskDetailsPage" className="text-indigo-600 hover:text-indigo-900">
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

export default TaskTable;
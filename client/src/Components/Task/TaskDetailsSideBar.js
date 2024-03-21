import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

const TaskDetailsSideBar = () => {

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
        } 

    ];
    return (

        <div class=" barbody text-white shadow overflow-hidden sm:rounded-md max-w-sm mx-0 mt-0 bg-cyan-900 border w-50 px-5 py-5   "> 
            <ul>
                <li>
                <div className=' alltasks flex  '>
                        <a href='Task.js'><FaArrowLeft /></a> 
                        <div className='text-lg mx-5  '> All Tasks</div>
                </div> 
                 </li>
                <li>
                    {task.map(task=>  (
                        <li key={task.id}>
                            <div class="px-4 py-5 sm:px-6 text-sm">
                                 <div class="flex items-center justify-between">
                                   <h3 class=" leading-6 font-medium ">{task.taskName}</h3>
                                   <p class="mt-1 max-w-2xl  ">Due Date : {task.dueDate}</p>
                                 </div>
                                 <div class="mt-4 flex items-center justify-between">
                                   <p class=" font-medium">Status: <span class="text-green-600">{task.status} </span></p>
                                   <a href="#" class="font-bold text-gray-200 hover:text-green-600">View</a>
                                   <a href="#" class="font-bold text-gray-200 hover:text-green-600">Edit</a>
                                  
                                  </div>
                              </div>


                        </li>
                    ))}
                </li>

                 
                 <li>
        
    </li>

                 <li>
                    
                 </li>
                
            </ul> 
                
           
           

          
         
        </div>
    );
};

export default TaskDetailsSideBar;
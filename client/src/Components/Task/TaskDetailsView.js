import React from 'react';

const TaskDetailsView = () => {

    const task = [
        {
          taskName:'Development',
          name: 'Jane Cooper',
          dateAdded:'2024.01.15',
          dueDate:'2024.02.05',
          lastModified:'2021.01.25',
          relatedTo : 'CRM System',
          priority: 'normal',
          status:"Completed",
          company:'Mass',
          email: 'jane.cooper@gmail.com',
          image: 'https://bit.ly/33HnjK0',
          clientemail: 'mass@gmail.com',
          description:""
        } 

    ];
    return (
        <div className=' border '>
           
                
                    {task.map(task=>  (
                        <div key={task.id}>
                            <ul>
                            <div class=" py-5 sm:px-6 text-sm mx-right-60">
                                <div className='taskviewhead border '>
                                     <li className='text-xl text-center font-bold '>{task.taskName} </li>
                                     <div className=' justify-center flex'>
                                        <img className="h-8 w-8 rounded-full items-center" src={task.image} alt="" />
                                     </div>
                                     <div className='justify-center text-center'>
                                        <li>priority : {task.priority}</li>
                                     </div>

                                     
                                  
                                </div>
                                 
                                <div className='box text-justify items-center text-base/loose'>
                                    
                                    <li>Task Owner : {task.name} / {task.email}</li>
                                   
                                    <li>Company Name: {task.company} / {task.clientemail}</li>
                                    <li>Related To: {task.relatedTo}</li>


                                    <li>Description : {task.description}</li>

                                    <div className='dates flex items-center justify-between'>
                                        <li  >Date Added:{task.dateAdded}</li>
                                        <li class=" font-bold  ">Due Date : {task.dueDate}</li>
                                        <li >Last Modified Date : {task.lastModified}</li>
                                    </div>
                                   
                                 <div class="mt-4  items-center justify-between">
                                   <p class=" font-medium">Status: <span class="text-green-600">{task.status} </span></p>
                                  
                                  </div>
                                  </div>

                                </div>
                                   
                                  
                                 
                             
                            </ul>
                           


                        </div>
                    ))}
              </div>


          
     
    );
};

export default TaskDetailsView;
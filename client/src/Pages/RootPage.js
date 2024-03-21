import React from 'react';
import { Link } from 'react-router-dom';

const RootPage = () => {
    return (
        <div>
           hello 
           
           <Link to = './admincalendar' className=''>Admin</Link>
           <Link to= './salesrepcalendar' >Salesrep</Link>
           <Link to='./clientcalendar'>Client</Link>
           <Link to= '/customersupportercalendar'>customer supporter</Link>
        </div>
    );
};

export default RootPage;
import React from 'react';
import { Link } from 'react-router-dom';

const RootPage = () => {
    return (
        <div>
       
           
           <Link to = './admincalendar' className=''>Admin</Link> <br></br>
           <Link to= './salesrepcalendar' >Salesrep</Link><br></br>
           <Link to='./clientcalendar'>Client</Link><br></br>
           <Link to= '/customersupportercalendar'>customer supporter</Link><br></br>
        </div>
    );
};

export default RootPage;
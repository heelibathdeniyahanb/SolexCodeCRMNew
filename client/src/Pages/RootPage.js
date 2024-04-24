import React from 'react';
import { Link } from 'react-router-dom';

const RootPage = () => {
    return (
        <div>
       
           
           <Link to = '/admindashboard' className=''>Admin</Link> <br></br>
           <Link to= '/salesrepdashboard' >Salesrep</Link><br></br>
           <Link to='/clientdashboard'>Client</Link><br></br>
           <Link to= '/customersupportercalendar'>customer supporter</Link><br></br>
        </div>
    );
};

export default RootPage;
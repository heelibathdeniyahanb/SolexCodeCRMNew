
import './App.css';
//import Login from './Components/Login';

import {BrowserRouter,Route ,Routes} from "react-router-dom";

import Task from './Pages/SalesRep/Task';
import Event from './Pages/SalesRep/Event';
import Call from './Pages/Call';
import AddTask from './Pages/SalesRep/AddTask';
import AddEvent from './Pages/SalesRep/AddEvent';
import AddCall from './Pages/AddCall';
//import AdminTaskDetails from './Pages/TaskDetailsPage';
import RootPage from './Pages/RootPage';
import SalesRepCalendar from './Pages/SalesRep/SalesRepCalendar';
import ClientCalendar from './Pages/Client/ClientCalendar';
import ClientCall from './Pages/ClientCall';

import ClientEvent from './Pages/Client/ClientEvent';
import TaskDetailsPage from './Pages/TaskDetailsPage';
import CustomerSupporterCalendar from './Pages/CustomerSupporter/CustomerSupporterCalendar';
import AdminAddEvent from './Pages/Admin/AdminAddEvent';
import AdminAddTask from './Pages/Admin/AdminAddTask';

import AdminEvent from './Pages/Admin/AdminEvent';
import AdminTask from './Pages/Admin/AdminTask';
import ClientLeadProgress from './Pages/Client/ClientLeadProgress';
import AdminCalendar from './Pages/Admin/AdminCalendar';
import Login from './Components/login/Login'

import TicketingSystem from './Pages/Client/TicketingSystem';
import QuickGuid from './Pages/Client/QuickGuid';
import CreateTickets from './Pages/Client/CreateTickets';
import DeligateListPage from './Pages/Client/DeligateListPage';
import EditTicketPage from './Pages/Client/EditTicketPage';
import ViewTicketPage from './Pages/Client/ViewTicketPage';
import AdminSideNavBar from './Pages/Admin/AdminSideNavBar';
import ClientSideNavBar from './Components/Client/ClientSideNavBar';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddUsers from './Components/AdminCompo/AddUser';
import SalesRepNavBar from './Components/SalesRep/SalesRepNavBar';
import SalesRepDashboard from './Pages/SalesRep/SalesRepDashboard';
import AddUserPage from './Pages/Admin/AddUserPage';

import AnalysePage from './Pages/Analysing/AnalysePage';
import Reports from './Pages/Analysing/Reports';
import KPI from './Pages/Analysing/KPI';
import Comparator from './Pages/Analysing/Comparator';

function App() {
  return (
    <div className='App'>
      
      <BrowserRouter>
        <Routes>
        
         <Route path='/' element={<Login/>}></Route>
         <Route path='/rootpage' element={<RootPage/>}></Route>

         <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
         <Route path='/salesrepdashboard' element={<SalesRepDashboard/>}></Route>

         <Route path='adduser' element={<AddUsers/>}></Route>
         <Route path='/adduserpage' element={<AddUserPage/>}></Route>
          <Route path='/salesrepcalendar' element={<SalesRepCalendar/>}></Route>
          <Route path='/clientcalendar' element={<ClientCalendar/>}></Route>
          <Route path='/customersupportercalendar' element={<CustomerSupporterCalendar/>}></Route>
          <Route path='/admincalendar' element = {<AdminCalendar/>}></Route>

          <Route path='/adminSideNavBar' element ={<AdminSideNavBar/>}></Route>
          <Route path='/clientsidenavbar' element = {<ClientSideNavBar/>}></Route>
          <Route path='/salesrepnavbar' element= {<SalesRepNavBar/>}></Route>
          
         
          <Route path='/task' element={<Task/>}></Route>
          <Route path='/event' element={<Event/>}></Route>
          <Route path='/call' element = {<Call/>}></Route>
          <Route path='/adminaddevent' element={<AdminAddEvent/>}></Route>
          <Route path='adminaddtask' element = {<AdminAddTask/>}></Route>
          <Route path='adminevent' element = {<AdminEvent/>}></Route>
          <Route path='admintask' element = {<AdminTask/>}></Route>
          <Route path='/addtask' element={<AddTask/>}></Route>
          <Route path='/addevent' element={<AddEvent/>}></Route>
          <Route path='/addcall' element={<AddCall/>}></Route>
          <Route path='/Pages/taskdetailspage' element={<TaskDetailsPage/>}></Route>
          <Route path='clientcalendar' element = {<ClientCalendar/>}></Route>
          <Route path='event' element = {<Event/>}></Route>

          <Route path='/clientcall' element={<ClientCall/>}></Route>
          <Route path='/clientleadprogress' element={<ClientLeadProgress/>}></Route>
          <Route path='/clientevent' element={<ClientEvent/>}></Route>
          
          <Route path='/quickguid' element={<QuickGuid/>}></Route>
          <Route path='/ticketingsystem' element={<TicketingSystem/>}></Route>
          <Route path='/createtickets' element={<CreateTickets/>}></Route>
          <Route path='/deligatelistpage' element={<DeligateListPage/>}></Route>
          <Route path='/editticketpage' element={<EditTicketPage/>}></Route>
          <Route path='/viewticketpage' element={<ViewTicketPage/>}></Route>
          
          <Route path='AnalysePage' element={<AnalysePage/>}></Route>
          <Route path='/reports' element={<Reports/>}></Route>
          <Route path='/kpi' element={<KPI/>}></Route>
          <Route path='/comparator' element={<Comparator/>}></Route>
          
        </Routes>
       
        </BrowserRouter>
    </div>
  );
}

export default App;

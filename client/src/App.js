
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

import CustomerSupporterCalendar from './Pages/CustomerSupporter/CustomerSupporterCalendar';
import AdminAddEvent from './Pages/Admin/AdminAddEvent';
import AdminAddTask from './Pages/Admin/AdminAddTask';

import AdminEvent from './Pages/Admin/AdminEvent';
import AdminTask from './Pages/Admin/AdminTask';
import ClientLeadProgress from './Pages/Client/ClientLeadProgress';
import AdminCalendar from './Pages/Admin/AdminCalendar';
import Login from './Components/login/Login'

import TicketingSystem from './Pages/Client/TicketingSystem';
import QuickGuide from './Pages/Client/QuickGuide';
import CreateTickets from './Pages/Client/CreateTickets';
import DeligateListPage from './Pages/Client/DeligateListPage';
import EditTicketPage from './Pages/Client/EditTicketPage';
import ViewTicketPage from './Pages/Client/ViewTicketPage';
import CustomerSurvey from './Pages/Client/CustomerSurvey';
import ServiceAnalytics from './Pages/Client/ServiceAnalytics';



import AdminSideNavBar from './Pages/Admin/AdminSideNavBar';
import ClientSideNavBar from './Components/Client/ClientSideNavBar';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddUsers from './Components/AdminCompo/AddUser';
import SalesRepNavBar from './Components/SalesRep/SalesRepNavBar';
import SalesRepDashboard from './Pages/SalesRep/SalesRepDashboard';
import AddUserPage from './Pages/Admin/AddUserPage';
import AdminDashboardCard from './Components/AdminCompo/AdminDashboardCard';
import AdminDashboardCard2 from './Components/AdminCompo/AdminDashboardCard2';
import AdminDashboardCard3 from './Components/AdminCompo/AdminDashboardCard3';
import AdminDashboardLatestClients from './Components/AdminCompo/AdminDashboardLatestClients';
import AdminDashboardSheduledEventsTasks from './Components/AdminCompo/AdminDashboardSheduledEventsTasks';
import AdminDashboardOngoingLeads from './Components/AdminCompo/AdninDashboardOngoingLeads';
import AdminKanbanView from './Pages/Admin/AdminKanbanView';
import AdminAddLeadForm from './Pages/Admin/AdminAddLeadForm';
import SalesAdminListView from './Pages/Admin/SalesAdminListView';
import ClientDashboard from './Pages/Client/ClientDashboard';
import ServicelevelAgreement from './Pages/Admin/ServiceLevelAgreement';

import SendEmail from './Components/AdminCompo/SendEmail';
import Email from './Pages/Admin/Email';

import AnalysePage from './Components/AnalyzingCompo/Analysepage';
import RectangularCard from './Components/AnalyzingCompo/RectangularCard';
import ReportMenu from './Components/AnalyzingCompo/ReportMenu';
import Report from './Components/AnalyzingCompo/Report';
import Charts from './Components/AnalyzingCompo/Charts';
import KPI from './Components/AnalyzingCompo/KPI';
import Comparator from './Components/AnalyzingCompo/Comparator';
import MyProjects from './Pages/Client/MyProjects';
import { UserProvider } from './Components/login/UserContext';
import Users from './Components/Users';
import Image from './Components/Image';
import SuperAdmin from './Pages/Admin/SuperAdmin';

import AdminCreateInvoice from './Components/AdminCompo/AdminInvoice/AdminCreateInvoice';
import AdminInvoiceCard from './Components/AdminCompo/AdminInvoice/AdminInvoiceCard';
import Invoice from './Components/AdminCompo/AdminInvoice/Invoice';
import InvoiceForm from './Components/AdminCompo/AdminInvoice/InvoiceForm';
import ClientViewSalesLead from './Pages/Client/ClientViewSalesLead';
import ClientLeadForm from './Pages/Client/ClientLeadForm';
import SalesRepInvoice from './Pages/SalesRep/SalesRepInvoice';
import AdminInvoice from './Pages/Admin/AdminInvoice';

function App() {
  return (
    <div className='App'>
      
      <BrowserRouter>
      <UserProvider>

        <Routes>
        
         <Route path='/' element={<Login/>}></Route>
         <Route path='/rootpage' element={<RootPage/>}></Route>

         <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
         <Route path='/admindashboardcard' element={<AdminDashboardCard/>}></Route>
         <Route path='/admindashboardcard2' element={<AdminDashboardCard2/>}></Route>
         <Route path='/admindashboardcard3' element={<AdminDashboardCard3/>}></Route>
         <Route path='/admindashboardlatestclients' element={<AdminDashboardLatestClients/>}></Route>
         <Route path='/admindashboardseduledeventstasks' element={<AdminDashboardSheduledEventsTasks/>}></Route>
         <Route path='/admindashboardongoingleads' element={<AdminDashboardOngoingLeads/>}></Route>
         <Route path='/salesrepdashboard' element={<SalesRepDashboard/>}></Route>
         <Route path='/clientdashboard' element={<ClientDashboard/>}></Route>
         <Route path='/superadmin' element={<SuperAdmin/>}></Route>

         <Route path='adduser' element={<AddUsers/>}></Route>
         <Route path='/adduserpage' element={<AddUserPage/>}></Route>
         <Route path='/users' element={<Users/>}></Route>
         <Route path='/image' element={<Image/>}></Route>
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
          <Route path='/sendemail' element={<SendEmail/>}></Route>
         <Route path='/email' element={<Email/>}></Route>
          
          <Route path='/clientcalendar' element = {<ClientCalendar/>}></Route>
          <Route path='event' element = {<Event/>}></Route>

          <Route path='/clientcall' element={<ClientCall/>}></Route>
          <Route path='/clientleadprogress' element={<ClientLeadProgress/>}></Route>
          <Route path='/clientevent' element={<ClientEvent/>}></Route>
          <Route path='myprojects' element={<MyProjects/>}></Route>
          
          <Route path='/quickguide' element={<QuickGuide/>}></Route>
          <Route path='/ticketingsystem' element={<TicketingSystem/>}></Route>
          <Route path='/createtickets' element={<CreateTickets/>}></Route>
          <Route path='/deligatelistpage' element={<DeligateListPage/>}></Route>
          <Route path='/editticketpage' element={<EditTicketPage/>}></Route>
          <Route path='/viewticketpage' element={<ViewTicketPage/>}></Route>
          <Route path='/ServiceLevelAgreement' element={<ServicelevelAgreement/>}></Route>
          <Route path='/CustomerSurvey' element={<CustomerSurvey/>}></Route>
          <Route path='/ServiceAnalytics' element={<ServiceAnalytics/>}></Route>
          
          <Route path='/kanbanboard' element={<AdminKanbanView/>}></Route>
          <Route path='/addLeadForm' element={<AdminAddLeadForm/>}></Route>
          <Route path='/listTable' element={<SalesAdminListView/>}></Route>

          <Route path='/analysepage' element={<AnalysePage/>}></Route>
          <Route path='/rectangularcard' element={<RectangularCard/>}></Route>
          <Route path='/reportmenu' element={<ReportMenu/>}></Route>
          <Route path='/report' element={<Report/>}></Route>
          <Route path='/button' element={<button/>}></Route>
          <Route path='/charts' element={<Charts/>}></Route>
          <Route path='/kpi' element={<KPI/>}></Route>
          <Route path='/comparator' element={<Comparator/>}></Route>
          
          <Route path='/admincreateinvoice' element={<AdminCreateInvoice/>}></Route>
          <Route path='/admininvoicecard' element={<AdminInvoiceCard/>}></Route>
          <Route path='/invoice' element={<Invoice/>}></Route>
          <Route path='/invoiceform' element={<InvoiceForm/>}></Route>
          <Route path='/clientviewsaleslead' element={<ClientViewSalesLead/>}></Route>
          <Route path='/clientleadform' element={<ClientLeadForm/>}></Route>
          <Route path='/salesrepinvoice' element={<SalesRepInvoice/>}></Route>
          <Route path='/admininvoice' element={<AdminInvoice/>}></Route>

        </Routes>
        </UserProvider>
       
        </BrowserRouter>
    </div>
  );
}

export default App;

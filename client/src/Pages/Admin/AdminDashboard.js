import React from 'react';
import Header from '../../Components/Header/Header';
import AdminSideNavBar from './AdminSideNavBar';
import AdminDashboardCard from '../../Components/AdminCompo/AdminDashboardCard';
import AdminDashboardCard2 from '../../Components/AdminCompo/AdminDashboardCard2';
import AdminDashboardCard3 from '../../Components/AdminCompo/AdminDashboardCard3';
import AdminDashboardLatestClients from '../../Components/AdminCompo/AdminDashboardLatestClients';
import AdminDashboardOngoingLeads from '../../Components/AdminCompo/AdninDashboardOngoingLeads';
import AdminDashboardSheduledEventsTasks from '../../Components/AdminCompo/AdminDashboardSheduledEventsTasks';
import AdminDashboardRevenue from '../../Components/AdminCompo/AdminDashboardRevenue';

export default function AdminDashboard() {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="sticky top-0 h-screen">
          <AdminSideNavBar />
        </div>
        <div className="flex flex-col w-full md:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AdminDashboardCard />
            <AdminDashboardCard2 />
            <AdminDashboardCard3 />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            <AdminDashboardLatestClients />
            <AdminDashboardOngoingLeads />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            <AdminDashboardSheduledEventsTasks />
            <AdminDashboardRevenue />
          </div>
        </div>
      </div>
    </div>
  );
}
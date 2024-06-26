import React, { useState, useEffect } from 'react';
import Button from '../../Components/AnalyseCompo/Button';
import Card from '../../Components/AnalyseCompo/Card';
import Header from '../../Components/Header/Header';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';

const App = () => {
    const [data, setData] = useState({
        currentClients: 0,
        currentLeads: 0,
        revenueGenerated: 0,
        leadsOnProgress: 0,
        newClients: 0,
        currentTickets: 0,
    });

    useEffect(() => {
        // Simulating fetching data from backend
        const fetchData = async () => {
            // Replace with actual API call
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({
                    currentClients: 100,
                    currentLeads: 100,
                    revenueGenerated: 100,
                    leadsOnProgress: 100,
                    newClients: 100,
                    currentTickets: 100,
                }), 1000)
            );
            setData(response);
        };

        fetchData();
    }, []);

    return (
        <div className="flex">
            <SalesRepNavBar />
            <div className="flex-1">
                <Header />
                <div className="container mx-3 p-4">
                    <h1 className="text-4xl font-bold mb-4">Analyzing</h1>
                    <div className="flex p-6 mb-1">
                        <Button text="Reports" />
                        <Button text="Charts" />
                        <Button text="KPI" />
                        <Button text="Comparator" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Card title="Current Clients" value={data.currentClients} lastMonth="2000" />
                        <Card title="Current Leads" value={data.currentLeads} lastMonth="2000" />
                        <Card title="Revenue Generated" value={data.revenueGenerated} lastMonth="2000" />
                        <Card title="Leads On Progress" value={data.leadsOnProgress} lastMonth="2000" />
                        <Card title="New Clients" value={data.newClients} lastMonth="2000" />
                        <Card title="Current Tickets" value={data.currentTickets} lastMonth="2000" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

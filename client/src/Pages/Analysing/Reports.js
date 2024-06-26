// src/App.js
import React, { useState, useEffect } from 'react';
import Button from '../../Components/AnalyseCompo/Button'; 
import Header from '../../Components/Header/Header';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';
import TableRow from '../../Components/AnalyseCompo/TableRow';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulating fetching data from backend
        const fetchData = async () => {
            // Replace with actual API call
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve([
                    { leadName: 'Social Media App', description: 'Summarizes the various stages of New and Existing', lastRunDate: '2 Jul' },
                    { leadName: 'IOS App', description: '.', lastRunDate: '5 Feb' },
                    { leadName: 'Calculator App', description: '.', lastRunDate: '20 May 2021' },
                    { leadName: 'Tracker App', description: '.', lastRunDate: '16 May 2021' },
                ]), 1000)
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
                <div className="container mx-3 p-4 pr-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Analyzing</h1>
                <div className></div>
                    <div className="flex">
                        <Button text="Reports" />
                        <Button text="Charts" />
                        <Button text="KPI" />
                        <Button text="Comparator" />
                    </div>
                <div className="p-8">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="p-4 border-b">Select</th>
                                <th className="p-4 border-b">Lead Name</th>
                                <th className="p-4 border-b">Description</th>
                                <th className="p-4 border-b">Last Run Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    leadName={row.leadName}
                                    description={row.description}
                                    lastRunDate={row.lastRunDate}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default App;

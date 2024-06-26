import React, { useEffect, useState } from 'react';
import Button from '../../Components/AnalyseCompo/Button';
import Header from '../../Components/Header/Header';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';
import LeadOwners from '../../Components/AnalyseCompo/LeadOwners';
import BestPerformingLeads from '../../Components/AnalyseCompo/BestPerformingLeads';
import LeadsPerformingRegions from '../../Components/AnalyseCompo/LeadsPerformingRegions';

const MainContent = () => {
  const [data, setData] = useState({
    leadOwners: [],
    bestLeads: [],
    leastRegions: []
  });

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setData({
        leadOwners: [
          { name: 'Martha Hills', leads: 508 },
          { name: 'Amelia Burrows', leads: 371 },
          { name: 'Jacob Luluwago', leads: 290 },
          { name: 'Quinn Rivers', leads: 126 },
          { name: 'Joane ee', leads: 1 }
        ],
        bestLeads: [
          { name: 'None', revenue: 9558299 },
          { name: 'Advertisement', revenue: 8406000 },
          { name: 'Public Relations', revenue: 3965000 },
          { name: 'Cold Call', revenue: 3901300 },
          { name: 'Employee Referral', revenue: 3045550 },
          { name: 'Partner', revenue: 2777800 },
          { name: 'External Referral', revenue: 2397790 },
          { name: 'Web Research', revenue: 1640000 },
          { name: 'Trade Show', revenue: 1235680 },
          { name: 'OnlineStore', revenue: 599990 }
        ],
        leastRegions: [
          { name: 'Argentina', revenue: 10000 },
          { name: 'Ukraine', revenue: 12500 },
          { name: 'San Marino', revenue: 19788 },
          { name: 'Puerto Rico', revenue: 25600 },
          { name: 'Finland', revenue: 32140 }
        ]
      });
    }, 1000);
  }, []);

  return (
        <>
        <div className="flex">
        <SalesRepNavBar />
        <div className="flex-1">
            <Header />
            <div className="container mx-3 p-5">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Analyzing</h1>
              <div className="p-4">
                  <div className="flex mb-6">
                      <Button text="Reports" />
                      <Button text="Charts" />
                      <Button text="KPI" />
                      <Button text="Comparator" />
                  </div>
            
          <div className="grid grid-cols-3 gap-4">
                  <LeadOwners leadOwners={data.leadOwners} />
                  <BestPerformingLeads leads={data.bestLeads} />
                  <LeadsPerformingRegions regions={data.leastRegions} />
              </div>
          </div>
        </div>
        </div> 
        </div>
        </>
      );
  };

export default MainContent;

import React, { useEffect, useState } from 'react';
import Button from '../../Components/AnalyseCompo/Button';
import Header from '../../Components/Header/Header';
import SalesRepNavBar from '../../Components/SalesRep/SalesRepNavBar';
import PieChart from '../../Components/AnalyseCompo/PieChart';
import OpportunitiesSummary from '../../Components/AnalyseCompo/OpportunitiesSummary';
import OpenOpportunities from '../../Components/AnalyseCompo/OpenOpportunities';
import ClosedOpportunities from '../../Components/AnalyseCompo/ClosedOpportunities';
import WonOpportunities from '../../Components/AnalyseCompo/WonOpportunities';

const MainContent = () => {
  const [data, /*setData*/] = useState({
    pieData: {
      qualified: 45.6,
      negotiation: 20.4,
      demo: 20.4
    },
    summary: {
      totalOpportunities: 175,
      newOpportunities: 36
    },
    open: {
      qualified: 10,
      followUp: 12,
      negotiation: 8,
      demo: 30,
      revenue: 210000
    },
    closed: {
      unqualified: 36,
      lost: 14,
      revenue: 489036
    },
    won: {
      count: 65,
      revenue: 227500
    }
  });

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      // You can replace this with actual data fetching
    }, 1000);
  }, []);

  return (
    <><div className="flex">
      <SalesRepNavBar />
      <div className="flex-1">
        <Header />
        <div className="container mx-3 p-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Analyzing</h1>
        <div className>
          <div className="flex mb-4"></div>
        </div>
      </div>
      <Button text="Reports" />
      <Button text="Charts" />
      <Button text="KPI" />
      <Button text="Comparator" />
    </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1 lg:col-span-1">
          <PieChart data={data.pieData} />
        </div>
        <div className="col-span-1 lg:col-span-1 space-y-4">
          <OpportunitiesSummary summary={data.summary} />
          <OpenOpportunities open={data.open} />
          <ClosedOpportunities closed={data.closed} />
          <WonOpportunities won={data.won} />
        </div>
      </div>
      </div></>
  );
};

export default MainContent;

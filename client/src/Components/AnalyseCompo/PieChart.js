import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Qualified', 'Negotiation', 'Demo'],
    datasets: [
      {
        data: [data.qualified, data.negotiation, data.demo],
        backgroundColor: ['#E0E0E0', '#A3E4DB', '#5DADE2'],
        hoverBackgroundColor: ['#D5D5D5', '#8CD9C7', '#4A90E2']
      }
    ]
  };

  return <Pie data={chartData} />;
};

export default PieChart;

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Actual',
          data: [
            {
              x: 'Overall user Experience',
              y: 79,
              goals: [
                {
                  name: 'Expected',
                  value: 90,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#294D61',
                },
              ],
            },
            {
              x: 'Speed & Performance',
              y: 93,
              goals: [
                {
                  name: 'Expected',
                  value: 85,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#294D61',
                },
              ],
            },
            {
              x: 'Support By Team',
              y: 75,
              goals: [
                {
                  name: 'Expected',
                  value: 99,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#294D61',
                },
              ],
            },
            {
              x: 'Security of Data',
              y: 80,
              goals: [
                {
                  name: 'Expected',
                  value: 65,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#294D61',
                },
              ],
            },
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        colors: ['#325e759c'],
        dataLabels: {
          formatter: function (val, opt) {
            const goals =
              opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals;

            if (goals && goals.length) {
              return `${val} / ${goals[0].value}`;
            }
            return val;
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#325e759c', '#294D61'],
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

const App = () => {
  const [data, setData] = useState({
    navigationPercentage: 70,
    efficiencyPercentage: 90,
    scalabilityReport: 'Report details from backend...',
    improvementIdeas: 'Improvement ideas from backend...',
  });

  useEffect(() => {
    // Fetch the data from the backend
    fetch('/api/survey-results') // Update with your API endpoint
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="min-h-screen text-center text-black bg-white">
      {/* Header */}
      <header className="py-8 pl-8">
        <h1 className="text-3xl font-bold underline text-[#294D61]">
          Service Analytics
        </h1>
      </header>

      {/* Services Breakdown and Ticket Boxes */}
      <section className="flex items-start justify-between mx-8 mt-8">
        <div className="p-2 bg-[#325e759c] rounded-lg">
          <h2 className="mb-4 text-xl">Services Breakdown</h2>
          <p className="text-3xl font-bold">881,668</p>
        </div>

        <div className="flex space-x-4">
          {/* Total Tickets */}
          <div className="p-5 bg-[#325e759c] rounded-lg">
            <p className="text-lg text-white">Total Tickets</p>
            <p className="text-3xl font-bold">2100</p>
          </div>

          {/* Solved Tickets */}
          <div className="p-5 bg-[#325e759c] rounded-lg">
            <p className="text-lg text-white">Solved Tickets</p>
            <p className="text-3xl font-bold">1800</p>
          </div>
        </div>
      </section>

      {/* ApexChart Integration */}
      <section className="mt-8 ml-8 mr-8">
        <ApexChart />
      </section>

      <section className="w-full mt-8 mr-8 lg:w-1/2">
        {/* Navigation of System */}
        <div className="flex items-center mb-4">
          <div className="w-2/3 p-4 bg-gray-300 rounded-l-lg">
            <p className="text-black">Navigation of System</p>
          </div>
          <div className="w-1/3 p-4 bg-[#8abfbe] rounded-r-lg">
            <p className="text-right text-black">Yes {data.navigationPercentage}%</p>
          </div>
        </div>

        {/* Efficiency of System */}
        <div className="flex items-center">
          <div className="w-2/3 p-4 bg-gray-300 rounded-l-lg">
            <p className="text-black">Efficiency of System</p>
          </div>
          <div className="w-1/3 p-4 bg-[#8abfbe] rounded-r-lg">
            <p className="text-right text-black">Yes {data.efficiencyPercentage}%</p>
          </div>
        </div>
      </section>

      {/* Bottom Boxes */}
      <section className="flex justify-between mt-8 ml-8 mr-8">
        {/* Report of Scalability */}
        <div className="w-1/2 p-4 bg-[#3a6c8779] rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 mr-4 bg-gray-700 rounded-full"></div>
            <p className="text-black">Report of Scalability</p>
          </div>
          <div className="h-32 p-2 overflow-auto bg-white border rounded">
            <p>{data.scalabilityReport}</p>
          </div>
        </div>

        {/* Improvement Feature Ideas */}
        <div className="w-1/2 p-4 bg-[#3a6c8779] rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 mr-4 bg-gray-700 rounded-full"></div>
            <p className="text-black">Improvement Feature Ideas</p>
          </div>
          <div className="h-32 p-2 overflow-auto bg-white border rounded">
            <p>{data.improvementIdeas}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;

import React from 'react';

const OpportunitySummary = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Opportunities Summary</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-bold">Total Opportunities</td>
              <td>175</td>
            </tr>
            <tr>
              <td className="font-bold">New opportunities create this month</td>
              <td>36</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Open Opportunities</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-bold">Qualified</td>
              <td>10</td>
            </tr>
            <tr>
              <td className="font-bold">Follow-up</td>
              <td>12</td>
            </tr>
            <tr>
              <td className="font-bold">Negotiation</td>
              <td>8</td>
            </tr>
            <tr>
              <td className="font-bold">Demo</td>
              <td>30</td>
            </tr>
            <tr>
              <td className="font-bold">Potential revenue in open opportunities</td>
              <td>$210,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Closed Opportunities</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-bold">Unqualified</td>
              <td>36</td>
            </tr>
            <tr>
              <td className="font-bold">Lost</td>
              <td>14</td>
            </tr>
            <tr>
              <td className="font-bold">Potential revenue in closed opportunities</td>
              <td>$49,036</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Won Opportunities</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-bold">Won</td>
              <td>65</td>
            </tr>
            <tr>
              <td className="font-bold">Revenue in won opportunities</td>
              <td>$227,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PieChart = () => {
  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 100 100">
        <path
          d="M50,50 L50,10 A40,40 0 0 1 90,50 L50,90 Z"
          fill="#E0E0E0"
        />
        <path
          d="M50,50 L10,50 A40,40 0 0 0 50,10 Z"
          fill="#60C0C0"
        />
        <path
          d="M50,50 L90,50 A40,40 0 0 1 50,90 Z"
          fill="#449999"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-bold text-lg mb-2">Qualified</div>
        <div>45.6%</div>
      </div>
      <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-bold text-lg mb-2">Negotiation</div>
        <div>20.4%</div>
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-bold text-lg mb-2">Demo</div>
        <div>20.4%</div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PieChart />
        <OpportunitySummary />
      </div>
    </div>
  );
};

export default App;


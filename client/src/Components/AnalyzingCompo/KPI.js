import React from 'react'



const Top5LeadOwners = () => {
    const data = [
        { name: "Martha Hills", count: 508 },
        { name: "Amelia Burrows", count: 371 },
        { name: "jacob Luluwayo", count: 290 },
        { name: "Quinn Rivers", count: 126 },
        { name: "Joane ee", count: 1 },
    ];

    return (
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">TOP 5 LEAD OWNERS</h2>
            <table className="w-full">
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-2 py-1">{index + 1}. {item.name}</td>
                            <td className="px-2 py-1 text-right">{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Top10BestPerformingLeads = () => {
    const data = [
        { name: "None", amount: 9558299 },
        { name: "Advertisement", amount: 8406000 },
        { name: "Public Relations", amount: 3965000 },
        { name: "Cold Call", amount: 3901300 },
        { name: "Employee Referral", amount: 3045550 },
        { name: "Partner", amount: 2777800 },
        { name: "External Referral", amount: 2397790 },
        { name: "Web Research", amount: 1640000 },
        { name: "Trade Show", amount: 1235680 },
        { name: "OnlineStore", amount: 599990 },
    ];

    return (
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">
                TOP 10 BEST PERFORMING LEADS
            </h2>
            <table className="w-full">
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-2 py-1">{index + 1}. {item.name}</td>
                            <td className="px-2 py-1 text-right">
                                ${item.amount.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const LeastPerformingRegionWise = () => {
    const data = [
        { region: "Argentina", amount: 10000 },
        { region: "Ukraine", amount: 12500 },
        { region: "San Marino", amount: 19788 },
        { region: "Peurto Rico", amount: 25600 },
        { region: "Finland", amount: 32140 },
    ];

    return (
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">
                LEAST PERFORMING REGION WISE
            </h2>
            <table className="w-full">
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-2 py-1">{index + 1}. {item.region}</td>
                            <td className="px-2 py-1 text-right">
                                ${item.amount.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Analyzing = () => {
    return (
        <div className="flex flex-col gap-4 mt-4">
            <Top5LeadOwners />
            <Top10BestPerformingLeads />
            <LeastPerformingRegionWise />
        </div>
    );
};

export default Analyzing;
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SummeryTables = () => {
    const data = [

        {
            name: 'Jan',
            loss: 4000,
            won: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            loss: 3000,
            won: 1398,
            amt: 2210,
        },
        {
            name: 'March',
            loss: 2000,
            won: 9800,
            amt: 2290,
        },
        {
            name: 'April',
            loss: 2780,
            won: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            loss: 1890,
            won: 4800,
            amt: 2181,
        },
        {
            name: 'June',
            loss: 2390,
            won: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            loss: 3490,
            won: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className='h-96 overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
            <div className='flex justify-start '>
                <div class="grid grid-cols-1 gap-4 ml-80 w-80">

                    <div class='border w-80 h-72 bg-slate-200'>
                        <div class="box-border h-12 w-80 p-4 border-4 bg-pink-200">
                            <div className='text-gray-600 text-sm text-center justify-center '>Leads To Do</div>
                        </div>

                        <table class='table-fixed'>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Target Corporation</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>Today</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Soo Program #3</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>Today</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Johnson & Johnson</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>Today</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>YouServerWell.com</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>Today</div> </td>
                            </tr>

                        </table>
                    </div>



                    <div class='border w-80 h-52 bg-slate-200'>
                        <div class="box-border h-12 w-80 p-4 border-4 bg-gray-300">
                            <div className='text-gray-600 text-sm text-center justify-center '>Unassigned Leads</div>
                        </div>
                        <table class='table-fixed'>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Maria</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>40d ago</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Johnson & Johnson</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>20d ago</div> </td>
                            </tr>
                        </table>
                    </div>


                    <div class='border w-80 h-72 bg-slate-200'>
                        <div class="box-border h-12 w-80 p-4 border-4 bg-gray-300">
                            <div className='text-gray-600 text-sm text-center justify-center '>sales Pipeline</div>
                        </div>

                        <table class='table-fixed'>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Planning</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>$ 77,770</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Qualification</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>$ 40,500</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Proposal</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>$6000</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Negotiation</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>$18,080</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Close-won</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>$183,680</div> </td>
                            </tr>
                        </table>

                    </div>

                </div>

                <div class="grid grid-cols-1 gap-4 w-80 ml-12">

                    <div class='border w-80 h-72 bg-slate-200'>
                        <div class="box-border h-12 w-80 p-4 border-4 bg-blue-200">
                            <div className='text-gray-600 text-sm text-center justify-center '>Leads On Standby</div>
                        </div>
                        <table class='table-fixed'>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Info-Crop renovelle</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>in 20d</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Microsoft-Portugal</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>in 150d</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>JPMorgan Chase</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>in 12d</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>Welknown itd.</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>in 5d</div> </td>
                            </tr>

                        </table>
                    </div>


                    <div class='border w-80 h-72 bg-slate-200'>
                        <div class="box-border h-12 w-80 p-4 border-4 bg-gray-300">
                            <div className='text-gray-600 text-sm text-center justify-center '>Won Deals</div>
                        </div>
                        <ResponsiveContainer width="100%" height="85%">
                            <LineChart
                                width={500}
                                height={100}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{fontSize:10}} />
                                <YAxis tick={{fontSize:10}}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="won" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="loss" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>


                    </div>


                    <div class='border w-80 h-52 bg-slate-200'>
                        <div class="box-border h-12 w-80 p-4 border-4 bg-gray-300">
                            <div className='text-gray-600 text-sm text-center justify-center '>Current Goals</div>
                        </div>
                        <table class='table-fixed'>
                            <tr>
                                <th><div className='text-cyan-700 text-sm px-2 py-2 text-start'>Info-Crop renovelle</div> </th>
                                <td><div className='text-gray-500 text-xs ml-24'>5 hours left</div> </td>
                            </tr>
                            <tr>
                                <td><div className='text-gray-500 text-sm px-2 py-2 text-start'>#10 call on leads</div> </td>
                                <td><div className='text-gray-500 text-sm ml-24'>5/10</div> </td>
                            </tr>

                        </table>

                    </div>

                </div>
                <div class="grid grid-cols-1 border ml-24 w-96"></div>
            </div>

        </div>
    );
};

export default SummeryTables;
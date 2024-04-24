import React, { useState } from 'react';
import { generateDate,months } from '../Calendar/MiniCalender';
import Cn from '../Calendar/Cn';
import dayjs from 'dayjs';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


const ClientMiniCalendarUi = () => {
    console.log(generateDate());
    const days=["S","M","T","W","T","F","S"];
    const currentDate = dayjs;
    const [today,setToday]=useState(dayjs());
    const [selectDate,setSelectDate]=useState(dayjs)


    return (
    <div className='mr-1'>

    
     <div className='   divide-y-2 gap-y-10' >

        <div className='w-25 h-25'>
            <div className='flex justify-between'>
                <h1 className='font-semibold'>{months[ today.month()]}, {today.year()}</h1>
                <div className='flex items-center gap-5 '>
                       <GrPrevious  className='w-5 h-5 cursor-pointer' onClick={() => {
                        setToday(today.month(today.month()-1));

                       }}/>
                        <h1 className='cursor-pointer' onClick={()=>{
                            setToday(dayjs())
                        }}>Today</h1>

                        <GrNext className='w-5 h-5 cursor-pointer' onClick={() => {
                        setToday(today.month(today.month()+1)); }}
                        />
                </div>
            </div>
            <div className='w-full grid grid-cols-7 text-gray-500'>
                {days.map((day,index) =>{
                    return <h1 key={index} className='h-14 grid place-content-center text-sm'>{day}</h1>;
                })}
            </div>

            <div className='w-full grid grid-cols-7 border' >
                {generateDate(today.month(),today.year()).map(({date, currentMonth, today}, index) => (
                    <div key={index} className='h-14 border-t place-content-center text-sm' >
                        <div>
                            <h1 className={Cn(currentMonth ? "" :"text-gray-400 "  ,
                            today ? "bg-red-600 text-white ": "" ,
                            selectDate.toDate.toDateString=== date.toDate().toDateString() ? "bg-black text-white " :'',
                            "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer "
                            )}
                            onClick={()=>{
                                setSelectDate(date);
                            }}
                            >{date.date()}</h1>
                        </div>
                    </div>
                ))}
            </div>
            </div>

            <div className='h-96 w-96 px-5'>
                <h1 className='font-semibold'>Shedule for {selectDate.toDate().toDateString()}</h1>
                <p>No meetings for today</p>


            </div>
            </div></div>


            
      


 

    );
};

export default ClientMiniCalendarUi; 

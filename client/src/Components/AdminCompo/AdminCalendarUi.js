import React, { useState, useEffect } from 'react';
import { generateDate, months } from '../Calendar/MiniCalender';
import Cn from '../Calendar/Cn';
import dayjs from 'dayjs';
import { GrPrevious, GrNext } from "react-icons/gr";
import axios from 'axios';
import { useUser } from '../login/UserContext';

const AdminCalendarUi = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [today, setToday] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [events, setEvents] = useState([]);
    const { userData } = useUser();

    useEffect(() => {
        if (userData && userData.id) {
            fetchEvents(userData.id);
        }
    }, [userData]);

    const fetchEvents = (id) => {
        axios.get(`https://localhost:7143/api/Event/EventsByUserId/${id}`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    const getEventsForDate = (date) => {
        return events.filter(event => dayjs(event.date).isSame(date, 'day'));
    };

    const goToPreviousMonth = () => {
        setToday(today.subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setToday(today.add(1, 'month'));
    };

    return (
        <div className='flex justify-center'>
            <div className='w-full max-w-screen-lg'>
                <div className='bg-white shadow-lg rounded-lg'>
                    <div className='p-6'>
                        <div className='flex justify-between items-center mb-6'>
                            <h1 className='text-xl font-semibold'>{months[today.month()]}, {today.year()}</h1>
                            <div className='flex items-center gap-5'>
                                <GrPrevious className='w-6 h-6 cursor-pointer' onClick={goToPreviousMonth} />
                                <h1 className='cursor-pointer text-gray-600 hover:text-gray-900' onClick={() => setToday(dayjs())}>Today</h1>
                                <GrNext className='w-6 h-6 cursor-pointer' onClick={goToNextMonth} />
                            </div>
                        </div>
                        <div className='grid grid-cols-7 gap-1 text-sm font-medium text-gray-600'>
                            {days.map((day, index) => (
                                <div key={index} className='h-20 flex items-center justify-center'>{day}</div>
                            ))}
                        </div>
                        <div className='grid grid-cols-7 gap-1'>
                            {generateDate(today.month(), today.year()).map(({ date, currentMonth }, index) => (
                                <div key={index} className={`relative overflow-hidden border rounded-lg ${!currentMonth && 'text-gray-400'}`}>
                                    <div
                                        className={Cn(
                                            'h-36 w-20 flex items-center justify-center cursor-pointer transition-all',
                                            currentMonth && 'hover:bg-gray-100',
                                            date.isSame(dayjs(), 'day') && 'text-white bg-red-500 rounded-lg',
                                            selectedDate.isSame(date, 'day') && 'bg-black text-white'
                                        )}
                                        onClick={() => {
                                            setSelectedDate(date);
                                        }}
                                    >
                                        <span className="absolute top-0 left-0 p-2">{date.date()}</span>
                                    </div>

                                    <div className="mt-2">
                                        {getEventsForDate(date).map(event => (
                                            <div key={event.id} className='bg-blue-500 text-white text-xs p-1 mb-1 rounded'>{event.eventName}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCalendarUi;
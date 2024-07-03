import React, { useState, useEffect } from 'react';
import { generateDate, months } from './MiniCalender';
import Cn from './Cn';
import dayjs from 'dayjs';
import { GrPrevious, GrNext } from "react-icons/gr";
import axios from 'axios';
import { useUser } from '../login/UserContext';

const BigCalendarUi = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [today, setToday] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const { userData } = useUser();

    useEffect(() => {
        fetchTasks();
       
    }, [userData]);

    const fetchTasks = () => {
        axios.get('https://localhost:7143/api/Task')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

   

    const getTasksForDate = (date) => {
        if (!userData) return [];
        return tasks.filter(task =>
            dayjs(task.dueDate).isSame(date, 'day') && task.createdById === userData.id
        );
    };

    // const getEventsForDate = (date) => {
    //     if (!userData) return [];

    //     // Filter events where the host is the current user
    //     const hostEvents = events.filter(event =>
    //         dayjs(event.date).isSame(date, 'day') && event.host === userData.fullName
    //     );

    //     // Filter events where the current user is a participant
    //     const participantEvents = events.filter(event =>
    //         dayjs(event.date).isSame(date, 'day') && event.participants.some(participant => participant.email === userData.email)
    //     );

    //     return [...hostEvents, ...participantEvents];
    // };

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

                                    {/* Display tasks and events */}
                                    <div className="mt-2">
                                        {getTasksForDate(date).map(task => (
                                            <div key={task.id} className='bg-green-500'>{task.taskName}</div>
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

export default BigCalendarUi;

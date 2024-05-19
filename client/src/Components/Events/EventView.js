import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const EventView = ({ visible, onClose, eventId }) => {
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        if (eventId) {
            axios.get(`https://localhost:7143/api/Event/${eventId}`)
                .then(response => {
                    setEventDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching event details:', error);
                });
        }
    }, [eventId]);

    const formatDateTime = (dateTimeString) => {
        const dateTime = dayjs(dateTimeString);
        return {
            date: dateTime.format('YYYY-MM-DD'),
            time: dateTime.format('hh:mm A')
        };
    };

    return (
        <>
            {visible && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='border-[2px] border-[#2a2a2a] w-96 bg-white p-8 rounded-lg'>
                        {eventDetails ? (
                            <>
                                <h1 className="text-lg font-bold text-center">{eventDetails.eventName}</h1>
                                <p><strong>Date:</strong> {eventDetails.date.split("T")[0]}</p>
                                <p><strong>Time:</strong> {eventDetails.time}</p>
                                <p><strong>Priority:</strong> {eventDetails.isImportant ? 'High' : 'Normal'}</p>
                                <p><strong>Venue:</strong> {eventDetails.venue}</p>
                                <p><strong>Created By:</strong> {eventDetails.host}</p>
                                <p>
                                    <strong>Date Added:</strong> {formatDateTime(eventDetails.dateAdded).date}
                                    <strong> Time:</strong> {formatDateTime(eventDetails.dateAdded).time}
                                </p>
                                <p>
                                    <strong>Date Modified:</strong> {formatDateTime(eventDetails.dateModified).date}
                                    <strong> Time:</strong> {formatDateTime(eventDetails.dateModified).time}
                                </p>
                                <p><strong>Description:</strong> {eventDetails.description}</p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div className='flex justify-center'>
                            <button onClick={onClose} className='mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium focus:outline-none'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventView;

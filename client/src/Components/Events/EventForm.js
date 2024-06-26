// src/Components/Events/EventForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../login/UserContext';

const EventForm = () => {
    const { userData } = useUser();
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [participants, setParticipants] = useState([{ FullName: '', email: '' }]);
    const [repeatUntilDate, setRepeatUntilDate] = useState('');
    const [repeatUntilTime, setRepeatUntilTime] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [description, setDescription] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [isSendViaEmail, setIsSendViaEmail] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userData) {
            toast.error('User details not found.');
            return;
        }

        const data = {
            eventName,
            date,
            time,
            venue,
            host: userData.fullName || '',
            participants: participants.map(participant => ({
                FullName: participant.FullName,
                Email: participant.email
            })),
            repeatUntilDate,
            repeatUntilTime,
            reminderDate,
            reminderTime,
            description,
            isImportant,
            isSendViaEmail
        };

        try {
            const response = await axios.post('https://localhost:7143/api/Event', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Event added successfully');
        } catch (error) {
            toast.error('An error occurred while adding the event.');
        }
    };

    const handleParticipantChange = (index, fieldName, value) => {
        const list = [...participants];
        list[index][fieldName] = value;
        setParticipants(list);
    };

    const handleAddParticipant = () => {
        setParticipants([...participants, { FullName: '', email: '' }]);
    };

    const handleRemoveParticipant = (index) => {
        const list = [...participants];
        list.splice(index, 1);
        setParticipants(list);
    };

    const handleRepeatChange = (date, time) => {
        setRepeatUntilDate(date);
        setRepeatUntilTime(time);
    };

    if (!userData) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <div className='formbody border px-5 py-5 text-sm'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className='title mb-4'>
                    {userData.fullName}
                    <label className="block mb-2">Title</label>
                    <input type='text' placeholder='Add event title' className='border px-3 py-2 rounded-md w-full border-green-700' value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                </div>
                <div className='venue mb-4'>
                    <label className="block mb-2">Venue</label>
                    <input type='text' placeholder='Add Venue' className='border px-3 py-2 rounded-md w-full border-green-700' value={venue} onChange={(e) => setVenue(e.target.value)} required />
                </div>
                <div className='time mb-4 flex items-center'>
                    <label className="block mr-2">From</label>
                    <input type='date' className='border px-3 py-2 rounded-md mr-2 border-green-700' value={date} onChange={(e) => setDate(e.target.value)} required />
                    <input type='time' className='border px-3 py-2 rounded-md border-green-700' value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className='repeat mb-4 flex items-center'>
                    <label className="block mr-2">Repeat Until Date</label>
                    <input type='date' className='border px-3 py-2 rounded-md mr-2 border-green-700' value={repeatUntilDate} onChange={(e) => handleRepeatChange(e.target.value, repeatUntilTime)} />
                    <label className="block mr-2">Time</label>
                    <input type='time' className='border px-3 py-2 rounded-md border-green-700' value={repeatUntilTime} onChange={(e) => handleRepeatChange(repeatUntilDate, e.target.value)} />
                </div>
                <div className='reminder mb-4 flex items-center'>
                    <label className="block mr-2">Reminder Date</label>
                    <input type='date' className='border px-3 py-2 rounded-md mr-2 border-green-700' value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} />
                    <label className="block mr-2">Time</label>
                    <input type='time' className='border px-3 py-2 rounded-md border-green-700' value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
                </div>
                <div className='participants mb-4'>
                    <label className="block mb-2">Participants</label>
                    {participants.map((participant, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type='text'
                                placeholder='Name'
                                value={participant.FullName}
                                onChange={(e) => handleParticipantChange(index, 'FullName', e.target.value)}
                                required
                                className='border px-3 py-2 rounded-md mr-2 border-green-700'
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                value={participant.email}
                                onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                                required
                                className='border px-3 py-2 rounded-md mr-2 border-green-700'
                            />
                            {index !== 0 && (
                                <button type='button' onClick={() => handleRemoveParticipant(index)} className='px-3 py-1 bg-red-500 text-white rounded-md'>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type='button' onClick={handleAddParticipant} className='px-3 py-1 bg-blue-500 text-white rounded-md'>Add Participant</button>
                </div>
                <div className='description mb-4'>
                    <label className="block mb-2">Description</label>
                    <textarea rows="4" className='border px-3 py-2 rounded-md w-full border-green-700' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className='isImportant mb-4'>
                    <label className="block mb-2">Mark As Important</label>
                    <input type='checkbox' checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} />
                </div>
                <div className='isSendViaEmail mb-4'>
                    <label className="block mb-2">Send Via Email</label>
                    <input type='checkbox' checked={isSendViaEmail} onChange={(e) => setIsSendViaEmail(e.target.checked)} />
                </div>
                <div className='submit'>
                    <button type='submit' className='px-3 py-1 bg-green-500 text-white rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;

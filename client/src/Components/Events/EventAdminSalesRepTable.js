import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EEdit from './EEdit';
import EventView from './EventView';
//import dayjs from 'dayjs';

const EventAdminSalesRepTable = () => {
    const [events, setEvents] = useState([]);
    const[filterEvents,setFilterEvents]=useState([]);
    const [editEventId, setEditEventId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('https://localhost:7143/api/Event')
            .then(response => {
                setEvents(response.data)
                setFilterEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    const handleViewEvents = (eventId) => {
        setSelectedEventId(eventId);
        setShowModal1(true);
    }

    const handleEditEvents = (eventId) => {
        setEditEventId(eventId);
        setShowModal(true);
    };

    const handleModelClose = () => {
        setShowModal(false);
        setShowModal1(false);
        fetchEvents();
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this event?")) {
            const url = `https://localhost:7143/api/Event/${id}`;
            axios.delete(url)
                .then((response) => {
                    setEvents(events.filter(event => event.id !== id));
                    toast.success('Event has been deleted successfully');
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    fetchEvents();
                });
        }
    }

    const Filter= (event) =>{
        setFilterEvents(events.filter(f=>f.eventName.toLowerCase().includes(event.target.value)))
    }


    return (
        <div>
            {editEventId !== null && (
                <EEdit eventId={editEventId} onClose={() => setEditEventId(null)} />
            )}

            <div className="flex flex-col py-5 px-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <input type="text" className="form-control border px-4 rounded-lg" onChange={Filter} placeholder="Search..."></input>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Venue
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Priority
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">View</span>
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filterEvents.map(event => {
                                        const datetimeParts = event.date ? event.date.split("T") : [];
                                        const date = datetimeParts[0] || '';
                                       

                                        return (
                                            <tr key={event.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{event.eventName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{event.time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{event.venue}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.isImportant ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}`}>
                                                        {event.isImportant ? 'High' : 'Normal'} Priority
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleViewEvents(event.id)} className="text-indigo-600 hover:text-indigo-900">
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleEditEvents(event.id)} className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleDelete(event.id)} className="text-indigo-600 hover:text-indigo-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <div>
                                <EEdit
                                    visible={showModal}
                                    onClose={handleModelClose}
                                    eventId={editEventId}
                                />
                            </div>
                            <div>
                                <EventView
                                    visible={showModal1}
                                    onClose={handleModelClose}
                                    eventId={selectedEventId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventAdminSalesRepTable;
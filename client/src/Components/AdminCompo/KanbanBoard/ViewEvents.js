import React, { useState, useEffect } from "react";
import axios from "axios";
import EventUpdateForm from "./UpdateEventForm"; // Assuming you have an EventUpdateForm component

function ViewEvents({ leadId, onClose }) {
  const [events, setEvents] = useState([]);
  const [leadData, setLeadData] = useState(null);
  const [showUpdateEventForm, setShowUpdateEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axios.get(`https://localhost:7143/api/Lead/${leadId}`);
        setLeadData(response.data);
        setEvents(response.data.events || []); // Ensure events are fetched correctly
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };

    fetchLeadData();
  }, [leadId]);

  const handleUpdateEventClick = (event) => {
    setSelectedEvent(event);
    setShowUpdateEventForm(true);
  };

  const closeUpdateEventForm = () => {
    setShowUpdateEventForm(false);
    setSelectedEvent(null);
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    closeUpdateEventForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>
        {leadData ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Events for Lead {leadData.newLead.leadName}
            </h2>
            {events.length > 0 ? (
              <ul>
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="mb-2 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-sm font-semibold">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {event.description}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateEventClick(event)}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Update
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events found.</p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {showUpdateEventForm && selectedEvent && (
        <EventUpdateForm
          eventToUpdate={selectedEvent} // Pass selected event to EventUpdateForm
          onUpdate={handleEventUpdate}
          onClose={closeUpdateEventForm}
        />
      )}
    </div>
  );
}

export default ViewEvents;

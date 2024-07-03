import React from 'react';
import dayjs from 'dayjs';

const EventDetailsModal = ({ event, onClose }) => {

    const formatDateTime = (dateTimeString) => {
        const dateTime = dayjs(dateTimeString);
        return {
            date: dateTime.format('YYYY-MM-DD'),
            time: dateTime.format('hh:mm A')
        };
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{event.eventName}</h2>
        <p><strong>Created By:</strong> {event.createdByName || 'Unknown'}</p>
        <p><strong>Email:</strong> {event.createdByEmail || 'No email'}</p>
        <p><strong>Date:</strong> {event.date || 'N/A'}</p>
        <p><strong>Time:</strong> {event.time || 'N/A'}</p>
        <p><strong>Priority:</strong> {event.isImportant ? 'High' : 'Normal'}</p>
        <p>
            <strong>Date Added:</strong> {formatDateTime(event.dateAdded).date}
            <strong> Time:</strong> {formatDateTime(event.dateAdded).time}
        </p>
        <p>
            <strong>Date Modified:</strong> {formatDateTime(event.dateModified).date}
            <strong> Time:</strong> {formatDateTime(event.dateModified).time}
        </p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Close</button>
      </div>
    </div>
  );
};

export default EventDetailsModal;

import React, { useState } from 'react';
import EventForm from '../../Events/EventForm';

const ButtonPopupModel = ({ isOpen, onClose, task }) => {
    const [showEventForm, setShowEventForm] = useState(false);

    

    if (!isOpen || !task) return null;

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleEventButtonClick = () => {
        setShowEventForm(true);
    };

    const closeEventForm = () => {
        setShowEventForm(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-slate-300 p-6 rounded-lg"
                onClick={handleModalClick}
            >
                <h2 className="text-xl font-bold mb-4">View Pages</h2>
                <div className="mb-4">
                    <button
                        className="text-gray-900 ml-1 text-sm text-start rounded bg-slate-500 py-0.5 px-7 border"
                        onClick={handleEventButtonClick}
                    >
                        EVENT
                    </button>
                </div>
                <div className="mb-4">
                    <button className="text-gray-900 ml-1 text-sm text-start rounded bg-slate-500 py-0.5 px-8 border">
                        TASK
                    </button>
                </div>
                <div className="mb-4">
                    <button className="text-gray-900 ml-1 text-sm text-start rounded bg-slate-500 py-0.5 px-5 border">
                        INVOICE
                    </button>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mt-2 mr-4 px-4 py-2 bg-cyan-800 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
            {showEventForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <EventForm onClose={closeEventForm} leadId={task.id} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButtonPopupModel;
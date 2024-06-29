import React from 'react';

const ButtonPopupModel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleModalClick = (e) => {
        // Prevent the click from bubbling up to the card
        e.stopPropagation();
    };


    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onclose}
        >
            <div className="bg-slate-300 p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()} 
            >
                <h2 className="text-xl font-bold mb-4">View Pages</h2>
                <div className="mb-4">
                    <button className="text-gray-900 ml-1 text-sm text-start rounded bg-slate-500  py-0.5 px-7 border">EVENT</button>

                </div>

                <div className="mb-4">
                    <button className="text-gray-900 ml-1 text-sm text-start rounded bg-slate-500  py-0.5 px-8 border">TASK</button>
                </div>

                <div className="mb-4">
                    <button className="text-gray-900 ml-1 text-sm text-start rounded bg-slate-500  py-0.5 px-5 border">INVOICE</button>
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
        </div>
    );
};

export default ButtonPopupModel;


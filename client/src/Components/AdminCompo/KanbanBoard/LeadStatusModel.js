import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeadStatusModel = ({ taskId, onClose, onDelete }) => {
    const [isWon, setIsWon] = useState(null);
  
    const handleStatusChange = (value) => {
      setIsWon(value);
      console.log(`Lead status changed to ${value ? 'Won' : 'Lost'}`);
    };
  
    const handleSubmit = async () => {
      try {
        // Send a PUT request to update the lead status with isWon as query parameter
        await axios.put(`https://localhost:7143/api/Lead/${taskId}/status?isWon=${isWon}`);
        
        // Show success message
        toast.success('Lead status updated successfully');

        // Call the onDelete callback to delete the task card
        onDelete(taskId);
      } catch (error) {
        console.error('Error updating lead status:', error);

        // Show error message
        toast.error('Failed to update lead status');
      } finally {
        // Close the modal after submitting
        onClose();
      }
    };
  
    return (
      <div className="fixed inset-1 flex items-center justify-center z-20 bg-opacity-50">
        <div className="bg-gray-300 p-6 rounded-lg shadow-lg font-bold">
          <h2 className="text-xl mb-4 font-bold text-teal-700">Update Lead Status</h2>
          <div className="mb-4">
            <label htmlFor="won" className="mr-4">
              <input
                type="radio"
                id="won"
                name="status"
                value={true}
                checked={isWon === true}
                onChange={() => handleStatusChange(true)}
                className="mr-2"
              />
              Won
            </label>
            <label htmlFor="lost">
              <input
                type="radio"
                id="lost"
                name="status"
                value={false}
                checked={isWon === false}
                onChange={() => handleStatusChange(false)}
                className="mr-2"
              />
              Lost
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-teal-700 hover:bg-teal-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
              disabled={isWon === null}
            >
              Submit
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
};

export default LeadStatusModel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
  const [editLeadName, setEditLeadName] = useState('');
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editLeadStatus, setEditLeadStatus] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editSalesPipeline, setEditSalesPipeline] = useState('');
  const [editIsWon, setEditIsWon] = useState(false);


  useEffect(() => {
    setEditLeadName(task.leadName);
    setEditCompanyName(task.companyName);
    setEditLeadStatus(task.leadStatus);
    setEditStartDate(task.startDate.split('T')[0]);
    setEditEndDate(task.endDate.split('T')[0]);
    setEditSalesPipeline(task.salesPipeline);
    setEditIsWon(task.isWon || false);

  }, [task]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const url = `https://localhost:7143/api/Lead/${task.id}`;
    const data = {
      id: task.id,
      leadName: editLeadName,
      companyName: editCompanyName,
      startDate: editStartDate,
      endDate: editEndDate,
      salesPipeline: editSalesPipeline,
      leadStatus: editLeadStatus,
      isWon: editIsWon
    };

    console.log("Payload:", data); 

    axios
      .put(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status === 204) {
          onClose();
          toast.success('Task has been updated successfully');
          onUpdate(data);
        } else {
          toast.error('An error occurred while updating the task.');
        }
      })
      .catch((error) => {
        console.log("Error:", error.response ? error.response.data : error.message);
        toast.error('An error occurred while updating the task.');
      });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-teal-700 mb-4">Update Task</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="leadName" className="block font-semibold">
              Lead Name
            </label>
            <input
              type="text"
              id="leadName"
              name="leadName"
              value={editLeadName}
              onChange={(e) => setEditLeadName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyName" className="block font-semibold">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={editCompanyName}
              onChange={(e) => setEditCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="leadStatus" className="block font-semibold">
              Lead Status
            </label>
            <input
              id="leadStatus"
              name="leadStatus"
              value={editLeadStatus}
              onChange={(e) => setEditLeadStatus(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-semibold">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block font-semibold">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="salesRepId" className="block font-semibold">
              Sales Rep ID
            </label>
            <input
              type="number"
              id="salesRepId"
              name="salesRepId"
              value={editSalesRepId}
              onChange={(e) => setEditSalesRepId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div> */}
          {/* <div className="mb-4">
            <label htmlFor="userId" className="block font-semibold">
              User ID
            </label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={editUserId}
              onChange={(e) => setEditUserId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="salesPipeline" className="block font-semibold">
              Sales Pipeline
            </label>
            <input
              type="text"
              id="salesPipeline"
              name="salesPipeline"
              value={editSalesPipeline}
              onChange={(e) => setEditSalesPipeline(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">
              Is Won
              <input
                type="checkbox"
                checked={editIsWon}
                onChange={(e) => setEditIsWon(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500 mr-2"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateTaskModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
  const [editLeadName, setEditLeadName] = useState('');
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editLeadStatus, setEditLeadStatus] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editSalesRep, setEditSalesRep] = useState('');
  const [editSalesPipeline, setEditSalesPipeline] = useState('');

  useEffect(() => {
    setEditLeadName(task.leadName);
    setEditCompanyName(task.companyName);
    setEditLeadStatus(task.leadStatus);
    setEditStartDate(task.startDate.split('T')[0]);
    setEditEndDate(task.endDate.split('T')[0]);
    setEditSalesRep(task.salesRep);
    setEditSalesPipeline(task.salesPipeline);
  }, [task]);

  const handleChangeLeadName = (e) => {
    setEditLeadName(e.target.value);
  };

  const handleChangeCompanyName = (e) => {
    setEditCompanyName(e.target.value);
  };

  const handleChangeLeadStatus = (e) => {
    setEditLeadStatus(e.target.value);
  };

  const handleChangeStartDate = (e) => {
    const formattedDate = e.target.value.split('T')[0];
    setEditStartDate(formattedDate);
  };

  const handleChangeEndDate = (e) => {
    const formattedDate = e.target.value.split('T')[0];
    setEditEndDate(formattedDate);
  };

  const handleChangeSalesRef = (e) => {
    setEditSalesRep(e.target.value);
  };

  const handleChangeSalesPipeline = (e) => {
    setEditSalesPipeline(e.target.value);
  };


  const handleUpdate = (e) => {
    e.preventDefault();

    const url = `https://localhost:7166/api/Lead/${task.id}`;
    const data = {
      id:task.id,
      leadName: editLeadName,
      companyName: editCompanyName,
      leadStatus: editLeadStatus,
      startDate: editStartDate,
      endDate: editEndDate,
      salesRep: editSalesRep,
      salesPipeline: editSalesPipeline
    };


    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 204) {
          onClose();
          toast.success('Task has been updated successfully');
          onUpdate(data); // Call the onUpdate prop with the updated data
        } else {
          toast.error('An error occurred while updating the task.');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error occurred while updating the task.');
      });
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Update task</h2>
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
              onChange={handleChangeLeadName}
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
              onChange={handleChangeCompanyName}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="leadStatus" className="block font-semibold">
              Lead Status
            </label>
            <select
              id="leadStatus"
              name="leadStatus"
              value={editLeadStatus}
              onChange={handleChangeLeadStatus}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="Mobile">Mobile</option>
              <option value="Web">Web</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
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
              onChange={handleChangeStartDate}
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
              onChange={handleChangeEndDate}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salesRep" className="block font-semibold">
              Tech Lead
            </label>
            <input
              type="text"
              id="salesRep"
              name="salesRep"
              value={editSalesRep}
              onChange={handleChangeSalesRef}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
 
          {/* Add more input fields for the other task details */}
          <button
            type='submit'
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;

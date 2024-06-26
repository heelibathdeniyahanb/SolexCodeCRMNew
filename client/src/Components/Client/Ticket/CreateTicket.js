import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateTicketForm = () => {
  const [subject, setSubject] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [tracker, setTracker] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleFileChange = (event) => {
    setAttachments([...attachments, ...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setSuccessMessage('Ticket successfully created!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Hide the message after 3 seconds
  };
  
  const handleCancel = () => {
    // Reset all the form fields
    setSubject('');
    setTicketDate('');
    setTracker('');
    setEmail('');
    setContactNo('');
    setIssueDescription('');
    setAttachments([]);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100 border rounded-lg shadow-md">
      
      {successMessage && (
        <div className="absolute top-0 left-0 right-0 p-4 text-center text-white bg-sky-500">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-4 bg-[#325e759c] border-b-2 border-gray-400">
          <div>
            <label className="block text-gray-700">Subject <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Ticket Date</label>
            <input
              type="date"
              value={ticketDate}
              onChange={(e) => setTicketDate(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contact No.</label>
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tracker</label>
            <select
              value={tracker}
              onChange={(e) => setTracker(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="Sales">Sales</option>
              <option value="Sales">Sales</option>
              <option value="Sales">Sales</option>
              <option value="Sales">Sales</option>
              
            </select>
          </div>
        </div>
        
        <div className="p-4">
          <label className="block text-gray-700">Describe the issue (Please enter as much info as you can)</label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
            rows="5"
            placeholder="Write here..."
          />
        </div>

        <div className="p-4 border-t border-gray-400">
          <label className="block text-black text-bold">Attachments</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
            multiple
          />
          <br></br>
          <p className="mt-1 text-sm text-gray-600">(Allowed file extensions: jpg, jpeg, png)</p>
          <br></br>
          <label className="block text-black">+Add More for better understanding</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
            multiple
          />
        </div>

        <div className="p-4 text-sm text-gray-700 bg-[#325e759c] border-t border-gray-400">
          Tickets entered here will be resolved during normal business hours (MON-FRI 9AM-5PM.) If your issue requires immediate assistance, please contact the support desk at: 317-794-3900. Please note this support cannot assist you with setting up new users or resetting passwords for existing users. Please contact an authorized delegate in the below list for any user management requests.
        <div>
          <td className="p-0 border">
          <Link to='/DeligateListPage'>
              <button className="px-4 py-2 rounded text-sky-500 bg-slate-100">Authorized Deligate List</button>
              </Link>
            </td>
            </div>
        </div>

        <div className="flex justify-between p-4 border-t border-gray-400">
          <button type="button" className="px-4 py-2 text-gray-700 bg-gray-300 rounded" onClick={handleCancel} >
            Cancel
          </button >
          
          <button  className="px-4 py-2 text-white bg-[#294D61] rounded" >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketForm;

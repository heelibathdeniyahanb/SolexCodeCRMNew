import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateTicket = () => {
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('2024');
  
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [tracker, setTracker] = useState([]);
  const [helpdeskContact, setHelpdeskContact] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [issueDescription, setIssueDescription] = useState('Write here');
  const [attachments, setAttachments] = useState([]);

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleAddMore = () => {
    const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.jpg, .jpeg, .png';
  input.onchange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };
  input.click();
  };

  const handleSubmit = () => {
    // Perform form validation 
    if (!subject || !year || !month || !date || !tracker || !helpdeskContact || !email || !contactNumber || !issueDescription) {
        alert('Please fill in all the required fields.');
        return;
      }
    
      // You can send the form data to your backend server using a fetch or axios
      // Example using fetch (replace the URL with your actual backend endpoint)
      fetch('https://example.com/submit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          date: `${year}-${month}-${date}`,
          tracker,
          helpdeskContact,
          email,
          contactNumber,
          issueDescription,
          attachments,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server (success or error)
          console.log('Form submitted successfully:', data);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
  };

  return (
    <div className="p-4 bg-lightBlue-200">
      <div className="w-full">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          className="w-full p-2 border border-gray-300"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <label>Ticket Date:</label>
        <div className="flex">
          <input
            type="text"
            placeholder="Year"
            className="w-1/4 p-2 border border-gray-300"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Month"
            className="w-1/4 p-2 ml-2 border border-gray-300"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date"
            className="w-1/4 p-2 ml-2 border border-gray-300"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      
      <div className="w-full mt-4">
        <label>Tracker:</label>
        <select
          className="w-full p-2 border border-gray-300"
          value={tracker}
          onChange={(e) => setTracker(e.target.value)}
        >
          <option value="">Select Tracker</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="project">Project</option>
          <option value="progress">Progress</option>
        </select>
      </div>
        
      </div>
      <div className="w-full mt-4">
        <label>Helpdesk Contact:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          value={helpdeskContact}
          onChange={(e) => setHelpdeskContact(e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <label>Email:</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <label>Contact Number:</label>
        <input
          type="tel"
          pattern="[0-9]{10}"
          className="w-full p-2 border border-gray-300"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <label>Describe the issue (Please enter as much info as you can):</label>
        <textarea
          className="w-full p-2 border border-gray-300"
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <label>Attachment:</label>
        <div className="flex items-center">
          <div className="p-2 border border-gray-300">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleAttachmentChange}
            />
          </div>
          
          <button className="ml-2" onClick={handleAddMore}>+Add more</button>
          <p className="ml-2">(Allowed file extensions: jpg, jpeg, png)</p>
        </div>
      </div>
      <div className="p-4 mt-4 bg-lightBlue-100">
        <p className="text-sm">
          Tickets entered here will be resolved during normal business hours (MON-FRI 9AM-5PM.)
          If your issue requires immediate assistance, please contact the support desk at: 317-794-3900.
          Please note this support cannot assist you with setting up new users or resetting passwords for existing users.
          Please contact an authorized delegate in the below list for any user management requests.
        </p>
        <br></br><br></br>
        <Link to='/DeligateListPage'>
        <a href="/authorized-delegate-list" className="text-blue-500">Authorized Delegate List</a>
        </Link>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 mr-2 text-white bg-red-500" onClick={() => window.location.reload()}>Cancel</button>
          <button className="px-4 py-2 text-white bg-green-500" onClick={handleSubmit}>Create Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket

import React, { useState } from 'react';

const EditTicketClient = () => {
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [tracker, setTracker] = useState('');
  const [helpdeskContact, setHelpdeskContact] = useState('');
  const [email, setEmail] = useState('');
    	const [contactNumber, setContactNumber] = useState('');
  const [issueDescription, setIssueDescription] = useState('Write here');
  const [attachments, setAttachments] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleAddMore = () => {
    // Implement logic to add more attachments
  };

  const handleResubmit = () => {
    // Implement logic to handle resubmission
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
      {/* Repeat similar input fields for Helpdesk Contact, Email, and Contact Number */}
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
      {attachments.length > 0 && (
        <div className="w-full mt-4">
          <p>Already Uploaded Images:</p>
          <div className="flex flex-wrap">
            {attachments.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index + 1}`}
                className="m-2 max-w-1/4"
              />
            ))}
          </div>
        </div>
      )}
      <div className="p-4 mt-4 bg-lightBlue-100">
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 text-white bg-red-500" onClick={() => window.location.reload()}>Cancel</button>
          <button className="px-4 py-2 text-white bg-green-500" onClick={handleResubmit}>Resubmit</button>
        </div>
      </div>
    </div>
  );
};

export default EditTicketClient;

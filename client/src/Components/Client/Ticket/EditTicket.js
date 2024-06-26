import React, { useState, useEffect } from 'react';

const EditTicketForm = () => {
  // Simulate fetching data from a backend
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      const data = await getTicketDataFromBackend();
      setSubject(data.subject);
      setTicketDate(data.ticketDate);
      setTracker(data.tracker);
      setHelpdeskContact(data.helpdeskContact);
      setEmail(data.email);
      setContactNo(data.contactNo);
      setIssueDescription(data.issueDescription);
      setAttachments(data.attachments);
    };
    fetchData();
  }, []);

  const [subject, setSubject] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [tracker, setTracker] = useState('');
  const [helpdeskContact, setHelpdeskContact] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (event) => {
    setAttachments([...attachments, ...Array.from(event.target.files)]);
  };

  const handleFileDelete = (fileName) => {
    setAttachments(attachments.filter(file => file.name !== fileName));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert('Ticket successfully updated!');
  };

  const handleCancel = () => {
    // Reset all the form fields
    setSubject('');
    setTicketDate('');
    setTracker('');
    setHelpdeskContact('');
    setEmail('');
    setContactNo('');
    setIssueDescription('');
    setAttachments([]);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100 border rounded-lg shadow-md">
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
              <option value="Support">Support</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Helpdesk contact</label>
            <select
              value={helpdeskContact}
              onChange={(e) => setHelpdeskContact(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="Mr.Nishan Wikramarathna">Mr.Nishan Wikramarathna</option>
              <option value="Ms.Sara Johnson">Ms.Sara Johnson</option>
              <option value="Mr.John Doe">Mr.John Doe</option>
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
          <label className="block font-bold text-black">Attachments</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
            multiple
          />
          <p className="mt-1 text-sm text-gray-600">(Allowed file extensions: jpg, jpeg, png)</p>
          <div className="mt-2">
            {attachments.map((file, index) => (
              <div key={index} className="inline-block p-1 mr-1 text-sm text-white bg-gray-500 rounded">
                {file.name || file} <button type="button" onClick={() => handleFileDelete(file.name || file)} className="ml-2 text-red-500">x</button>
              </div>
            ))}
          </div>
        </div>

        

        <div className="flex justify-between p-4 border-t border-gray-400">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-white bg-[#294D61] rounded">
            Re Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Simulate fetching data from a backend
const getTicketDataFromBackend = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        subject: 'Show Error Message',
        ticketDate: '2024-03-26',
        tracker: 'Sales',
        helpdeskContact: 'Mr.Nishan Wikramarathna',
        email: 'Louise123@gmail.com',
        contactNo: '077 669 9950',
        issueDescription: 'This normally occurs when many users are on-line. Some times it shows error message like the below screenshot i attached. And The system is very sluggish, and opening a chart report takes more than 3 minutes. It usually took less than 10 seconds.',
        attachments: ['Error.jpg', 'img.Error Msg.jpg', 'img.slow response.jpeg'],
      });
    }, 1000);
  });
};

export default EditTicketForm;

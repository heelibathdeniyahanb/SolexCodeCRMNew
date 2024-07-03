import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../login/UserContext';

const EventForm = ({ onClose, leadId }) => {
  const { userData } = useUser();
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [participants, setParticipants] = useState([{ FullName: '', email: '' }]);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isSendViaEmail, setIsSendViaEmail] = useState(false);

  const [adminAndUserData, setAdminAndUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadResponse = await axios.get(`https://localhost:7143/api/Lead/${leadId}`);
        const leadData = leadResponse.data.newLead;

        const adminResponse = await axios.get('https://localhost:7143/api/user/Get');
        const adminData = adminResponse.data.filter(user => user.role === 'Admin');

        const combinedData = [
          {
            fullName: leadData.userFullName,
            email: leadData.userEmail,
            role: 'User'
          },
          ...adminData.map(admin => ({
            fullName: admin.fullName,
            email: admin.email,
            role: 'Admin'
          }))
        ];

        setAdminAndUserData(combinedData);
      } catch (error) {
        toast.error('Error fetching data');
      }
    };

    if (leadId) {
      fetchData();
    }
  }, [leadId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      toast.error('User details not found.');
      return;
    }

    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split('T')[0];

    if (new Date(date) < new Date(currentDate)) {
      toast.error('Event date cannot be earlier than today.');
      return;
    }

    if (new Date(reminderDate) < new Date(currentDate)) {
      toast.error('Reminder date cannot be earlier than today.');
      return;
    }

    if (new Date(reminderDate) > new Date(date)) {
      toast.error('Reminder date cannot be later than the event date.');
      return;
    }

    
    if (!eventName || !venue || !date || !time || participants.some(participant => !participant.email)) {
        toast.error('Please fill out all required fields.');
        return;
      }

    const data = {
      eventName,
      date,
      time,
      venue,
      host: userData.fullName || '',
      participants: participants.map(participant => ({
        FullName: participant.FullName,
        Email: participant.email
      })),
      reminderDate,
      reminderTime,
      description,
      isImportant,
      isSendViaEmail,
      newLeadId:leadId,
      createdByName: userData.fullName || "",
      createdByEmail: userData.email || "",
      createdById: userData.id || ""
    };

    try {
      await axios.post('https://localhost:7143/api/Event', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Event added successfully');
      onClose();
    } catch (error) {
      toast.error('An error occurred while adding the event.');
    }
  };

  const handleParticipantChange = (index, fieldName, value) => {
    const list = [...participants];
    if (fieldName === 'select') {
      const selectedPerson = adminAndUserData.find(person => person.email === value);
      list[index] = { FullName: selectedPerson.fullName, email: selectedPerson.email };
    } else {
      list[index][fieldName] = value;
    }
    setParticipants(list);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, { FullName: '', email: '' }]);
  };

  const handleRemoveParticipant = (index) => {
    const list = [...participants];
    list.splice(index, 1);
    setParticipants(list);
  };

  return (
    <div className='formbody border px-5 py-5 text-sm'>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className='title mb-4'>
          <div className='addevent'>
            <div className='text-2xl font-bold'>Add Event</div><br></br>
          </div>
          <label className="block mb-2">Title</label>
          <input 
            type='text' 
            placeholder='Add event title' 
            className='border px-3 py-2 rounded-md w-full border-green-700' 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            required 
          />
        </div>
        <div className='venue mb-4'>
          <label className="block mb-2">Venue</label>
          <input 
            type='text' 
            placeholder='Add Venue' 
            className='border px-3 py-2 rounded-md w-full border-green-700' 
            value={venue} 
            onChange={(e) => setVenue(e.target.value)} 
            required 
          />
        </div>
        <div className='time mb-4 flex items-center'>
          <label className="block mr-2">From</label>
          <input 
            type='date' 
            className='border px-3 py-2 rounded-md mr-2 border-green-700' 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
          <input 
            type='time' 
            className='border px-3 py-2 rounded-md border-green-700' 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <div className='reminder mb-4 flex items-center'>
          <label className="block mr-2">Reminder Date</label>
          <input 
            type='date' 
            className='border px-3 py-2 rounded-md mr-2 border-green-700' 
            value={reminderDate} 
            onChange={(e) => setReminderDate(e.target.value)} 
          />
          <label className="block mr-2">Time</label>
          <input 
            type='time' 
            className='border px-3 py-2 rounded-md border-green-700' 
            value={reminderTime} 
            onChange={(e) => setReminderTime(e.target.value)} 
          />
        </div>
        <div className='participants mb-4'>
          <label className="block mb-2">Participants</label>
          {participants.map((participant, index) => (
            <div key={index} className="flex mb-2">
              <select
                value={participant.email}
                onChange={(e) => handleParticipantChange(index, 'select', e.target.value)}
                required
                className='border px-3 py-2 rounded-md mr-2 border-green-700'
              >
                <option value="">Select a participant</option>
                {adminAndUserData.map((person) => (
                  <option key={person.email} value={person.email}>
                    {person.fullName} ({person.email}) - {person.role}
                  </option>
                ))}
              </select>
              <input
                type='text'
                placeholder='Name'
                value={participant.FullName}
                readOnly
                className='border px-3 py-2 rounded-md mr-2 border-green-700'
              />
              <input
                type='email'
                placeholder='Email'
                value={participant.email}
                readOnly
                className='border px-3 py-2 rounded-md mr-2 border-green-700'
              />
              {index !== 0 && (
                <button 
                  type='button' 
                  onClick={() => handleRemoveParticipant(index)} 
                  className='px-3 py-1 bg-red-500 text-white rounded-md'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button 
            type='button' 
            onClick={handleAddParticipant} 
            className='px-3 py-1 bg-blue-500 text-white rounded-md'
          >
            Add Participant
          </button>
        </div>
        <div className='description mb-4'>
          <label className="block mb-2">Description</label>
          <textarea 
            rows="4" 
            className='border px-3 py-2 rounded-md w-full border-green-700' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='isImportant mb-4'>
          <label className="block mb-2">Mark As Important</label>
          <input 
            type='checkbox' 
            checked={isImportant} 
            onChange={(e) => setIsImportant(e.target.checked)} 
          />
        </div>
        <div className='isSendViaEmail mb-4'>
          <label className="block mb-2">Send Via Email</label>
          <input 
            type='checkbox' 
            checked={isSendViaEmail} 
            onChange={(e) => setIsSendViaEmail(e.target.checked)} 
          />
        </div>
        <div className='submit'>
          <button 
            type='submit' 
            className='px-3 py-1 bg-green-500 text-white rounded-md'
          >
            Submit
          </button>
          <button 
            type='button' 
            onClick={onClose} 
            className='border px-6 py-2 mx-20 bg-gray-400 rounded-lg font-bold'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;

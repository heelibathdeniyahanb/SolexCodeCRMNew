import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EEdit({ visible, eventId, onClose }) {
  const [editId, setEditId] = useState('');
  const [editEventName, setEditEventName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editParticipants, setEditParticipants] = useState([{ FullName: '', email: '' }]);
  
  const [editDescription, setEditDescription] = useState('');
  const [editVenue, setEditVenue] = useState('');
  const [editHost, setEditHost] = useState('');
  const [editRepeatUntilDate, setEditRepeatUntilDate] = useState('');
  const [editRepeatUntilTime, setEditRepeatUntilTime] = useState('');
  const [editReminderDate, setEditReminderDate] = useState('');
  const [editReminderTime, setEditReminderTime] = useState('');
  const [editIsImportant, setEditIsImportant] = useState(false);
  const [editIsSendViaEmail, setEditIsSendViaEmail] = useState(false);

  useEffect(() => {
    if (visible && eventId) {
      handleEdit(eventId);
    }
  }, [visible, eventId]);

  const handleEdit = (id) => {
    axios.get(`https://localhost:7143/api/Event/${id}`)
      .then((result) => {
        const { eventName, date, time, description, venue, host, repeatUntilDate, repeatUntilTime, reminderDate, reminderTime, isImportant, isSendViaEmail, participants } = result.data;
  
        const transformedParticipants = participants && Array.isArray(participants) ?
          participants.map(participant => ({
            FullName: participant.FullName,
            email: participant.Email
          })) : [];
  
        setEditEventName(eventName);
        setEditDate(date);
        setEditTime(time);
        setEditParticipants(transformedParticipants);
       
        setEditDescription(description);
        setEditVenue(venue);
        setEditHost(host);
        setEditRepeatUntilDate(repeatUntilDate);
        setEditRepeatUntilTime(repeatUntilTime);
        setEditReminderDate(reminderDate);
        setEditReminderTime(reminderTime);
        setEditIsImportant(isImportant);
        setEditIsSendViaEmail(isSendViaEmail);
        setEditId(id);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }
  

  const handleUpdate = () => {
    const url = `https://localhost:7143/api/Event/${editId}`;
   
    
    const data = {
      id: editId,
      eventName: editEventName,
      date:editDate,  
      time: editTime,
      participants: editParticipants,
     
      description: editDescription,
      venue: editVenue,
      host: editHost,
      repeatUntilDate: editRepeatUntilDate,
      repeatUntilTime: editRepeatUntilTime,
      reminderDate: editReminderDate,
      reminderTime: editReminderTime,
      isImportant: editIsImportant,
      isSendViaEmail: editIsSendViaEmail

      
    };
  
    axios.put(url, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          onClose();
          clear();
          toast.success('Event has been updated successfully');
        } else {
          toast.error('An error occurred while updating the event.');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error occurred while updating the event.');
      });
  }

  const clear = () => {
    setEditEventName('');
    setEditDate('');
    setEditTime('');
    setEditParticipants([{ FullName: '', email: '' }]);
   
    setEditDescription('');
    setEditVenue('');
    setEditHost('');
    setEditRepeatUntilDate('');
    setEditRepeatUntilTime('');
    setEditReminderDate('');
    setEditReminderTime('');
    setEditIsImportant(false);
    setEditIsSendViaEmail(false);
    setEditId('');
  }

  return (
    <>
      {visible && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10'>
           <div className="border w-110 bg-white p-8 rounded-lg overflow-y-auto max-h-96">

            <h1 className='text-lg font-semibold mb-4 text-center'>Modify/Update Event</h1>
            <form>
              <div className='mb-4'>
                <label className="block mb-2">Title</label>
                <input
                  type='text'
                  placeholder='Add event title'
                  className='border px-3 py-2 rounded-md w-full border-green-700'
                  value={editEventName}
                  onChange={(e) => setEditEventName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4'>
                <label className="block mb-2">Venue</label>
                <input
                  type='text'
                  placeholder='Add Venue'
                  className='border px-3 py-2 rounded-md w-full border-green-700'
                  value={editVenue}
                  onChange={(e) => setEditVenue(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4 flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 md:mr-2'>
                  <label className="block mb-2">From</label>
                  <input
                    type='date'
                    className='border px-3 py-2 rounded-md border-green-700'
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    required
                  />
                </div>
                <div className='w-full md:w-1/2 md:ml-2'>
                  <label className="block mb-2">Time</label>
                  <input
                    type='time'
                    className='border px-3 py-2 rounded-md border-green-700'
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className='mb-4 flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 md:mr-2'>
                  <label className="block mb-2">Repeat Until Date</label>
                  <input
                    type='date'
                    className='border px-3 py-2 rounded-md border-green-700'
                    value={editRepeatUntilDate}
                    onChange={(e) => setEditRepeatUntilDate(e.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/2 md:ml-2'>
                  <label className="block mb-2">Time</label>
                  <input
                    type='time'
                    className='border px-3 py-2 rounded-md border-green-700'
                    value={editRepeatUntilTime}
                    onChange={(e) => setEditRepeatUntilTime(e.target.value)}
                  />
                </div>
              </div>
              <div className='mb-4 flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 md:mr-2'>
                  <label className="block mb-2">Reminder Date</label>
                  <input
                    type='date'
                    className='border px-3 py-2 rounded-md border-green-700'
                    value={editReminderDate}
                    onChange={(e) => setEditReminderDate(e.target.value)}
                    required
                  />
                </div>
                <div className='w-full md:w-1/2 md:ml-2'>
                  <label className="block mb-2">Time</label>
                  <input
                    type='time'
                    className='border px-3 py-2 rounded-md border-green-700'
                    value={editReminderTime}
                    onChange={(e) => setEditReminderTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className='mb-4'>
                <label className="block mb-2">Participants</label>
                {editParticipants.map((participant, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type='text'
                      placeholder='Name'
                      value={participant.FullName}
                      onChange={(e) => {
                        const updatedParticipants = [...editParticipants];
                        updatedParticipants[index].FullName = e.target.value;
                        setEditParticipants(updatedParticipants);
                      }}
                      required
                      className='border px-3 py-2 rounded-md mr-2 border-green-700'
                    />
                    <input
                      type='email'
                      placeholder='Email'
                      value={participant.email}
                      onChange={(e) => {
                        const updatedParticipants = [...editParticipants];
                        updatedParticipants[index].email = e.target.value;
                        setEditParticipants(updatedParticipants);
                      }}
                      required
                      className='border px-3 py-2 rounded-md mr-2 border-green-700'
                    />
                    {index !== 0 && (
                      <button type='button' onClick={() => {
                        const updatedParticipants = [...editParticipants];
                        updatedParticipants.splice(index, 1);
                        setEditParticipants(updatedParticipants);
                      }} className='px-3 py-1 bg-red-500 text-white rounded-md'>Remove</button>
                    )}
                  </div>
                ))}
                <button type='button' onClick={() => setEditParticipants([...editParticipants, { FullName: '', email: '' }])} className='px-3 py-1 bg-blue-500 text-white rounded-md'>Add Participant</button>
              </div>
              <div className='mb-4'>
                <label className="block mb-2">Description</label>
                <textarea rows="4" cols="52" name="comment" className='border px-3 py-2 rounded-md border-green-700' placeholder='Enter text here...' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required ></textarea>
              </div>
              <div className='mb-4'>
                <input type='checkbox' id="marked" name="high priority" checked={editIsImportant} onChange={(e) => setEditIsImportant(e.target.checked)} className="mr-2" />
                <label htmlFor="marked">Mark as high priority</label>
              </div>
              <div className='mb-4'>
                <input type='checkbox' id="sendViaEmail" name="sendViaEmail" checked={editIsSendViaEmail} onChange={(e) => setEditIsSendViaEmail(e.target.checked)} className="mr-2" />
                <label htmlFor="sendViaEmail">Send Via Email</label>
              </div>
            </form>
            <div className='flex justify-between'>
              <button onClick={onClose} className='text-gray-600 hover:text-gray-800 font-medium focus:outline-none'>Close</button>
              <button onClick={handleUpdate} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none'>
                Update
               </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

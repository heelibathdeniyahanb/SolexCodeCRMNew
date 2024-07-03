import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../login/UserContext";

const EventUpdateForm = ({ eventToUpdate, onClose }) => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [participants, setParticipants] = useState([]);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isSendViaEmail, setIsSendViaEmail] = useState(false);
  const [adminAndUserData, setAdminAndUserData] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch admin users for participant selection
        const adminResponse = await axios.get(
          "https://localhost:7143/api/user/Get"
        );
        const adminData = adminResponse.data.filter(
          (user) => user.role === "Admin"
        );

        // Combine participants from eventToUpdate and adminData
        const combinedData = [
          ...eventToUpdate.participants.map((participant) => ({
            fullName: participant.fullName,
            email: participant.email,
            role: "User",
          })),
          ...adminData.map((admin) => ({
            fullName: admin.fullName,
            email: admin.email,
            role: "Admin",
          })),
        ];

        setAdminAndUserData(combinedData);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    if (eventToUpdate) {
      setEventName(eventToUpdate.eventName || "");
      setDate(eventToUpdate.date || "");
      setTime(eventToUpdate.time || "");
      setVenue(eventToUpdate.venue || "");
      setParticipants(eventToUpdate.participants || []);
      setReminderDate(eventToUpdate.reminderDate || "");
      setReminderTime(eventToUpdate.reminderTime || "");
      setDescription(eventToUpdate.description || "");
      setIsImportant(eventToUpdate.isImportant || false);
      setIsSendViaEmail(eventToUpdate.isSendViaEmail || false);
    }

    fetchData();
  }, [eventToUpdate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split("T")[0];

    if (new Date(date) < new Date(currentDate)) {
      toast.error("Event date cannot be earlier than today.");
      return;
    }

    if (new Date(reminderDate) < new Date(currentDate)) {
      toast.error("Reminder date cannot be earlier than today.");
      return;
    }

    if (new Date(reminderDate) > new Date(date)) {
      toast.error("Reminder date cannot be later than the event date.");
      return;
    }

    if (!eventName || !venue || !date || !time) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const data = {
      id: eventToUpdate.id,
      eventName,
      date,
      time,
      venue,
      participants,
      reminderDate,
      reminderTime,
      description,
      isImportant,
      isSendViaEmail,
      createdByName: userData.fullName || "",
      createdByEmail: userData.email || "",
      createdById: userData.id || "",
    };

    try {
      await axios.put(
        `https://localhost:7143/api/Event/${eventToUpdate.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Event updated successfully");
      onClose();
    } catch (error) {
      toast.error("An error occurred while updating the event.");
    }
  };

  const handleParticipantChange = (index, fieldName, value) => {
    const list = [...participants];
    if (fieldName === "select") {
      const selectedPerson = adminAndUserData.find(
        (person) => person.email === value
      );
      list[index] = {
        fullName: selectedPerson.fullName,
        email: selectedPerson.email,
      };
    } else {
      list[index][fieldName] = value;
    }
    setParticipants(list);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, { fullName: "", email: "" }]);
  };

  const handleRemoveParticipant = (index) => {
    const list = [...participants];
    list.splice(index, 1);
    setParticipants(list);
  };

  return (
    <div className="formbody border px-5 py-5 text-sm">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="title mb-4">
          <div className="addevent">
            <div className="text-2xl font-bold">Update Event</div>
            <br />
          </div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            placeholder="Add event title"
            className="border px-3 py-2 rounded-md w-full border-green-700"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="venue mb-4">
          <label className="block mb-2">Venue</label>
          <input
            type="text"
            placeholder="Add Venue"
            className="border px-3 py-2 rounded-md w-full border-green-700"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>
        <div className="time mb-4 flex items-center">
          <label className="block mr-2">From</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md mr-2 border-green-700"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="border px-3 py-2 rounded-md border-green-700"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="reminder mb-4 flex items-center">
          <label className="block mr-2">Reminder Date</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md mr-2 border-green-700"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="border px-3 py-2 rounded-md border-green-700"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            required
          />
        </div>
        <div className="description mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            placeholder="Add event description"
            className="border px-3 py-2 rounded-md w-full border-green-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="participants mb-4">
          <label className="block mb-2">Participants</label>
          {participants.map((participant, index) => (
            <div key={index} className="flex mb-2">
              <select
                className="border px-3 py-2 rounded-md mr-2 border-green-700"
                value={participant.email}
                onChange={(e) =>
                  handleParticipantChange(index, "select", e.target.value)
                }
              >
                <option value="">Select participant...</option>
                {adminAndUserData.map((person, idx) => (
                  <option key={idx} value={person.email}>
                    {person.fullName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Full Name"
                className="border px-3 py-2 rounded-md mr-2 border-green-700"
                value={participant.fullName}
                onChange={(e) =>
                  handleParticipantChange(index, "fullName", e.target.value)
                }
              />
              <button
                type="button"
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveParticipant(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white py-1 px-3 rounded-md"
            onClick={handleAddParticipant}
          >
            Add Participant
          </button>
        </div>
        <div className="important mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            Important Event
          </label>
        </div>
        <div className="email mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={isSendViaEmail}
              onChange={(e) => setIsSendViaEmail(e.target.checked)}
            />
            Send Reminder via Email
          </label>
        </div>
        <div className="submit">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventUpdateForm;

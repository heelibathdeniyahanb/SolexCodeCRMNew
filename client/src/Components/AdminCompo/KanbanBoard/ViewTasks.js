import React, { useState, useEffect } from "react";
import axios from "axios";
import TEdit from "../../Task/TEdit";


function ViewTasks({ leadId, onClose }) {
  const [leadData, setLeadData] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axios.get(`https://localhost:7143/api/Lead/${leadId}`);
        setLeadData(response.data);
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };

    fetchLeadData();
  }, [leadId]);

  const handleEditClick = (taskId) => {
    setSelectedTaskId(taskId);
    setIsEditVisible(true);
  };

  const handleEditClose = () => {
    setIsEditVisible(false);
    setSelectedTaskId(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>
        {leadData ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Tasks for Lead {leadData.newLead.leadName}
            </h2>
            {leadData.tasks.length > 0 ? (
              <ul>
                {leadData.tasks.map((task) => (
                  <li key={task.id} className="mb-2 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold">{task.taskName}</div>
                      <div className="text-xs text-gray-500">{task.taskDescription}</div>
                    </div>
                    <button
                      onClick={() => handleEditClick(task.id)}
                      className="ml-4 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks found.</p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {isEditVisible && (
        <TEdit
          visible={isEditVisible}
          taskId={selectedTaskId}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}

export default ViewTasks;

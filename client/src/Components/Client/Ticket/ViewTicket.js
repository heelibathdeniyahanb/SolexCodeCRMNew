import React from 'react';

const TicketDetails = () => {
  return (
    <div className="max-w-4xl p-6 mx-auto bg-[#294d618b] border rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-2 bg-gray-300 border">
          <strong>Request by</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Louise Mountaine
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Priority</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Average
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Request on</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          2024 - 03 - 26
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Subject</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Show Error Message
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Tracker</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Sales
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Email</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Louise123@gmail.com
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Tracker</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          077 669 9950
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Helpdesk Contact</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Mr. Nishan Wikramarathna
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Ticket Type</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Private
        </div>

        <div className="p-2 bg-gray-300 border">
          <strong>Ticket Status</strong>
        </div>
        <div className="p-2 bg-gray-200 border">
          Pending
        </div>

        <div className="col-span-2 p-2 bg-gray-300 border">
          <strong>Issue</strong>
        </div>
        <div className="col-span-2 p-2 bg-gray-200 border">
          This normally occurs when many users are on-line. Some times it shows error message like the below screenshot I attached. And the system is very sluggish, and opening a chart report takes more than 3 minutes. It usually took less than 10 seconds.
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

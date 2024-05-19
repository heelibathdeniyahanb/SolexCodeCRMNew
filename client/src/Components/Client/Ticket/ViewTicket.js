import React from 'react';

    
const ViewTicket = ({ uploadedImage }) => {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Your Ticket...</h1>
      <div className="mb-4">
        <p className="font-bold">Subject:</p>
        <p>How can I invite my friend</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Ticket Date:</p>
        <p>2024-03-26</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Tracker:</p>
        <p>Sales</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Helpdesk Contact:</p>
        <p>Mr. Malith</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Email:</p>
        <p>rohan001@gmail.com</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Contact Number:</p>
        <p>0777494713</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Issue:</p>
        <p>
          How can I effectively invite my friend to engage with our Skill
          Spinzer System? I want to ensure the invitation is engaging and
          informative. Could you provide guidance on crafting an enticing
          message that highlights the benefits of our system and encourages my
          friend to explore its features? Additionally, are there any specific
          strategies or persuasive techniques I should incorporate to increase
          the likelihood of their participation? Thank you for your assistance
          in making this invitation compelling and impactful.
        </p><br></br>
        <div className="mb-4">
        <p className="font-bold">Attached photos:</p>
        <img src={uploadedImage} alt="Uploaded image" className="max-w-full" />
      </div>
      </div>
    </div>
  );
};

export default ViewTicket;

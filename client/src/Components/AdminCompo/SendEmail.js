import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EmailForm = ({ recipients }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('subject', data.subject);
    formData.append('body', data.body);
    recipients.forEach((recipient, index) => {
      formData.append(`recipients[${index}]`, recipient);
    });

    if (data.attachments) {
      for (let i = 0; i < data.attachments.length; i++) {
        formData.append('attachments', data.attachments[i]);
      }
    }

    try {
      await axios.post('https://localhost:7143/api/Email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Email sent successfully');
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Send Email</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">Subject:</label>
          <input
            type="text"
            id="subject"
            className="w-full px-3 py-2 border rounded-md"
            {...register('subject', { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700">Body:</label>
          <textarea
            id="body"
            className="w-full px-3 py-2 border rounded-md"
            {...register('body', { required: true })}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="attachments" className="block text-gray-700">Attachments:</label>
          <input
            type="file"
            id="attachments"
            className="w-full px-3 py-2 border rounded-md"
            {...register('attachments')}
            multiple
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default EmailForm;

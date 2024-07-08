import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import ClientSidebar from '../../Components/Client/ClientSideNavBar';
import { FaTrash } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useUser } from '../../Components/login/UserContext';



// Stripe publishable key
const stripePromise = loadStripe('pk_test_51Pa9qz2NuiIQbA4fyGk6Bd2vpCUR1nJCX82tyfzS2PajwRvbWoK89Lx2bG9aEVJfLwurRBKmQjSX04cLQrzGxdvI00Q7UQMCNA');

//Delete Lead
const handleDelete = async (id, leads, setLeads) => {
  const confirmed = window.confirm('Do you want to delete this invoice?');
  if (confirmed) {
    try {
      await axios.delete(`https://localhost:7143/api/Invoice/${id}`);
      setLeads(leads.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  }
};

// Delete Payment Details
const handleDeletePayment = async (id, setSuccessfulPayments) => {
  const confirmed = window.confirm('Do you want to delete this payment?');
  if (confirmed) {
    try {
      await axios.delete(`https://localhost:7143/api/Payment/${id}`);
      setSuccessfulPayments(prevPayments => prevPayments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  }
};

const KanbanCard = ({ lead, onClick, leads, setLeads }) => (
  <div className="bg-gray-300 rounded shadow p-4 cursor-pointer" onClick={() => onClick(lead)}>
    <div className="flex justify-between items-center mb-2">
      <div>
        <h3 className="text-lg font-bold mb-2">{lead.clientCompany}</h3>
        <p className="text-md text-teal-700 font-bold mb-2">{lead.clientName}</p>
        <p className="text-md text-pink-700 font-bold mb-2">{lead.description}</p>
      </div>
      <button 
        className="text-red-700 hover:text-red-500 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(lead.id, leads, setLeads);
        }}
      >
        <FaTrash />
      </button>
    </div>
    <div className="text-sm text-gray-700 font-bold flex items-center space-x-4 mb-2">
      <p className="flex items-center mr-12">Start: {new Date(lead.date).toLocaleDateString()}</p>
      <p className="flex items-center">Due: {new Date(lead.dueDate).toLocaleDateString()}</p>
    </div>
    <div className="text-sm flex items-center justify-between space-x-2 p-2 rounded-md">
      {lead.paid ? (
        <button className="px-4 py-2 bg-red-700 text-white border border-red-700 font-bold rounded-md shadow hover:bg-red-400 hover:text-white ">
          Paid
        </button>
      ) : (
        <button className="px-4 py-2 bg-blue-700 text-white border border-blue-700 font-bold rounded-md shadow hover:bg-blue-400 hover:text-white">
          Not Paid
        </button>
      )}
    </div>
  </div>
);

const PaymentForm = ({ selectedLead, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { userData } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        console.error(error);
    } else {
        const paymentData = {
            amount: Math.round(selectedLead.totalPrice),
            paymentMethodId: paymentMethod.id,
            clientName: selectedLead.clientName,
            clientCompany: selectedLead.clientCompany,
            description:selectedLead.description,
            userEmail:userData.email
        };

        console.log('Submitting payment data:', paymentData);

        try {
            const response = await axios.post('https://localhost:7143/api/Payment', paymentData);

            if (response.data.success) {
                alert('Payment successful');
                onPaymentSuccess(selectedLead.id, {
                  id: response.data.paymentId, // Assuming the API returns the new payment ID
                  clientCompany: selectedLead.clientCompany,
                  clientName: selectedLead.clientName,
                  description: selectedLead.description,
                  amount: selectedLead.totalPrice,
                  createdAt: new Date().toISOString()
                });
              } else {
                alert('Payment failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            console.log('Error response:', error.response.data); 
        }
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border border-gray-300 rounded" />
      <button 
        type="submit"
        disabled={!stripe}
        className="px-4 py-1 bg-gray-700 text-white font-semibold rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700"
      >
        Pay
      </button>
    </form>
  );
};

const ClientPaymentView1 = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [successfulPayments, setSuccessfulPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {userData} = useUser();

  useEffect(() => {
    const fetchLeads = async () => {
      if (userData && userData.email) {
        try {
          const response = await axios.get(`https://localhost:7143/api/Invoice/GetInvoicesByClientEmail/${encodeURIComponent(userData.email)}`);
          console.log('Backend data:', response.data);
          setLeads(response.data);
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      }
    };

    fetchLeads();
  }, [userData]);


  const handleCardClick = (lead) => {
    setSelectedLead(lead);
  };

  const handlePaymentSuccess = (leadId, paymentDetails) => {
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, paid: true } : lead));
    setSelectedLead({ ...selectedLead, paid: true });
    setSuccessfulPayments([...successfulPayments, paymentDetails]);
  };

  useEffect(() => {
    const fetchSuccessfulPayments = async () => {
      try {
        const paymentsResponse = await axios.get(`https://localhost:7143/api/Payment/successful/${encodeURIComponent(userData.email)}`);
        setSuccessfulPayments(paymentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSuccessfulPayments();
  }, [userData]);


  const filteredPayments = successfulPayments.filter(payment =>
    payment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-opacity-20 h-screen flex">
      <ClientSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 -mt-4 flex-1 overflow-auto">
          <div className="flex p-4 space-x-4 overflow-x-auto flex-wrap md:flex-nowrap">
            <div className="flex flex-col space-y-4 w-full md:w-1/4">
              {leads.map((lead) => (
                <KanbanCard key={lead.id} lead={lead} onClick={handleCardClick} leads={leads} setLeads={setLeads} />
              ))}
            </div>

            <div className="flex-1 md:w-1/2 space-y-4">
              {selectedLead && (
                <div className="space-y-6">
                  <div className="bg-gray-200 rounded shadow p-6 space-y-4 border border-gray-400">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-start text-black py-2 rounded">
                        Payment Details
                      </h2>
                    </div>
                    <div className="rounded-md">
                      <div className="flex items-center mb-2">
                        <label className="block text-black font-semibold w-32">Title</label>
                        <p>{selectedLead.clientCompany}</p>
                      </div>
                      <div className="flex items-center mb-2">
                        <label className="block text-black font-semibold w-32">Project Name</label>
                        <p>{selectedLead.description}</p>
                      </div>
                      <div className="rounded-md">
                        <div className="flex items-center mb-2">
                          <label className="block text-black font-semibold w-32">Total Fee</label>
                          <p>${selectedLead.subtotal}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <label className="block text-black font-semibold w-32">Discount</label>
                          <p>{selectedLead.discount}%</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <label className="block text-black font-semibold w-32">Payable Amount</label>
                          <p>${selectedLead.totalPrice}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <label className="block text-black font-semibold w-32">Due Date</label>
                          <p>{new Date(selectedLead.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-200 rounded shadow p-4 space-y-4 border border-gray-400">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-start text-black py-2 rounded">Make Payment</h2>
                    </div>
                    <Elements stripe={stripePromise}>
                      <PaymentForm selectedLead={selectedLead} onPaymentSuccess={handlePaymentSuccess} />
                    </Elements>
                  </div>
                </div>
              )}
            </div>

             {/* Paid Invoice Details */}
            <div className="flex flex-col space-y-4 w-full md:w-1/4 bg-gray-400">
              <div className="m-4">
              <div className="bg-gray-200 border border-gray-300 rounded-lg mb-4">
                <input
                  type="search"
                  placeholder="Search By Project Name"
                  className="w-full p-4 rounded-lg bg-gray-300 placeholder-cyan-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="m-4">
                  {filteredPayments.map((payment) => (
                    <div key={payment.id} className="bg-gray-400 border border-gray-300 rounded-lg p-6 mb-4 relative">
                      <button
                        className="absolute top-4 right-4 text-red-700 hover:text-red-500" 
                        onClick={() => handleDeletePayment(payment.id, setSuccessfulPayments)}
                      >
                        <FaTrash />
                      </button>
                      <h2 className="font-bold text-teal-700 mb-2">{payment.clientCompany}</h2>
                      <h3 className="font-bold text-black mb-2">{payment.clientName}</h3>
                      <h3 className="font-bold text-black mb-2">{payment.description}</h3>


                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-gray-700">Amount: ${payment.amount}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            Date: {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPaymentView1;

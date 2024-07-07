import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';
import axios from 'axios';
import { FaTrash } from "react-icons/fa"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalesInvoiceCard = ({ onInvoiceClick }) => {
    const [invoiceData, setInvoiceData] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const saleRefId = 6; //sales ref id
    useEffect(() => {
        axios.get(`https://localhost:7143/api/Invoice?saleRefId=${saleRefId}`)
            .then(response => setInvoiceData(response.data))
            .catch(() => console.log("Error occurred fetching data"));
    }, [saleRefId]);

    const formatDate = (date) => {
        if (!moment(date).isValid()) {
            return 'Invalid Date';
        }
        return moment(date).format('YYYY/MM/DD');
    };

    const formatInvoiceNumber = (invoiceNo) => {
        const parts = invoiceNo.split('-');
        if (parts.length === 4) {
            const formattedDate = parts[1];
            const formattedNumber = parts[3].padStart(2, '0');
            return `#INV-${formattedDate}-${formattedNumber}`;
        } else if (parts.length === 2) {
            const datePart = parts[1].slice(0, 10);
            const numberPart = parts[1].slice(10);
            const formattedNumber = numberPart.padStart(2, '0');
            return `#INV-${datePart}-${formattedNumber}`;
        }
        return invoiceNo;
    };

    const handleCardClick = (id) => {
        setSelectedInvoice(id);
        onInvoiceClick(id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            axios.delete(`https://localhost:7143/api/Invoice/${id}`)
                .then(() => {
                    setInvoiceData(invoiceData.filter(invoice => invoice.id !== id));
                    if (selectedInvoice === id) {
                        setSelectedInvoice(null);
                    }
                    toast.success("Invoice deleted successfully!");
                })
                .catch(() => console.log("Error occurred deleting invoice"));
               
        }
    };


    return (
        <div className="overflow-y-auto" style={{ maxHeight: '560px' }}>
            <ToastContainer />
            <div className="flex flex-col">
                {invoiceData.map((invoice) => (
                    <div
                        key={invoice.id}
                        className={`card text-black ${selectedInvoice === invoice.id ? 'bg-gray-100' : 'bg-gray-400'} -mb-1 border-4 border-gray-400 ml-3 mt-3 shadow-xl rounded-md cursor-pointer relative`}
                        style={{ maxWidth: '18rem', minHeight: '9rem' }}
                        onClick={() => handleCardClick(invoice.id)}
                    >
                        {selectedInvoice === invoice.id && (
                            <FaTrash
                                className="absolute top-2 right-2 p-2 text-red-500 font-bold cursor-pointer text-4xl"
                                onClick={() => handleDelete(invoice.id)}
                            />
                        )}
                        <div className="card-header text-start p-2 font-bold">{formatInvoiceNumber(invoice.invoiceNo)}</div>
                        <div className="card-body">
                            <h5 className="card-title text-teal-800 font-bold text-start ml-2">{invoice.clientCompany}</h5>
                            <h5 className="card-title text-pink-700 font-bold text-start ml-2">{invoice.description}</h5>


                            <div className="w-28 bg-teal-700 border-teal-800 rounded-full h-8 flex items-center justify-center ml-2 mt-2 mb-2">
                                <div className="font-bold text-center text-white">
                                    {invoice.pipeline}
                                </div>
                            </div>
                            <div className="float-left ml-2 mt-1">
                                <Avatar size="32" round={true} />
                            </div>
                            <p className="card-text">
                                <span className="ml-3 text-sm text-gray-700 text-justify font-bold">
                                    {formatDate(invoice.date)} - {formatDate(invoice.dueDate)}
                                </span>
                            </p>
                            <div className="flex items-center mt-6 mb-2">
                                <p className="card-text text-gray-700 ml-8 mt-2 text-lg font-bold mb-2">${invoice.totalPrice}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesInvoiceCard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const InvoiceForm = ({ onSubmit,fetchInvoiceData  }) => {

    const [lastInvoiceNumber, setLastInvoiceNumber] = useState(() => {
        // Retrieve the last invoice number and date from local storage or initialize them
        const savedInvoiceData = localStorage.getItem('lastInvoiceData');
        if (savedInvoiceData) {
          const { lastNumber, lastDate } = JSON.parse(savedInvoiceData);
          if (dayjs().isSame(lastDate, 'day')) {
            return lastNumber;
          }
        }
        return 0;
      });

    const generateInvoiceId = (lastNumber) => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const invoiceNumber = String(lastNumber + 1).padStart(2, '0');
        const invoiceId = `#INV-${currentDate}-${invoiceNumber}`;
        return invoiceId;
    };
    const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(() =>
        generateInvoiceId(lastInvoiceNumber)
    );

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientCompany, setClientCompany] = useState('');
    const [clientPost, setClientPost] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [dueDate, setDueDate] = useState(dayjs().add(7, 'day').format('YYYY-MM-DD'));
    const [pipeline, setPipeline] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [invoiceNo, setInvoiceNo] = useState(() => generateInvoiceId(lastInvoiceNumber));
    const [invoiceData, setInvoiceData] = useState([]);


    const calculateSubtotal = () => {
        const parsedPrice = parseFloat(price) || 0;
        const parsedQuantity = parseInt(quantity) || 0;
        return parsedPrice * parsedQuantity;
    };

    const calculateTotalPrice = () => {
        const subtotal = calculateSubtotal();
        const parsedDiscount = parseFloat(discount) || 0;
        const discountAmount = subtotal * (parsedDiscount / 100);
        return subtotal - discountAmount;
    };

    const calculateTotal = () => {
        return calculateTotalPrice();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newInvoiceNo = generateInvoiceId(lastInvoiceNumber);
        setInvoiceNo(newInvoiceNo);

        const invoiceData = {
            clientName,
            clientEmail,
            clientCompany,
            clientPost,
            invoiceNo: currentInvoiceNumber,
            date: invoiceDate,
            dueDate,
            pipeline,
            description,
            price: parseFloat(price) || 0,
            quantity: parseInt(quantity) || 0,
            discount: parseFloat(discount) || 0,
            totalPrice: calculateTotalPrice(),
            subtotal: calculateSubtotal(),
            total: calculateTotal(),
        };

        try {
            const response = await axios.post('https://localhost:7143/api/Invoice', invoiceData);
            console.log('Invoice submitted successfully', response.data);
            window.alert('Invoice created successfully!');

            onSubmit(invoiceData); // Pass the new invoice data to the parent component
            fetchInvoiceData();
            // Update last invoice number and currentInvoiceNumber for the next invoice
            setLastInvoiceNumber((prevNumber) => {
                const newNumber = prevNumber + 1;
                const currentDate = dayjs().format('YYYY-MM-DD');
                localStorage.setItem('lastInvoiceData', JSON.stringify({ lastNumber: newNumber, lastDate: currentDate }));
                setCurrentInvoiceNumber(generateInvoiceId(newNumber));
                return newNumber;
              });
        } catch (error) {
            console.error('Error submitting invoice', error);
            window.alert('Error submitting invoice. Please try again.');
        }

        // setLastInvoiceNumber((prevNumber) => {
        //     const newNumber = prevNumber + 1;
        //     localStorage.setItem('lastInvoiceNumber', newNumber); // Save the new number to local storage
        //     setCurrentInvoiceNumber(generateInvoiceId(newNumber)); // Update currentInvoiceNumber
        //     return newNumber;
        // });
    };

    // const fetchInvoiceData = async () => {
    //     try {
    //         const response = await axios.get('https://localhost:7143/api/Invoice');
    //         setInvoiceData(response.data);
    //     } catch (error) {
    //         console.error('Error fetching invoice data', error);
    //     }
    // };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    <div className="col-start-5 ml-80">
                        <label htmlFor="client_name" className="flex text-sm font-medium text-gray-600 mr-80">Client Name :</label>
                        <div className="mt-2">
                            <input
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                type="text"
                                name="client-name"
                                id="client-name"
                                className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="client_company" className="flex text-sm font-medium text-gray-600 mr-80">Client Company :</label>
                            <div className="mt-2">
                                <input
                                    value={clientCompany}
                                    onChange={(e) => setClientCompany(e.target.value)}
                                    type="text"
                                    name="client_company"
                                    id="client_company"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="client_email" className="flex text-sm font-medium text-gray-600 mr-80">Client Email:</label>
                            <div className="mt-2">
                                <input
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    type="text"
                                    name="client_email"
                                    id="client_email"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="client_post" className="flex text-sm font-medium text-gray-600 mr-80">Client Post :</label>
                            <div className="mt-2">
                                <input
                                    value={clientPost}
                                    onChange={(e) => setClientPost(e.target.value)}
                                    type="text"
                                    name="client_post"
                                    id="client_post"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="invoice-no" className="flex text-sm font-medium text-gray-600 mr-80">Invoice No :</label>
                            <div className="mt-2">
                                <input
                                    value={currentInvoiceNumber}
                                    type="text"
                                    name="invoice-no"
                                    id="invoice-no"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="invoice-date" className="flex text-sm font-medium text-gray-600 mr-80">Invoice Date :</label>
                            <div className="mt-2">
                                <input
                                    value={invoiceDate}
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    type="date"
                                    name="invoice-date"
                                    id="invoice-date"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="due-date" className="flex text-sm font-medium text-gray-600 mr-80">Due Date :</label>
                            <div className="mt-2">
                                <input
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    type="date"
                                    name="due-date"
                                    id="due-date"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="flex text-sm font-medium text-gray-600 mt-5">Invoice Details:</h3>
                            <div className="mt-2">
                                <select
                                    value={pipeline}
                                    onChange={(e) => setPipeline(e.target.value)}
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="Planning">Planning</option>
                                    <option value="Qualification">Qualification</option>
                                    <option value="Proposal">Proposal</option>
                                    <option value="Negotiation">Negotiation</option>
                                    <option value="Close-won">Close-won</option>
                                </select>
                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    placeholder="Description"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    placeholder="Price"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <input
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                    placeholder="Quantity"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <input
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    type="number"
                                    placeholder="Discount (%)"
                                    className="block w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <button type="submit" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md mt-2">Create Invoice</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;
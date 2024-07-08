import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../login/UserContext';


const SalesInvoiceForm = ({ onSubmit, fetchInvoiceData, invoiceData }) => {
    const [lastInvoiceNumber, setLastInvoiceNumber] = useState(() => {
        const savedInvoiceData = localStorage.getItem('lastInvoiceData');
        if (savedInvoiceData) {
            const { lastNumber, lastDate } = JSON.parse(savedInvoiceData);
            if (dayjs().isSame(lastDate, 'day')) {
                return lastNumber;
            }
        }
        return 0;
    });

    const { userData } = useUser();
    const [userId, setUserId] = useState('');
    const [userFullName, setUserFullName] = useState('');

    useEffect(() => {
        if (userData && userData.id) {
            setUserId(userData.id);
            setUserFullName(userData.fullName || ''); // Assuming the user data includes a fullName field
        }
    }, [userData]);


    const generateInvoiceId = useCallback((lastNumber) => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const invoiceNumber = String(lastNumber + 1).padStart(2, '0');
        return `INV-${currentDate}-${invoiceNumber}`;
    }, []);

    const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(() => generateInvoiceId(lastInvoiceNumber));

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
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (invoiceData) {
            setClientName(invoiceData.clientName || '');
            setClientEmail(invoiceData.clientEmail || '');
            setClientCompany(invoiceData.clientCompany || '');
            setClientPost(invoiceData.clientPost || '');
            setInvoiceDate(invoiceData.date || dayjs().format('YYYY-MM-DD'));
            setDueDate(invoiceData.dueDate || dayjs().add(7, 'day').format('YYYY-MM-DD'));
            setPipeline(invoiceData.pipeline || '');
            setDescription(invoiceData.description || '');
            setPrice(invoiceData.price || '');
            setQuantity(invoiceData.quantity || '');
            setDiscount(invoiceData.discount || '');
        }
    }, [invoiceData]);

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

    const validateForm = () => {
        const newErrors = {};
        if (!clientName) newErrors.clientName = 'Client Name is required';
        if (!clientEmail) newErrors.clientEmail = 'Client Email is required';
        if (!clientCompany) newErrors.clientCompany = 'Client Company is required';
        if (!clientPost) newErrors.clientPost = 'Client Post is required';
        if (!pipeline) newErrors.pipeline = 'Pipeline is required';
        if (!description) newErrors.description = 'Description is required';
        if (!price) newErrors.price = 'Price is required';
        if (!quantity) newErrors.quantity = 'Quantity is required';
        return newErrors;
    };

    //const saleRefId = 6; // Sales Ref number in create invoice

    const handleSubmit = async (e) => {
        e.preventDefault();

        const invoiceData = {
            clientName,
            clientEmail,
            clientCompany,
            date: invoiceDate,
            dueDate,
            pipeline,
            description,
            price: parseFloat(price) || 0,
            quantity: parseInt(quantity) || 0,
            discount: parseFloat(discount) || 0,
            InvoiceNo: currentInvoiceNumber,
            ClientPost: clientPost,
            totalPrice: calculateTotalPrice(),
            subtotal: calculateSubtotal(),
            SalesRep: {
                Id: userId,
                Name: 'userFullName'
            },
            User: {
                FullName: '',
                Email: clientEmail,
                Password: '',
                ChangePassword: false,
                Role: '',
                MobileNumber: '',
                BirthDate: dayjs().format('YYYY-MM-DD'),
                CompanyName: '',
                Continent: '',
                Country: '',
                Industry: '',
                ImagePath: '',
            },
        };

        try {
            console.log("Submitting leadFormData:", invoiceData);
            const response = await axios.post(
                `https://localhost:7143/api/Invoice/CreateInvoiceForLeadManager/${userId}`,
                invoiceData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 201) {
                toast.success('Invoice created successfully!');
                onSubmit(response.data);
            } else {
                toast.error('Failed to create invoice. Server responded with ' + response.status);
            }
        } catch (error) {
            console.error('Error creating invoice:', error.response);
            if (error.response && error.response.data && error.response.data.errors) {
                // Log or display specific validation errors
                console.error('Validation errors:', error.response.data.errors);
            }
            toast.error('Failed to create invoice. Please check the form and try again.');
        }
    };





    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <div className="col-start-5 ml-80">
                        <label htmlFor="client-name" className="flex text-sm font-bold text-gray-600 mr-80">Client Name :</label>
                        <div className="mt-2">
                            <input
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                type="text"
                                name="client-name"
                                id="client-name"
                                className={`block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.clientName && 'border-red-500'}`}
                            />
                            {errors.clientName && <span className="text-red-500 text-sm">{errors.clientName}</span>}
                        </div>
                        <div className="mt-5">
                            <label htmlFor="client-company" className="flex text-sm font-bold text-gray-600 mr-80">Client Company :</label>
                            <div className="mt-2">
                                <input
                                    value={clientCompany}
                                    onChange={(e) => setClientCompany(e.target.value)}
                                    type="text"
                                    name="client-company"
                                    id="client-company"
                                    className={`block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.clientCompany && 'border-red-500'}`}
                                />
                                {errors.clientCompany && <span className="text-red-500 text-sm">{errors.clientCompany}</span>}
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="client-email" className="flex text-sm font-bold text-gray-600 mr-80">Client Email:</label>
                            <div className="mt-2">
                                <input
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    type="email"
                                    name="client-email"
                                    id="client-email"
                                    className={`block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.clientEmail && 'border-red-500'}`}
                                />
                                {errors.clientEmail && <span className="text-red-500 text-sm">{errors.clientEmail}</span>}
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="client-post" className="flex text-sm font-bold text-gray-600 mr-80">Client Post :</label>
                            <div className="mt-2">
                                <select
                                    value={clientPost}
                                    onChange={(e) => setClientPost(e.target.value)}
                                    type="text"
                                    name="client-post"
                                    id="client-post"
                                    className={`block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.clientPost && 'border-red-500'}`}
                                >
                                    <option value="">Select Client Post</option>
                                    <option value="CEO/President">CEO/President</option>
                                    <option value="Owner/Operator">Owner/Operator</option>
                                    <option value="VP or C-level">VP or C-level</option>
                                    <option value="Director">Director</option>
                                    <option value="Manager or Snr. Manager">Manager or Snr. Manager</option>
                                    <option value="Independent Contributor">Independent Contributor</option>
                                    <option value="Designer/Developer">Designer/Developer</option>
                                    <option value="Other">Other</option>
                                </select>

                                {errors.clientPost && <span className="text-red-500 text-sm">{errors.clientPost}</span>}
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="invoice-no" className="flex text-sm font-bold text-gray-600 mr-80">Invoice No :</label>
                            <div className="mt-2">
                                <input
                                    value={currentInvoiceNumber}
                                    type="text"
                                    name="invoice-no"
                                    id="invoice-no"
                                    className="block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="invoice-date" className="flex text-sm font-bold text-gray-600 mr-80">Invoice Date :</label>
                            <div className="mt-2">
                                <input
                                    value={invoiceDate}
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    type="date"
                                    name="invoice-date"
                                    id="invoice-date"
                                    className="block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="due-date" className="flex text-sm font-bold text-gray-600 mr-80">Due Date :</label>
                            <div className="mt-2">
                                <input
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    type="date"
                                    name="due-date"
                                    id="due-date"
                                    className="block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="flex text-sm font-bold text-gray-600 mt-5">Invoice Details:</h3>
                            <div className="mt-2">
                                <select
                                    value={pipeline}
                                    onChange={(e) => setPipeline(e.target.value)}
                                    className={`block w-4/5 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 font-bold text-start ${errors.pipeline && 'border-red-500'}`}
                                >
                                    <option disabled value="">Select an option</option>
                                    <option value="Planning">Planning</option>
                                    <option value="Qualification">Qualification</option>
                                    <option value="Proposal">Proposal</option>
                                    <option value="Negotiation">Negotiation</option>
                                    <option value="Close-won">Close-won</option>
                                </select>
                                {errors.pipeline && <span className="text-red-500 text-sm">{errors.pipeline}</span>}

                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    placeholder="Description"
                                    className={`block w-4/5 rounded-md border-0 p-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.description && 'border-red-500'}`}
                                />
                                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    placeholder="Price"
                                    className={`block w-4/5 rounded-md border-0 p-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.price && 'border-red-500'}`}
                                />
                                {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}

                                <input
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                    placeholder="Hourse"
                                    className={`block w-4/5 rounded-md border-0 p-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.quantity && 'border-red-500'}`}
                                />
                                {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}

                                <input
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    type="number"
                                    placeholder="Discount (%)"
                                    className="block w-4/5 rounded-md border-0 p-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <button type="submit" className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-md mt-2">Create Invoice</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SalesInvoiceForm;

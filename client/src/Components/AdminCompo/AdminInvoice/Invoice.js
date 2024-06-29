import React, { useState, useEffect, useRef } from 'react';
import Img1 from '../../login/1.png';
import InvoiceForm from './InvoiceForm';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = ({ fetchInvoiceData,onNewInvoiceSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: '',
    date: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientCompany: '',
    clientPost: '',
    pipeline: '',
    description: '',
    price: '',
    quantity: '',
    totalPrice: '',
    subtotal: '',
    discount: '',
    total: '',
  });

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get('https://localhost:7143/api/Invoice'); // Replace with the appropriate ID or fetch all invoices
        setInvoiceData(response.data);
      } catch (error) {
        console.error('Error fetching invoice data', error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleNewInvoice = () => {
    setShowForm(true);
  };

  const handleSubmitInvoice = (newInvoiceData) => {
    setInvoiceData(newInvoiceData);
    setShowForm(false);
  };

  const componentRef = useRef();

  const handleExportToPDF = () => {
    const invoiceElement = componentRef.current;

    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };


  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <ReactToPrint
            trigger={() => (
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />

          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md ml-2"
            onClick={handleExportToPDF}
          >
            Export
          </button>

          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md ml-2">
            Send
          </button>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleNewInvoice}>
          + New Invoice
        </button>
      </div>


      {showForm ? (
        <InvoiceForm onSubmit={handleSubmitInvoice} fetchInvoiceData={fetchInvoiceData} onNewInvoiceSubmit={onNewInvoiceSubmit}/>
      ) : (
        <div ref={componentRef}>
          <div className="invoice-wrapper">
            <div className="invoice-content p-4 bg-white shadow-md rounded-md overflow-y-auto h-[80vh]">
              <div className="max-w-3xl mx-auto p-4 float-end">
                <div className='flex justify-between '>
                  <div className=''>
                    <img src={Img1} alt='' className='h-[100px] ' />
                  </div>
                  <div className='text-left mr-2'>
                    <h3 className="text-lg text-zinc-500 mb-2 mr-20 ">Provider</h3>
                    <div className='text-zinc-500'>
                      <p>99x</p>
                      <p>https://99x.io</p>
                    </div>
                  </div>

                </div>

                <div className="flex justify-between py-20 -mb-12">
                  <div className="text-left text-zinc-500">
                    <p>Invoice No.</p>
                    <h2 className="text-xl">{invoiceData.invoiceNo}</h2>
                    <p>Date    : {invoiceData.date}</p>
                    <p>Due Date : {invoiceData.dueDate}</p>
                  </div>

                  <div className="mb-2 text-left">
                    <h3 className="text-lg text-zinc-500 mb-2 mr-28">Client</h3>
                    <div className='text-zinc-500 '>
                      <p>{invoiceData.clientName}</p>
                      <p>{invoiceData.clientEmail}</p>
                      <p>{invoiceData.clientCompany}</p>
                      <p>{invoiceData.clientPost}</p>
                      {/* <p>IBAN: {invoiceData.client.iban}</p> */}
                    </div>
                  </div>

                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4 text-center text-zinc-500">INVOICE</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="py-2 px-4 text-left max-w-[100px] truncate">Pipeline</th>
                          <th className="py-2 px-4 text-left min-w-[300px] row-span-10">Description</th>
                          <th className="py-2 px-4 text-right max-w-[100px]">Price</th>
                          <th className="py-2 px-4 text-right max-w-[80px]">Days</th>
                          {/* <th className="py-2 px-4 text-right max-w-[80px]">Discount</th> */}
                          <th className="py-2 px-4 text-right max-w-[120px]">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b text-zinc-500">
                          <td className="py-2 px-4 max-w-[100px] truncate">{invoiceData.pipeline}</td>
                          <td className="py-2 px-4 min-w-[300px] whitespace-normal row-span-10">
                            {invoiceData.description}
                          </td>
                          <td className="py-2 px-4 text-right">${invoiceData.price}</td>
                          <td className="py-2 px-4 text-right">{invoiceData.days}</td>
                          {/* <td className="py-2 px-4 text-right">{invoiceData.discount}%</td> */}
                          <td className="py-2 px-4 text-right">${invoiceData.totalPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-end mb-0">
                  <div className="text-left mr-6">
                    <p className="text-zinc-800">Subtotal</p>
                    <p className="text-zinc-800">Discount</p>
                    <p className="text-xl text-zinc-800 font-bold mb-12">Total</p>
                  </div>
                  <div className='text-right'>
                    <p className="font-bold text-zinc-800">${invoiceData.subtotal}</p>
                    <p className="font-bold text-zinc-800">(${invoiceData.discount})</p>
                    <p className="text-xl font-bold text-zinc-800 ">${invoiceData.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
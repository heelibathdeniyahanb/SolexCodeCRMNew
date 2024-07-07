import React, { useState, useEffect, useRef } from 'react';
import Img1 from '../../login/1.png';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SalesInvoiceForm from './SalesInvoiceForm';

const SalesInvoice = ({ invoiceData, fetchInvoiceData, onNewInvoiceSubmit }) => {
    const [showForm, setShowForm] = useState(false);

    const handleNewInvoice = () => {
        setShowForm(true);
    };

    const handleSubmitInvoice = (newInvoiceData) => {
        onNewInvoiceSubmit(newInvoiceData);
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
                <div className='px-8'>
                    <ReactToPrint
                        trigger={() => (
                            <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md ml-2">
                                Print
                            </button>
                        )}
                        content={() => componentRef.current}
                    />
                    <button
                        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md ml-2"
                        onClick={handleExportToPDF}
                    >
                        Export
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md ml-2">
                        Send
                    </button>
                </div>
                <div className='px-8'>
                    <button className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-md ml-2"
                        onClick={handleNewInvoice}>
                        + New Invoice
                    </button>
                </div>
            </div>

            {showForm ? (
                <SalesInvoiceForm onSubmit={handleSubmitInvoice} fetchInvoiceData={fetchInvoiceData} onNewInvoiceSubmit={onNewInvoiceSubmit} />
            ) : (
                  <div ref={componentRef}>
                  <div className="invoice-wrapper">
                      <div className="invoice-content p-4 bg-white shadow-md rounded-md overflow-y-auto h-[80vh]">
                          <div className="max-w-3xl mx-auto">
                              <div className="flex justify-between mb-4">
                                  <div>
                                      <img src={Img1} alt="Logo" className="h-[100px]" />
                                  </div>
                                  <div className="text-left">
                                      <h3 className="text-lg text-zinc-500 mb-2 font-bold">Provider</h3>
                                      <div className="text-black font-semibold">
                                          <p>99x</p>
                                          <p>https://99x.io</p>
                                      </div>
                                  </div>
                              </div>
              
                              <div className="flex justify-between mb-4">
                                  <div className="text-left text-zinc-500 font-semibold">
                                      <p>Invoice No.</p>
                                      <h2 className="text-xl">{invoiceData?.invoiceNo}</h2>
                                      <p>Date: {invoiceData?.date}</p>
                                      <p>Due Date: {invoiceData?.dueDate}</p>
                                  </div>
                                  <div className="text-left">
                                      <h3 className="text-lg text-black mb-2 font-bold">Client</h3>
                                      <div className="text-zinc-500 font-semibold">
                                          <p>{invoiceData?.clientName}</p>
                                          <p>{invoiceData?.clientEmail}</p>
                                          <p>{invoiceData?.clientCompany}</p>
                                          <p>{invoiceData?.clientPost}</p>
                                      </div>
                                  </div>
                              </div>
              
                              <div className="mb-6">
                                  <h3 className="text-lg font-bold mb-4 text-center text-zinc-700 font-bold">INVOICE</h3>
                                  <div className="overflow-x-auto">
                                      <table className="w-full border-collapse">
                                          <thead>
                                              <tr className="bg-gray-200">
                                                  <th className="py-2 px-4 text-left max-w-[100px] truncate">Pipeline</th>
                                                  <th className="py-2 px-4 text-left min-w-[300px]">Description</th>
                                                  <th className="py-2 px-4 text-right max-w-[100px]">Price</th>
                                                  <th className="py-2 px-4 text-right max-w-[80px]">Quantity</th>
                                                  <th className="py-2 px-4 text-right max-w-[120px]">Total Price</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr className="border-b text-zinc-500 font-semibold">
                                                  <td className="py-2 px-4 max-w-[200px] truncate">{invoiceData?.pipeline}</td>
                                                  <td className="py-2 px-4 min-w-[300px]">{invoiceData?.description}</td>
                                                  <td className="py-2 px-4 text-right">${invoiceData?.price}</td>
                                                  <td className="py-2 px-4 text-right">{invoiceData?.quantity}</td>
                                                  <td className="py-2 px-4 text-right">${invoiceData?.totalPrice}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
              
                              <div className="flex justify-end">
                                  <div className="text-left mr-6">
                                      <p className="text-zinc-800 font-semibold">Subtotal</p>
                                      <p className="text-zinc-800 font-semibold">Discount</p>
                                      <p className="text-xl text-zinc-800 font-bold mb-12">Total</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="font-bold text-zinc-800">${invoiceData?.subtotal}</p>
                                      <p className="font-bold text-zinc-800">(${invoiceData?.discount})</p>
                                      <p className="text-xl font-bold text-zinc-800">${invoiceData?.totalPrice}</p>
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

export default SalesInvoice;

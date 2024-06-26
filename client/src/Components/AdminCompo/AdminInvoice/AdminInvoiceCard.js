// ProjectCard.jsx
import React,{useEffect,useState} from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';
import axios from 'axios';


const AdminInvoiceCard = () => {
  const [invoiceData, setInvoiceData] = useState([]);


  useEffect(() => {
    axios
      .get(`https://localhost:7143/api/Invoice`)
      .then((response) => {
        const invoiceData = response.data;
        console.log(invoiceData);
        setInvoiceData(invoiceData);

      })
      .catch(() => console.log("error has occured"));
}, []);
  
  
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

      return (
        <div className="overflow-y-auto" style={{ maxHeight: '560px' }}>
          <div className="flex flex-col">
            {invoiceData.map((invoice) => (
              <div
                key={invoice.id}
                className="card text-black bg-primary -mb-1 border-2 border-gray-400 ml-3 mt-3 shadow-xl rounded-md"
                style={{ maxWidth: '18rem', minHeight: '9rem' }}
              >
                <div className="card-header text-start ml-2">{formatInvoiceNumber(invoice.invoiceNo)}</div>
                <div className="card-body">
                  <h5 className="card-title text-cyan-600 text-start ml-2">{invoice.clientCompany}</h5>
                  <div className="w-28 bg-gray-400 border-gray-800 rounded-full h-8 ml-2 mt-2 mb-2">
                    <div className='ml-4'>
                    {invoice.pipeline}
                    </div>
                    </div>

                  <div className="float-left ml-2 mt-1">
                    <Avatar size="32" round={true} />
                  </div>
                  <p className="card-text">
                    <span className="ml-3 text-sm text-gray-500 text-justify">
                      {formatDate(invoice.date)} - {formatDate(invoice.dueDate)}
                    </span>
                  </p>
                  <p className="card-text text-gray-700 ml-40 mt-2 text-lg">${invoice.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default AdminInvoiceCard;
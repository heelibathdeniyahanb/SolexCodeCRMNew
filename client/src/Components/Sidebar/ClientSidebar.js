import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo2 from '../Images/logo2.png';
import dashboard from '../Images/dashboard.png';
import contact from '../Images/contact.png';
import MyLeads from '../Images/sales.png'; // Assuming you have this image
import calendar from '../Images/calender.png';
import email from '../Images/email.png';
import ticketing from '../Images/ticketing.png';
import analyzing from '../Images/analyzing.png';
import payment from '../Images/payment.png';
import settings from '../Images/settings.png';
import logout from '../Images/logout.png';

const Sidebar = () => {
    const [open] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const Menus = [
        { title: "Dashboard", src: dashboard },
        { title: "Contact", src: contact },
        { title: "MyLeads", src: MyLeads, page: "/" }, // Assuming MyLeads is correctly imported
        { title: "Calendar", src: calendar },
        { title: "Email", src: email },
        { title: "Ticketing", src: ticketing },
        { title: "Analyzing", src: analyzing },
        { title: "Payment", src: payment, page: "/Pages/ClientView" }, // Assuming payment is correctly imported
        { title: "Settings", src: settings, gap: true },
        { title: "Log Out", src: logout },
    ];

    return (
        <div className="flex">
            <div className={`bg-cyan-900 ${isSmallScreen ? "w-20" : open ? "w-72" : "w-20"} h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between`}>
                <div className="flex items-center">
                    <img
                        src={Logo2}
                        className="cursor-pointer duration-500"
                        style={{ width: "105px", height: "90px" }}
                        alt="logo"
                    />
                </div>
                <ul>
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer text-white hover:bg-violet-300 active:bg-violet-300 focus:outline-none focus:ring focus:ring-violet-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} ${isSmallScreen && "text-center"}`}
                        >
                            <Link to={Menu.page} className='flex items-center'>
                                <img src={Menu.src} style={{ width: "30px", height: "30px", height: Menu.title === "Payment" ? "50px" : "30px" }} alt={Menu.title} />
                                <span className={`ml-4 ${!open && "hidden"} origin-left duration-200 ${isSmallScreen && "hidden"}`}>{Menu.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold"></h1>
            </div>
        </div>
    );
};

export default Sidebar;
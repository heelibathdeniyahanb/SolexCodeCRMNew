import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logopng from '../Images/logopng.png';
import Nimasha from '../Images/Nimasha.jpg';
import Background from '../Images/backgroundlanding.jpg';
import { Link } from 'react-router-dom';
import Naveesha from '../Images/Naveesha.jpg';
import Taniya from '../Images/Taniya.jpg';
import Sameeha from '../Images/Sameeha.jpg';
import Thihansa from '../Images/Thihnasa.jpg';

const ContributorCard = ({ name, position, index, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={name} className="w-32 h-32 border-gray-800 rounded-full border-3" />
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 w-[280px] p-4 mt-2 bg-white rounded-lg shadow-lg -left-1/2 top-full"
        >
          <h4 className="text-lg font-bold">{name}</h4>
          <p className="text-sm text-gray-600">{position}</p>
          <p className="mt-2 text-sm">{index}</p>
        </motion.div>
      )}
    </div>
  );
};

export default function Landingpage() {
  const contributors = [
    { name: "HEELIBATHDENIYA H A N B", position: "Team Leader", index: "215050E", image: Nimasha },
    { name: "JERALDIN G G T", position: "Team Member", index: "215058K", image: Taniya },
    { name: "SAMEEHA M J F", position: "Team Member", index: "215038B", image: Sameeha },
    { name: "EKANAYAKE H G N K", position: "Team Member", index: "215036R", image: Naveesha },
    { name: "THIHANSA KWRD", position: "Team Member", index: "215117R", image: Thihansa },
  ];

  return (
    <div 
      className="relative min-h-screen"
      style={{ 
        backgroundImage: `url(${Background})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="absolute inset-0 bg-white"
        style={{
          backdropFilter: 'blur(8px)',
          opacity: 0.3,
        }}
      ></div>
      <div className="relative z-10">
        {/* Header */}
        <header className="container px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logopng} alt="Skillsyncer Logo" className="w-auto h-20" />
            </motion.div>
            <nav>
              <ul className="flex space-x-4">
                {['Features', 'About'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-gray-600 transition duration-300 hover:text-blue-600"
                  >
                    <a href={`#${item.toLowerCase()}`}>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container px-6 py-16 mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-5xl font-bold text-gray-800"
          >
            SkillSyncer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 text-xl text-gray-600"
          >
            Skillsyncer offers unparalleled customer support through its integrated suite of tools, combining a knowledge base, ticketing system, and intelligent chatbot to efficiently resolve client issues.
          </motion.p>
          <div className='pt-6'><motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 font-bold text-white transition duration-300 bg-blue-600 rounded-full hover:bg-blue-700"
          ><Link to='/login'>
            Get Started
            </Link>
          </motion.button> </div>
          
        </section>

        {/* Features Section */}
        <section id="features" className="container px-6 pt-2 pb-16 mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold text-center text-gray-800"
          >
            Key Features
          </motion.h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "Holistic CRM eco system", description: "Approach centers on developing a comprehensive CRM ecosystem.", description2 :"Modules designed to cover customer management, sales, communication, and support" },
              { title: "Module Integration", description: "Seamless integration of modules for a unified solution.", description2 :" Ensures adaptability to unique businessn requirements" },
              { title: "User-Friendly Interfaces", description: "Prioritize user experience with intuitive interfaces.", description2 :"Aim for ease of navigation and efficient interaction." }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="p-6 transition-transform duration-300 bg-white rounded-lg shadow-md"
              >
                <h4 className="mb-2 text-xl font-semibold text-blue-600">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
                <p className='text-gray-600'>{feature.description2}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white bg-opacity-80">
          <div className="container px-6 mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-3xl font-bold text-center text-gray-800"
            >
              About Skillsyncer
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-3xl mx-auto text-xl text-center text-gray-600"
            >
              <div>
                <div>
                  <h1 className="mb-2 text-xl font-semibold text-blue-600">Centralized Data Repository</h1>
                  <p className='text-gray-600'>CRM systems provide a comprehensive platform for managing all customer data and interactions, enabling a complete view of customers.</p>
                </div>
                <div className='pt-8'>
                  <h1 className="mb-2 text-xl font-semibold text-blue-600">Personalized Customer Experiences</h1>
                  <p className='text-gray-600'>CRMs enable tailored services and interactions by analyzing customer data, fostering loyalty and stronger relationships.</p>
                </div>
                <div className='pt-8'>
                  <h1 className="mb-2 text-xl font-semibold text-blue-600">Data-Driven Decision Making</h1>
                  <p className='text-gray-600'>CRMs offer analytics and reporting tools, empowering businesses to make informed decisions based on customer insights and trends</p>
                </div>
              </div>
            </motion.p>
          </div>
        </section>

        {/* Contribution Section */}
        <section className="container px-6 py-16 mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold text-gray-800"
          >
            Contribution
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-between mx-[200px]"
          >
            {contributors.map((contributor, index) => (
              <ContributorCard key={index} {...contributor} />
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-white bg-gray-800">
          <div className="container px-6 mx-auto text-center">
            <p>SolexCode</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
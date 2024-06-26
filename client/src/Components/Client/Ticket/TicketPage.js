import React from 'react';
import { Link } from 'react-router-dom';

const Ticketpage1 = () => {
  return (
    <div className="py-10 bg-white sm:py-10">
      <div className="max-w-6xl px-6 mx-auto lg:px-4">
        <div className="py-6 bg-white rounded-lg sm:py-6">
          <div className="max-w-6xl px-6 mx-auto lg:px-4">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-[#294D61] sm:text-4xl underline">Quick Guidelines</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">See how to mingle with our Skill Spinzer System.</p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200 sm:mt-8 sm:pt-8 lg:mx-0">
              <div className="flex space-x-8 overflow-x-auto">
                {[...Array(6)].map((_, i) => (
                  <article key={i} className="flex-shrink-0 max-w-xs">
                    <div className="relative p-6 border rounded-md group bg-[#40779443]">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {i % 2 === 0 ? 'Reset Password' : 'Payment Method'}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">
                        {i % 2 === 0 ? (
                          <>
                            Click ‘Force user to change password’ on user admin page<br />
                            Type Existing Password<br />
                            Type New Password<br />
                            Confirm Password<br />
                          </>
                        ) : (
                          <>
                            Go to Payment page<br />
                            Select Project Type on payment details<br />
                            Type card Number<br />
                            Type CVC Number<br />
                            Select month & year<br />
                            Click pay<br />
                          </>
                        )}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="max-w-6xl px-6 mx-auto mt-8 lg:px-4">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-[#294D61] sm:text-4xl underline">Frequently asked questions</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Check whether your doubt is here.....</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200 sm:mt-8 sm:pt-8 lg:mx-0">
              <div className="flex space-x-8 overflow-x-auto">
                {[...Array(6)].map((_, i) => (
                  <article key={i} className="flex-shrink-0 max-w-xs">
                    <div className="relative p-6 border rounded-md group bg-[#40779443]">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {i % 2 === 0 ? '1. How can I manage IT service tickets in the CRM?' : 'Payment Method'}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">
                        {i % 2 === 0 ? (
                          <>
                            CRM should allow you to manage incoming service tickets from clients, assign them to technicians, track resolution progress, and communicate updates. This can improve service efficiency and client satisfaction.
                          </>
                        ) : (
                          <>
                            Go to Payment page<br />
                            Select Project Type on payment details<br />
                            Type card Number<br />
                            Type CVC Number<br />
                            Select month & year<br />
                            Click pay<br />
                          </>
                        )}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-8 mt-8 rounded-lg bg-[#57a2ca43] border border-black">
              {/* Left Side */}
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900">Got a Question?</p>
                <p className="text-gray-600">Get answers from Real-time chat bot</p>
                <button className="px-4 py-2 mt-4 text-white rounded bg-[#294D61]">Smart Hub</button>
              </div>

              {/* Right Side */}
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900">Still can't find what you're looking for?</p>
                <p className="text-gray-600">Submit a request and we'll get back to you soon!</p>
                <Link to='/createtickets'>
                  <button className="px-4 py-2 mt-4 text-white rounded bg-[#294D61]">Submit a ticket</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticketpage1;

import React from 'react';
import { Link } from 'react-router-dom';

const Ticketpage1 = () => {
  return (

<div class="bg-white py-10 sm:py-10">
  <div class="mx-auto max-w-6xl px-6 lg:px-4">
  <div class="bg-white py-6 sm:py-6">
  <div class="mx-auto max-w-6xl px-6 lg:px-4">
    <div class="mx-auto max-w-1xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Quick Guidelines</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">See how to mingle with our Skill Spinzer System.</p>
    </div>
    
    <div class="mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-4 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="group relative border p-6 rounded-md">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        Reset Password
      </h3>
      <p class="mt-5  text-sm leading-6 text-gray-600">
        Click ‘Force user to change password’ on user admin page<br></br>
        Type Existing Password<br></br>Type New Password<br></br>Confirm Password<br></br>
      </p>
    </div>
  </article>

  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="group relative border p-3 rounded-md">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        Payment Method
      </h3>
      <p class="mt-5  text-sm leading-6 text-gray-600">
        Go to Payment page<br></br>Select Project Type on payment details<br></br>Type card Number<br></br>Type CVC Number<br></br>Select month & year<br></br>
        Click pay<br></br>
      </p>
    </div>
  </article>

  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="group relative border p-6 rounded-md">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        Reset Password
      </h3>
      <p class="mt-5  text-sm leading-6 text-gray-600">
        Click ‘Force user to change password’ on user admin page<br></br>
        Type Existing Password<br></br>Type New Password<br></br>Confirm Password<br></br>
      </p>
    </div>
  </article>

</div>

<div class="mx-auto mt-8 max-w-6xl px-6 lg:px-4">
    <div class="mx-auto max-w-1xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently asked questions</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Check whether your doubt is here.....</p>
    </div>
   
</div>
    
    <div class="mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-4 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="group relative border p-6 rounded-md">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
      1.How can I manage IT service tickets in the CRM?
      </h3>
      <p class="mt-5  text-sm leading-6 text-gray-600">
CRM should allow you to manage incoming service tickets from clients, assign them to technicians, track resolution progress, and communicate updates. This can improve service efficiency and client satisfaction.
      </p>
    </div>
  </article>

  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="group relative border p-3 rounded-md">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        Payment Method
      </h3>
      <p class="mt-5  text-sm leading-6 text-gray-600">
        Go to Payment page<br></br>Select Project Type on payment details<br></br>Type card Number<br></br>Type CVC Number<br></br>Select month & year<br></br>
        Click pay<br></br>
      </p>
    </div>
  </article>

  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="group relative border p-3 rounded-md">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        Payment Method
      </h3>
      <p class="mt-5  text-sm leading-6 text-gray-600">
        Go to Payment page<br></br>Select Project Type on payment details<br></br>Type card Number<br></br>Type CVC Number<br></br>Select month & year<br></br>
        Click pay<br></br>
      </p>
    </div>
  </article>
</div>
<div className="flex items-center justify-between p-8 bg-gray-200">
      {/* Left Side */}
      <div className="text-left">
        <p className="text-lg font-semibold">Got a Question?</p>
        <p className="text-gray-600">Get answers from Real-time chat bot</p>
        <button className="px-4 py-2 mt-4 text-white rounded bg-[#294D61]">Smart Hub</button>
      </div>

      {/* Right Side */}
      
      <div className="text-left">
  <p className="text-lg font-semibold">Still can't find what you're looking for?</p>
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
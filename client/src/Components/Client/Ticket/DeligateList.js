import React from 'react';

const DeligateList = () => {
  return (
    <div className="container mx-auto mt-8">
      <table className="w-full space-y-reverse border">
        <thead>
        <tr className="bg-neutral-400">
            <th className="p-2">Name</th>
            <th className="p-2">Job Role</th>
            <th className="p-2">Email</th>
            <th className="p-2">Contact No</th>
          </tr>
        </thead>
        <tbody>
        <tr className="bg-neutral-300">
            <td className="p-2">Mr. Malith</td>
            <td className="p-2">Manager</td>
            <td className="p-2">
              <a href="mailto:malith001@gmail.com" className="text-blue-500 hover:underline">
                malith001@gmail.com
              </a>
            </td>
            <td className="p-2">0262224444</td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2">Mr. Nishan</td>
            <td className="p-2">Coordinator</td>
            <td className="p-2">
              <a href="mailto:nishan123@gmail.com" className="text-blue-500 hover:underline">
                nishan123@gmail.com
              </a>
            </td>
            <td className="p-2">0262222123</td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2">Miss. Nimasha</td>
            <td className="p-2">Sales Executive</td>
            <td className="p-2">
              <a href="mailto:nimasha21@gmail.com" className="text-blue-500 hover:underline">
                nimasha21@gmail.com
              </a>
            </td>
            <td className="p-2">0776699950</td>
          </tr>
          
          <tr className="bg-neutral-300">
            <td className="p-2">Mr.Aravinth</td>
            <td className="p-2">Lead Manager</td>
            <td className="p-2">
              <a href="mailto:aravinth18@gmail.com" className="text-blue-500 hover:underline">
                aravinth18@gmail.com
              </a>
            </td>
            <td className="p-2">0771234786</td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2">Miss. Neha</td>
            <td className="p-2">Sales Executive</td>
            <td className="p-2">
              <a href="mailto:neharafi10@gmail.com" className="text-blue-500 hover:underline">
                neharafi10@gmail.com
              </a>
            </td>
            <td className="p-2">0720177875</td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2">Mr.wijesekara</td>
            <td className="p-2">Sales Executive</td>
            <td className="p-2">
              <a href="mailto:malithi100@gmail.com" className="text-blue-500 hover:underline">
                malithi100@gmail.com
              </a>
            </td>
            <td className="p-2">0715080390</td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2">Miss. Sandani</td>
            <td className="p-2">Lead Manager</td>
            <td className="p-2">
              <a href="mailto:sandani30@gmail.com" className="text-blue-500 hover:underline">
                sandani30@gmail.com
              </a>
            </td>
            <td className="p-2">0775907081</td>
          </tr>
          <tr className="bg-neutral-300">
            <td className="p-2">Miss. Delrin</td>
            <td className="p-2">Supervisor</td>
            <td className="p-2">
              <a href="mailto:delrin055@gmail.com" className="text-blue-500 hover:underline">
                delrin055@gmail.com
              </a>
            </td>
            <td className="p-2">0755858130</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-8 text-center">
        <p className="text-lg font-bold">Talk to us!</p>
        <p className="mt-2">Get in touch with our support team...</p>
      </div>
    </div>
  );
  
};

export default  DeligateList;




import React from 'react';
import { LuHelpCircle } from 'react-icons/lu';

const AddUsers = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className='max-w-3xl mx-auto px-4 py-8'>

                <div className='flex justify-end'>
                    
                </div>

                <div className='flex justify-center mt-8'>
                    <div className='w-full max-w-md'>
                        <form>
                            <div className='grid grid-cols-1 gap-6'>
                                <div className='flex flex-row gap-4'>
                                    <input
                                        type='text'
                                        className='w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                        placeholder='First Name *'
                                        name='firstName'
                                        required
                                    />
                                    <input
                                        type='text'
                                        className='w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                        placeholder='Last Name *'
                                        name='lastName'
                                        required
                                    />
                                </div>

                                <input
                                    type='text'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                    placeholder='Username *'
                                    name='username'
                                    required
                                />

                                <input
                                    type='email'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                    placeholder='Email *'
                                    name='email'
                                    required
                                />

                                <input
                                    type='password'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                    placeholder='Password *'
                                    name='password'
                                    required
                                />

                                <select
                                    name='role'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                    required
                                >
                                    <option value=''>Select Role</option>
                                    <option value='Admin'>Admin</option>
                                    <option value='client'>Client</option>
                                    <option value='customerSupporter'>Customer Supporter</option>
                                    <option value='leadManager'>Lead Manager</option>
                                </select>

                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='form-checkbox h-5 w-5 text-indigo-500'
                                    />
                                    <span className='ml-2'>Send login details via email</span>
                                    <div className='ml-3 text-indigo-500 cursor-pointer'>
                                        <LuHelpCircle className='w-6 h-6' />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center mt-8'>
                                <button
                                    type='submit'
                                    className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded mr-4'
                                >
                                    Add
                                </button>

                                <button className='bg-gray-200 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded'>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUsers;

import React from 'react'
import Header from '../../Components/Header/Header'
import AdminSideNavBar from './AdminSideNavBar'
import AddUsers from '../../Components/AdminCompo/AddUser'

export default function AddUserPage() {
  return (
    <div><Header/>
    <div className='flex'>
        <div>
        <AdminSideNavBar/>
        </div>
        <div className='w-screen'>
        <AddUsers/>
        </div>
    </div>
    
    </div>
  )
}

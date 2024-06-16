import React from 'react'
import AdminSideNavBar from './AdminSideNavBar'


import Header from '../../Components/Header/Header'
import ResetPasswordWindow1 from '../../Components/AdminCompo/password/ResetPasswordWindow1'

export default function ResetPasswordWindow1Admin() {
  return (
    <div><Header/>
    <div className='flex'>
    <AdminSideNavBar/>
    <ResetPasswordWindow1/></div></div>
  )
}
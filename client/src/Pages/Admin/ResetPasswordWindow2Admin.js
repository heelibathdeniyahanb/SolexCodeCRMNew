import React from 'react'
import AdminSideNavBar from './AdminSideNavBar'

import ResetPasswordWindow2 from '../../Components/AdminCompo/password/ResetPasswordWindow2'
import Header from '../../Components/Header/Header'

export default function ResetPasswordWindow2Admin() {
  return (
    <div><Header/>
    <div className='flex'>
    <AdminSideNavBar/>
    <ResetPasswordWindow2/></div></div>
  )
}
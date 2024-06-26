import React from 'react'
import ClientHeader from '../../Components/Header/ClientHeader'
import ClientSideNavBar from '../../Components/Client/ClientSideNavBar'
import VerifyOtp from '../../Components/login/VerifyOtp'

export default function ClientVerifyOtp() {
  return (
    <div><ClientHeader/>
    <ClientSideNavBar/>
    <VerifyOtp/></div>
  )
}

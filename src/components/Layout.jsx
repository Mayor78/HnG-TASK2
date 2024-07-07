import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div>
        <Header/>
         <Outlet/>












         
        
          <Footer/>
    </div>
  )
}

export default Layout
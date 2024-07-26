import React from 'react'
import { Link } from 'react-router-dom'
import { PiGreaterThanLight } from "react-icons/pi";

const MobileProfile = () => {
  return (
    <>     <div>
        <h1 className='p-2 text-2xl font-sans bg-white-50'>My Account</h1>
        <div className='link-to-pages h-[100vh] bg-white grid p-6'>
             <Link to={'/orders'} className='flex justify-between font-serif text-[20px]' >Orders <PiGreaterThanLight className='font-bold'/></Link> 
             <Link className='py-3 flex justify-between font-serif text-[20px]'>Profile <PiGreaterThanLight className='font-bold'/></Link>
             <Link className='py-3 flex justify-between font-serif text-[20px]'>Logout <PiGreaterThanLight className='font-bold'/></Link>
             <Link className='py-3 flex justify-between font-serif text-[20px]'>Help <PiGreaterThanLight className='font-bold'/></Link>
             <Link className='py-3 flex justify-between font-serif text-[20px]'>About <PiGreaterThanLight className='font-bold'/></Link>
             <Link className='py-3 flex justify-between font-serif text-[20px]'>Contact <PiGreaterThanLight className='font-bold'/></Link>
        </div>
        </div>
    </>
  )
}

export default MobileProfile
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';


const Nav = () => {
  return (
    <div>
        <div className='sticky top-0 bg-blue-950'>
            <div className=' flex justify-around'>
                <Link to={'/'} className='font-bold text-2xl text-white mt-2'>HNG</Link>
                  <input type="search" placeholder='serach...'  
                  className='w w-[40%] m-2 p-2 rounded-md focus:outline-blue-500 focus:shadow-outline' />
                  <label htmlFor=""><i className="fa-solid fa-magnifying-glass relative md:right-[11rem] right-[3rem] top-4 "></i></label>
                  <div className='flex gap-6 mt-3 text-white'>
                    
                    <h1 className='hidden md:flex mt-1'>CONTACT US</h1>
                    <h1 className='mt-2'>
                        <FaRegUser />
                    </h1>
                    {/* <Link to={'/cart'}><GiShoppingBag/></Link> */}
                 <CartIcon/>

                  </div>
            </div>
        </div>
    </div>
  )
}

export default Nav
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";


const Nav = () => {
  return (
    <div>
        <div className='sticky top-0 bg-blue-950'>
            <div className=' flex justify-around'>
                <h1 className='font-bold text-2xl text-white mt-2'>HNG</h1>
                  <input type="search" placeholder='serach...'  
                  className='w w-[40%] m-2 p-2 rounded-md focus:outline-blue-500 focus:shadow-outline' />
                  <div className='flex gap-6 mt-3 text-white'>
                    
                    <h1>CONTACT US</h1>
                    <h1>
                        <FaRegUser />
                    </h1>
                    <h1><GiShoppingBag/></h1>


                  </div>
            </div>
        </div>
    </div>
  )
}

export default Nav
import React from 'react'
import blog from '../assets/blog1.jpg'
 import bg from '../assets/bg.jpg'
import Clearance from '../components/Clearance'
import NewInStore from '../sales/NewInStore'
import Inspiration from '../sales/Inspiration'

const Home = () => {
  const bgimage = bg
  const imagestyle ={
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // color: 'white',
    // fontSize: '3rem',
    // position: 'relative',
    // zIndex: '10'

  }
  return (
    <>
    <div>
    <div className='  h-[50vh]' style={ imagestyle}>
         <div className='bg-white-50 p-16'>
          <h1 className='text-2xl font-bold mb-2'>HomeNest Gallery (HNG)</h1>
          <p className='font-semibold'> Redefining Furniture Shopping in <br /> 
          <span className='flex justify-center place-items-center'>Nigeria</span> </p>
          <div className='flex justify-center place-items-center
           bg-blue-500 cursor-pointer text-white fon'>
            SHOP NOW</div>
         </div>
        </div>
           <Clearance/>
           <NewInStore/>
           <Inspiration/>
  
       
    </div>
    </>
   )
}

export default Home
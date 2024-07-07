import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";

const NewInStoreItem = ({picture, content, price}) => {

    const clipPathStyle = {
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), 90% 100%, 80% calc(100% - 10px), 70% 100%, 60% calc(100% - 10px), 50% 100%, 40% calc(100% - 10px), 30% 100%, 20% calc(100% - 10px), 10% 100%, 0 calc(100% - 10px))',
        padding: '0.5rem',
        // backgroundColor: '#ef4444', 
        color: 'white', 
        marginTop: '0.5rem', 
        fontSize: '0.875rem', 
      };
  return (
    <div className='mx-2'>
        
       <div>
        <div className='border border-solid'>
        <div className='flex justify-between mx-2'>
                    <p className=' text-3xl mt-2'><IoIosHeartEmpty/></p>
                    <p className='bg-green-500' style={clipPathStyle}>NEW</p>
                    
                    
 
                </div>
        <img src={picture} alt='Product' />
        </div>
        <div className=' flex gap-6 p-2 justify-between bg-slate-400'>
        <h3>{content}</h3>
         <p className='text-red-500'>${price}</p>
        
        </div>
        
        
       </div>

        
       
        
        
  
    
    </div>
  )
}

export default NewInStoreItem
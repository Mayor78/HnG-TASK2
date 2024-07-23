import React, { useContext } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { CartContext } from '../context/CartContext';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NewInStoreItem = ({ id, name, picture, amount, info, icon }) => {
  const {addToCart} = useContext(CartContext)
  const shortname = name.length > 10 ? `${name.substr(0, 10)}... ` : name;
  const shortinfo = info.length > 15 ? `${info.substr(0,15)}...`: info
    const clipPathStyle = {
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), 90% 100%, 80% calc(100% - 10px), 70% 100%, 60% calc(100% - 10px), 50% 100%, 40% calc(100% - 10px), 30% 100%, 20% calc(100% - 10px), 10% 100%, 0 calc(100% - 10px))',
        padding: '0.5rem',
        // backgroundColor: '#ef4444', 
        color: 'white', 
        marginTop: '0.5rem', 
        fontSize: '0.875rem', 
      };
  return (
    <div className='mx-2 w-[200px] h-[180px] mb-[6rem]'>
        
       <div>
        <div className='border border-solid '>
        <div className='flex justify-between mx-2'>
                    <p className=' text-3xl mt-2'><IoIosHeartEmpty/></p>
                    <p className='bg-green-500' style={clipPathStyle}>NEW</p>
                    
                    
 
                </div>
                <Link to={`/product/${id}`}>
                <img src={picture} alt='Product' className='w-[200px] h-[150px]' />
                </Link>
        
        </div>
          <div className='bg-slate-400'>
        <div className=' flex gap-6 p-2 justify-between '>
        <Link to={`/product/${id}`}>{shortname}</Link>
         <p className='text-red-500'>${amount}</p>
         <button onClick={() => addToCart({id: Math.random(), picture, name, amount})}
          className=' text-white w-full mr-10 rounded-md '><BsCart/></button>
          
        </div>
        <Link to={`/product/${id}`}><p>{shortinfo}</p></Link>
        </div>
        
         
       </div>

        
       
        
        
      
    
    </div>
  )
}

export default NewInStoreItem
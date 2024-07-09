import React, { useContext } from 'react';
import { GiHandBag } from 'react-icons/gi';
import { IoIosHeartEmpty } from "react-icons/io";
import { CartContext } from '../context/CartContext';


const ClearanceItem = ({ image, name, description, amount, icon, oldprice }) => {
  const { addToCart } = useContext(CartContext);
 

  return (
    <div className=''>
      <div className=''>
        <div className='w-[300px] bg-white-50 rounded-md'>
          <div className='flex justify-between mx-2'>
            <p className='text-white text-sm mt-2 bg-red-500 p-2 rounded-b-xl rounded-l-md'>HOT</p>
            <p className=' text-3xl mt-2'><IoIosHeartEmpty /></p>
          </div>
          <img src={image} alt={name} />
        </div>
        <div className='bg-white h-auto'>
          <div className='flex justify-around'>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <div className='flex justify-around'>
            <p className='text-red-500'><strike>${oldprice}</strike> </p>
            <p> ${amount}</p>
            <GiHandBag className='text-3xl text-white bg-gray-500 rounded-full p-2 mb-1'
              onClick={() => addToCart({ image, name, description, amount, oldprice, id: name })} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClearanceItem;

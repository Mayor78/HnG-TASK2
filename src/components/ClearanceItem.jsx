import React, { useContext } from 'react';
import { GiHandBag } from 'react-icons/gi';
import { IoIosHeartEmpty } from "react-icons/io";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
const ClearanceItem = ({ id, title, image, price, oldPrice, description }) => {
  const { addToCart } = useContext(CartContext);
  const shortDescription = description.length > 10 ? `${description.substr(0, 10)}... ` : description;
  const shortTitle = title.length > 10 ? `${title.substr(0, 10)}... ` : title;
  return (
    <div className="clearance-item">
      <div className='w-[300px] bg-white-50 rounded-md'>
        <div className='flex justify-between mx-2'>
          <p className='text-white text-sm mt-2 bg-red-500 p-2 rounded-b-xl rounded-l-md'>HOT</p>
          <p className='text-3xl mt-2'><IoIosHeartEmpty /></p>
        </div>
        <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-[300px]" />
        </Link>
        
        <div className='bg-white h-auto'>
          <Link to={`/product/${id}`} className='flex justify-around'>
            <h3>{shortTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
          </Link>
          <div className='flex justify-around'>
            <p className='text-red-500'><strike>${oldPrice}</strike></p>
            <p>${price}</p>
            <GiHandBag className='text-3xl text-white bg-gray-500 rounded-full p-2 mb-1'
              onClick={() => addToCart({
                image,
                name: title,
                description,
                amount: price,
                oldprice: oldPrice,
                id
              })} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClearanceItem;

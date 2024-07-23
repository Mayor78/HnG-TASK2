import React, { useContext, useState } from 'react';
import { GiHandBag } from 'react-icons/gi';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';

const ClearanceItem = ({ id, title, image, price, oldPrice, description }) => {
  const { addToCart } = useContext(CartContext);
  const [isWished, setIsWished] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState('');

  const shortDescription = description.length > 10 ? `${description.substr(0, 10)}... ` : description;
  const shortTitle = title.length > 10 ? `${title.substr(0, 10)}... ` : title;

  const handleHeartClick = () => {
    if (isWished) {
      setIsWished(false);
      setMessage('Item removed from wishlist');
    } else {
      setIsWished(true);
      setMessage('Item added to wishlist');
    }
    setTimeout(() => setMessage(''), 2000); // Hide message after 2 seconds
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      className="clearance-item relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='w-[300px] bg-white-50 rounded-md'>
        <div className='flex justify-between mx-2'>
          <p className='text-white text-sm mt-2 bg-red-500 p-2 rounded-b-xl rounded-l-md'>HOT</p>
          <p
            className={`text-3xl mt-2 cursor-pointer ${isWished ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleHeartClick}
          >
            {isWished ? <IoIosHeart /> : <IoIosHeartEmpty />}
          </p>
        </div>
        <Link to={`/product/${id}`}>
          <img src={image} alt={title} className="w-full h-[300px]" />
        </Link>
        <button
              onClick={() => addToCart({
                image,
                name: title,
                description,
                amount: price,
                oldprice: oldPrice,
                id
              })}
              className={`hidden lg:block text-white w-full bg-primary rounded-md ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              >
                Add to Cart
              </button>
        
        <div className='bg-white h-auto'>
          <Link to={`/product/${id}`} className='flex justify-around'>
            <h3>{shortTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
          </Link>
          <div className='flex justify-around items-center'>
            <p className='text-red-500'><strike>${oldPrice}</strike></p>
            <p>${price}</p>
            {/* Add to Cart Button (visible on large screens) */}
           
            {/* Cart Icon (visible on small screens) */}
            <BsCart2
              onClick={() => addToCart({
                image,
                name: title,
                description,
                amount: price,
                oldprice: oldPrice,
                id
              })}
              className='lg:hidden text-primary text-[40px]   p-2 mb-1 cursor-pointer'
            />
          </div>
        </div>
        {/* Wishlist Status Message */}
        {message && (
          <div className='absolute top-0 left-0 bg-green-500 text-white p-2 rounded-md shadow-lg'>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClearanceItem;

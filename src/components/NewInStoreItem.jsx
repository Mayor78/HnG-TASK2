import React, { useContext, useState } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { CartContext } from '../context/CartContext';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NewInStoreItem = ({ id, name, picture, amount, info }) => {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [message, setMessage] = useState('');

  const shortname = name.length > 10 ? `${name.substr(0, 10)}...` : name;
  const shortinfo = info.length > 15 ? `${info.substr(0, 15)}...` : info;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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

  const clipPathStyle = {
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), 90% 100%, 80% calc(100% - 10px), 70% 100%, 60% calc(100% - 10px), 50% 100%, 40% calc(100% - 10px), 30% 100%, 20% calc(100% - 10px), 10% 100%, 0 calc(100% - 10px))',
    padding: '0.5rem',
    color: 'white',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
  };

  return (
    <div 
      className='mx-2 w-[200px] h-[180px] mb-[6rem] relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='border border-solid'>
        <div className='flex justify-between mx-2'>
          <p
            className={`text-3xl mt-2 cursor-pointer ${isWished ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleHeartClick}
          >
            {isWished ? <IoIosHeart /> : <IoIosHeartEmpty />}
          </p>
          <p className='bg-green-500' style={clipPathStyle}>NEW</p>
        </div>
        <Link to={`/product/${id}`}>
          <img src={picture} alt='Product' className='w-[200px] h-[150px]' />
        </Link>
        {/* Add to Cart Button (visible on large screens) */}
        <button
          onClick={() => addToCart({ id: Math.random(), picture, name, amount })}
          className={`hidden lg:block text-white w-full bg-primary rounded-md ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        >
          Add to Cart
        </button>
        {/* Cart Icon (visible on small screens) */}
        <BsCart
          onClick={() => addToCart({ id: Math.random(), picture, name, amount })}
          className='lg:hidden text-primary text-2xl cursor-pointer'
        />
      </div>
      <div className='bg-white border border-solid shadow-md hover:ease-out p-1'>
        <div className='flex gap-6 p-2 justify-between'>
          <Link to={`/product/${id}`} className='text-gray-700 hover:text-blue-500'>{shortname}</Link>
          <p className='text-red-500'>${amount}</p>
        </div>
        <Link to={`/product/${id}`}><p>{shortinfo}</p></Link>
      </div>
      {/* Wishlist Status Message */}
      {message && (
        <div className='absolute top-0 left-0 bg-green-500 text-white p-2 rounded-md shadow-lg'>
          {message}
        </div>
      )}
    </div>
  );
};

export default NewInStoreItem;

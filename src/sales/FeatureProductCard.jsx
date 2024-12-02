import  { useContext, useState } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { CartContext } from '../context/CartContext';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const FeatureProductCard = ({ id, title, image, price, description }) => {
  // console.log({id, title, image, price, description });
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [message, setMessage] = useState('');

  const shortname = title ? (title.length > 10 ? `${title.substr(0, 10)}...` : title) : '';
  const shortinfo = description ? (description.length > 15 ? `${description.substr(0, 15)}...` : description) : '';

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
    setTimeout(() => setMessage(''), 2000);
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
      className='mx- w-[200px] h-auto mb-8 relative bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative overflow-hidden rounded-t-lg'>
        <div className='absolute top-2 left-2 flex justify-between w-full px-2'>
          <p
            className={`text-3xl cursor-pointer transition-colors ${isWished ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleHeartClick}
          >
            {isWished ? <IoIosHeart /> : <IoIosHeartEmpty />}
          </p>
          <p className='bg-green-500' style={clipPathStyle}>NEW</p>
        </div>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title || 'Product'} className='w-full h-40 object-cover rounded-t-lg' />
        </Link>
        {/* Add to Cart Button (visible on large screens) */}
        <button
          onClick={() => addToCart({ id, image, title, price })}
          className={`hidden lg:block text-white bg-primary rounded-b-lg py-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 absolute bottom-0 w-full`}
        >
          Add to Cart
        </button>
        {/* Cart Icon (visible on small screens) */}
        <BsCart
          onClick={() => addToCart({ id, image, title, price })}
          className='lg:hidden text-primary text-2xl cursor-pointer absolute bottom-2 right-2'
        />
      </div>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-2'>
          <Link to={`/products/${id}`} className='text-gray-700 font-semibold hover:text-blue-500'>
            {shortname}
          </Link>
          <p className='text-red-500 font-bold'>${price}</p>
        </div>
        <Link to={`/products/${id}`}>
          <p className='text-gray-500 text-sm'>{shortinfo}</p>
        </Link>
      </div>
      {/* Wishlist Status Message */}
      {message && (
        <div className='absolute top-0 left-0 w-full bg-green-500 text-white text-center p-2 rounded-md shadow-lg'>
          {message}
        </div>
      )}
    </div>
  );
};

export default FeatureProductCard;

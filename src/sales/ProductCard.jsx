import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { BsFillCartFill } from "react-icons/bs";
import { CartContext } from '../context/CartContext';

const ProductCard = ({ id, image, name, description, oldprice, amount, isNew }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, image, name, description, oldprice, amount });
  };
  
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative group">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className="w-full h-64 object-cover cursor-pointer" />
        </Link>
        {isNew && (
          <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1">NEW</div>
        )}
        <IoIosHeartEmpty className="absolute top-2 left-2 text-gray-600 cursor-pointer" size={24} />
        <Link to={`/product/${id}`} className="absolute inset-0 w-full h-full" />
        <Link to={`/product/${id}`} className="hidden group-hover:block md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-md">
          View Details
        </Link>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={`/product/${id}`} className="text-blue-500 hover:underline">Read More</Link>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-red-500 line-through mr-2">${oldprice}</span>
            <span className="text-green-600">${amount}</span>
          </div>
          <BsFillCartFill className="text-gray-600 cursor-pointer" size={24} onClick={handleAddToCart} />
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-500 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15l-6 3 1.9-7.5-5.4-4.5h7l2.5-7 2.5 7h7l-5.4 4.5 1.9 7.5-6-3z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">(1)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

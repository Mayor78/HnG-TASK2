import React, { useContext } from 'react';
import { IoIosHeartEmpty } from "react-icons/io";
import { BsFillCartFill } from "react-icons/bs";
import { CartContext } from '../context/CartContext';

const ProductCard = ({ id, image, name, description, oldprice, amount, isNew }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, image, name, description, oldprice, amount });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        {isNew && (
          <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1">NEW</div>
        )}
        <IoIosHeartEmpty className="absolute top-2 left-2 text-gray-600 cursor-pointer" size={24} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-red-500 line-through mr-2">${oldprice}</span>
            <span className="text-green-600">${amount}</span>
          </div>
          <BsFillCartFill className="text-gray-600 cursor-pointer" size={24} onClick={handleAddToCart} />
        </div>
        <div className="flex items-center">
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

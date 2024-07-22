import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';

const CartIcon = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <div className="relative">
      <Link to="/cart">
        <GiShoppingCart className="text-3xl" />
        {totalItems > 0 && (
          <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;

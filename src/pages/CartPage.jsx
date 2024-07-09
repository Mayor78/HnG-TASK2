import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext);
  

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast.info("Item removed from cart");
  };

  const handleIncreaseQuantity = (product) => {
    addToCart(product);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

 

  return (
    <div className="container mx-auto p-4">
      <Link to={'/'} className="text-blue-500 hover:underline">Continue Shopping</Link>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-list mt-4">
          <div className='details hidden md:flex justify-between p-3 font-semibold text-lg bg-gray-200 rounded'>
            <h1>Product</h1>
            <h1>Unit Price</h1>
            <h1>Quantity</h1>
            <h1>Total</h1>
          </div>
          {cart.map(product => (
            <div key={product.id} className="cart-item flex flex-col md:flex-row items-center justify-between mt-4 p-4 bg-white rounded shadow">
              <div className='flex items-center gap-4'>
                <img src={product.image} alt={product.name} className='w-24 h-24 object-cover rounded' />
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-xl'>{product.name}</h3>
                  <p className='text-gray-400'>Estimated Time of delivery</p>
                  <div className='flex items-center gap-2 mt-2'>
                    <IoIosHeartEmpty className='text-gray-500'/>
                    <p className='text-sm text-gray-500'>Move to wishlist</p>
                  </div>
                  <div className='flex items-center gap-2 mt-2'>
                    <BsTrash className='text-gray-500'/>
                    <button onClick={() => handleRemoveFromCart(product.id)} className="text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col  md:flex-row items-center md:gap-[20rem] gap-4 mt-4 md:mt-0'>
                <div className='Unit-price-container'>
                  <h3 className='text-lg font-medium'>${product.amount}</h3>
                </div>
                <div className='quantity-container flex items-center gap-2 border border-gray-300 rounded px-2 py-1'>
                  <button onClick={() => handleDecreaseQuantity(product.id)} className="text-lg font-bold">-</button>
                  <p>{product.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(product)} className="text-lg font-bold">+</button>
                </div>
                <div className='total-container'>
                  <p className='text-lg'>${product.amount * product.quantity}</p>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-end items-center gap-8 mt-8'>
            <h1 className='text-2xl font-semibold'>Subtotal:</h1>
            <p className='text-2xl font-semibold'>${cart.reduce((acc, product) => acc + product.amount * product.quantity, 0)}</p>
          </div>
          <div className='flex justify-end mt-4'>
            <Link to={'/checkout'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

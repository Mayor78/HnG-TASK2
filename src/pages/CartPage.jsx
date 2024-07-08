import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';


const CartPage = ({ image, name, description, amount, icon, oldprice }) => {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
   
  return (
    <div>
      <Link to={'/'}>Continue Shopping</Link>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-list ">
          <div className='details flex justify-around mt-3 p-3 font-semibold text-1xl bg-primary'>
            <h1>Product</h1>
            <h1 className='relative left-[4rem]'>UnitPrice</h1>
            <h1>Quantity</h1>
            <h1>Quantity</h1>
          </div>
          {cart.map(product => (
            <div key={product.id} className="cart-item mt-10 border border-solid flex justify-evenly">
              <div className='bigwrapper flex gap-3 '>
                <div className='bg-cyan-100 rounded-xl w-32 relative right-[5rem]  '>
                <img src={product.image} alt={product.name} className='w-28' />
                </div>
                <div className='container-details relative right-[5rem]'>
                  <h3 className='font-semibold text-2xl mb-4'>{product.name}</h3>
                  <p className='text-gray-400 leading-3 mb-5'>Estimated Time of delivery</p>
                  <div className='flex gap-1'>
                  <IoIosHeartEmpty  className='mt-[3.5px]'/>
                  <p className='text-md'> move to wishlist</p>
                  </div>
                  <div className='flex gap-2'>
                    <BsTrash className='mt-[3.5px]'/>
                  <button onClick={() => removeFromCart(product.id)}>Remove</button>
                  </div>
                  
                  
                </div> 
              </div>
              <div className='Unit-price-container mt-10 relative right-36 '>
                  <h3 className='text-1xl font-medium '>${product.amount}</h3>
              </div>
              <div className='quantity-container gap-3 mt-10 relative right-20 border border-solid px-5 h-[2rem]  flex'>
                  <p>-</p>
                  <p>{product.quantity || 1}</p>
                  <p className='cursor-pointer' onClick={() => addToCart({ image, name, description, amount, oldprice, id: name })}>+</p>
              </div>
              <div className='total-container mt-10'>
                <p>${product.amount * product.quantity}</p> {/* Total price for each product */}
                 
              </div>
             
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;



  {/* <h2>Cart Details</h2>
              <p>Total: ${cart.reduce((acc, product) => acc + product.amount * product.quantity, 0)}</p>
              <Link to={'/checkout'}>Checkout</Link>
              <button onClick={() => cart.forEach(product => removeFromCart(product.id))}>Empty Cart</button> */}
              {/* Empty cart button */}





              // <p>${product.amount}</p>
              // <p>Quantity: {product.quantity || 1}</p> {/* Default quantity is 1 */}
              // <button onClick={() => removeFromCart(product.id)}>Remove</button>
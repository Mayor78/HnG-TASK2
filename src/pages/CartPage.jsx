import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import empty from '../assets/emptycart.png';
import shopping from '../assets/Shopping cart.gif';
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext);

  window.scrollTo(0, 0);

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
      <Link to={'/'} className="text-blue-500 text-2xl hover:underline">Continue Shopping <img src={shopping} alt="" /></Link>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl mt-8 text-center text-white">Your cart is empty</h1>
          <img src={empty} alt="Empty Cart" className="w-1/2"/>
        </div>
      ) : (
        
           <div className='big-wrapper grid h-scree  gap-4 md:flex text-whit'>
            {/* this container hold the product and the amount */}
            <div className='child-one w-[100%] ' >
              <div className='bg-white w-24 mt-4 p-2 rounded-md'>
              <p className="text-gray-500 text-center font-medium">({cart.length} items)</p>
              </div>
            {cart.map(product => (
             <div key={product.id} className='flex gap-3'>

 
             <div  className="cart-item flex  w-[95%]   items-center justify-between mt-4 p-4 bg-white rounded shadow">
            
               <div className='flex items-center gap-4'>
                 <img src={product.image || product.picture} alt={product.title || product.name} className='w-24 h-24 object-cover rounded' />
                 <div className='grid'>
                   <h3 className='font-semibold text-sm md:text-xl'>{product.title || product.name}</h3>
                   <p className='text-gray-400 text-sm'>Estimated Time of delivery</p>
                   <div className='flex items-center gap-2 mt-2'>
                     <IoIosHeartEmpty className='text-gray-500'/>
                     <p className='text-sm text-gray-500'>Move to wishlist</p>
                   </div>
                   <div className='flex gap-2 mt-1'>
                    <BsTrash className='text-gray-500'/>
                    <button onClick={() => handleRemoveFromCart(product.id)} className="text-red-500 hover:underline">Remove</button>
                    </div>
                 </div>
                
                  
               </div>
              
               <div className='flex flex-col  md:flex-row items-center md:gap-[20rem] gap-4 mt-4 md:mt-0'>
                 <div className='Unit-price-container'>
                   <h3 className='text-lg font-bold ml-16 '>${product.price || product.amount}</h3>
                   <div className='flex justify-between gap- mt-2'>
                  

                    <div className='quantity-container mt-3 flex items-center gap-4 border-gray-300  px-2 py-1'>
                   <button onClick={() => handleDecreaseQuantity(product.id)} className="text-lg py-2 px-3 shadow-2xl rounded-md hover:bg-orange-500 text-white bg-orange-400 font-bold"><FiMinus/></button>
                   <p>{product.quantity}</p>
                   <button onClick={() => handleIncreaseQuantity(product)} className="text-lg py-2 px-3 shadow-2xl rounded-md hover:bg-orange-500 text-white bg-orange-400 font-bold"><FaPlus /></button>

                  
                 </div>
                 <hr />
                   </div>
                 </div>
                </div>
                 {/* <div className='total-container'>
                   <p className='text-lg'>${(product.price || product.amount) * product.quantity}</p>
                 </div> */}
               </div>
              
             </div>
          
           ))}
            </div>
            {/* this container hold the summary  and the total amount */}
            <div className='chidTwo w-[100%]  md:w-[30%] sticky top-0 text-black'>
            <div className=' child-one text-black w-full p-1 rounded-md h-[30vh] top-0 md:top-20 bg-white relative'>
              <h1 className='my-2 font-serif poppins-semibold'>CART SUMMARY</h1>
              <hr />
             <div className='flex justify-between  mt-2'>
            <h1 className='text-sm font-bold '>Subtotal:</h1>
            <p className='text-lg font-medium '>${cart.reduce((acc, product) => acc + (product.price || product.amount) * product.quantity, 0)}</p>
          </div>
          <div>
            <p className='text-sm'>Delivery fees not included yet</p>
          </div>
          <hr  className='my-2'/>
          <div className='w-[100%]  mt-4'>
             <Link to={'/checkout'} className="bg-blue-500 flex justify-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               CHECKOUT  <span> (${cart.reduce((acc, product) => acc + (product.price || product.amount) * product.quantity, 0)})</span>
             </Link>
           </div>
             </div>
            </div>
           </div>
      )}
    </div>
  );
};

export default CartPage;


















  // <div className="cart-list  mt-4">
          
        //   {/* <div className="flex justify-between items-center mb-4">
           
        //    <p className="text-gray-500">({cart.length} items)</p>
        //  </div>
        //      <hr /> */}
        //      <div className='big-wrappr'>
        //      <div className=' child-onebg-white text-black'>
        //      <div className='flex justify-end items-center gap-8 mt-8'>
        //     <h1 className='text-2xl font-semibold text-white'>Subtotal:</h1>
        //     <p className='text-2xl font-semibold text-white'>${cart.reduce((acc, product) => acc + (product.price || product.amount) * product.quantity, 0)}</p>
        //   </div>
        //      </div>
        //      <div className='child-two'>
        //   {cart.map(product => (
        //     <div key={product.id} className='flex gap-3'>

 
        //     <div  className="cart-item flex  w-[70%]  items-center justify-between mt-4 p-4 bg-white rounded shadow">
            
        //       <div className='flex items-center gap-4'>
        //         <img src={product.image || product.picture} alt={product.title || product.name} className='w-24 h-24 object-cover rounded' />
        //         <div className='grid'>
        //           <h3 className='font-semibold text-xl'>{product.title || product.name}</h3>
        //           <p className='text-gray-400'>Estimated Time of delivery</p>
        //           <div className='flex items-center gap-2 mt-2'>
        //             <IoIosHeartEmpty className='text-gray-500'/>
        //             <p className='text-sm text-gray-500'>Move to wishlist</p>
        //           </div>
        //           <div className='flex gap-2 mt-1'>
        //            <BsTrash className='text-gray-500'/>
        //            <button onClick={() => handleRemoveFromCart(product.id)} className="text-red-500 hover:underline">Remove</button>
        //            </div>
        //         </div>
                
                  
        //       </div>
              
        //       <div className='flex flex-col  md:flex-row items-center md:gap-[20rem] gap-4 mt-4 md:mt-0'>
        //         <div className='Unit-price-container'>
        //           <h3 className='text-lg font-bold ml-16 '>${product.price || product.amount}</h3>
        //           <div className='flex justify-between gap- mt-2'>
                  

        //            <div className='quantity-container mt-3 flex items-center gap-4 border-gray-300  px-2 py-1'>
        //           <button onClick={() => handleDecreaseQuantity(product.id)} className="text-lg py-2 px-3 shadow-2xl rounded-md hover:bg-orange-500 text-white bg-orange-400 font-bold"><FiMinus/></button>
        //           <p>{product.quantity}</p>
        //           <button onClick={() => handleIncreaseQuantity(product)} className="text-lg py-2 px-3 shadow-2xl rounded-md hover:bg-orange-500 text-white bg-orange-400 font-bold"><FaPlus /></button>

                  
        //         </div>
        //         <hr />
        //           </div>
        //         </div>
        //        </div>
        //         {/* <div className='total-container'>
        //           <p className='text-lg'>${(product.price || product.amount) * product.quantity}</p>
        //         </div> */}
        //       </div>
              
        //     </div>
          
        //   ))}
         
        //  </div>
        //   <div className='flex justify-end mt-4'>
        //     <Link to={'/checkout'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //       Checkout
        //     </Link>
        //   </div>
        // </div>
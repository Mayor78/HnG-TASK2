import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVC: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = cart.reduce((total, item) => total + item.amount * item.quantity, 0);
    const newOrder = {
      id: new Date().getTime(),
      ...formData,
      date: new Date().toISOString(),
      totalPrice,
      completed: false, // Set to false initially
      products: cart
    };
  
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orderDetails')) || [];
  
    // Append new order to existing orders
    const updatedOrders = [...existingOrders, newOrder];
  
    // Save updated orders back to localStorage
    localStorage.setItem('orderDetails', JSON.stringify(updatedOrders));
  
    setOrderDetails(newOrder);
    setIsModalOpen(true);
  };
  
  const handleConfirm = () => {
    clearCart();
    navigate('/thank-you');
    setIsModalOpen(false);
  };

  const totalPrice = cart.reduce((total, item) => total + item.amount * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cart Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 border-b">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>${item.amount} x {item.quantity}</p>
                  </div>
                  <button 
                    className="text-red-500 hover:text-red-700" 
                    onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-4 text-right">
                <p className="text-lg font-bold">Total: ${totalPrice}</p>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded" 
                required 
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input 
                  type="text" 
                  name="postalCode" 
                  value={formData.postalCode} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded" 
                  required 
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Country</label>
              <input 
                type="text" 
                name="country" 
                value={formData.country} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded" 
                required 
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded" 
                required 
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Expiration Date</label>
                <input 
                  type="text" 
                  name="cardExpiration" 
                  value={formData.cardExpiration} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded" 
                  placeholder="MM/YY" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVC</label>
                <input 
                  type="text" 
                  name="cardCVC" 
                  value={formData.cardCVC} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded" 
                  required 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              Place Order
            </button>
          </form>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        // onClose={handleCancel} 
        onConfirm={handleConfirm}
      >
        <h2 className="text-lg font-bold mb-4">Order Confirmation</h2>
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Details</h3>
          <p><strong>Name:</strong> {orderDetails?.name}</p>
          <p><strong>Address:</strong> {orderDetails?.address}, {orderDetails?.city}, {orderDetails?.country}, {orderDetails?.postalCode}</p>
          <p><strong>Card Number:</strong> {orderDetails?.cardNumber}</p>
          <p><strong>Total Price:</strong> ${orderDetails?.totalPrice}</p>
          <p className="mt-4 text-[15px]">Order placed on {orderDetails?.date}</p>
        </div>
        <p className="mt-4 font-semibold">Are you sure you want to place the order?</p>
      </Modal>
    </div>
  );
};

export default Checkout;

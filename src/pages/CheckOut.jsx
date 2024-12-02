import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    contact: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVC: ''
  });
  const [existingAddress, setExistingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing address details from the server or localStorage
    const fetchExistingAddress = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/user/address', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExistingAddress(response.data.address); // assuming response.data.address is the user's saved address
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchExistingAddress();
  }, []);

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressFocus = () => {
    if (existingAddress) {
      const useExisting = window.confirm('Do you want to use your existing address?');
      if (useExisting) {
        setFormData({
          ...formData,
          ...existingAddress
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      setIsLoginModalOpen(true);
      return;
    }

    const token = localStorage.getItem('authToken');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const newOrder = {
      ...formData,
      date: new Date().toISOString(),
      totalPrice,
      completed: false, 
      products: cart
    };

    try {
      await axios.post('http://localhost:5000/orders', newOrder, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Order placed successfully');
      setOrderDetails(newOrder);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleConfirm = () => {
    clearCart(); // Clear the cart
    setFormData({ // Clear the form fields
      name: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      contact: '',
      cardNumber: '',
      cardExpiration: '',
      cardCVC: ''
    });
    navigate('/thank-you'); // Navigate to thank-you page
    setIsModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
    setIsLoginModalOpen(false);
  };

  const handleRedirectToRegister = () => {
    navigate('/signup');
    setIsLoginModalOpen(false);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <p>${item.price} x {item.quantity}</p>
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
                onFocus={handleAddressFocus} 
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Contact</label>
              <input 
                type="text" 
                name="contact" 
                value={formData.contact} 
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
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Order Confirmed</h2>
        <p>Thank you for your order!</p>
        <button 
          className="mt-4 py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600" 
          onClick={handleConfirm}
        >
          OK
        </button>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal}>
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>
        <p>You need to be logged in to place an order.</p>
        <div className="flex gap-4 mt-4">
          <button 
            className="py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            onClick={handleRedirectToLogin}
          >
            Login
          </button>
          <button 
            className="py-2 px-4 bg-gray-500 text-white font-bold rounded hover:bg-gray-600"
            onClick={handleRedirectToRegister}
          >
            Register
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;

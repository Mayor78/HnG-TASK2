// src/ThankYouPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import fullcart from '../assets/full-cart.png'

const Thanks = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="mb-6 font-semibold ">Your order has been placed successfully. We appreciate your business!</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
        <img src={fullcart} alt="Full Cart" className="mt-8 ml-8" />
      </div>
    </div>
  );
};

export default Thanks;

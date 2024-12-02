import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import signup from '../assets/signup.png';

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      toast.success('Sign up successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Sign up failed. Please check your input.');
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gray-100"
      style={{
        backgroundImage: `url(${signup})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="p-6 md:p-12 lg:p-16 bg-white bg-opacity-30 shadow-md rounded-lg max-w-md w-full">
        <div className="p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                name="phone"
                placeholder="phone No here"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>
           
            <button type="submit" className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600">
              Sign Up
            </button>
          </form>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm">Already have an account? </span>
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

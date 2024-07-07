import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/users/signup', formData);
      alert('Sign up successful!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen flex  justify-center items-center bg-gray-100">
      <div className="flex  bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left side */}
        <div className="p-6 bg-white w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
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
              />
            </div>
            <button type="submit" className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600">
              Signup
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            or sign in with
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-blue-700 hover:text-blue-900">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="text-red-600 hover:text-red-800">
              <i className="fab fa-google"></i>
            </button>
            <button className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>
        </div>
        {/* Right side */}
        <div className="bg-green-500 text-white p-6 w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-sm">
            We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
          </p>
          <p className="mt-4">
            already have an account? <Link to={"/login"} className="underline hover:text-blue-500">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

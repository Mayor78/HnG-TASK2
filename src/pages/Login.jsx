// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import bg from '../assets/blog1.jpg'
import { Opulento } from "uvcanvas"

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use the AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const { token, user } = response.data;

      login(token, user.role); // Call login from AuthContext

      toast.success('Login successful!');

      if (user.role === 'admin') {
        navigate('/admin'); // Admin page
        window.location.reload();
      } else {
        navigate('/'); // Homepage
        window.location.reload();
      }
    }  catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
   const style = bg
  return (
    <div className=" min-h-screen grid md:flex justify-center items-center "   style={{
      backgroundImage: `url(${style})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '50vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="grid  md:flex justify-center   shadow-md rounded-lg overflow-hidden">
        <div className=" bg-opacity-50 bg-green-600 text-white p-6 w-auto md:w-3/6  justify-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-sm">
            We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
          </p>
          <p className="mt-4">
            No account yet? <a href="/signup" className="underline">Sign up</a>.
          </p>
        </div>
        <div className="p-6 bg-white w-auto md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Signin</h2>
          <form onSubmit={handleSubmit}>
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 relative"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8V12H4z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Signin'
              )}
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
      </div>
    </div>
  );
};

export default Login;

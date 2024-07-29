import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/logout', {}, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      // Clear the token from local storage
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully!');
      
      // Navigate to the homepage or login page and reload the page
      navigate('/');
    //   window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8V12H4z"></path>
            </svg>
            Logging out...
          </div>
        ) : (
          'Logout'
        )}
      </button>
    </div>
  );
};

export default Logout;

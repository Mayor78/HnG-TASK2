import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser(); // Using UserContext
  const navigate = useNavigate();

  const handleToggle = () => setShow(!show);

  const handleLogout = async () => {
    setLoading(true);

    try {
      // Optionally, make an API request to log out
      await axios.post('http://localhost:5000/logout');

      // Clear token from local storage
      localStorage.removeItem('authToken');
      
      // Clear user context
      if (setUser) setUser(null);

      toast.success('Logged out successfully!');
      
      // Navigate to the login page and reload
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { height: 0, opacity: 0, x: '-100%' }, // Slide in from left
    visible: { height: 'auto', opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.5, duration: 0.5 }
    })
  };

  return (
    <>
      <nav className="backdrop-blur-lg bg-blue-900 p-4 sticky z-10 top-0">
        <Nav />
        <div>
          <div>
            <div onClick={handleToggle} className="block md:hidden text-white p-2 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={show ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
              </svg>
              {show && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className='z-10 bg-blue-900 h-[60vh] w-auto fixed top-[6.5rem] left-[0]'
                >
                  <motion.ul className='p-[3rem] text-white'>
                    <motion.li variants={itemVariants} initial="hidden" animate="visible" className='py-3'>
                      <Link to={'/bedroom'}>Bedroom</Link>
                    </motion.li>
                    <motion.li variants={itemVariants} initial="hidden" animate="visible" className='py-3'>
                      <Link to={'/cart'}>Bathroom</Link>
                    </motion.li>
                    <motion.li variants={itemVariants} initial="hidden" animate="visible" className='py-3'>
                      <Link to={'/login'}>Living Area</Link>
                    </motion.li>
                    <hr className='mt-[30px]' />
                    {user ? (
                      <motion.li variants={itemVariants} initial="hidden" animate="visible" className='py-3 mt-3'>
                        <button 
                          onClick={handleLogout} 
                          className='text-red-500 border border-solid p-3 hover:bg-orange-200 hover:text-white'
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
                      </motion.li>
                    ) : (
                      <motion.li variants={itemVariants} initial="hidden" animate="visible" className='py-3 mt-3 hover:bg-orange-200 hover:text-white'>
                        <Link to="/login" className='text-white border border-solid p-3 '>Login</Link>
                      </motion.li>
                    )}
                  </motion.ul>
                </motion.div>
              )}
            </div>

            {/* <ul className='hidden md:flex justify-evenly gap-4'>
              <li className='text-white font-semibold text-[20px]'>
                <Link to={'/about'}>Kitchen & Dining</Link>
              </li>
              <li className='text-white font-semibold text-[20px]'>
                <Link to={'/bedroom'}>Bedroom</Link>
              </li>
              {user ? (
                <li className='text-white font-semibold text-[20px]'>
                  <button 
                    onClick={handleLogout} 
                    className='text-red-500 hover:bg-orange-200 hover:text-white'
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
                </li>
              ) : (
                <li className='text-white font-semibold text-[20px]'>
                  <Link to={'/login'} className=''>Login</Link>
                </li>
              )}
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import { useProducts } from '../context/ProductContext';
import { useUser } from '../context/UserContext';
import { CiLogout, CiSettings } from 'react-icons/ci';
import { BsCreditCard } from 'react-icons/bs';
import { MdOutlineHelpOutline } from "react-icons/md";

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { products } = useProducts();
  const { user, setUser } = useUser(); // Get user and setUser from context
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = products.filter(product =>
        product.name?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        product.title?.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const searchResults = products.filter(product =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    navigate('/search-results', { state: { searchResults } });
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name || suggestion.title);
    setSuggestions([]);
    navigate(`/product/${suggestion.id}`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleUserClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else if (window.innerWidth < 768) {
      navigate('/profile');
    } else {
      setIsDropdownOpen(prev => !prev);
    }
  };

  const { logout } = useUser();

const handleLogout = () => {
  logout();
 // Redirect to login page
 navigate('/login');
 window.location.reload(); 
};
      // Optionally reload the page to reflect changes
   

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const truncateEmail = (email) => {
    if (email.length <= 8) return email;
    return `${email.substring(0, 8)}...`;
  };

  return (
    <div className="sticky top-0 bg-blue-950 z-50">
      <div className='flex justify-around items-center'>
        {!isInputFocused && (
          <Link to={'/'} className='font-bold text-2xl text-white mt-2'>HNG</Link>
        )}
        <div className={`relative ${isInputFocused ? 'w-full' : 'w-[40%]'} m-2 transition-all duration-300`}>
          <input
            type="search"
            placeholder='search...'
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className='w-full p-2 rounded-md focus:outline-blue-500 focus:shadow-outline'
          />
          {searchTerm && (
            <i
              className="fa-solid fa-xmark absolute right-10 top-4 cursor-pointer"
              onClick={handleClearSearch}
            ></i>
          )}
          <i
            className="fa-solid fa-magnifying-glass absolute right-3 top-4 cursor-pointer"
            onClick={handleSearch}
          ></i>
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-50">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name || suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='flex gap-6 mt-3 text-white relative' ref={dropdownRef}>
          <h1 className='hidden md:flex  text-[20px] '>Help <MdOutlineHelpOutline className='mt-1 mx-1 text-'/></h1>
          <button onClick={handleUserClick} className='text-xl flex gap-1 hover:text-orange-400'>
            <FaRegUser className='mt-1'/>
            <h1 className='hidden md:block lg:block'>Hi, {user ? truncateEmail(user.email) : 'User'}</h1>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 bg-white text-black border border-gray-300 rounded-md p-3 shadow-lg mt-2 w-40">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2">
                    <FaRegUser className='mt-1'/>Profile
                  </Link>
                  <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2">
                    <BsCreditCard className='mt-1'/>Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2">
                      <CiSettings className='mt-1'/>Admin
                    </Link>
                  )}
                  <hr className='mb-5 text-bold'/>
                  <button onClick={handleLogout} className="px-4 py-2 hover:bg-orange-400 hover:text-white text-[20px] flex gap-2">
                    <CiLogout className='mt-1'/>Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px]">
                  Login
                </Link>
              )}
            </div>
          )}
          <CartIcon />
        </div>
        
      </div>
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">You need to login first</h2>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-400"
              onClick={closeLoginPrompt}
            >
              Close
            </button>
            <Link
              to="/login"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-400 ml-2"
              onClick={closeLoginPrompt}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;

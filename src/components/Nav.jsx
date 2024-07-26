import React, { useState, useEffect, useRef } from 'react';
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import { useProducts } from '../context/ProductContext'; // Import your products context
import { CiLogout, CiSettings } from 'react-icons/ci';
import { BsCreditCard } from 'react-icons/bs';

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { products } = useProducts(); // Use the combined product list from context
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown menu

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
    // Close dropdown when clicking outside of it
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
    if (window.innerWidth < 768) {
      navigate('/profile');
    } else {
      setIsDropdownOpen(prev => !prev);
    }
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
        {!isInputFocused && (
          <div className='flex gap-6 mt-3 text-white relative' ref={dropdownRef}>
            <h1 className='hidden md:flex mt-1'>CONTACT US</h1>
            <button onClick={handleUserClick} className='text-xl flex gap-1 hover:text-orange-400'>
              <FaRegUser className='mt-1'/><h1 className='hidden md:block lg:block'>Hi, Abraham</h1> 
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 bg-white text-black border border-gray-300 rounded-md p-3 shadow-lg mt-2 w-40">
                <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className=" px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2"><FaRegUser className='mt-1'/>Profile</Link>
                <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className=" px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2"><BsCreditCard className='mt-1'/>Orders</Link>
                <Link to="/settings" onClick={() => setIsDropdownOpen(false)} className=" px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2"><CiSettings className='mt-1'/>Settings</Link>
                <hr  className='mb-5 text-bold'/>
                <Link to="/settings" onClick={() => setIsDropdownOpen(false)} className=" px-4 py-2 hover:bg-orange-400 hover:text-white text-[20px] flex gap-2"><CiLogout className='mt-1'/>LogOut</Link>
              </div>
            )}
            <CartIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

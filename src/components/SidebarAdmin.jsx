import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const SidebarAdmin = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">{isOpen ? 'Admin Dashboard' : ''}</h2>
        <button onClick={handleToggle} className="text-white">
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="/admin/products"
              className={`block p-4 hover:bg-gray-700 ${activeSection === 'products' ? 'bg-gray-600' : ''}`}
              onClick={() => onSectionChange('products')}
            >
              All Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/create-product"
              className={`block p-4 hover:bg-gray-700 ${activeSection === 'create-product' ? 'bg-gray-600' : ''}`}
              onClick={() => onSectionChange('create-product')}
            >
              Create Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`block p-4 hover:bg-gray-700 ${activeSection === 'users' ? 'bg-gray-600' : ''}`}
              onClick={() => onSectionChange('users')}
            >
              All Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">My Jumia Account</h2>
      <ul>
        <li className="mb-2">
          <Link to="/orders" className="text-gray-700 hover:text-gray-900">Orders</Link>
        </li>
        <li className="mb-2">
          <Link to="/inbox" className="text-gray-700 hover:text-gray-900">Inbox</Link>
        </li>
        <li className="mb-2">
          <Link to="/inbox" className="text-gray-700 hover:text-gray-900">Inbox</Link>
        </li>
        <li className="mb-2">
          <Link to="/inbox" className="text-gray-700 hover:text-gray-900">Inbox</Link>
        </li>
        <li className="mb-2">
          <Link to="/inbox" className="text-gray-700 hover:text-gray-900">Inbox</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

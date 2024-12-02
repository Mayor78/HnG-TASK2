import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('You must be logged in to access this page');
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const [productsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:5000/products', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/users', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setProducts(productsResponse.data);
        setUsers(usersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post('http://localhost:5000/products', newProduct, { headers: { Authorization: `Bearer ${token}` } });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', description: '', image: '' });
      toast.success('Product created successfully');
    } catch (err) {
      console.error('Error creating product:', err);
      toast.error('Error creating product');
    }
  };

  const handleEditProduct = async (productId) => {
    // Implement product editing logic here
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Error deleting product');
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:5000/users/${userId}/orders`, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedUser(userId);
      setSelectedOrder(response.data);
    } catch (err) {
      console.error('Error fetching user orders:', err);
      toast.error('Error fetching user orders');
    }
  };

  const handleAcceptOrder = async (orderId) => {
    // Implement order acceptance logic here
  };

  const handleSetDeliveryDate = async (orderId, date) => {
    // Implement delivery date setting logic here
  };

  const handleMarkAsDelivered = async (orderId) => {
    // Implement marking as delivered logic here
  };
  
  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} w-64`}>
        <div className="flex justify-between items-center p-4">
          <h2 className={`text-xl font-semibold ${sidebarOpen ? 'block' : 'hidden'}`}>Admin Dashboard</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
            {sidebarOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <button
                className={`block p-4 hover:bg-gray-700 ${activeSection === 'products' ? 'bg-gray-600' : ''}`}
                onClick={() => setActiveSection('products')}
              >
                All Products
              </button>
            </li>
            <li>
              <button
                className={`block p-4 hover:bg-gray-700 ${activeSection === 'create-product' ? 'bg-gray-600' : ''}`}
                onClick={() => setActiveSection('create-product')}
              >
                Create Product
              </button>
            </li>
            <li>
              <button
                className={`block p-4 hover:bg-gray-700 ${activeSection === 'users' ? 'bg-gray-600' : ''}`}
                onClick={() => setActiveSection('users')}
              >
                All Users
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`flex-1 transition-margin duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-6 bg-gray-100 min-h-screen`}>
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">Welcome to Admin Dashboard</h1>
        <ToastContainer />

        {activeSection === 'products' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-500">All Products</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Description</th>
                  <th className="p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
              {products.map(product => {
  const shortInfo = (product.description || product.info || '').length > 200 
    ? `${(product.description || product.info).substr(0, 200)}...` 
    : product.description || product.info;

  return (
    <tr key={product._id}>
      <td className="p-4 border-b">{product.name}</td>
      <td className="p-4 border-b">${product.price}</td>
      <td className="p-4 border-b">{shortInfo}</td> {/* Render the shortened description here */}
      <td className="p-4 border-b">
        <button onClick={() => handleEditProduct(product._id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
        <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </td>
    </tr>
  );
})}

              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'create-product' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Add New Product</h2>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleProductChange}
              className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleProductChange}
              className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleProductChange}
              className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleProductChange}
              className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCreateProduct}
            >
              Create Product
            </button>
          </div>
        )}

        {activeSection === 'users' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-500">All Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id} className="mb-4 p-4 border-b bg-gray-50 rounded-md">
                  <h3 className="text-lg font-semibold">User ID: {user._id}</h3>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <button onClick={() => handleUserClick(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded">View Orders</button>
                  {selectedUser === user._id && selectedOrder && (
                    <div>
                      <h3 className="text-xl font-bold mt-6 mb-4">User Orders</h3>
                      {selectedOrder.map((order) => (
  <div key={order._id} className="mb-4 p-4 border bg-white rounded">
    {order.products.map((product, index) => (
      <div key={index} className="mb-2">
        <h1 className='font-serif text-2xl '>Product Name: {product.name||product.title}</h1>
        <p>Product Image: <img src={product.image} alt={product.name} width="100" /></p>
        <p>Quantity: {product.quantity}</p>
        <p>Price: ${product.price}</p>
        <p>Total Price: ${product.price * product.quantity || 'N/A'}</p>
      </div>
    ))}
    <p>Date: {new Date(order.date).toLocaleString()}</p>

    <p>Delivered: {order.delivered ? 'Yes' : 'No'}</p>
    <p>Cancelled: {order.cancelled ? 'Yes' : 'No'}</p>
    <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
    <p>Order ID: {order._id}</p>
    <p>Status: {order.status}</p>
    <button onClick={() => handleAcceptOrder(order._id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept</button>
    <input
      type="date"
      onChange={(e) => handleSetDeliveryDate(order._id, e.target.value)}
      className="border border-gray-300 px-4 py-2 rounded mr-2"
    />
    <button onClick={() => handleMarkAsDelivered(order._id)} className="bg-blue-500 text-white px-4 py-2 rounded">Delivered</button>
  </div>
))}

                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

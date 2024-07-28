import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

      try {
        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:5000/orders', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/users', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setOrders(ordersResponse.data);
        setUsers(usersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcceptOrder = (orderId) => {
    setCurrentOrderId(orderId);
  };

  const handleConfirmOrder = async () => {
    if (!currentOrderId) {
      console.error('No order ID selected');
      return;
    }

    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    try {
      await axios.post(`http://localhost:5000/orders/${currentOrderId}/confirm`, {
        deliveryDate: deliveryDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedOrders = orders.map(order =>
        order._id === currentOrderId ? {
          ...order,
          completed: true,
          deliveryDate: deliveryDate
        } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orderDetails', JSON.stringify(updatedOrders));
      setCurrentOrderId(null);
      setDeliveryDate('');
    } catch (err) {
      console.error('Error confirming order:', err);
      setError('Error confirming order');
    }
  };

  useEffect(() => {
    const updateOrderStatus = () => {
      const now = new Date();
      const updatedOrders = orders.map(order => {
        if (order.deliveryDate && new Date(order.deliveryDate) < now && !order.completed) {
          return { ...order, completed: true };
        }
        return order;
      });
      setOrders(updatedOrders);
      localStorage.setItem('orderDetails', JSON.stringify(updatedOrders));
    };

    const intervalId = setInterval(updateOrderStatus, 60000);

    return () => clearInterval(intervalId);
  }, [orders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <img src={loader} alt="Loading..." className="w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const currentUserOrders = orders.filter(order => {
    const orderUserId = order.userId && typeof order.userId === 'object' ? order.userId._id : order.userId;
    return orderUserId === currentUserId;
  });

  // Debugging
  console.log('Users:', users);
  console.log('Orders:', orders);
  console.log('Current User ID:', currentUserId);
  console.log('Current User Orders:', currentUserOrders);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">Admin Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Users</h2>
          <ul>
            {users.map(user => (
              <li key={user._id} className="mb-2 p-2 border-b hover:bg-gray-100 cursor-pointer" onClick={() => setCurrentUserId(user._id)}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Orders</h2>
          {currentUserId ? (
            <div>
              {currentUserOrders.length === 0 ? (
                <p>No orders found for this user</p>
              ) : (
                currentUserOrders.map(order => (
                  <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
                    <h2 className="text-xl font-bold mb-2 text-blue-500">Order ID: {order._id}</h2>
                    <p className="text-lg"><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                    <p className="text-lg"><strong>Total Price:</strong> ${order.totalPrice}</p>
                    <p className={`mt-2 inline-block px-3 py-1 rounded-full text-white ${order.completed ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      Status: {order.completed ? 'Completed' : 'Pending'}
                    </p>
                    {order.completed && (
                      <p className="mt-2 text-lg"><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    )}
                    {currentOrderId === order._id && (
                      <>
                        <input 
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="border p-2 rounded w-full mt-4"
                        />
                        <button 
                          onClick={handleConfirmOrder} 
                          className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        >
                          Confirm Order
                        </button>
                      </>
                    )}
                    {!order.completed && (
                      <button 
                        onClick={() => handleAcceptOrder(order._id)} 
                        className="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                      >
                        Accept Order
                      </button>
                    )}
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2 text-blue-600">Products:</h3>
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <img src={product.image} alt={product.title} className="w-16 h-16 object-cover mr-2 rounded" />
                          <div>
                            <p className="text-lg"><strong>Title:</strong> {product.title}</p>
                            <p className="text-lg"><strong>Price:</strong> ${product.price}</p>
                            <p className="text-lg"><strong>Quantity:</strong> {product.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-lg text-center">Select a user to view their orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../assets/loader2.gif';
import bellIcon from '../assets/bellIcon.gif'; // Ensure the path is correct

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userOrderCounts, setUserOrderCounts] = useState(new Map());
  const [newOrderUsers, setNewOrderUsers] = useState(new Set());

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const usersResponse = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersResponse = await axios.get('http://localhost:5000/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(usersResponse.data);
        setOrders(ordersResponse.data);

        const initialOrderCounts = new Map();
        ordersResponse.data.forEach(order => {
          const userId = order.userId;
          if (!initialOrderCounts.has(userId)) {
            initialOrderCounts.set(userId, 0);
          }
          initialOrderCounts.set(userId, initialOrderCounts.get(userId) + order.products.length);
        });
        setUserOrderCounts(initialOrderCounts);

        const userIdsWithNewOrders = new Set(ordersResponse.data.map(order => order.userId));
        setNewOrderUsers(userIdsWithNewOrders);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/events');
  
    eventSource.onmessage = (event) => {
      console.log('SSE message received:', event.data);
      const newOrderNotification = JSON.parse(event.data);
      
           

      toast.info(`New order from User ID: ${newOrderNotification.userId}`, {
        // autoClose: 5000,
        // position: toast.POSITION.TOP_RIGHT,
      });
      
      setNewOrderUsers(prevState => new Set([...prevState, newOrderNotification.userId]));
  
      setUserOrderCounts(prevState => {
        const updatedCounts = new Map(prevState);
        if (updatedCounts.has(newOrderNotification.userId)) {
          updatedCounts.set(newOrderNotification.userId, updatedCounts.get(newOrderNotification.userId) + 1);
        } else {
          updatedCounts.set(newOrderNotification.userId, 1);
        }
        return updatedCounts;
      });
    };
  
    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close();
    };
  
    return () => {
      eventSource.close();
    };
  }, []);
  ;

  // Sort users based on new orders and order counts
  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      const aOrderCount = userOrderCounts.get(a._id) || 0;
      const bOrderCount = userOrderCounts.get(b._id) || 0;
      return bOrderCount - aOrderCount;
    });
  }, [users, userOrderCounts]);

  const handleAcceptOrder = (orderId) => {
    console.log(`Accepting order with ID: ${orderId}`);
    setCurrentOrderId(orderId);
    console.log('Current order ID set to:', orderId);
  };

  const handleConfirmOrder = async () => {
    console.log(`Confirming order with ID: ${currentOrderId} and delivery date: ${deliveryDate}`);

    if (!currentOrderId) {
      console.error('No order ID selected');
      return;
    }

    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.post(`http://localhost:5000/orders/${currentOrderId}/confirm`, {
        deliveryDate: deliveryDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Order confirmed:', response.data);

      const updatedOrders = orders.map(order =>
        order._id === currentOrderId ? {
          ...order,
          completed: true,
          deliveryDate: deliveryDate
        } : order
      );
      setOrders(updatedOrders);
      setCurrentOrderId(null);
      setDeliveryDate('');
    } catch (err) {
      console.error('Error confirming order:', err);
      setError('Error confirming order');
    }
  };

  const handleDeliverOrder = async (orderId) => {
    const token = localStorage.getItem('authToken');

    try {
      await axios.post(`http://localhost:5000/orders/${orderId}/deliver`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedOrders = orders.map(order =>
        order._id === orderId ? {
          ...order,
          status: 'Delivered'
        } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Error delivering order:', err);
      setError('Error delivering order');
    }
  };

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

  const currentUserOrders = orders
    .filter(order => {
      const orderUserId = order.userId && typeof order.userId === 'object' ? order.userId._id : order.userId;
      return orderUserId === currentUserId;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
        Welcome, {admin ? admin.email : 'Admin'}
      </h1>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6 relative">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Users</h2>
          <img src={bellIcon} alt="Notification Bell" className={`absolute top-4 right-4 ${newOrderUsers.size > 0 ? 'block' : 'hidden'} w-8 h-8`} />
          <ul>
            {sortedUsers.map(user => (
              <li key={user._id} className={`mb-2 p-2 border-b hover:bg-gray-100 cursor-pointer ${newOrderUsers.has(user._id) ? 'text-red-600' : ''}`} onClick={() => setCurrentUserId(user._id)}>
                {newOrderUsers.has(user._id) && <img src={bellIcon} alt="Notification" className="inline-block w-6 h-6 mr-2" />}
                {user.name} ({user.email})
                {newOrderUsers.has(user._id) && <span className="ml-2 text-red-600">*</span>}
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
                    {order.products.map((product, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded mr-4" />
                        <div>
                          <p className="text-lg font-semibold">{product.name}</p>
                          <p className="text-gray-700">Quantity: {product.quantity}</p>
                          <p className="text-gray-700">Price: ${product.amount}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-lg"><strong>Delivery Date:</strong> {order.deliveryDate || 'Processing'}</p>
                    <p className="text-lg"><strong>Status:</strong> {order.completed ? 'Completed' : 'Pending'}</p>
                    <p className="text-lg"><strong>Order Status:</strong> {order.status}</p>
                    {!order.completed && (
                      <div>
                        <input
                          type="date"
                          className="border rounded p-2 mb-2 w-full"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                        />
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => {
                            handleAcceptOrder(order._id);
                            handleConfirmOrder(); // Confirm the order immediately after accepting it
                          }}
                        >
                          Accept Order
                        </button>
                      </div>
                    )}
                    {order.completed && order.status !== 'Delivered' && (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={() => handleDeliverOrder(order._id)}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <p>Please select a user to see their orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

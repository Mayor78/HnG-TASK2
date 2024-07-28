import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('completed');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`http://localhost:5000/orders/${selectedOrderId}/confirm`, {
        deliveryDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedOrder = response.data;
      setOrders(orders.map(order =>
        order._id === updatedOrder._id ? updatedOrder : order
      ));
      setDeliveryDate('');
      setSelectedOrderId(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const renderOrders = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <img src={loader} alt="loading..." className="w-12 h-12" />
        </div>
      );
    }

    if (orders.length === 0) {
      return <p>No orders found.</p>;
    }

    const filteredOrders = orders.filter((order) => {
      if (filter === 'completed') return order.completed === true;
      if (filter === 'uncompleted') return order.completed === false;
      return false;
    });

    return filteredOrders.map((order) => (
      <div key={order._id} className="border rounded p-4 mb-4">
        <h3 className="text-lg font-semibold md:font-bold">Order ID: {order._id}</h3>
        <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
        <p>Total Price: ${order.totalPrice}</p>
        <p className={`inline-block px-2 py-1 rounded ${order.completed ? 'bg-green-400 text-white' : 'bg-yellow-200 text-yellow-800'}`}>
          Status: {order.completed ? 'Completed' : 'Pending'}
        </p>
        {order.completed === false ? (
          <p className="text-gray-500">Processing...</p>
        ) : (
          order.deliveryDate && (
            <p>Estimated Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
          )
        )}
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Order Details:</h4>
          {order.products.length > 0 ? (
            order.products.map((product) => (
              <div
                key={product._id}
                className="flex items-center border-b pb-2 mb-2 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img src={product.image || 'default-image.jpg'} alt={product.name || 'No name'} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h5 className="font-semibold">{product.name || 'Unknown Product'}</h5>
                  <p className="font-medium">Price: ${product.amount}</p>
                  <p className="font-medium">Description: {product.shortDescription || 'No description'}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products found for this order.</p>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-0 md:mx-auto p-7 bg-white w-[100vw] md:w-[60vw] lg:w-[60vw]">
      <div className="title flex justify-evenly mb-4">
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md border-b-4 ${filter === 'completed' ? 'border-orange-500 text-orange-500 bg-orange-100' : 'border-transparent text-gray-800 bg-gray-200'}`}
        >
          Completed Orders
        </button>
        <button
          onClick={() => setFilter('uncompleted')}
          className={`px-4 py-2 rounded-md border-b-4 ${filter === 'uncompleted' ? 'border-orange-500 text-orange-500 bg-orange-100' : 'border-transparent text-gray-800 bg-gray-200'}`}
        >
          Pending Orders
        </button>
      </div>
      <div>
        {renderOrders()}
      </div>
    </div>
  );
};

export default Orders;

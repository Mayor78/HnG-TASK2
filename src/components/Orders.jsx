import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('completed'); // Default filter to show completed orders initially

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders'); // Update with your API URL
        console.log('API Response:', response.data);
        const sortedOrders = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort orders by date in descending order
        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

    const filteredOrders = orders.filter(order => {
      if (filter === 'completed') return order.completed;
      if (filter === 'uncompleted') return !order.completed;
      return true; // This will never be used because filter defaults to 'completed' or 'uncompleted'
    });

    return filteredOrders.map((order) => (
      <div key={order.id} className="border rounded p-4 mb-4">
        <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
        <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
        <p>Total Price: ${order.totalPrice}</p>
        <p>Status: {order.completed ? 'Completed' : 'Uncompleted'}</p>
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Order Details:</h4>
          {order.products && order.products.length > 0 ? (
            order.products.map((product) => (
              <div key={product.id} className="flex items-center border-b pb-2 mb-2">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h5 className="font-semibold">{product.name}</h5>
                  <p>Price: ${product.amount}</p>
                  <p>Description: {product.shortDescription}</p>
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
    <div className="container mx-auto p-7 bg-white w-[60vw]">
      <div className='title flex justify-evenly mb-4'>
        <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
          Completed Orders
        </button>
        <button onClick={() => setFilter('uncompleted')} className={`px-4 py-2 rounded-md ${filter === 'uncompleted' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
          Uncompleted Orders
        </button>
      </div>
      <div>
        {renderOrders()}
      </div>
    </div>
  );
};

export default Orders;

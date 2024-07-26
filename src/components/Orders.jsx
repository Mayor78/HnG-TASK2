import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/Spinner-2.gif';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('completed');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem('orderDetails'));
        if (!Array.isArray(storedOrders)) {
          console.error('Orders data from localStorage is not an array:', storedOrders);
          setOrders([]);
          localStorage.setItem('orderDetails', JSON.stringify([])); // Reinitialize as empty array
          return;
        }
        setOrders(storedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
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

    const filteredOrders = orders.filter((order) => {
      if (filter === 'completed') return order.completed === true;
      if (filter === 'uncompleted') return order.completed === false;
      return false;
    });

    return filteredOrders.map((order) => {
      if (!Array.isArray(order.products)) {
        console.error(`Order ${order.id} has invalid products data:`, order.products);
        return (
          <div key={order.id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-semibold md:font-bold">Order ID: {order.id}</h3>
            <p>No products found for this order.</p>
          </div>
        );
      }

      return (
        <div key={order.id} className="border rounded p-4 mb-4">
          <h3 className="text-lg font-semibold md:font-bold">Order ID: {order.id}</h3>
          <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <p className={`inline-block px-2 py-1 rounded ${order.completed ? 'bg-green-400 text-white' : 'bg-red-100 text-red-800'}`}>
            Status: {order.completed ? 'Completed' : 'Uncompleted'}
          </p>
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Order Details:</h4>
            {order.products.length > 0 ? (
              order.products.map((product) => {
                const title = product.name || product.title || 'Unknown Product';

                return (
                  <div
                    key={product.id}
                    className="flex items-center border-b pb-2 mb-2 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img src={product.image || 'default-image.jpg'} alt={product.name || 'No name'} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <h5 className="font-semibold">{title}</h5>
                      <p className="font-medium">Price: ${product.amount}</p>
                      <p className="font-medium">Description: {product.shortDescription || 'No description'}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No products found for this order.</p>
            )}
          </div>
        </div>
      );
    });
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

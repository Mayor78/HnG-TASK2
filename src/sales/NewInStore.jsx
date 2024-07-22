import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewInStoreItem from '../components/NewInStoreItem';
import { Link } from 'react-router-dom';
import loader from '../assets/Spinner-2.gif'
const NewInStore = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/newProducts');
      console.log('API Response:', response.data);
  
      // Directly use the response data if it is an array
      if (Array.isArray(response.data)) {
        setNewProducts(response.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching new products:', error);
      setError('Error fetching new products');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className='flex justify-center place-items-center'>{
      <div className='flex justify-center place-items-center w-[300px] h-[300px] bg-white rounded-full p-6 text-center'>
        <img src={loader} alt={'loading....'}/></div>
    }
      </div>;
  }
  if (error) return <div>{error}</div>;

  return (
    <div className='bg-white'>
      <h2 className='flex justify-center items-center p-4 font-semi-bold text-3xl'>New in Store</h2>
      <div className='overflow-hidden px-6'>
        <div className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar'>
          {
            newProducts.slice(0, 8).map((product) => (
              <div key={product.id} className='flex '>
                <NewInStoreItem {...product} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to="/all-products" className="text-blue-500 hover:underline">View All</Link>
      </div>
    </div>
  );
};

export default NewInStore;

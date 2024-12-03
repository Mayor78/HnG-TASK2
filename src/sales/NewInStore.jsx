import  { useState, useEffect } from 'react';
import axios from 'axios';
import NewInStoreItem from '../components/NewInStoreItem';
import { Link } from 'react-router-dom';
import loader from '../assets/Spinner-2.gif';
import { FaChevronRight } from "react-icons/fa";

const NewInStore = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log('API NewResponse:', response.data);

        if (Array.isArray(response.data)) {
          setNewProducts(response.data);
        } else {
          console.error('Received data:', response.data);
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError('Error fetching products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center place-items-center'>
        <div className='flex justify-center place-items-center w-[300px] h-[300px] bg-white rounded-full p-6 text-center'>
          <img src={loader} alt='loading...' />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Slice the last 8 products
  const lastProducts = newProducts.slice(-15).reverse();

  return (
    <div className='bg-white rounded-lg'>
      <div className='bg-black rounded-lg text-white flex justify-between '>
        <h1 className='md:text-3xl text-md mt-2 font-bold mx-2 mb-6'>New Arrivals</h1>
        <Link to="/all-products" className=" mx-2 flex text-md mt-2 gap-1">View All <FaChevronRight className='mt-1 hidden md:block'/></Link>
      </div>
      <div className='overflow-hidden px-6 mt-2'>
        <div className='flex gap-3 md:flex-wrap md:justify-center  overflow-x-auto whitespace-nowrap scroll-smooth  '>
          {lastProducts.map(product => (
            <div key={product.id} className='flex'>
              <NewInStoreItem {...product} />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
       
      </div>
    </div>
  );
};

export default NewInStore;
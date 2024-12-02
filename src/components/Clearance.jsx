import  { useState, useEffect } from 'react';
import axios from 'axios';
import NewInStoreItem from '../components/NewInStoreItem';
import { Link } from 'react-router-dom';
import loader from '../assets/Spinner-2.gif';

const Clearance = () => {
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

 

  return (
    <div className='bg-white rounded-lg'>
      <h2 className=' bg-orange-500 text-white rounded-md p-4 font-semi-bold text-md md:text-3xl'>Clearance Sales</h2>
      <div className='overflow-hidden px-6'>
        <div className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar'>
          {newProducts.map(product => (
            <div key={product.id} className='flex'>
              <NewInStoreItem {...product} />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        {/* <Link to="/all-products" className="text-blue-500 hover:underline">View All</Link> */}
      </div>
    </div>
  );
};

export default Clearance;
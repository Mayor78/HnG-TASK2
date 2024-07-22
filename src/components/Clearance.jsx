import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClearanceItem from './ClearanceItem';
import loader from '../assets/Spinner-2.gif'
const Clearance = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        // console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className='flex justify-center place-items-center'>{
      <div className='flex justify-center place-items-center w-[300px] h-[300px] bg-white rounded-full p-6 text-center'>
        <img src={loader} alt={'loading....'}/></div>
    }
      </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='BG bg-gray-300'>
      <div>
        <h1 className='flex justify-center place-items-center p-4 font-semi-bold text-3xl'>CLEARANCE DEALS</h1>
        <div className='overflow-hidden px-[3rem]'>
          <div className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar p-6'>
            {products.map(product => (
              <div key={product.id} className=''>
                <ClearanceItem {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clearance;

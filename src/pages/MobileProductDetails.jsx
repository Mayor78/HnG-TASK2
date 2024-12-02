import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif';

const MobileProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scroll(0,0)
    const fetchProduct = async () => {
      window.scrollTo(0, 0);
      try {
        console.log(`Fetching product from: https://fakestoreapi.com/products/${id}`);
        const [productsResponse, newProductsResponse] = await Promise.all([
          axios.get('https://mayor78.github.io/fake-api2/data.json'),
          axios.get(`https://fakestoreapi.com/products/${id}`),
        ]);
  
        console.log('Products API response:', productsResponse.data);
        console.log('New Products API response:', newProductsResponse.data);
  
        // Handle the case where newProductsResponse.data is not an array
        const productFromApi = Array.isArray(newProductsResponse.data)
          ? newProductsResponse.data.find(p => p._id === id)
          : newProductsResponse.data; // Assuming it's a single object if not an array
  
        if (productFromApi) {
          setProduct(productFromApi);
        } else {
          console.log('Product not found in API response');
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);
  
  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center w-[300px] h-[300px] bg-white rounded-full p-6 text-center'>
          <img src={loader} alt={'loading...'} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='mobile-product-details p-4 rounded-md mt-4'>
      <h1 className='text-3xl font-semi-bold mt-4'>{product.title || product.name}</h1>
      <div className='mt-4'>
        <p className='text-green-500 text-3xl'>${product.price || product.amount}</p>
        {product.oldPrice && (
          <p className='text-gray-400 text-lg'><strike>${product.oldPrice}</strike></p>
        )}
      </div>
      <div className='mt-4'>
        <img src={product.image || product.picture} alt={product.title || product.name} className="w-full rounded-md" />
      </div>
      <div className='bg-white shadow-lg border border-solid mt-4 p-4'>
        <h2 className='text-2xl font-semibold'>Full Description</h2>
        <p className='mt-2'>{product.description || product.info}</p>
      </div>
    </div>
  );
}

export default MobileProductDetails;

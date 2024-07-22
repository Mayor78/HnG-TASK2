import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          const foundProduct = response.data.find(prod => prod.id.toString() === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Product not found');
          }
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
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='product-details bg-white p-4 rounded-md mt-4'>
        <div className='product-image flex gap-4 mx-10'>
        <img src={product.image} alt={product.title} className="w-[400px] h-[400px]" />
        <div>
        <h1 className='text-3xl font-bold mt-4'>{product.title}</h1>
        <span className='text-gray-500'>Added by: {'Mayor'}</span>
        
        <div className=' mt-20 flex gap-3'>
        <p className='text-green-500 mt-2 text-3xl'>${product.price}</p>
        <p className='text-gray-400 mt-4 text-lg'><strike>${product.oldPrice}</strike></p>
        </div>
        <div>
            <button 
            className='bg-orange-400 text-white p-4 rounded-md mt-20 hover:bg-orange-300'> 
                Add To Cart</button>
        </div>
        </div>
        
        
       
        </div>
            <h2 className='mb-10 mt-20 mx-10 text-3xl font-semibold'>Product Details</h2>
          <div className='bg-white w-[60%] mx-6 '>
          <p className='mt-2'>{product.description}</p>
          </div>
      
     
     
    </div>
  );
}

export default ProductDetails;




    {/* <span className='text-gray-500'>Added by: {product.author}</span>
            <span className='float-right text-gray-500'>{product.createdDate}</span> */}
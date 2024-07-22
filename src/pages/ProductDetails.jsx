import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif'
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, newProductsResponse] = await Promise.all([
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/newProducts')
        ]);

        console.log('Products API Response:', productsResponse.data);
        console.log('New Products API Response:', newProductsResponse.data);

        let foundProduct = null;

        if (Array.isArray(productsResponse.data)) {
          foundProduct = productsResponse.data.find(prod => prod.id.toString() === id);
        }

        if (!foundProduct && Array.isArray(newProductsResponse.data)) {
          foundProduct = newProductsResponse.data.find(prod => prod.id.toString() === id);
        }

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
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
    return <div className='flex justify-center place-items-center'>{
      <div className='flex justify-center place-items-center w-[300px] h-[300px] bg-white rounded-full p-6 text-center'>
        <img src={loader} alt={'loading....'}/></div>
    }
      </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='product-details  p-4 rounded-md mt-4'>
      <div 
      className='product-image grid md:flex gap-4 mx- md:mx-10 bg-white shadow-lg border border-solid '>
        <img src={product.image || product.picture} alt={product.title || product.name} className="w-[400px] rounded-md h-[400px]" />
        <div>
          <h1 className='text-3xl mx-3 md:mx-0 font-semi-bold mt-4'>{product.title || product.name}</h1>
          <span className='text-gray-500 mx-3 md:mx-0'>Added by: {'Mayor'}</span>
          <div className='mt-20 flex gap-3'>
            <p className='text-green-500 mt-2 mx-3 md:mx-0 text-3xl'>${product.price || product.amount}</p>
            {product.oldPrice && (
              <p className='text-gray-400  mt-4 text-lg'><strike>${product.oldPrice}</strike></p>
            )}
          </div>
          <div>
            <button className='bg-orange-400 mx-3 md:mx-0 text-white p-4 rounded-md mt-10 mb-3 md:mt-20 hover:bg-orange-300'>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-lg border border-solid md:mx-10 mt-7'>
      <h2 className='mb-10 mt-20 mx-2 text-3xl font-semibold'>Product Details</h2>
      <hr />
      <div className=' leading-7 p-3 mx-6'>
        <p className='mt-2'>{product.description || product.info}</p>
      </div>
    </div>
    </div>
  );
}

export default ProductDetails;

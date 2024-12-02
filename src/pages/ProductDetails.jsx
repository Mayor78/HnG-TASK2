import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif';
import { CartContext } from '../context/CartContext';
import NewInStore from '../sales/NewInStore';
import { IoMdCall } from "react-icons/io";
import FeatureProduct from '../components/FeaturePrdouct';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      window.scrollTo(0, 0);
      try {
        // Fetch the products from both APIs
        const [productsResponse, newProductsResponse] = await Promise.all([
          axios.get('https://mayor78.github.io/fake-api2/data.json'),
          axios.get('https://fakestoreapi.com/products')
        ]);
  
        // Debugging: Log the API responses
        console.log('Products API response:', productsResponse.data);
        console.log('New Products API response:', newProductsResponse.data);
  
        const { products, newProducts } = productsResponse.data;
        const newProductsData = newProductsResponse.data;
  
        // Check if both responses are arrays
        if (!Array.isArray(products) || !Array.isArray(newProducts) || !Array.isArray(newProductsData)) {
          throw new Error('Invalid API response format');
        }
  
        // Add unique identifiers to products from different sources
        const allProducts = [
          ...products.map(p => ({ ...p, source: 'github' })),
          ...newProducts.map(p => ({ ...p, source: 'github' })),
          ...newProductsData.map(p => ({ ...p, source: 'fakestore' }))
        ];
  
        // Adjust the logic to find the correct product based on ID and source
        const foundProduct = allProducts.find(p => p.id === parseInt(id) && (p.source === 'fakestore' || (p.source === 'github' && p.id >= 21)));
  
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
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

  const shortInfo = (product.description || product.info || '').length > 200 
    ? `${(product.description || product.info).substr(0, 200)}...` 
    : product.description || product.info;

  return (
    <div className='product-details p-4 rounded-md mt-4'>
      <div className='product-image grid md:flex gap-4 mx- md:mx-10 bg-white shadow-lg border border-solid'>
        <img src={product.image || product.picture} alt={product.title || product.name} className="w-[400px] rounded-md h-[400px]" />
        <div>
          <h1 className='text-3xl mx-3 md:mx-0 font-semi-bold mt-4'>{product.title || product.name}</h1>
          <span className='text-gray-500 mx-3 md:mx-0'>Added by: {'Mayor'}</span>
          <div className='mt-20 flex gap-3'>
            <p className='text-green-500 mt-2 mx-3 md:mx-0 text-3xl'>${product.price || product.amount}</p>
            {product.oldPrice && (
              <p className='text-gray-400 mt-4 text-lg'><strike>${product.oldPrice}</strike></p>
            )}
          </div>
          <div>
            <button 
              onClick={() => addToCart({
                image: product.image || product.picture,
                name: product.title || product.name,
                description: product.description || product.info,
                amount: product.price || product.amount,
                oldprice: product.oldPrice,
                id: product.id
              })}
              className='bg-orange-400 hidden md:block mx-3 md:mx-0 text-white p-4 rounded-md mt-10 mb-3 md:mt-20 hover:bg-orange-300'
            >
              Add To Cart
            </button>
          </div>
        </div>
       
      </div>

     
      <div className='bg-white shadow-lg border border-solid md:mx-10 mt-7'>
        <h2 className='mb-10 mt-20 mx-2 text-3xl font-semibold'>Product Details</h2>
        <hr />
        <div className='leading-7 p-3 mx-6'>
          <div className='block md:hidden'>
            <p>{shortInfo}</p>
            <Link to={`/mobile-product/${id}`} className='text-blue-500 underline'>
              Read More
            </Link>
          </div>
          <p className='hidden md:block'> {product.description || product.info}</p>
        </div>
      </div>
      <div className='sticky bottom-0 md:hidden  flex my-2 z-'>
            <div className='border-orange-400 bg-white border-2 p-2 rounded-md text-orange-500'>
              <IoMdCall className='mt-2'/>
            </div>
            <button 
              onClick={() => addToCart({
                image: product.image || product.picture,
                name: product.title || product.name,
                description: product.description || product.info,
                amount: product.price || product.amount,
                oldprice: product.oldPrice,
                id: product.id
              })}
              className='bg-orange-400 mx-3 block md:hidden w-full   md:mx-0 text-white p-4 rounded-md  hover:bg-orange-300'
            >
              Add To Cart
            </button>
          </div>
      <div className='mt-2'>
      <FeatureProduct/>
      </div>
      
    </div>
  );
};

export default ProductDetails;
import  { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/Spinner-2.gif';
import { CartContext } from '../context/CartContext';
import { MdAddShoppingCart } from "react-icons/md";
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
       <div className='md:flex grid'>
      <div className='product-image grid md:flex gap-4 mx-0 p-6 w-full md:w-[70%] rounded-sm md:mx-10 bg-white shadow-lg border border-solid'>
        <img src={product.image || product.picture} alt={product.title || product.name} className="w-[400px]  cursor-zoom-in rounded-md h-[400px]" />
        <div>
          <h1 className='text-3xl mx-3 md:mx-0 font-semi-bold mt-4'>{product.title || product.name}</h1>
          <span className='text-gray-500 mx-3 md:mx-0'>Added by: {'Mayor'}</span>
          <hr  className='mt-2'/>
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
              className='bg-orange-400 w-full hidden text-left shadow-md md:grid grid-cols-2 mx-3 md:mx-0 text-white p-4 rounded-md mt-10 mb-3 md:mt-20 hover:bg-orange-300'
            >
             <span><MdAddShoppingCart size={30}/></span> Add To Cart
            </button>
          </div>
          
        </div>
        
      </div>
      <div className='bg-white w-full mt-2 md:mt-0 md:w-[20%] p-2 rounded-sm'>
         <h1 className='poppins-medium mb-2'>Delivery & Return</h1>
         <hr  className='mb-2'/>

         <h2 className='font-bold'>HNG</h2> 
         <p className='text-sm mb-2 font-light' >Free delivery on thousands of products in Lagos, Ibadan & Abuja Details</p>
         <hr />
         <h1 className='my-2 font-semibold'>Choose your location</h1>
         <div className='grid'>
         <select name="state" id="" className='p-2 rounded-md border-2 mx-3 my-3'>
           <option value="lagos">Lagos</option>
           <option value="ibadan">Ibadan</option>
           <option value="abuja">Abuja</option>
           <option value="Kwara">Kwara</option>
           <option value="abia">Abia</option>
           <option value="kano">Kano</option>
           <option value="gombe">Gombe</option>
           <option value="river">River</option>
           <option value="oyo">Oyo</option>

         </select>

         <select name="area" id="" className='p-2 rounded-md border mx-3 my-3'>
           <option value="north">North</option>
           <option value="south">South</option>
           <option value="east">East</option>
           <option value="west">West</option>
         </select>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../sales/ProductCard';
import loader from '../assets/Spinner-2.gif';
import { useParams } from 'react-router-dom';

const AllProducts = () => {
  
  const productsPerPage = 6; // Number of products to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState([]); // State for individual product loading effects
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const loadProducts = async (page) => {
    try {
      const [productsResponse, newProductsResponse] = await Promise.all([
        axios.get('http://localhost:3000/products'),
        axios.get('http://localhost:3000/newProducts')
      ]);

      const allProducts = [...productsResponse.data, ...newProductsResponse.data];
      setTotalProducts(allProducts.length);

      const newProducts = allProducts.slice((page - 1) * productsPerPage, page * productsPerPage);
      setDisplayedProducts(newProducts);
      setLoadingProducts(newProducts.map(() => true)); // Set all products to loading state initially

      setTimeout(() => {
        setLoadingProducts(newProducts.map(() => false)); // Simulate loading delay and set all products to loaded state
      }, 1000); // Adjust the timeout as needed
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageJump = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const shortenText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substr(0, maxLength)}...` : text;
  };

  return (
    <div className="container mx-auto p-7 bg-quaternary">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product, index) => (
          <div key={index} className="relative">
            {loadingProducts[index] ? (
              <div className="flex justify-center items-center h-full">
                <img src={loader} alt="loading..." className="w-12 h-12" />
              </div>
            ) : (
              <ProductCard
                image={product.image || product.picture}
                name={shortenText(product.name || product.title, 30)}
                description={shortenText(product.description || product.info, 100)}
                oldprice={product.oldprice || ''}
                amount={product.amount || product.price}
                isNew={true}
                productId={product.id} // Pass the product ID for routing
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 text-white bg-primary rounded-md"
          >
            Previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className="px-4 py-2 text-white bg-primary rounded-md"
          >
            Next Page
          </button>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <p>Page {currentPage} of {totalPages}</p>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageJump(index + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

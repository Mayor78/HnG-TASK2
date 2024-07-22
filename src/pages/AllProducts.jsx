import React, { useState, useEffect } from 'react';
import { ClearanceDeals, News } from '../Data';
import ProductCard from '../sales/ProductCard';
import loader from '../assets/Spinner-2.gif'
const AllProducts = () => {
  const productsPerPage = 6; // Number of products to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading effect

  const totalProducts = ClearanceDeals.length + News.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    loadProducts(currentPage);
  }, []);

  const loadProducts = (page) => {
    setLoading(true);
    setTimeout(() => { // Simulate loading delay
      const newProducts = [
        ...ClearanceDeals.slice((page - 1) * productsPerPage, page * productsPerPage),
        ...News.slice((page - 1) * productsPerPage, page * productsPerPage)
      ];
      setDisplayedProducts(newProducts);
      setLoading(false);
      window.scrollTo(0, 2); // Scroll to top
    }, 1000); // Adjust the timeout as needed
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      loadProducts(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      loadProducts(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageJump = (page) => {
    loadProducts(page);
    setCurrentPage(page);
  };


  if (loading) {
    return <div className='flex justify-center place-items-center'>{
      <div className='flex justify-center place-items-center w-[300px] h-[300px] bg-white rounded-full p-6 text-center'>
        <img src={loader} alt={'loading....'}/></div>
    }
      </div>;
  }

  return (
    <div className="container mx-auto p-7 bg-quaternary">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                name={product.name}
                description={product.description || ''}
                oldprice={product.oldprice || ''}
                amount={product.amount}
                isNew={true}
              />
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
        </>
      )}
    </div>
  );
};

export default AllProducts;

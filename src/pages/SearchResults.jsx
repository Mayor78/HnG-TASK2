import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../sales/ProductCard';

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  return (
    <div className="container mx-auto p-7 bg-white shadow shadow-2xl-black">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image || product.picture}
              name={product.name || product.title}
              description={product.description || product.info}
              oldprice={product.oldprice || ''}
              amount={product.amount || product.price}
              isNew={product.isNew}
            />
          ))}
        </div>
      ) : (
        <p>No products found matching your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;

// context/ProductsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, clearanceResponse] = await Promise.all([
          axios.get('https://mayor78.github.io/fake-api2/data.json'),
          axios.get('https://fakestoreapi.com/products')
        ]);

        // Assuming both APIs return arrays directly
        const combinedProducts = [
          ...productsResponse.data.products,
          ...clearanceResponse.data
        ];
        
        setProducts(combinedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

// CreateProductPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [error, setError] = useState('');

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');

      await axios.post('http://localhost:5000/products', { name: productName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Handle successful product creation (e.g., redirect, show message)
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product');
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <button onClick={handleCreateProduct}>Create</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateProduct;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import error from '../assets/404.png';

const ErrorPage = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      navigate('/');
    }

    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 2000);

    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <img src={error} alt="Error 404" className="max-w-full h-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <p className="text-lg mb-6">Redirecting in {counter} seconds...</p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Homepage
        </button>
        <button
          onClick={() => navigate('/all-products')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to All Products
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

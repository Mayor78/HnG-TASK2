import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invest = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl">Investment Packages</h2>
      {packages.map(pkg => (
        <div key={pkg.id} className="border p-4 my-2">
          <h3 className="text-lg">{pkg.name}</h3>
          <p>Returns: {pkg.returns}%</p>
        </div>
      ))}
    </div>
  );
};

export default Invest;

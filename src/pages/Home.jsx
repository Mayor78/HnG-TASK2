import React, { useEffect, useState } from 'react';
import blog from '../assets/blog1.jpg';
import bg2 from '../assets/second.jpg';
 import bg3 from '../assets/bg.jpg';
import bg1 from '../assets/first.jpg'
import bg4 from '../assets/third.jpg';
// import bg5 from '../assets/background (3).jpg';

import Clearance from '../components/Clearance';
import NewInStore from '../sales/NewInStore';
import Inspiration from '../sales/Inspiration';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentBg, setCurrentBg] = useState(bg1);
  const bgImages = [bg1,bg2,bg3,bg4, blog];
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % bgImages.length;
     
      setCurrentBg(bgImages[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const imagestyle = {
    backgroundImage: `url(${currentBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-image 1s ease-in-out', // Smooth transition
  };

  return (
    <>
      <div>
        <div className='h-[50vh] overflow-hidden' style={imagestyle}>
          <div className='bg-white bg-opacity-50 p-16 text-center'>
            <h1 className='text-2xl font-bold mb-2'>HomeNest Gallery (HNG)</h1>
            <p className='font-semibold'>
              Redefining Furniture Shopping in <br />
              <span className='flex justify-center place-items-center'>Nigeria</span>
            </p>
            <Link to={'/all-product'} className='flex justify-center place-items-center bg-blue-500 cursor-pointer text-white font px-4 py-2 mt-4'>
              SHOP NOW
            </Link>
          </div>
        </div>
        <Clearance />
        <NewInStore />
        <Inspiration />
      </div>
    </>
  );
};

export default Home;

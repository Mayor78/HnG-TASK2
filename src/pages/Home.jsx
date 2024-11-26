import { useEffect, useState } from 'react';
import blog from '../assets/blog1.jpg';

import bg2 from '../assets/second.jpg';
import bg3 from '../assets/bg.jpg';
import bg1 from '../assets/first.jpg';
import bg4 from '../assets/third.jpg';
import Clearance from '../components/Clearance';
import NewInStore from '../sales/NewInStore';
import Inspiration from '../sales/Inspiration';
import { Link } from 'react-router-dom';

const Home = () => {
  const bgImages = [bg1, bg2, bg3, bg4, blog]; // Background images for the carousel
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current slide

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [bgImages.length]);

  return (
    <div>
      {/* Carousel container */}
      <div className="overflow-hidden relative h-[50vh] w-ful">
        {/* Carousel inner (slides) */}
        <div
          className="flex transition-transform duration-1000"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Slide effect
            width: `${bgImages.length * 20}%`, // Ensure inner container width accommodates all slides
          }}
        >
          {/* Map through images and render each as a slide */}
          {bgImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-[50vh] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
              }}
            >
              {/* Overlay content */}
              <div className="bg-white bg-opacity-50 p-16 text-center">
                <h1 className="text-2xl font-bold mb-2">
                  HomeNest Gallery (HNG)
                </h1>
                <p className="font-semibold">
                  Redefining Furniture Shopping in <br />
                  <span className="flex justify-center place-items-center">
                    Nigeria
                  </span>
                </p>
                <div className='flex justify-center'>
                <Link
                  to={'/all-products'}
                  className="flex justify-center place-items-center bg-blue-700 hover:to-blue-300 w-44 cursor-pointer text-white font px-4 py-2 mt-4"
                >
                  SHOP NOW
                </Link>
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional sections */}
      <Clearance />
      <NewInStore />
      <Inspiration />
    </div>
  );
};

export default Home;

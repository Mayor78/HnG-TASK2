import { useEffect, useState } from 'react';
import blog from '../assets/anime.gif';
import shoe1 from '../assets/shoe1.webp'
import shoe2 from '../assets/ComfortChair (3).jpg'
import shoe3 from '../assets/shoe2.jpeg'
import shoe4 from '../assets/ComfortChair (6).jpg'
import bg2 from '../assets/banner1.png';
import bg3 from '../assets/banner2.png';
import bg1 from '../assets/banner3.png';
import bg4 from '../assets/third.jpg';
import HomeSideBar from '../components/HomeSideBar'
// import banner from '../assets/'
import Clearance from '../components/Clearance';
import NewInStore from '../sales/NewInStore';
import Inspiration from '../sales/Inspiration';
import { Link } from 'react-router-dom';
import { LuPhoneCall } from "react-icons/lu";
import { FaHouseSignal } from "react-icons/fa6";
import { LuPackageOpen } from "react-icons/lu";

const Home = () => {
  const bgImages = [bg1, bg2, bg3, bg4, blog]; // Background images for the carousel
  const showCase = [shoe1, shoe2, shoe3, shoe4]
  const [showcaseIndex, setShowcaseIndex] = useState(0); // To track the current showcase slide
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current slide
  
  
  const [texts, setTexts] = useState([
    {text: 'SHOP NOW'},
    {text: 'New Arrivals'},
    {text: 'BUY NOW'},
    {text: 'Inspiration'},
    {text: 'Discover'}
  ])

  // Change slide text when the banner changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTexts((prevTexts) => prevTexts.map((text, index) => index === currentIndex? {...text, text: bgImages[currentIndex].name} : text));
    }, 4000); // Change slide text every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex, bgImages]);


  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseIndex((prevIndex) => (prevIndex + 1) % showCase.length);
    }, 3000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
    }, [showCase.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [bgImages.length]);

  return (
    <div className='fle mx-0 md:mx-10'>
      <div className='bg-black my-1 md:hidden block text-white p-2 poppins-regular'>
     <h1 className='flex justify-center'> CALL TO ORDER: <span>45678978989, 56789789898</span></h1>
      </div>
      <div className='flex mt-0 md:mt-5 justify-center mb-0 md:mb-6 gap-0 md:gap-10'>
             
      
           <div>
            
            <HomeSideBar/>
           </div>
      


      {/* Carousel container */}
      <div className="overflow-scroll md:overflow-hidden relative rounded-md h-full md:h-[70vh] md:w-[50%] w-full">
        {/* Carousel inner (slides) */}
        <div
          className="flex transition-transform bg-cover duration-1000"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Slide effect
            width: `${bgImages.length * 25}%`, // Ensure inner container width accommodates all slides
          }}
        >
          {/* Map through images and render each as a slide */}
          {bgImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0  h-[40vh] md:h-[70vh] w-full bg-cover relative bg-center"
              style={{
                backgroundImage: `url(${image})`,objectFit: 'cover'
              }}
            >
             <div className=''>
             <h1 className='text-white bg-blue-400 text-md flex justify-center absolute top-20 md:top-[24rem] p-2 rounded-md cursor-pointer right-[12rem] font-bold'>
                {texts[currentIndex].text}
             </h1>
             </div>
            </div>
            
          ))}

          
        </div>
        
        </div>
        <div className='second-sidebar hidden md:block lg:block'>
           <div className='bg-blue-200 p-2 rounded-md w-[200px] h-[200px] grid gap-2'>
            <div className='flex gap-1'>
            <LuPhoneCall size={32} className='border ml-2 rounded-full p-1 border-orange-400'/>
              <div>
              <h1 className='text-center text-md font-bold poppins-regular '>Call To Order</h1>
              <p className='text-center'>+23478655578655</p>
              </div>
             
            </div>
            <div  className='flex gap-1'>
            <FaHouseSignal size={32} className='border ml-2 rounded-full p-1 border-orange-400'/>
              <div>
              <h1 className='text-center text-md font-bold poppins-regular '>Sell Here</h1>
              </div>
              
            </div>
            <div className='flex gap-1'>
            <LuPackageOpen size={32} className='border ml-2 rounded-full p-1 border-orange-400'/>
              <div>
              <h1 className='text-center text-md font-bold poppins-regular '>Best Deal</h1>
              </div>
              
            </div>
           </div>
           <div className='w-[200px] h-[200px] mt-2 bg-cover rounded-md    bg-center ' style={{backgroundImage: `url(${showCase[showcaseIndex]})`}}>
            {/* <img src={bg4} alt=""  className='w-[200px] h-[215px]'/> */}
            <div className='flex justify-center relative '>
              <h1 className='self-center top-16 poppins-medium text-3xl animate-pulse bg-teal-200 p-2 rounded-md  absolute '>Order Now</h1>
            </div>
           </div>
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

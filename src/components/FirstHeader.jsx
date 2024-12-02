import furniture1 from '../assets/shoe3.webp';
import furniture2 from '../assets/shoe2.jpeg';
import furniture3 from '../assets/shoe3.webp';
import furniture4 from '../assets/shoe4.jpeg';
import furniture5 from '../assets/over.webp';
import { useEffect, useState } from 'react';

const FirstHeader = () => {
    const [furniIndex, setFurniIndex] = useState(0);
    const firstShow = [furniture1, furniture2, furniture3, furniture4, furniture5];

    useEffect(() => {
        const interval = setInterval(() => {
            setFurniIndex((prevIndex) => (prevIndex + 1) % firstShow.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    console.log("Rendering with image:", firstShow[furniIndex]);

    return (
        <div 
            key={furniIndex} // Force re-render
            className="w-full  h-[70px] mt-2 bg-contain bg-center md:block hidden " 
            style={{ backgroundImage: `url(${firstShow[furniIndex]}?v=${furniIndex})` }} // Add cache-busting query
        >
            {/* <div>b</div> */}
        </div>
    );
};

export default FirstHeader;

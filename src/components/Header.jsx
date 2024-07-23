import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import { motion } from "framer-motion";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  

  const containerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.8 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.9, duration: 0.9 }
    })
  };
  return (
      
    <>
       
     <nav className="  backdrop:blur-lg bg-blue-900 p-4 spacing sticky z-10 top-0 ">
     <Nav />
      <div>
        <div className=''>
        
           
           <div onClick={handleToggle} className="block md:hidden p-2 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={show ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
            </svg>
            {show &&<motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='z-10   bg-primary h-[60vh] w-auto'>
              <motion.ul
             
                className=' p-[3rem] text-white '> 

              
           
            <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible" className='py-3'>
            <Link to={'/bedroom'}>Bedroom</Link>
            </motion.li>
            <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible" className='py-3'>
            <Link to={'/cart'}>Bathroom</Link>
            </motion.li >
            <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"className='py-3'>
            <Link to={'/login'}>Living Area</Link>
            </motion.li>
            <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible" className='py-3'>
              <Link to={'/signup'}>Dining Area</Link>
            </motion.li>
            </motion.ul>
           </motion.div>}

           </div>
         
           <ul className='hidden md:flex justify-evenly gap-4 top-0'>
            
         
            <li>
            <Link to={'/about'}>Kitchen & Dinning</Link>
            </li>
            <li>
            <Link to={'/bedroom'}>Bedroom</Link>
            </li>
            <li>
            <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/signup'}>signup</Link>
            </li>

            
           </ul>
        </div>
      </div>
    </nav>
    </>
   
  );
};

export default Header;

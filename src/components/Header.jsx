import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';


const Header = () => {
  return (
      
    <>
       
     <nav className=" backdrop:blur-lg bg-gray-300 p-4 spacing sticky z-10 top-0 ">
     <Nav />
      <div>
        <div className=''>
        
        {/* <h1 className="text-white text-2xl">Investment Platform</h1> */}
           <ul className='flex justify-evenly gap-4 top-0'>
            
           <li>
           <Link to={'/home'}> Living Room </Link>
            </li> 
            <li>
            <Link to={'/about'}>Kitchen & Dinning</Link>
            </li>
            <li>
            <Link to={'/contact'}>Bedroom</Link>
            </li>
            <li>
            <Link to={'/login'}>Storage Furniture</Link>
            </li>
            <li>
              <Link to={'/signup'}>Home Office & Study</Link>
            </li>

            
           </ul>
        </div>
      </div>
    </nav>
    </>
   
  );
};

export default Header;

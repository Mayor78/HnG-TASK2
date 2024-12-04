

const Footer = () => {
  return (
    < >
       <div className='big wrapper text-white z-50  mt-4 bg-blue-950 '>
         <div className="flex justify-between mx-2  flex-wrap-reverse">
          <div className='contact-container mx-6 md:mx-2 mt-4'>
             <h2 className='font-semibold text-2xl'>Contact Us</h2>
             <div className='mt-7'>
             <p>Phone: (123) 456-7890</p>
             <p>Email: support@example.com</p>
             <p>Address: 123 Main St, City, State, Zip</p>
             </div>
            
          </div>
          <div className='help-container mx-6 md:mx-0 mt-4'>
             <h2 className='font-semibold text-2xl'>Help & Support</h2>
             <div className='mt-7'>
             <p>FAQ</p>
             <p>Terms & Conditions</p>
             <p>Privacy Policy</p>
             <p>Contact Us</p>
             <p>Return Policy</p>
             <p>Refund Policy</p>
             <p>Shipping & Delivery</p>
             <p>Payment Options</p>
             <p>Returns & Exchanges</p>
             <p>Customer Service</p>
             <p>About Us</p>
             </div>
            
           
          </div>
          <div className='category-container mx-6 md:mx-0 mt-4'>
             <h2 className='font-semibold text-2xl'>Categories</h2>
             <div className='mt-7'>
             <p>Business Finance</p>
             <p>Investment Strategies</p>
             <p>Economics & Markets</p>
             <p>Technology & Innovation</p>
             <p>Health & Wellness</p>
             <p>Sports & Fitness</p>
             

             </div>
             
            
          </div>
          <div className='social-container mx-6 md:mx-0 mt-20'>
             <h2 className='font-semibold text-2xl mb-6'>Subscribe to  our newsletter</h2>
             <input type="email" placeholder="Enter your email address"  
             className='text-sm text-black mb-4 w-[15rem] py-2 px-2 rounded-md' />
               <label htmlFor=""><i className="fa-solid fa-arrow-right relative text-black right-6"></i></label>
              <div className='flex flex-wrap mx-6 gap-3 md:mx-0 '>
              <p><i className="fab fa-facebook-f hover:text-blue-500"></i> </p>
             <p><i className="fab fa-twitter hover:text-blue-300"></i> </p>
             <p><i className="fab fa-instagram hover:text-orange-300"></i> </p>
             <p><i className="fab fa-youtube hover:text-red-500"></i> </p>
             <p><i className="fab fa-linkedin hover:text-blue-600"></i> </p>
             <p><i className="fab fa-pinterest hover:text-red-500"></i> </p>
             <p><i className="fab fa-github hover:text-black"></i> </p>
             <p><i className="fab fa-gitlab"></i> </p>
             <p><i className="fab fa-discord"></i> </p>
             <p><i className="fab fa-slack"></i> </p>
             

             
           
             </div>
             </div>
          </div>
          <div className='copyright-containe mb-3 gap-1 flex justify-center '>
             <p className='text-sm '>Terms & condition.</p>
             <p className='text-sm'>Cookies & Privacy</p>
             
          </div>
          <div className="flex justify-center">
              <p className='text-sm'>�� 2023 MayorDev. All rights reserved.</p>
             </div>
       </div>
      
    </>
  )
}

export default Footer
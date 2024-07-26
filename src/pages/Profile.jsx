import React, { useState, useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { PiTimer } from "react-icons/pi";
import { RiUserFollowFill } from "react-icons/ri";
import loader from '../assets/loader2.gif'
import Orders from '../components/Orders';
import MobileProfile from './MobileProfile';
const Profile = () => {
  const [selectedSection, setSelectedSection] = useState('My Account');
  const [loading, setLoading] = useState(true);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
            <img src={loader}alt="" />
            </div> 
      </div>
    );
  }

  return (
    <div className='big-container bg-slate-400 py-6'>
      <div className='second-main-wrapper flex mx-10 gap-3'>
        <div className='first-container-for-account-side-bar sticky top-[8rem] hidden md:block lg:block h-[80vh] bg-white rounded-md shadow-md w-[30%] px-4'>
          <section>
            <h2 onClick={() => handleSectionClick('My Account')} className='cursor-pointer flex py-5 gap-2'><FaRegUser className='text-2xl' />My Account</h2>
            <h2 onClick={() => handleSectionClick('Order')} className='cursor-pointer py-3 flex gap-2'><CiCreditCard1 className='text-2xl'/>Order</h2>
            <h2 onClick={() => handleSectionClick('Pending Review')} className='cursor-pointer pb-3 flex gap-2'><MdOutlinePendingActions className='text-2xl'/>Pending Review</h2>
            <h2 onClick={() => handleSectionClick('Save Item')} className='cursor-pointer pb-3 flex gap-2'><CiSaveDown2 className='text-2xl'/>Save Item</h2>
            <h2 onClick={() => handleSectionClick('Inbox')} className='cursor-pointer pb-3 flex gap-2'><MdOutlineForwardToInbox className='text-2xl'/>Inbox</h2>
            <h2 onClick={() => handleSectionClick('Recently View')} className='cursor-pointer pb-3 flex gap-2'><PiTimer className='text-2xl'/>Recently View</h2>
            <h2 onClick={() => handleSectionClick('Follow Seller')} className='cursor-pointer pb-3 flex gap-2'><RiUserFollowFill/>Follow Seller</h2>
            
            <h2 onClick={() => handleSectionClick('My Account')} className='cursor-pointer'>My Account</h2>

            <hr />

            <button className='text-2xl text-orange-400 hover:bg-orange-400 hover:text-white p-2 rounded-md mt-[10rem] ml-5'>Logout</button>
          </section>
        </div>
        <div className='second-container-child-of-sidebar'>
          {selectedSection === 'Account Overview' && <h1>Account Overview</h1>}
          {selectedSection === 'Order' && 
                          <Orders />
            
            }
          {selectedSection === 'Pending Review' && <h1>Pending Review Items</h1>}
          {selectedSection === 'Save Item' && <h1>Saved Items</h1>}
          {selectedSection === 'Inbox' && <h1>Inbox Messages</h1>}
          {selectedSection === 'Recently View' && <h1>Recently Viewed Items</h1>}
          {selectedSection === 'Follow Seller' && <h1>Follow Seller</h1>}
          {selectedSection === 'My Account' && (
            <div className='big-wrapper hidden md:block lg:block'>
              <div className='medium-wrapper grid grid-cols-2 mt-[rem] h-[80vh] bg-white p-7'>
                <div className='my-5 border p-3 w-[25rem] border-solid'>
                  <h1 className='font-bold text-2xl mb-3'>My Account Details</h1>
                  <hr className='mb-2 font-bold'/>
                  <p>Email: 123@example.com</p>
                  <p>Phone: 123-456-7890</p>
                  <p>Address: 123 Main St, City, State, ZIP</p>
                  <button className='btn-primary'>Edit</button>
                </div>
                
                <div className='my-5 border p-3 w-[25rem] border-solid'>
                  <h1 className='font-bold text-2xl mb-3'>Change Password</h1>
                  <hr className='mb-2 font-bold'/>
                  <form>
                    <input type='password' placeholder='Current Password' />
                    <input type='password' placeholder='New Password' />
                    <input type='password' placeholder='Confirm New Password' />
                    <button className='btn-primary ml-2 p-2 rounded-md bg-primary text-white'>Change</button>
                  </form>
                </div>

                <div className='my-5 border p-3 w-[25rem] border-solid'>
                  <h1 className='font-bold text-2xl mb-3 flex justify-between'>News Letter 
                    <GiPencil className='text-orange-400 hover:bg-orange-300 hover:rounded-3xl'/>
                  </h1>
                  <hr className='mb-2 font-bold'/>
                  <p>Are you sure you want to delete your account?</p>
                  <button className='btn-primary'>Delete Account</button>
                </div>

                <div className='my-5 border p-3 w-[25rem] border-solid'>
                  <h1 className='font-bold text-2xl mb-3 flex justify-between'>Address Book 
                    <GiPencil className='text-orange-400 hover:bg-orange-300 hover:rounded-3xl'/>
                  </h1>
                  <hr className='mb-2 font-bold'/>
                  <p>Two-Factor Authentication</p>
                  <p>Email Notifications</p>
                  <button className='btn-primary'>Edit</button>
                  <button className='btn-primary'>Disable</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='wrapper-for-mobile block md:hidden lg:hidden'>
        <MobileProfile/>


      </div>
    </div>
  );
};

export default Profile;

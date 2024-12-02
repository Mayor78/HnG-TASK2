import React, { useState, useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { PiTimer } from "react-icons/pi";
import { RiUserFollowFill } from "react-icons/ri";
import loader from '../assets/loader2.gif';
import Orders from '../components/Orders';
import MobileProfile from './MobileProfile';
import { useUser } from '../context/UserContext';
import AddressModal from '../components/AddressModal';

const Profile = () => {
  const { user, setUser } = useUser();
  const [selectedSection, setSelectedSection] = useState('My Account');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState({
    state: '',
    country: '',
    area: '',
    contact: ''
  });

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleEditAddressClick = () => {
    setUpdatedAddress(user?.address || {
      state: '',
      country: '',
      area: '',
      contact: ''
    });
    setIsModalOpen(true);
    console.log('Modal state set to:', isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddressSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/users/${user._id}/address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedAddress)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update address');
      }
  
      const updatedUser = await response.json();
      console.log('Updated Address:', updatedUser.address); // Verify the updated address
  
      // Update the state with the new address
      setUser(prevUser => ({
        ...prevUser,
        address: updatedUser.address
      }));
  
      alert('Address updated successfully!');
      handleModalClose(); // Close the modal on success
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address');
    }
  };
  
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <img src={loader} alt="Loading..." />
        </div>
      </div>
    );
  }

  return (
    <div className='big-container bg-slate-400 py-6'>
      <div className='second-main-wrapper flex mx-10 gap-3'>
        <div className='first-container-for-account-side-bar sticky top-[8rem] hidden md:block lg:block h-[80vh] bg-white rounded-md shadow-md w-[30%] px-4'>
          <section>
            <h2 onClick={() => handleSectionClick('My Account')} className='cursor-pointer flex py-5 gap-2'>
              <FaRegUser className='text-2xl' />My Account
            </h2>
            <h2 onClick={() => handleSectionClick('Order')} className='cursor-pointer py-3 flex gap-2'>
              <CiCreditCard1 className='text-2xl' />Order
            </h2>
            <h2 onClick={() => handleSectionClick('Pending Review')} className='cursor-pointer pb-3 flex gap-2'>
              <MdOutlinePendingActions className='text-2xl' />Pending Review
            </h2>
            <h2 onClick={() => handleSectionClick('Save Item')} className='cursor-pointer pb-3 flex gap-2'>
              <CiSaveDown2 className='text-2xl' />Save Item
            </h2>
            <h2 onClick={() => handleSectionClick('Inbox')} className='cursor-pointer pb-3 flex gap-2'>
              <MdOutlineForwardToInbox className='text-2xl' />Inbox
            </h2>
            <h2 onClick={() => handleSectionClick('Recently View')} className='cursor-pointer pb-3 flex gap-2'>
              <PiTimer className='text-2xl' />Recently View
            </h2>
            <h2 onClick={() => handleSectionClick('Follow Seller')} className='cursor-pointer pb-3 flex gap-2'>
              <RiUserFollowFill />Follow Seller
            </h2>

            <hr />

            <button className='text-2xl text-orange-400 hover:bg-orange-400 hover:text-white p-2 rounded-md mt-[10rem] ml-5'>
              Logout
            </button>
          </section>
        </div>
        <div className='second-container-child-of-sidebar'>
          {selectedSection === 'Account Overview' && <h1>Account Overview</h1>}
          {selectedSection === 'Order' && <Orders />}
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
                  <p className='text-md font-bold'>Email: {user ? (user.email):"gmail.com"}</p>
                  <p className='text-md font-bold'>Phone: {user?.address?.contact }  </p>
                  <p>Home Address: {user?.address?.state || user?.address?.country || user?.address?.area ? `${user.address.area}, ${user.address.state}, ${user.address.country}` : 'Not Set'}</p>

                  {/* <button
                    className='btn-primary'
                    onClick={handleEditAddressClick}
                  >
                    Edit Address
                  </button> */}
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
                    <GiPencil className='text-orange-400 hover:bg-orange-300 hover:rounded-3xl' onClick={handleEditAddressClick} />
                  </h1>
                  <hr className='mb-2 font-bold'/>
                  <p>Address: {user?.address?.state || user?.address?.country || user?.address?.area ? `${user.address.area}, ${user.address.state}, ${user.address.country}` : 'Not Set'}</p>
                  <p>Contact: {user?.address?.contact }</p>
                </div>
              </div>
            </div>
          )}
        </div>
       
      </div>
       <div className='wrapper-for-mobile block md:hidden lg:hidden'>
        <MobileProfile/>
      </div>
      {isModalOpen && (
  <AddressModal
    isOpen={isModalOpen}
    onClose={handleModalClose}
    onSubmit={handleAddressSubmit}
    address={updatedAddress}
    setAddress={setUpdatedAddress}
  />
)}

   
    </div>
  );
};

export default Profile;

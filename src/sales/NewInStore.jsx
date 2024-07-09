// NewInStore.js
import React from 'react';
import { News } from '../Data';
import NewInStoreItem from '../components/NewInStoreItem';
import { Link } from 'react-router-dom';

const NewInStore = () => {
  return (
    <div className='bg-white'>
      <h2 className='flex justify-center items-center p-4 font-semi-bold text-3xl'>New in Store</h2>
      <div className='overflow-hidden px-6'>
        <div className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar'>
          {
               News.slice(0,8).map((newsItem) => (
              <div key={newsItem.name} className='flex '>
                <NewInStoreItem {...newsItem} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to="/all-product" className="text-blue-500 hover:underline">View All</Link>
      </div>
    </div>
  );
};

export default NewInStore;

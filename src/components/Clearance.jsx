import React from 'react'
import { ClearanceDeals } from '../Data'
import ClearanceItem from './ClearanceItem'

const Clearance = () => {
  return (
    <>
         
    <div className='BG bg-gray-300'>
        <div>
            <h1 className='flex justify-center place-items-center p-4 font-semi-bold text-3xl'>CLEARANCE DEALS</h1>
            <div className='overflow-hidden px-6'>

           
            <div className='flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar p-6'>
                {
                    ClearanceDeals.map((ClearanceDeals)=>{
                        return (
                             <div className=''>
                                 <ClearanceItem key={ClearanceDeals.name} {...ClearanceDeals}/>
                             </div>
                            // <ClearanceItem/>
                        )
                    })
                }
            </div>
            </div>
              
        </div>
    </div>
    </>
  )
}

export default Clearance
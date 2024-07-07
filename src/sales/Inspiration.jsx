import React from 'react'
import furniture from '../assets/furniture1 (1).jpg'
import furniture2 from '../assets/furniture1 (2).jpg'

const Inspiration = () => {
  return (
    <>
    <div className='bg-gray-500 p-6'>
        <div>INSPIRATIONAL IDEALS</div>
        <div className=''>
              <div className='grid md:flex justify-center place-items-center'>
                <img className='w-[20rem] h-[18rem] ' src={furniture} alt="" />
                  <div className='bg-white py-12 px-10 flex place-content-center place-items-center justify-center'>
                    <h1 className=''>Living room
                        <p className='text-wrap '>Lorem ipsum dolor sit amet consectetur <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              </p>
                    </h1>
                  </div>
              </div>
              <div className='grid md:flex justify-center place-items-center mt-4'>
                <img className='w-[20rem] h-[18rem] ' src={furniture} alt="" />
                  <div className='bg-white py-12 px-10 flex place-content-center place-items-center justify-center'>
                    <h1>Living room
                        <p className='l leading-2 '>Lorem ipsum dolor sit amet consectetur <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              </p>
                    </h1>
                  </div>
              </div>
        </div>
        </div>

    </>
  )
}

export default Inspiration
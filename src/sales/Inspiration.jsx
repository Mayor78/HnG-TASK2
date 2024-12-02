
import furniture from '../assets/furniture1 (1).jpg'
import furniture2 from '../assets/furniture1 (2).jpg'

const Inspiration = () => {
  return (
    <>
    <div className='bg-tertiary  p-6'>
        <div className='flex place-content-center text-2xl font-semibold place-items-center justify-center mb-9'>INSPIRATIONAL IDEALS</div>
        <div className=''>
              <div className='grid md:flex justify-center  gap-2 place-items-center'>
                <img className='md:w-[28rem] w-full rounded-md h-[23rem]   overflow-hidden' src={furniture} alt="" />
                  <div className='bg-white md:w-[28rem] rounded-md w-full h-[23rem]'>
                    <h1 className='flex place-content-center text-2xl font-semibold place-items-center justify-center'>Living room</h1>
                        <p className='l leading-5 text-sm mt-4 font-serif w-[70%] h-[70%] ml-14 '>Lorem ipsum dolor sit amet consectetur <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              </p>
                    
                  </div>
              </div>
              <div className='grid md:flex justify-center gap-2 place-items-center mt-4'>
              <div className='bg-white shad md:w-[28rem] rounded-md w-full  h-[23rem] '>
                       <h1 className='flex place-content-center text-2xl font-semibold place-items-center justify-center'>Study room</h1>
                        <p className='l leading-5 text-sm mt-4 font-serif w-[70%] h-[70%] ml-14 '>Lorem ipsum dolor sit amet consectetur <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                             Enim modi debitis similique eius aut vitae itaque mollitia <br />
                              nulla, hic obcaecati neque? Rerum nemo laudantium laboriosam <br />
                              dolor optio corporis molestiae quas?
                              </p>
                              </div>
                              <div>
                <img className='md:w-[28rem] w-full rounded-md h-[23rem]  overflow-hidden ' src={furniture2} alt="" />
                </div>
              </div>
        </div>
        </div>

    </>
  )
}

export default Inspiration
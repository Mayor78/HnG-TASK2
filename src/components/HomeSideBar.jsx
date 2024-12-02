import { Link } from "react-router-dom"
import { GiUnderwearShorts } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { FaBagShopping } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";


const HomeSideBar = () => {
  return (
    <div>
       <div className='side-bar h-[70vh] w-full p-0 md:p-10 rounded-md bg-slate-50  hidden md:block lg:block'>
        <div>
          <ul className='text-sm cursor-pointer  grid gap-4'>
            <li className='group relative'>
              <span className='hover:text-blue-500 hover:transition-all hover:ease-out peer flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span>Mens Wear</span>
              <div className='hidden left-[8.4rem] border-l-2 border-l-black rounded-md top-[-2.5rem] h-[26.6rem] w-[50rem]  transition duration-500  z-20 group-hover:grid grid-cols-2 gap-0 absolute bg-white
              p-4 border shadow-md  delay-1000'>
                <div>
                    <h1 className="font-bold poppins-semibold mb-2 hover:text-yellow-500">Large Stuff</h1>
                    <hr  className=" border-yellow-500 mb-2 w-[50%]"/>
                    <div className="grid gap-4">
                    <Link to='/ladies-wear ' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Gown</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Leggins</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Skirts</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Buba</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Crop Top</Link>
                    </div>
               
                </div>
          

                  <div>
                    <h1 className="font-bold poppins-semibold mb-2 hover:text-yellow-500">Home Appliance</h1>
                    <hr  className=" border-yellow-500 mb-2 w-[50%]"/>
                    <div className="grid gap-4">
                    <Link to='/ladies-wear ' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Gown</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Leggins</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Skirts</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Buba</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Crop Top</Link>
                    </div>
            
                  </div>
              </div>
              </li>


      {/* second list */}
      <li className='group relative'>
              <span className='hover:text-blue-500 hover:transition-all hover:ease-out peer flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span> Ladies Wear</span>
              <div className='hidden left-[8.4rem] border-l-2 border-l-black rounded-md top-[-4.8rem] h-[26.6rem] w-[50rem]  transition duration-500  z-20 group-hover:grid grid-cols-2 gap-0 absolute bg-white
              p-4 border shadow-md  delay-1000'>
                <div>
                    <h1 className="font-bold poppins-semibold mb-2 hover:text-yellow-500">Coperate Wear</h1>
                    <hr  className=" border-yellow-500 mb-2 w-[50%]"/>
                    <div className="grid gap-4">
                    <Link to='/ladies-wear ' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Gown</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Leggins</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Skirts</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Buba</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Crop Top</Link>
                    </div>
               
                </div>
          

                  <div>
                    <h1 className="font-bold poppins-semibold mb-2 hover:text-yellow-500">Casual Wear</h1>
                    <hr  className=" border-yellow-500 mb-2 w-[50%]"/>
                    <div className="grid gap-4">
                    <Link to='/ladies-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Long Sleeves</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Men Suit</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Polo</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Shirt</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Trousers</Link>
                    <Link to='/ladies-wear ' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Gown</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Leggins</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Skirts</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Buba</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Crop Top</Link>
                    </div>
            
                  </div>
              </div>
              </li>




























             
              <li className='group '>
              <span className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'><GiRunningShoe/></span> Shoes</span>
              <div className='hidden left-[19rem] border-l-2 border-l-black rounded-md h-[26.6rem] w-[50rem] top-[10.7rem] z-20 group-hover:grid grid-cols-2 gap-0 absolute bg-white
              p-4 border shadow-md'>
                <div>
                    <h1 className="font-bold poppins-semibold mb-2 hover:text-yellow-500">Casual Shoe</h1>
                    <hr  className=" border-yellow-500 mb-2 w-[50%]"/>
                    <div className="grid gap-4">
                    <Link to='/ladies-wear ' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Gown</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Leggins</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Skirts</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Buba</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Crop Top</Link>
                    </div>
               
                </div>
          

                  <div>
                    <h1 className="font-bold poppins-semibold mb-2 hover:text-yellow-500">Office Shoe</h1>
                    <hr  className=" border-yellow-500 mb-2 w-[50%]"/>
                    <div className="grid gap-4">
                    <Link to='/ladies-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Long Sleeves</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Men Suit</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Polo</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Shirt</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Trousers</Link>
                    <Link to='/ladies-wear ' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Gown</Link>
                <Link to='/mens-wear' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Leggins</Link>
                <Link to='/shoes' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Skirts</Link>
                <Link to='/bag' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Buba</Link>
                <Link to='/electronics' className='text-gray-400 hover:text-black transition ease-out hover:font-bold text-sm hover:text-md'>Crop Top</Link>
                    </div>
            
                  </div>
              </div>
              </li>
              <li className='group '>
              <span className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'>< FaBagShopping /></span> Bag</span>
              <div className='hidden left-[19rem] h-[20rem] w-[20rem] top-[11.5rem] z-20 group-hover:grid gap-0 absolute bg-white
              p-4 border shadow-md'>
                <Link to='/ladies-wear'>Hand bag</Link>
                <Link to='/mens-wear'>Ladies Bag</Link>
                <Link to='/shoes'>Gucci Bag</Link>
                <Link to='/bag'>Fendi Bag</Link>
                <Link to='/electronics'>Oraimo Bag</Link>
              </div>
              </li>
              <li className='group '>
              <span className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'>< FaComputer/></span> Electronics</span>
              <div className='hidden left-[19rem] h-[20rem] w-[20rem] top-[11.5rem] z-20 group-hover:grid gap-0 absolute bg-white
              p-4 border shadow-md'>
                <Link to='/ladies-wear'>Drones</Link>
                <Link to='/mens-wear'>Air Fryer</Link>
                <Link to='/shoes'>Computers</Link>
                <Link to='/bag'>Phoes</Link>
                <Link to='/electronics'>Gadgets</Link>
              </div>
              </li>
            <li className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span> Ladies Wear</li>
            <li className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span> Mens Wear</li>
            <li className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span> Shoes</li>
            <li className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span> Bag</li>
            <li className='hover:text-blue-500 flex gap-1'><span className='text-md mt-1'><GiUnderwearShorts/></span> Electronncs</li>
          </ul>
          </div>
        </div>

    </div>
  )
}

export default HomeSideBar

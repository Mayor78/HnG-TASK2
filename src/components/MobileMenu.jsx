import { FaChevronRight } from "react-icons/fa6";
import { GiHandBag } from "react-icons/gi";
import { BiMessageEdit } from "react-icons/bi";
import { BsTicketDetailed } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { GiGasStove } from "react-icons/gi";
import { MdOutlineLiveTv } from "react-icons/md";
import { LuApple } from "react-icons/lu";
import { GiWaterBottle,GiPirateCoat } from "react-icons/gi";
import { PiDressThin } from "react-icons/pi";
import { FaComputer } from "react-icons/fa6";
import { IoGameControllerOutline } from "react-icons/io5";

const MobileMenu = () => {
    
  return (
    <div>
       <div>
       <ul className="grid gap-4 cursor-pointer ">
                  <li className="text-[10px]  flex justify-between">NEED HELP? <span> <FaChevronRight/></span></li>
                  <hr />
                  <li className="text-[10px] mb-1  flex justify-between">MY HNG ACCOUNT <span> <FaChevronRight/></span></li>
                  <li className="flex gap-2 text-sm"> <span>< GiHandBag className="mt-1"/></span>Orders</li>
                   <li className="flex gap-2 text-sm"> <span><  BiMessageEdit className="mt-1"/></span>Pending Review</li>
                   <li className="flex gap-2 text-sm"> <span>< BsTicketDetailed  className="mt-1"/></span>Voucher</li>
                   <li className="flex gap-2 text-sm"> <span>< FaRegHeart className="mt-1"/></span>Saved Item</li>
                   <hr className="my-2" />
                   <li className="text-[10px]  flex justify-between">OUR CATEGORIES<span className="text-yellow-400"> See All</span></li>
                   <li className="flex gap-2 text-sm"> <span>< GiSmartphone className="mt-1"/></span>Phone & Tablets</li>
                   <li className="flex gap-2 text-sm"> <span>< GiGasStove  className="mt-1"/></span>Appliance</li>
                   <li className="flex gap-2 text-sm"> <span>< MdOutlineLiveTv className="mt-1"/></span>Electronics</li>
                   <li className="flex gap-2 text-sm"> <span>< LuApple className="mt-1"/></span>Supermarket</li>
                   <li className="flex gap-2 text-sm"> <span>< GiWaterBottle  className="mt-1"/></span>Health & Beauty</li>
                   <li className="flex gap-2 text-sm"> <span>< PiDressThin className="mt-1"/></span>Womens Fashion</li>
                   <li className="flex gap-2 text-sm"> <span>< GiPirateCoat className="mt-1"/></span>Mens Fashion</li>
                   <li className="flex gap-2 text-sm"> <span>< IoGameControllerOutline className="mt-1"/></span>Gaming</li>
                   <li className="flex gap-2 text-sm"> <span>< FaComputer  className="mt-1"/></span>Computer</li>
                   <li className="flex gap-2 text-sm"> <span>< GiHandBag className="mt-1"/></span>Clothes</li>
                   <li className="flex gap-2 text-sm"> <span>< GiHandBag className="mt-1"/></span>Health & Beauty</li>
                   <li className="flex gap-2 text-sm"> <span>< GiHandBag className="mt-1"/></span>Womens Fashion</li>
                   <li className="flex gap-2 text-sm"> <span>< GiHandBag className="mt-1"/></span>Mens Fashion</li>
                   <li className="flex gap-2 text-sm"> <span>< GiHandBag className="mt-1"/></span>Gaming</li>
                   <li className="flex gap-2 text-sm"> <span>< PiDressThin className="mt-1"/></span>Computer</li>
                   <li className="flex gap-2 text-sm"> <span>< FaComputer  className="mt-1"/></span>Clothes</li>
                  
                </ul>
       </div>
    </div>
  )
}

export default MobileMenu

import { useState, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useProducts } from "../context/ProductContext";
import { useUser } from "../context/UserContext";
import { CiLogout, CiSettings } from "react-icons/ci";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlineHelpOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { RxHamburgerMenu } from "react-icons/rx";
import MobileMenu from "./MobileMenu";

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [nav, setNav] = useState(false);
  const { products } = useProducts();
  const { user, setUser } = useUser(); // Get user and setUser from context
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredSuggestions = products.filter(
        (product) =>
          (product.name &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.title &&
            product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const searchResults = products.filter(
      (product) =>
        (product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.title &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    console.log("Navigating with Search Results:", searchResults);

    navigate("/search-results", { state: { searchResults } });
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name || suggestion.title);
    setSuggestions([]);
    navigate(`/products/${suggestion.id}`);
  };

  const handleUserClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else if (window.innerWidth < 768) {
      navigate("/profile");
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    // Redirect to login page
    navigate("/login");
    window.location.reload();
  };
  // Optionally reload the page to reflect changes

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

 
 const toggleNav = () => {
    setNav(!nav);
  };
  // const truncatename = (user.name) => {
  //   if (name.length <= 8) return name;
  //   return `${name.substring(0, 8)}...`;
  // };

  return (
    <div className="bg-blue-500 p-2 top-0 sticky z-20 ">
      <div className="big-wrapper flex justify-around  flex-wrap">
        <div className="logo-wrapper hidden md:flex">
          <Link to={"/"} className="font-bold text-2xl flex text-white mt-2">
            HNG
          </Link>
        </div>

        <div className="md:block hidden relative search-bar-wrapper">
          <label htmlFor="search" className="absolute top-3 left-3">
            <FiSearch />
          </label>
          <input
            type="search"
            placeholder="Search product, brands and categories "
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-[30rem] pl-8 mx-0 text-md p-2 rounded-md focus:outline-blue-500 focus:shadow-outline"
          />

         
          <h3
            className=" bg-orange-400 p-2 hover:bg-orange-500 text-white absolute right-[-5rem] top-[-1px] rounded-md cursor-pointer"
            onClick={handleSearch}
          >
            {" "}
            Search
          </h3>

          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-50">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name || suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="icon-wrapper hidden md:flex lg:flex">
          <div className="flex gap-3  text-white">
            <h1 className=" text-[20px] md:flex hidden  ">
              Help <MdOutlineHelpOutline className="mt-1 mx-1 text-" />
            </h1>
            <div
              className="hover:text-orange-400 cursor-pointer flex gap-1"
              onClick={handleUserClick}
            >
              <FaRegUser className="mt-2" />
              <h1 className="hidden md:block mt-1 lg:block">
                Hi, {user ? user.name : "User"}
              </h1>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 bg-white text-black border border-gray-300 rounded-md p-3 shadow-lg mt-2 w-40">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2"
                    >
                      <FaRegUser className="mt-1 " />
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2"
                    >
                      <BsCreditCard className="mt-1" />
                      Orders
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2"
                      >
                        <CiSettings className="mt-1" />
                        Admin
                      </Link>
                    )}
                    <hr className="mb-5 text-bold" />
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-orange-400 hover:text-white text-[20px] flex gap-2"
                    >
                      <CiLogout className="mt-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsDropdownOpen(false)}
                    className="px-4 py-2 hover:bg-primary hover:text-white text-[20px]"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}

            <div className="flex cursor-pointer">
              <CartIcon />
              <h3 className="mt-1 font-medium poppins-medium">Cart</h3>
            </div>
          </div>
        </div>
      </div>
      {/* searchBar to show on smaller device  */}

      <div className="flex md:hidden lg:hidden justify-between mx-1">
        <div className="flex gap-2">
          <div>
            <h1 onClick={toggleNav} className="text-2xl mt-3">
              <RxHamburgerMenu />
            </h1>
            {nav && (
              <div className="w-full slide h-[100vh] absolute overflow-scroll top-0 left-0 bg-white rounded-md p-3 shadow-lg z-50 ">
                <div className="flex gap-2">
                  <h2 onClick={toggleNav} className="mt-1">
                    <IoClose className="font-bold text-2xl"/>
                  </h2>
                  <div className="logo-wrapper ">
                    <Link
                      to={"/"}
                      className=" text-2xl font-bold mt-2"
                    >
                      HNG
                    </Link>
                  </div>
                </div>
                <hr  className="mb-2"/>
                <div>
                  <MobileMenu/>
                </div>
              </div>
            )}
          </div>
          <div>
            <Link to={"/"} className="font-bold text-2xl flex text-white mt-2">
              HNG
            </Link>
          </div>
        </div>

        <div className="flex gap-2 text-white mt-1">
          <FaRegUser className="mt-2" />
          <CartIcon />
        </div>
      </div>

      <form className="md:hidden  relative  search-bar-wrapper">
        <Link to={"/search"}>
          <label htmlFor="search" className="absolute top-1 mx-2">
            <FiSearch className="h-6 w-6 text-gray-500" />
          </label>
          <input
            type="search"
            placeholder="Search product, brands and categories"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full  items-center place-items-center mx-0  pl-10 p-1 rounded-full focus:outline-blue-500 focus:shadow-outline"
          />

          {/* {searchTerm && (
            <i
              className="fa-solid fa-magnifying-glas absolute right-10 top-[0.8rem] cursor-pointer"
              onClick={handleSearch}
            ></i>
          )}
          {/* <i
                      className="fa-solid fa-magnifying-glass absolute right-10 top-[0.8rem] cursor-pointer"
                      onClick={handleSearch}
                    ></i> */} 

          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-50">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name || suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </Link>
      </form>
    </div>

    // <div className=" ">
    //   <div className='block md:flex justify-between items-center '>
    //       <div className='md:hidden  flex'>
    //         <div>
    //        {/* <Header/> */}
    //         </div>
    //         <div>
    //         <Link to={'/'} className='font-bold text-2xl flex text-white mt-2'>HNG</Link>
    //         </div>
    //         <div className='flex text-white'>
    //         <FaRegUser className='mt-1'/>
    //         <CartIcon />
    //         </div>
    //       </div>

    //     <div className='relative' >

    //       <input
    //         type="search"
    //         placeholder='search...'
    //         value={searchTerm}
    //         onChange={handleSearchChange}
    //         onFocus={handleFocus}
    //         onBlur={handleBlur}
    //         className='w-[20rem] min-w-[10rem] mx-0 max-w-[20rem] p-2 rounded-md focus:outline-blue-500 focus:shadow-outline'
    //       />

    //       {searchTerm && (
    //         <i
    //           className="fa-solid fa-magnifying-glass absolute right-10 top-[0.8rem] cursor-pointer"
    //           onClick={handleSearch}
    //         ></i>
    //       )}
    //       <h3
    //         className=" bg-orange-400 p-2 hidden md:block absolute right-[-5rem] top-[-1px] rounded-md cursor-pointer"
    //         onClick={handleSearch}
    //       > Search</h3>

    //       {suggestions.length > 0 && (
    //         <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-50">
    //           {suggestions.map((suggestion) => (
    //             <li
    //               key={suggestion.id}
    //               className="p-2 cursor-pointer hover:bg-gray-200"
    //               onMouseDown={() => handleSuggestionClick(suggestion)}
    //             >
    //               {suggestion.name || suggestion.title}
    //             </li>
    //           ))}
    //         </ul>
    //       )}
    //     </div>
    //     <div className='flex gap-6 mt-3 text-white relative' ref={dropdownRef}>
    //       <h1 className='hidden md:flex  text-[20px] '>Help <MdOutlineHelpOutline className='mt-1 mx-1 text-'/></h1>
    //       <button onClick={handleUserClick} className='text-xl  gap-1 flex hover:text-orange-400'>
    //         <FaRegUser className='mt-1 hidden md:block'/>
    //         <h1 className='hidden md:block lg:block'>Hi, {user ? (user.name) : 'User'}</h1>
    //       </button>
    //       {isDropdownOpen && (
    //         <div className="absolute top-full right-0 bg-white text-black border border-gray-300 rounded-md p-3 shadow-lg mt-2 w-40">
    //           {user ? (
    //             <>
    //               <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2">
    //                 <FaRegUser className='mt-1 '/>Profile
    //               </Link>
    //               <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2">
    //                 <BsCreditCard className='mt-1'/>Orders
    //               </Link>
    //               {user.role === 'admin' && (
    //                 <Link to="/admin" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px] flex gap-2">
    //                   <CiSettings className='mt-1'/>Admin
    //                 </Link>
    //               )}
    //               <hr className='mb-5 text-bold'/>
    //               <button onClick={handleLogout} className="px-4 py-2 hover:bg-orange-400 hover:text-white text-[20px] flex gap-2">
    //                 <CiLogout className='mt-1'/>Logout
    //               </button>
    //             </>
    //           ) : (
    //             <Link to="/login" onClick={() => setIsDropdownOpen(false)} className="px-4 py-2 hover:bg-primary hover:text-white text-[20px]">
    //               Login
    //             </Link>
    //           )}
    //         </div>
    //       )}
    //       <div className='hidden md:block'>
    //       <CartIcon className='mt-1 '/>
    //       </div>

    //     </div>

    //   </div>
    //   {showLoginPrompt && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    //       <div className="bg-white p-6 rounded-md shadow-md w-80">
    //         <h2 className="text-xl font-semibold mb-4">You need to login first</h2>
    //         <button
    //           className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-400"
    //           onClick={closeLoginPrompt}
    //         >
    //           Close
    //         </button>
    //         <Link
    //           to="/login"
    //           className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-400 ml-2"
    //           onClick={closeLoginPrompt}
    //         >
    //           Login
    //         </Link>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Nav;

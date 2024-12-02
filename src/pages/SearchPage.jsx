import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState, useRef } from "react";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { products } = useProducts();
    const dropdownRef = useRef(null);
  
    // Filter suggestions dynamically based on input
    useEffect(() => {
      if (searchTerm.trim()) {
        const filteredSuggestions = products.filter(
          (product) =>
            (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSuggestions(filteredSuggestions);
        setIsDropdownOpen(true);
      } else {
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    }, [searchTerm, products]);
  
    // Handle clicks outside the dropdown
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
            (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      
        console.log("Navigating with Search Results:", searchResults);
      
        navigate("/search-results", { state: { searchResults } });
      };
      
      const handleSuggestionClick = (suggestion) => {
       
        // navigate("/product/${suggestion.id}", );
        navigate(`/products/${suggestion.id}`,{ state: { product: suggestion } }); 

      };
      
  
    return (
      <div>
        <form
          action="search"
          className="relative"
          id="search"
          onSubmit={handleSearch}
        >
          <Link
            to="/"
            className="absolute left-0 top-2 mx-1 bg-yellow-200 p-1 rounded-full"
          >
            <IoMdArrowBack />
          </Link>
          <input
            type="text"
            name="search"
            placeholder="Search products, brands and categories"
            className="w-full p-2 pl-8 text-sm border-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <label
            htmlFor="search"
            className="absolute active:bg-yellow-400 active:p-1 active:rounded-full right-0 mx-1 top-2 border-l-2 pl-2 text-gray-400"
            onClick={handleSearch}
          >
            <IoSearch />
          </label>
        </form>
        {isDropdownOpen && suggestions.length > 0 && (
          <ul
            className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-50"
            ref={dropdownRef}
          >
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
    );
  };
  
  export default SearchPage;
  
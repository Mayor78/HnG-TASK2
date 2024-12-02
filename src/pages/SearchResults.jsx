import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../sales/ProductCard";
import { useEffect } from "react";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchResults } = location.state || { searchResults: [] };

    useEffect(() => {
        if (!location.state) {
            navigate("/"); // Redirect to home if no state is present
        }
    }, [location.state, navigate]);

    return (
        <div className="container mx-auto p-7 bg-white shadow shadow-2xl-black">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.image || product.picture || "/default.jpg"}
                            name={product.name || product.title || "Unnamed Product"}
                            description={product.description || product.info || "No description available"}
                            oldprice={product.oldprice || ""}
                            amount={product.amount || product.price || "0.00"}
                            isNew={product.isNew || false}
                        />
                    ))}
                </div>
            ) : (
                <p>No products found matching your search criteria.</p>
            )}
        </div>
    );
};

export default SearchResults;
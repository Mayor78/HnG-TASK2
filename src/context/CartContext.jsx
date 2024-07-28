import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    const total = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
    console.log("Loaded cart from localStorage:", savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
    console.log("Cart saved to localStorage:", cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        toast.info("Product quantity increased");
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success("Product added to cart");
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === productId);
      if (existingProduct.quantity === 1) {
        toast.info("Item removed from cart");
        return prevCart.filter(item => item.id !== productId);
      } else {
        toast.info("Product quantity decreased");
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Order successfully received");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

// src/context/ShopContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../log/config';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
        setCartItems(getDefaultCart(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getDefaultCart = (products) => {
    let cart = {};
    for (let i = 0; i < products.length; i++) {
      cart[products[i].productID] = 0;
    }
    return cart;
  };

  const addToCart = (productID) => {
    setCartItems((prev) => ({
      ...prev,
      [productID]: prev[productID] + 1,
    }));
  };

  const removeFromCart = (productID) => {
    setCartItems((prev) => ({
      ...prev,
      [productID]: prev[productID] - 1,
    }));
  };

  const updateCartItemCount = (newAmount, productID) => {
    setCartItems((prev) => ({
      ...prev,
      [productID]: newAmount,
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.productID === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

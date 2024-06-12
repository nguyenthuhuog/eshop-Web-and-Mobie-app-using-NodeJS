import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach(product => {
    cart[product.productID] = 0;
  });
  return cart;
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      const fetchedProducts = response.data;
      setProducts(fetchedProducts);
      setCartItems(getDefaultCart(fetchedProducts));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.productID === Number(item));
        if (itemInfo && itemInfo.price) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCount = (prev[itemId] || 1) - 1;
      return { ...prev, [itemId]: updatedCount >= 0 ? updatedCount : 0 };
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = async () => {
    try {
      const productsToUpdate = Object.keys(cartItems).map(key => ({
        productID: Number(key),
        quantity: cartItems[key]
      }));
      await axios.post('http://localhost:8080/api/checkout', { userID: 1, products: productsToUpdate }); // Giả sử userID = 1
      setCartItems(getDefaultCart(products)); // Reset the cart after successful checkout
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartCount,
    checkout,
    setCartItems, // Ensure this is included in the context
    getDefaultCart // Ensure this is included in the context
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

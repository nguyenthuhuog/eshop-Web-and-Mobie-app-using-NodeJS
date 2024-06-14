import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
        setCartItems(getDefaultCart(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
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
    const product = products.find((product) => product.productID === productID);
    if (product) {
      setCartItems((prev) => {
        const currentQuantity = prev[productID] || 0;
        if (currentQuantity < product.stock) {
          return {
            ...prev,
            [productID]: currentQuantity + 1,
          };
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            [productID]: 'Cannot add more, stock limit reached',
          }));
          return prev; // No change to the cart items
        }
      });
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        [productID]: 'Out of stock',
      }));
    }
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

  const getTotalCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const checkout = async () => {
    try {
      const productsToUpdate = Object.keys(cartItems).map(key => ({
        productID: Number(key),
        quantity: cartItems[key]
      }));
      // const response = await axios.post('http://localhost:8080/api/products/checkout', { userID: 10000002, products: productsToUpdate });
      // setCartItems(getDefaultCart(products));
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    checkout,
    setCartItems,
    getDefaultCart,
    getTotalCartCount,
    errorMessages, 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

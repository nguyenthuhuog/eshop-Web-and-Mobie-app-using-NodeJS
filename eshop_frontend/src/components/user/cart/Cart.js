import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ShopContext } from '../../product/ShopContextProvider';
import { useNavigate } from 'react-router-dom';
import '../../../css/cart.css';

const Cart = ({setIsLoginModalOpen}) => {
  const { cartItems, products, removeFromCart, updateCartItemCount, addToCart, getTotalCartAmount, setCartItems, getDefaultCart } = useContext(ShopContext);
  const [productImages, setProductImages] = useState({});
  const api = 'http://localhost:8080/api/products';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = {};
      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          try {
            const imageResponse = await axios.get(`${api}/${productId}`);
            images[productId] = imageResponse.data.image_url;
          } catch (error) {
            console.error(`Error fetching image for productID ${productId}:`, error);
          }
        }
      }
      setProductImages(images);
    };
    fetchProductImages();
  }, [cartItems]);

  const handleCheckout = async () => {
    const userID = Cookies.get('userID');
    if (!userID) {
      setIsLoginModalOpen(true); // Show login modal if not logged in
      return;
    }

    const productsToUpdate = Object.keys(cartItems).map(key => {
        const product = products.find(p => p.productID === Number(key));
        return {
            productID: Number(key),
            quantity: cartItems[key],
            price: product.price
        };
    }).filter(product => product.quantity !== null);

    try {
        setCartItems(getDefaultCart(products));
        navigate('/checkout');
        const response = await axios.post('http://localhost:8080/api/products/checkout', { userID, products: productsToUpdate });
        console.log(response.data);
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Checkout failed. Please try again.');
    }
};

  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {products.map(product => {
        if (cartItems[product.productID] > 0) {
          return (
            <div key={product.productID} className="cartItem">
              <img src={productImages[product.productID]} alt={product.productName} />
              <div className="description">
                <p><b>{product.productName}</b></p>
                <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                <div className="countHandler">
                  <button onClick={() => removeFromCart(product.productID)}> <i className="fa-solid fa-minus"></i> </button>
                  <input
                    type="number"
                    value={cartItems[product.productID]}
                    onChange={(e) => updateCartItemCount(Number(e.target.value), product.productID)}
                  />
                  <button onClick={() => addToCart(product.productID)}> <i className="fa-solid fa-plus"></i> </button>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      {totalAmount > 0 ? (
        <div className="checkout">
          <div className="totalAmount">
            <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={() => navigate('/Homepage')}>Continue Shopping</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
